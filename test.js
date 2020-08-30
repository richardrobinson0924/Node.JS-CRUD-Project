const mongoose = require('mongoose')
const createServer = require('./server')
const User = require('./model')
const supertest = require("supertest");

beforeEach(done => {
    const mongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    mongoose.connect("mongodb://localhost:27017/test", mongoOptions, () => done())
})

afterEach(done => {
    mongoose.connection.db.dropDatabase().then(() => {
        mongoose.connection.close(() => done())
    })
})

const app = createServer()


test('GET api/users', async () => {
    const user = await User.create({
        name: "John Doe",
        age: 42
    })

    await supertest(app)
        .get('/api/users')
        .expect(200)
        .then(response => {
            expect(Array.isArray(response.body)).toBeTruthy()
            expect(response.body.length).toEqual(1)

            const body = response.body[0]
            expect(body._id).toBe(user.id)
            expect(body.name).toBe(user.name)
            expect(body.age).toBe(user.age)
        })
})

test('GET api/users/:id', async () => {
    const user = await User.create({
        name: "John Doe",
        age: 42
    })

    await supertest(app)
        .get('/api/users/' + user.id)
        .expect(200)
        .then(response => {
            const body = response.body

            expect(body._id).toBe(user.id)
            expect(body.name).toBe(user.name)
            expect(body.age).toBe(user.age)
        })
})

async function verifyChange(response, data) {
    expect(response.body.name).toBe(data.name)
    expect(response.body.age).toBe(data.age)

    const user = await User.findOne({ _id: response.body._id })
    expect(user).toBeTruthy()
    expect(user.title).toBe(data.title)
    expect(user.content).toBe(data.content)
}

test('POST api/users/', async () => {
    const data = {
        name: "John Doe",
        age: 42
    }

    await supertest(app)
        .post('/api/users')
        .send(data)
        .expect(200)
        .then(async response => {
            expect(response.body._id).toBeTruthy()
            await verifyChange(response, data)
        })
})

test("PATCH /api/users/:id", async () => {
    const user = await User.create({
        name: "John Doe",
        age: 42
    })

    const data = {
        name: "Mary Jane",
        age: 24
    }

    await supertest(app)
        .patch("/api/users/" + user.id)
        .send(data)
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body._id).toBe(user.id)
            await verifyChange(response, data)
        })
})

test("DELETE /api/users/:id", async () => {
    const user = await User.create({
        name: "John Doe",
        age: 42
    })

    await supertest(app)
        .delete("/api/users/" + user.id)
        .expect(204)
        .then(async () => {
            expect(await User.findOne({ _id: user.id })).toBeFalsy()
        })
})
