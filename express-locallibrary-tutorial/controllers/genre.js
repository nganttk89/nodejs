const Genre = require('../models/genre')
const Book = require('../models/book')
const async = require('async')

exports.genre_list = (req, res, next) => {
	Genre.find({})
		.exec(function(err, data) {
			if (err) {
				return next(err)
			}
			// Successful, so render
			res.render('genre', {
				title: 'Genre list',
				list: data
			})
		})
}

exports.create_genre_post = async (req, res, next) => {
	const genre = new Genre({
		name: req.body.name
	})
	try {
		await genre.save()
		const genres = await Genre.find()
		res.render('genre', {
			title: 'Genre list',
			list: genres
		})
		// res.redirect(genre.url)
	} catch (e) {
		const genres = await Genre.find()
		res.render('genre', {
			error: e.errors['name'].message,
			title: 'Genre list',
			list: genres
		})
	}
}

exports.genre_delete_post = (req, res, next) => {
	async.parallel({
		genre: function (callback) {
			Genre.findById(req.params.id)
				.exec(callback)
		},
		genreBooks: function(callback) {
			Book.find({
				'genre': req.params.id
			})
				.exec(callback)
		}
	})
}
