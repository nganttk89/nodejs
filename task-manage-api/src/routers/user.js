const express = require('express')
const router = new express.Router()
const User = require('../models/user')

// Get all user
router.get('/users', async (req, res) => {
		try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.send(error)
    }
})
// Get a user
// router.get('/users', async (req, res) => {
// 	try {
// 			const users = await User.find({})
// 			res.send(users)
// 	} catch (error) {
// 			res.send(error)
// 	}
// })
// Create a user
router.post('/users', async (req, res) => {
    const user = new User(req.headers)
    try {
        await user.save()
        res.send(user) 
    } catch (error) {
        res.send(error)
    }
})
router.patch('/users/:id', async (req, res) => {
    // const updates = Object.keys(req.body)
    // const allowedUpdates = ['name', 'email', 'password', 'age']
    // const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // if (!isValidOperation) {
    //     return res.status(400).send({ error: 'Invalid updates!' })
    // }

    // try {
    //     const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    //     if (!user) {
    //         return res.status(404).send()
    //     }

    //     res.send(user)
    // } catch (e) {
    //     res.status(400).send(e)
    // }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: false })
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router