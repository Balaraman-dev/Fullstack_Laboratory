const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB (adjust connection string via env if needed)
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/olx_india");

app.use((req, _, next) => {
  console.log(`Request Received : ${req.method} ${req.path}`);
  next();
});

// API routes
app.use("/api", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/payments", require("./routes/payments"));

// serve static uploads if any (optional)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const server = http.createServer(app);

// Socket.io for realtime chat
const io = new Server(server, {
  cors: { origin: '*' }
});

// minimal in-memory chat store (for demo). Replace with DB for production.
const messages = [];

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socket.on('join', ({room}) => {
    socket.join(room);
  });
  socket.on('message', (msg) => {
    messages.push(msg);
    io.to(msg.room).emit('message', msg);
  });
  socket.on('disconnect', () => console.log('socket disconnected', socket.id));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT} \n MongoDB connected \u263A`));
