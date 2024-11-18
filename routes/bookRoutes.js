const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addBook, getAllBooks } = require('../controllers/bookController');
const router = express.Router();

// Routes
router.post('/add', protect, addBook);
router.get('/list', getAllBooks);

module.exports = router;
