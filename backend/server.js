const express = require('express')
const colors = require('colors')
require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const guestRoutes = require('./routes/guestRoutes')
const connectDB = require('./config/db')
const port = process.env.PORT

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', guestRoutes)

app.use(errorHandler)

app.listen(port, () => console.log(`Server Started On Port ${port}...`.green.bold))