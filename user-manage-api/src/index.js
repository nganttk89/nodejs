const express = require('express')

const app = express()
const bodyParser = require('body-parser')

const port = 3000

const userRoutes = require('./routes/userRoutes')

app.use(express.json())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(userRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})