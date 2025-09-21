const express = require('express');
const mongoose = require('mongoose');
const portfolioRoutes =require('./routes/portfolioRoutes.js');
const cors =require('cors');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected 😊...'))
.catch(err => console.log('MongoDB connection error:', err));

app.use('/', portfolioRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});