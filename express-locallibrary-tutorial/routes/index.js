const express = require('express')
const router = express.Router()

const bookController = require('../controllers/book')
const genreController = require('../controllers/genre')
/* GET home page. */
router.get('/', bookController.book_list)
router.get('/books', bookController.book_list)
router.get('/genre', genreController.genre_list)
router.post('/genre', genreController.create_genre_post)

module.exports = router
