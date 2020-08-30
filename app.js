const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose
    .connect("mongodb://localhost:27017/db3", mongoOptions)
    .then(() => {
        const app = express()
        app.use(express.json())
        app.use('/api', routes)

        app.listen(5000, () => {
          console.log("Server has started!")
        })
    })