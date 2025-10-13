const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// This endpoint would create a payment intent with Stripe in real app.
// For demo we return a mock clientSecret. Replace with real Stripe integration.
router.post('/create-intent', auth, async (req, res) => {
  const { amount, currency = 'usd', productId } = req.body;
  if (!amount) return res.status(400).json({ message: 'amount required' });
  // Mock response
  res.json({ clientSecret: 'mock_client_secret_' + Date.now(), amount, currency, productId });
});

module.exports = router;
