const Book = require('../models/Book');

// Add a Book
const addBook = async (req, res) => {
  const { title, author, price, isForRent, rentPrice } = req.body;
  try {
    const book = await Book.create({
      title,
      author,
      price,
      isForRent,
      rentPrice,
      owner: req.user.id,
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All Books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addBook, getAllBooks };
