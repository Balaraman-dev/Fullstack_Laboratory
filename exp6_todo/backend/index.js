const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/todo_auth', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'));


const User = mongoose.model('User', new mongoose.Schema({
  email: String,
  password: String
}));
const Todo = mongoose.model('Todo', new mongoose.Schema({
  userId: String,
  text: String,
  completed: { type: Boolean, default: false }
}));


function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    req.user = jwt.verify(token, 'secret123'); 
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}


app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hash });
  await user.save();
  res.json({ message: 'User created' });
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ userId: user._id }, 'secret123');
  res.json({ token });
});


app.get('/todos', auth, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.userId });
  res.json(todos);
});

app.post('/todos', auth, async (req, res) => {
  const todo = new Todo({ userId: req.user.userId, text: req.body.text });
  await todo.save();
  res.json(todo);
});

app.put('/todos/:id', auth, async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.userId },
    { completed: req.body.completed },
    { new: true }
  );
  res.json(todo);
});

app.delete('/todos/:id', auth, async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id, userId: req.user.userId });
  res.json({ message: 'Deleted' });
});


app.listen(5000, () => console.log('Server running on http://localhost:5000'));
