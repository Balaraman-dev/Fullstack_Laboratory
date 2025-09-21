const express = require("express");
const cors = require("cors");
const users = require("./db/User");
const app = express();
const bcrypt =require("bcrypt");
const jwt=require("jsonwebtoken")

app.use(express.json());
const port = 5000;

app.use(cors());

app.post("/signup", async (req, res) => {
  const { uname, email, password } = req.body;

  console.log(password);
  
  const hashpassword=await bcrypt.hash(password,10);

  try {
    const userData = new users({ uname, email, password:hashpassword });
    console.log(uname,email,hashpassword);
    await userData.save();
    res.status(201).json({ message: "user details saved successfully" });
  } catch (err) {
    console.log("error while saving details " + err);
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  try {
   
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

  
    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      process.env.JWT_SECRET || "secretkey", 
      { expiresIn: "1h" } 
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { uname: user.uname, email: user.email },
    });
  } catch (err) {
    console.log("Error while signing in: " + err);
    res.status(500).json({ message: "Server error" });
  }
});





app.listen(port, () => { 
  console.log("server running at port 5000");
});
