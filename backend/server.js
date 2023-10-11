const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT

connectDB()

const app = express()


//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use((req, res, next) => {
    console.log(req.path, res.method);
    next()
})

//Routes
app.use('/', require('./routes/guestRoutes'))
app.use('/admin', require('./routes/adminRoutes'))
app.use('/patient',require('./routes/patientRoutes'))
app.use('/doctor', require('./routes/doctorRoutes'))
app.use(errorHandler)

app.listen(port, () => console.log(`Server Started On Port ${port}...`.green.bold))
