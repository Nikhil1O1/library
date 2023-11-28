const mongoose = require('mongoose');
const slugify = require('slugify');


const librarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A book must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A book name must have less or equal then 40 characters'],
      minlength: [10, 'A book name must have more or equal then 10 characters']
    },

    summary: {
      type: String,
      trim: true,
      required: [true, 'A book must have a summary']
    },
    description: {
      type: String,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    borrowerName: {
      type: String
    },
    dueDate: { type: Date } 
  },
);


const Book = mongoose.model('Book', librarySchema);

module.exports = Book;
