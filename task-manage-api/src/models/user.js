const mongoose = require('mongoose')
require('../db/mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        trim: true,
        minlength: 4,
        maxlength: 20
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        trim: true,
        validate: {
            validator: value => validator.isEmail(value),
            message: 'Email is invalid.'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        trim: true,
        minlength: 6,
        validate: {
            validator: value => !value.toLowerCase().includes('password'),
            message: 'Password cannot contain "password"'
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User