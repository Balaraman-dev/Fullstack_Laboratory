const Portfolio = require('../models/Portfolio.js');
const users =require('../models/user.js');
const bcrypt=require('bcrypt');

exports.loginUser= async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    try {
      const user = await users.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      // const token = jwt.sign(
      //   { id: user._id, email: user.email }, 
      //   process.env.JWT_SECRET || "secretkey", 
      //   { expiresIn: "1h" } 
      // );

      res.status(200).json({
        message: "Login successful",
        token,
        user: { uname: user.uname, email: user.email },
      });
    } catch (err) {
      console.log("Error while signing in: " + err);
      res.status(500).json({ message: "Server error" });
  }
} 

exports.createUser= async (req, res) => {
  const { uname, email, password } = req.body;  
  const hashpassword=await bcrypt.hash(password,10);
    try {
      const userData = new users({ uname, email, password:hashpassword });
      // console.log(uname,email,hashpassword);
      await userData.save();
      res.status(201).json({ message: "user details saved successfully" });
    } catch (err) {
      console.log("error while saving details " + err);
    }
  }


exports.createPortfolio = async (req, res) => {
  try {
    const portfolio = new Portfolio(req.body);
    await portfolio.save();
    res.status(201).json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: "Validation Error",
        message: Object.values(error.errors).map(e => e.message)
      });
    }

    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message
    });
  }
};


exports.getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: portfolios
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }
    res.json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: false } 
    );
    
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }
    
    res.json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.addProject = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }
    
    const newProject = portfolio.addProject();
    await portfolio.save();
    
    res.json({
      success: true,
      data: {
        portfolio: portfolio,
        newProject: newProject
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }
    
    const deleted = portfolio.deleteProject(req.params.projectId);
    if (!deleted) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete project or project not found'
      });
    }
    
    await portfolio.save();
    res.json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.addSkill = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }
    
    portfolio.addSkill();
    await portfolio.save();
    
    res.json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }
    
    const deleted = portfolio.deleteSkill(parseInt(req.params.skillIndex));
    if (!deleted) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete skill or invalid index'
      });
    }
    
    await portfolio.save();
    res.json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        error: 'Portfolio not found'
      });
    }
    
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};