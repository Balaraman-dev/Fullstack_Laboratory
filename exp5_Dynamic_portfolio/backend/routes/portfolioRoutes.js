const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

router.post('/login',portfolioController.loginUser)  ;
router.post('/signup',portfolioController.createUser);

router.post('/createportfolio', portfolioController.createPortfolio);

// router.get('/getportfolio', portfolioController.getPortfolios); 
router.get('/getportfolio/:id', portfolioController.getPortfolio);
router.put('/:id', portfolioController.updatePortfolio); 
router.delete('/:id', portfolioController.deletePortfolio);

router.post('/:id/projects', portfolioController.addProject);
router.delete('/:id/projects/:projectId', portfolioController.deleteProject);

router.post('/:id/skills', portfolioController.addSkill);
router.delete('/:id/skills/:skillIndex', portfolioController.deleteSkill);

module.exports = router;