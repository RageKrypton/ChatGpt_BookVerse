const mongoose = require('mongoose');
const Book = require('../models/Book');
const booksData = [
  { title: 'Book 1', author: 'Author 1', price: 10, stock: 5 },
  { title: 'Book 2', author: 'Author 2', price: 15, stock: 3 },
];

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Book.deleteMany();
    await Book.insertMany(booksData);
    console.log('Books seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding books:', error);
    process.exit(1);
  }
};

seedBooks();
