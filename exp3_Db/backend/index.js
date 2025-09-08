const express = require("express");
const cors = require("cors");
const contact = require("./db/Contact");
const user = require("./db/User");
const { useEffect } = require("react");
const app = express();
app.use(express.json());
const port = 8000;

app.use(cors());
app.post("/contactDb", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contactData = new contact({ name, email, message });
    await contactData.save();
    res.status(201).json({ message: "contact details saved successfully" });
  } catch (err) {
    console.log("error while saving contacts" + err);
  }
});

app.get("/userDb", async (req, res) => {
  try {
    const userData = await user.find();
    res.status(200).json(userData);
  
  } catch (err) {
    console.log("error while fetching user data" + err);
  }
});


app.listen(port, () => { 
  console.log("server running at port 8000");
});
