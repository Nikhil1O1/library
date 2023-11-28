const mongoose = require('mongoose');
const Book = require('./../models/bookModel');
const dotenv = require('dotenv');
const app = require('./../app');

dotenv.config({ path: './../config.env' });


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_DB,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>app.listen(PORT, ()=>console.log(`Server running on port :${PORT}`)))
    .catch((err)=>console.log(err.message));

const dummyBooks = [
  {
    name: 'The Great Gatsby',
    summary: 'A classic novel about the American Dream.',
    description: 'The Great Gatsby is a novel written by F. Scott Fitzgerald, exploring themes of decadence, idealism, and the American Dream.',
    startDates: [new Date(2023, 0, 1)],
  },
  {
    name: 'To Kill a Mockingbird',
    summary: 'A novel that deals with racial injustice and moral growth.',
    description: 'To Kill a Mockingbird is a novel by Harper Lee, set in the American South during the Great Depression. It addresses issues of racism and the loss of innocence.',
    startDates: [new Date(2023, 2, 15)],
  },
];

async function insertDummyData() {
  try {
    await Book.insertMany(dummyBooks);
    console.log('Dummy data inserted successfully!');
  } catch (error) {
    console.error('Error inserting dummy data:', error.message);
  } finally {
    mongoose.connection.close();
  }
}


insertDummyData();
