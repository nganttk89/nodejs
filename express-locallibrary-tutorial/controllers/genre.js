const Genre = require("../models/genre");
const Book = require("../models/book");
const async = require("async");

const render = (req, res, next, error = null) => {
	// Genre.find({}).exec(function(err, respone) {
	// 	if (err) {
	// 		return next(err);
	// 	}
	// 	let data = {
	// 		title: "Genre list",
	// 		list: respone
	// 	};
	// 	if (error !== null) {
	// 		data["error"] = error;
	// 	}
	// 	res.render("genre", data);
	// });

	var perPage = 9;
	var page =  req.query.page || 1;

	Genre.find({})
		.skip((perPage * page) - perPage)
		.limit(perPage)
		.sort( {_id: 'desc'} )
		.exec(function(err, respone) {
			Genre.count().exec(function(err, count){
				if (err) {
					return next(err);
				}
				
				let data = {
					title: "Genre list",
					list: respone,
					current: page,
					pages: Math.ceil(count / perPage)
				};
				if (error !== null) {
					data["error"] = error;
				}
				res.render("genre", data);
			})
			
			
			
		});
};

const genre_create = async (req, res, next) => {
	const genre = new Genre({
		name: req.body.name
	});
	let error = null;
	try {
		await genre.save();
	} catch (error) {
		error = error;
	}
	render(req, res, next, error);
};

const genre_delete = async (req, res, next) => {
	// async.parallel({
	// 	genre: function (callback) {
	// 		Genre.findById(req.params.id)
	// 			.exec(callback)
	// 	},
	// 	genreBooks: function(callback) {
	// 		Book.find({
	// 			'genre': req.params.id
	// 		})
	// 			.exec(callback)
	// 	}
	// })
	const id = req.body.id;
	let error = null;
	try {
		await Genre.deleteOne({ _id: id });
	} catch (error) {
		error = error;
	}
	render(req, res, next, error);
};
const genre_edit = async (req, res, next) => {
	const id = req.body.id;
	const name = req.body.nameEdit;
	let error = null;
	try {
		await Genre.findOneAndUpdate({ _id: id }, { name: name });
	} catch (error) {
		error = error;
	}
	render(req, res, next, error);
};
exports.genre_list = (req, res, next) => {
	var perPage = 9;
	var page =  req.query.page || 1;

	Genre.find({})
		.skip((perPage * page) - perPage)
		.limit(perPage)
		.sort( {_id: 'desc'} )
		.exec(function(err, respone) {
			Genre.count().exec(function(err, count){
				if (err) {
					return next(err);
				}
				let data = {
					title: "Genre list",
					list: respone,
					current: page,
					pages: Math.ceil(count / perPage)
				};
				res.render("genre", data);
			})
			
			// if (error !== null) {
			// 	data["error"] = error;
			// }
			
		});
};
exports.genre_actions = (req, res, next) => {
	const action = req.body.action;
	switch (action) {
		case "delete":
			genre_delete(req, res, next);
			break;
		case "edit":
			genre_edit(req, res, next);
			break;
		default:
			genre_create(req, res, next);
			break;
	}
};
