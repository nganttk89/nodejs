const Genre = require('../models/genre')

exports.genre_list = (req, res, next) => {
  Genre.find({})
    .exec(function (err, data) {
      if (err) {
        return next(err)
      }
      // Successful, so render
      res.render('genre', {
        title: 'Genre',
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
