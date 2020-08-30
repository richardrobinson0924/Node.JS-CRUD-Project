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
 * GETs all users matching the specified `type` query
 */
router.get('/users', async (req, res) => {
    const type = req.query['type']

    const users = await (
        type === undefined
            ? User.find()
            : User.find({type: type})
    ).sort({lastName: 1})

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

        if (req.body.firstName) {
            user.firstName = req.body.firstName
        }

        if (req.body.lastName) {
            user.lastName = req.body.lastName
        }

        if (req.body.type) {
            user.type = req.body.type
        }

        if (req.body.birthdate) {
            user.birthdate = req.body.birthdate
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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: req.body.type,
        birthdate: req.body.birthdate,
    })

    await user.save()
    res.send(user)
})

module.exports = router
