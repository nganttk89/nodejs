const Book = require('../models/book')
const Author = require('../models/author')
const Genre  = require('../models/genre')
const async = require('async')

// Display list of all books.
const render = (req, res, next, error = null, view = 'index') => {
	async.parallel({
        authors: function(callback) {
            Author.find(callback);
        },
        genres: function(callback) {
            Genre.find(callback);
        },
				books: function(callback) {
					const perPage = 5
					const page = req.params.page
					Book.find(callback, 'title author ').populate('author')
					// .limit( perPage ).skip(perPage * page).sort( {title: 'desc'} )
				}
    }, function(err, results) {
        if (err) { return next(err); }
				let data = {
					title: 'Book',
					list: results.books,
					authors:results.authors,
					genres:results.genres
				}
				if (error !== null) {
					data['error'] = error
				}
        res.render(view, data);
    });
	// Book.find({}, 'title author ')
	// 	.populate('author')
	// 	.exec(function (err, list) {
	// 		if (err) { return next(err) }
	// 		// Successful, so render
	// 		let data = {
	// 			title: 'Book List',
	// 			list: list
	// 		}
	// 		if (error !== null) {
	// 			data['error'] = error
	// 		}
	// 		res.render(view, data)
	// 	})
}
// Delete book item by id
const book_delete = async (req, res, next) => {
	const id = req.body.id
	const error = null
	try {
		await Book.findOneAndDelete({_id: id})
	} catch (error) {
		error = error
	}
	render(req, res, next, error, 'partials/book_list')
}
const book_create = async (req, res, next) => {
	const book = new Book(req.body)
	let error = null
	try {
		await book.save()
	} catch (error) {
		console.log('r', error.errors)
		error = error
	}
	render(req, res, next, error, 'partials/book_list')
}
exports.book_list = (req, res, next) => {
	render(req, res, next)
}
exports.book_actions = (req, res, next) => {
	const action = req.body.action
	switch (action) {
		case 'delete':
			book_delete(req, res, next)
			break;
		default:
			book_create(req, res, next)
			break
	}
}
// Handle book create on POST.
// exports.book_create_post = ()
