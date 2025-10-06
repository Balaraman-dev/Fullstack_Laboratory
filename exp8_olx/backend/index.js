const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/olx_india");


app.use( (req, _, next) => {
  console.log(`Request Received : ${req.method} ${req.path} }`);
  next();
} );

app.use("/api", require("./routes/auth"));
app.listen(5000, () => console.log("Server running on port 5000 \n MongoDB connected 😊"));
