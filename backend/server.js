const express = require('express')
const colors = require('colors')
require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const guestRoutes = require('./routes/guestRoutes')
const connectDB = require('./config/db')
const port = process.env.PORT
var path = require('path');

connectDB()

const app = express()


//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    console.log(req.path, res.method);
    next()
})

//Routes
app.use('/', require('./routes/guestRoutes'))
app.use('/admin', require('./routes/adminRoutes'))
app.use('/patient',require('./routes/patientRoutes'))
app.use('/doctor', require('./routes/doctorRoutes'))


app.use(errorHandler);

app.listen(port, () => console.log(`Server Started On Port ${port}...`.green.bold))