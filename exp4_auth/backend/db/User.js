const mongoose = require("mongoose");

const userDb = mongoose.createConnection("mongodb://127.0.0.1:27017/Auth");

userDb.on("connected", () => {
  console.log("MongoDB connected....😊");
});

const userSchema = new mongoose.Schema({
  uname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true }); 

const userModel = userDb.model("User", userSchema, "users");

module.exports = userModel;
