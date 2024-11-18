const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getUserOrders } = require('../controllers/orderController');
const router = express.Router();

router.get('/my-orders', protect, getUserOrders);

module.exports = router;
