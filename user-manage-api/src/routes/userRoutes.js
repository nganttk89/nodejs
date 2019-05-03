const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')
const multer  = require('multer')

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})
// Create a user
router.post('/users', upload.single('avatar'), async (req, res) => {
    let userData = req.body
    userData[req.file.fieldname] = req.file.buffer
    const user = new User(userData)
    try {
        await user.save()
        res.send(user) 
    } catch (error) {
        res.send(error)
    }
})
// Update avatar
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
// Get avatar
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        console.log(user)
        if(!user || !user.avatar) {
            throw new Error('No user')
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch(error) {
        res.send(error)
    }
})
// Login user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({user, token})
        res.send({id: user._id, email: user.email, age: user.age, avatar: user.avatar, token})
    } catch (error) {
        res.send(error)
    }
})
// Logout user
router.post('/users/logout', auth, async (req, res) => {
    try {
        // req.user.tokens = req.user.tokens.filter(item => {
        //     return item.token != req.token
        // })
        req.user.tokens = []
        await req.user.save()
        res.send('Logout success!')
    } catch (e) {
        res.send(e)
    }
})

// Get all user
router.get('/users', auth, async (req, res) => {
    try {
    const users = await User.find({})
    res.send(users)
} catch (error) {
    res.send(error)
}
})
module.exports = router