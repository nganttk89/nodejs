const Book = require('../models/book');
const Author = require('../models/author')

// Display list of all books.
exports.book_list = function(req, res, next) {

  Book.find({}, 'title author ')
    .populate('author')
    .exec(function (err, list_books) {
      if (err) { return next(err); }
      // Successful, so render
      res.render('index', { title: 'Book List', book_list:  list_books});
      res.render('books', { title: 'Book List', book_list:  list_books});
    });

};

// Handle book create on POST.
// exports.book_create_post = ()
