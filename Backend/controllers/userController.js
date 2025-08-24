// controllers/userController.js

import User from '../models/User.js'; // Note: .js extension is required for ES6

const userController = {
  // Create or update user profile
  createOrUpdateUser: async (req, res) => {
    try {
      const { userId, about, skills, projects, contact } = req.body;

      let user = await User.findOne({ userId });

      if (user) {
        // Update existing user
        user.about = about ?? user.about;
        user.skills = skills ?? user.skills;
        user.projects = projects ?? user.projects;
        user.contact = contact ?? user.contact;
        await user.save();
      } else {
        // Create new user
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
        message: 'User profile saved successfully',
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error saving user profile',
        error: error.message,
      });
    }
  },

  // Get user profile by userId
  getUserProfile: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findOne({ userId });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User profile not found',
        });
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving user profile',
        error: error.message,
      });
    }
  },

  // Update about section
  updateAbout: async (req, res) => {
    try {
      const { userId } = req.params;
      const aboutData = req.body;

      const user = await User.findOneAndUpdate(
        { userId },
        { about: aboutData },
        { new: true, runValidators: true }
      );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'About section updated successfully',
        data: user.about,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating about section',
        error: error.message,
      });
    }
  },

  // Update skills
  updateSkills: async (req, res) => {
    try {
      const { userId } = req.params;
      const { skills } = req.body;

      const user = await User.findOneAndUpdate(
        { userId },
        { skills },
        { new: true, runValidators: true }
      );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Skills updated successfully',
        data: user.skills,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating skills',
        error: error.message,
      });
    }
  },

  // Add new project
  addProject: async (req, res) => {
    try {
      const { userId } = req.params;
      const projectData = req.body;

      const user = await User.findOne({ userId });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      user.projects.push(projectData);
      await user.save();

      res.status(200).json({
        success: true,
        message: 'Project added successfully',
        data: user.projects,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error adding project',
        error: error.message,
      });
    }
  },

  // Update existing project
  updateProject: async (req, res) => {
    try {
      const { userId, projectId } = req.params;
      const projectData = req.body;

      const user = await User.findOne({ userId });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      const projectIndex = user.projects.findIndex(
        (p) => p._id.toString() === projectId
      );

      if (projectIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Project not found',
        });
      }

      // Use toObject() to safely merge with existing project
      user.projects[projectIndex] = {
        ...user.projects[projectIndex].toObject(),
        ...projectData,
      };
      await user.save();

      res.status(200).json({
        success: true,
        message: 'Project updated successfully',
        data: user.projects[projectIndex],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating project',
        error: error.message,
      });
    }
  },

  // Delete project
  deleteProject: async (req, res) => {
    try {
      const { userId, projectId } = req.params;

      const user = await User.findOne({ userId });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      const originalLength = user.projects.length;
      user.projects = user.projects.filter(
        (p) => p._id.toString() !== projectId
      );

      if (user.projects.length === originalLength) {
        return res.status(404).json({
          success: false,
          message: 'Project not found',
        });
      }

      await user.save();

      res.status(200).json({
        success: true,
        message: 'Project deleted successfully',
        data: user.projects,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting project',
        error: error.message,
      });
    }
  },

  // Update contact information
  updateContact: async (req, res) => {
    try {
      const { userId } = req.params;
      const contactData = req.body;

      const user = await User.findOneAndUpdate(
        { userId },
        { contact: contactData },
        { new: true, runValidators: true }
      );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Contact information updated successfully',
        data: user.contact,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating contact information',
        error: error.message,
      });
    }
  },

  // Get all users (for admin or listing)
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({}, { userId: 1, 'about.name': 1, 'about.title': 1 });

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving users',
        error: error.message,
      });
    }
  },
};

export default userController;