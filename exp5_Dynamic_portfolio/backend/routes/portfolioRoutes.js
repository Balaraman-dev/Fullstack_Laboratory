const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

router.post('/login',portfolioController.loginUser)  ;
router.post('/signup',portfolioController.createUser);

router.post('/createportfolio', portfolioController.createPortfolio);
router.put('/updateportfolio/:id', portfolioController.updatePortfolio); 

router.get('/getportfolio/:id', portfolioController.getPortfolio);


// router.delete('/:id', portfolioController.deletePortfolio);
// router.post('/:id/projects', portfolioController.addProject);
// router.delete('/:id/projects/:projectId', portfolioController.deleteProject);

// router.post('/:id/skills', portfolioController.addSkill);
// router.delete('/:id/skills/:skillIndex', portfolioController.deleteSkill);

module.exports = router;