const express = require('express')
const User = require('./model')
const router = express.Router()

/**
 * DELETEs the user whose `id` is `id`
 */
router.delete("/users/:id", async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: `User with id ${req.params.id} does not exist.` })
    }
})

/**
 * GETs all users matching the specified `age` query
 */
router.get('/users', async (req, res) => {
    const age = req.query['age']

    const users = await (
        age === undefined
            ? User.find()
            : User.find({age: age})
    ).sort({name: 1})

    res.send(users)
})

/**
 * GETs a user with the specified `id`
 */
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        res.send(user)
    } catch {
        res.status(404)
        res.send({ error: `User with id ${req.params.id} does not exist.` })
    }
})

router.patch('/users/:id', async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});

        if (req.body.name) {
            user.name = req.body.name
        }

        if (req.body.age) {
            user.age = req.body.age
        }

        await user.save()
        res.send(user)
    } catch {
        res.status(404)
        res.send({ error: `User with id ${req.params.id} does not exist.` })
    }
})

/**
 * POSTs a new user
 */
router.post('/users', async (req, res) => {
    const user = new User({
        name: req.body.name,
        age: req.body.age
    })

    await user.save()
    res.send(user)
})

module.exports = router
