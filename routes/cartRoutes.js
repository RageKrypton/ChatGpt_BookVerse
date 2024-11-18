const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addToCart, getCart, checkout } = require('../controllers/cartController');
const router = express.Router();

router.post('/add', protect, addToCart);
router.get('/get', protect, getCart);
router.post('/checkout', protect, checkout);

module.exports = router;
