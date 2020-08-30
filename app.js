const mongoose = require('mongoose')
const createSever = require('./server')

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose
    .connect("mongodb://localhost:27017/db4", mongoOptions)
    .then(() => {
        const app = createSever()

        app.listen(5000, () => {
          console.log("Server has started!")
        })
    })
