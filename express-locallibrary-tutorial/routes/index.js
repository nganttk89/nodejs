const express = require('express')
const router = express.Router()

const bookController = require('../controllers/book')
const genreController = require('../controllers/genre')
/* GET home page. */
router.get('/', bookController.book_list)
router.post('/', bookController.book_actions)
router.get('/books_list', bookController.book_list)
router.get('/genre', genreController.genre_list)
router.post('/genre', genreController.genre_actions)

module.exports = router
