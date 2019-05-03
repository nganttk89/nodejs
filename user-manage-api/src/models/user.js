const mongoose = require('mongoose')
require('../db/mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        unique: [true, 'Email is used!'],
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
    avatar: {
        type: Buffer
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'thisismyselflearning', { expiresIn: 60 * 60 * 24 }) //exp 1 day
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if (!user) {
        throw new Error('Not email')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Not pass')
    }
    return user
}
userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User