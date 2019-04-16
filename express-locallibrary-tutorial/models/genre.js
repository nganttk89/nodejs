const mongoose = require('mongoose')

const Schema = mongoose.Schema

const GenreSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
    minlength: [3, 'Min length is 3 character.'],
    maxlength: 100
  }
})

// Virtual for this genre instance URL.
GenreSchema
  .virtual('url')
  .get(function () {
    return '/genre/' + this._id
  })

// Export model.
module.exports = mongoose.model('Genre', GenreSchema)
