const Book = require('./../models/bookModel');


exports.getBooks = async (req, res, next) => {
    try {
      const bookId = req.query.id;
      
      if (bookId) {
        const book = await Book.findById(bookId);
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }
        return res.json(book);
      } else {
        const books = await Book.find();
        res.json(books);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

exports.addBook = async (req, res, next) => {
    try {
        const newBook = await Book.create({
            name: req.body.name,
            summary: req.body.summary,
            description: req.body.description,
        });
      res.status(201).json({
        status: 'success',
        data: {
            book : newBook
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}
exports.updateBook = async (req, res, next) => {
    try {
      const bookId = req.params.id;
      const updatedBook = await Book.findByIdAndUpdate(bookId, req.body,{
        new: true
      });

      res.status(200).json({
        status: 'success',
        data: {
            book : updatedBook
            }
        });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}
exports.lendBook = async (req, res, next) => {
    try {
      const bookId = req.params.id;
      const { borrowerName, daysToReturn } = req.body;
  
      const book = await Book.findById(bookId);
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      if (book.dueDate) {
        return res.status(400).json({ message: 'Book is already lent' });
      }
  
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + daysToReturn);
  
      // Update the book with borrower name and due date
      const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        { borrowerName, dueDate },
        { new: true }
      );
  
      res.json(updatedBook);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.removeBook = async (req, res, next) => {
    try {
      const bookId = req.params.id;
      const deletedBook = await Book.findByIdAndDelete(bookId);
  
      if (!deletedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

