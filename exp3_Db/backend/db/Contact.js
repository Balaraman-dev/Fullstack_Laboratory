const mongoose = require("mongoose");

const contactDb = mongoose.createConnection(
  "mongodb://localhost:27017/contactDb"
);

contactDb.on("connected", () => {
  console.log("MongoDB connected Successfully for ContactDb");
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const contactModel = contactDb.model("contact", contactSchema);

module.exports = contactModel;
