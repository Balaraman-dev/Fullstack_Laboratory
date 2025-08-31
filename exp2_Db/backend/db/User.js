const mongoose = require("mongoose");

const userDb = mongoose.createConnection("mongodb://127.0.0.1:27017/userDb");

userDb.on("connected", () => {
  console.log("MongoDB connected successfully for UserDb");
});

const userSchema = new mongoose.Schema({
  data: [
    {
      about: String,
      projects: [
        {
          projectTitle: String,
          projectDesc: String,
          projectTools: [String],
          projectLink: String,
        },
      ],
      skills: [
        {
          skillsTitle: String,
          skill: [String],
        },
      ],
    },
  ],
});

const userModel = userDb.model("user", userSchema, "user");

module.exports = userModel;
