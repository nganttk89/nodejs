const Genre = require('../models/genre')

exports.genre_list = (req, res, next) => {
  Genre.find({})
    .exec(function(err, data) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render('genre', {
        title: 'Genre',
        list: data
      });
    });
}

exports.create_genre_post = async (req, res) => {
  const genre = new Genre({name: req.body.name})
  console.log(genre)
  try {
    await genre.save()
    res.render('genre', {
      genre: genre
    })
  } catch (e) {
    console.log(e)
    res.render('genre', {
      error: e.message + ''
    })
  }


}
