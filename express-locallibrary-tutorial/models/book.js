const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required!'],
    trim: true
  },
  author: {
    type: Schema.ObjectId,
    ref: 'Author',
    required: [true | 'Author is required!']
  },
  summary: {
    type: String,
    trim: true
  },
  isbn: {
    type: String
  },
  genre: {
    type: Schema.ObjectId,
    ref: 'Genre'
  }
})
BookSchema
  .virtual('url')
  .get(function () {
    return '/book/' + this._id
  })
module.exports = mongoose.model('Book', BookSchema)
