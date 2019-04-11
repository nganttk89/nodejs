const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.send(error)
    }
})
router.post('/users', async (req, res) => {
    const user = new User(req.headers)
    try {
        await user.save()
        res.send(user) 
    } catch (error) {
        res.send(error)
    }
})
// router.patch()

module.exports = router