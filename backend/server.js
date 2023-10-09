const express = require('express')
// const colors = require('colors')
require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const guestRoutes = require('./routes/guestRoutes')
const patientRoutes = require('./routes/patientRoutes')
// const connectDB = require('./config/db')
// const port = process.env.PORT

// connectDB()

//express App
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
    console.log(req.path, res.method);
    next()
})

//routes
app.use('/', guestRoutes)
app.use('/patient/', patientRoutes)

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to db and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log( "error in connection", error);
    })



// app.listen(port, () => console.log(`Server Started On Port ${port}...`.green.bold))