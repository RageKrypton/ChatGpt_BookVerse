const Book = require('../models/Book');
const Order = require('../models/Order');

// Add Book to Cart
const addToCart = async (req, res) => {
  const { bookId, type, quantity } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    let cart = req.session.cart || [];
    const index = cart.findIndex((item) => item.book === bookId && item.type === type);

    if (index >= 0) {
      cart[index].quantity += quantity;
    } else {
      cart.push({ book: bookId, type, quantity });
    }

    req.session.cart = cart;
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {
    res.status(200).json(req.session.cart || []);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Checkout
const checkout = async (req, res) => {
  const { totalPrice } = req.body;
  try {
    const order = await Order.create({
      user: req.user.id,
      books: req.session.cart,
      totalPrice,
    });
    req.session.cart = []; // Clear the cart after checkout
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addToCart, getCart, checkout };
