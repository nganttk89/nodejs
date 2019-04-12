var express = require('express');
var router = express.Router();

var book_controller = require('../controllers/book');
var genre_controller = require('../controllers/genre');
/* GET home page. */
router.get('/', book_controller.book_list);
router.get('/books', book_controller.book_list);
router.get('/genre', genre_controller.genre_list);
router.post('/genre', genre_controller.create_genre_post);

module.exports = router;
