// controllers/userController.js
import User from '../models/User.js';

const userController = {
  // Create or Update entire user profile
  createOrUpdateUser: async (req, res) => {
    try {
      const { userId, about, skills, projects, contact } = req.body;

      // Validate userId
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "userId is required",
        });
      }

      let user = await User.findOne({ userId });

      if (user) {
        // Update existing user
        if (about !== undefined) user.about = about;
        if (skills !== undefined) user.skills = skills;
        if (projects !== undefined) user.projects = projects;
        if (contact !== undefined) user.contact = contact;
        await user.save();
      } else {
        // Create new user - only if we have required fields
        if (!about || !about.name || !about.title || !about.bio) {
          return res.status(400).json({
            success: false,
            message: "About section with name, title, and bio is required for new users",
          });
        }

        if (!contact || !contact.email) {
          return res.status(400).json({
            success: false,
            message: "Contact email is required for new users",
          });
        }

        user = new User({
          userId,
          about,
          skills: skills || [],
          projects: projects || [],
          contact,
        });
        await user.save();
      }

      res.status(200).json({
        success: true,
        message: "User profile saved successfully",
        data: user,
      });
    } catch (error) {
      console.error("Error in createOrUpdateUser:", error);
      res.status(500).json({
        success: false,
        message: "Error saving user profile",
        error: error.message,
      });
    }
  },

  // Get user profile by userId
  getUserProfile: async (req, res) => {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "userId is required",
        });
      }

      const user = await User.findOne({ userId });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User profile not found",
        });
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error("Error in getUserProfile:", error);
      res.status(500).json({
        success: false,
        message: "Error retrieving user profile",
        error: error.message,
      });
    }
  },

  // Update about section
  updateAbout: async (req, res) => {
    try {
      const { userId } = req.params;
      const { about } = req.body;

      if (!userId || !about) {
        return res.status(400).json({
          success: false,
          message: "userId and about data are required",
        });
      }

      const user = await User.findOneAndUpdate(
        { userId },
        { about },
        { new: true, runValidators: true, upsert: false }
      );

      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: "User not found" 
        });
      }

      res.status(200).json({
        success: true,
        message: "About section updated successfully",
        data: user.about,
      });
    } catch (error) {
      console.error("Error in updateAbout:", error);
      res.status(500).json({
        success: false,
        message: "Error updating about section",
        error: error.message,
      });
    }
  },

  // Update skills
  updateSkills: async (req, res) => {
    try {
      const { userId } = req.params;
      const { skills } = req.body;

      if (!userId || !Array.isArray(skills)) {
        return res.status(400).json({
          success: false,
          message: "userId and skills array are required",
        });
      }

      const user = await User.findOneAndUpdate(
        { userId },
        { skills },
        { new: true, runValidators: true, upsert: false }
      );

      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: "User not found" 
        });
      }

      res.status(200).json({
        success: true,
        message: "Skills updated successfully",
        data: user.skills,
      });
    } catch (error) {
      console.error("Error in updateSkills:", error);
      res.status(500).json({
        success: false,
        message: "Error updating skills",
        error: error.message,
      });
    }
  },

  // Add new project
  addProject: async (req, res) => {
    try {
      const { userId } = req.params;
      const projectData = req.body;

      if (!userId || !projectData) {
        return res.status(400).json({
          success: false,
          message: "userId and project data are required",
        });
      }

      const user = await User.findOne({ userId });

      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: "User not found" 
        });
      }

      user.projects.push(projectData);
      await user.save();

      res.status(200).json({
        success: true,
        message: "Project added successfully",
        data: user.projects,
      });
    } catch (error) {
      console.error("Error in addProject:", error);
      res.status(500).json({
        success: false,
        message: "Error adding project",
        error: error.message,
      });
    }
  },

  // Update existing project
  updateProject: async (req, res) => {
    try {
      const { userId, projectId } = req.params;
      const projectData = req.body;

      if (!userId || !projectId || !projectData) {
        return res.status(400).json({
          success: false,
          message: "userId, projectId and project data are required",
        });
      }

      const user = await User.findOne({ userId });

      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: "User not found" 
        });
      }

      const projectIndex = user.projects.findIndex(
        (p) => p._id.toString() === projectId
      );

      if (projectIndex === -1) {
        return res.status(404).json({ 
          success: false, 
          message: "Project not found" 
        });
      }

      user.projects[projectIndex] = {
        ...user.projects[projectIndex].toObject(),
        ...projectData,
      };
      await user.save();

      res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: user.projects[projectIndex],
      });
    } catch (error) {
      console.error("Error in updateProject:", error);
      res.status(500).json({
        success: false,
        message: "Error updating project",
        error: error.message,
      });
    }
  },

  // Delete project
  deleteProject: async (req, res) => {
    try {
      const { userId, projectId } = req.params;

      if (!userId || !projectId) {
        return res.status(400).json({
          success: false,
          message: "userId and projectId are required",
        });
      }

      const user = await User.findOne({ userId });

      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: "User not found" 
        });
      }

      const originalLength = user.projects.length;
      user.projects = user.projects.filter((p) => p._id.toString() !== projectId);

      if (user.projects.length === originalLength) {
        return res.status(404).json({ 
          success: false, 
          message: "Project not found" 
        });
      }

      await user.save();

      res.status(200).json({
        success: true,
        message: "Project deleted successfully",
        data: user.projects,
      });
    } catch (error) {
      console.error("Error in deleteProject:", error);
      res.status(500).json({
        success: false,
        message: "Error deleting project",
        error: error.message,
      });
    }
  },

  // Update contact information
  updateContact: async (req, res) => {
    try {
      const { userId } = req.params;
      const { contact } = req.body;

      if (!userId || !contact) {
        return res.status(400).json({
          success: false,
          message: "userId and contact data are required",
        });
      }

      const user = await User.findOneAndUpdate(
        { userId },
        { contact },
        { new: true, runValidators: true, upsert: false }
      );

      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: "User not found" 
        });
      }

      res.status(200).json({
        success: true,
        message: "Contact information updated successfully",
        data: user.contact,
      });
    } catch (error) {
      console.error("Error in updateContact:", error);
      res.status(500).json({
        success: false,
        message: "Error updating contact information",
        error: error.message,
      });
    }
  },

  // Get all users (summary)
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find(
        {},
        { userId: 1, "about.name": 1, "about.title": 1 }
      );

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      res.status(500).json({
        success: false,
        message: "Error retrieving users",
        error: error.message,
      });
    }
  },
};

export default userController;