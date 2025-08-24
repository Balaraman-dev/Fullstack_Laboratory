// routes/userRoutes.js
import express from "express";
const router = express.Router();
import userController from '../controllers/userController';

// Main user profile routes
router.post('/users', userController.createOrUpdateUser);
router.get('/users/:userId', userController.getUserProfile);
router.get('/users', userController.getAllUsers);

// Section-specific update routes
// router.put('/users/:userId/about', userController.updateAbout);
// router.put('/users/:userId/skills', userController.updateSkills);
// router.put('/users/:userId/contact', userController.updateContact);

// Project-specific routes
router.post('/users/:userId/projects', userController.addProject);
router.put('/users/:userId/projects/:projectId', userController.updateProject);
router.delete('/users/:userId/projects/:projectId', userController.deleteProject);

export default router;