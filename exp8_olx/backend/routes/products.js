const express = require('express');
const router = express.Router();
const Product = require('../models/Products');
const auth = require('../middleware/auth');

// Create product
router.post('/', auth, async (req, res) => {
  try {
    const { pname, desc, price, location, image } = req.body;
    const p = await Product.create({
      author: req.user.id,
      pname,
      desc,
      price,
      location,
      image,
    });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all products with optional search
router.get('/', async (req, res) => {
  try {
    const q = req.query.q;
    const filter = q ? { $or: [ { pname: new RegExp(q, 'i') }, { desc: new RegExp(q, 'i') } ] } : {};
    const products = await Product.find(filter).populate('author', 'uname email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get product by id
router.get('/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id).populate('author', 'uname email');
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
