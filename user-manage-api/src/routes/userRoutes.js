const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')

// Create a user
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.send(user) 
    } catch (error) {
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