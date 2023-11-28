const express = require('express');
const bookController = require('./../controllers/bookController');

const router = express.Router();


router.route('/get').get(bookController.getBooks);
router.route('/add').post(bookController.addBook);
router.route('/update/:id').patch(bookController.updateBook);
router.route('/del/:id').delete(bookController.removeBook);
router.route('/lend/:id').patch(bookController.lendBook);

module.exports = router;