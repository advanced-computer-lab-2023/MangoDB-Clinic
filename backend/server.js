const express = require('express');
const colors = require('colors');
const mongoose = require('mongoose');
require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const guestRoutes = require('./routes/guestRoutes')
const connectDB = require('./config/db');
const port = process.env.PORT || 4000;
var path = require('path');
const cors = require('cors');
const { selectPatient } = require('./controllers/doctorController');

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

connectDB()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Learn React Today" }],
    [2, { priceInCents: 20000, name: "Learn CSS Today" }],
  ])
  


app.get('/doctorHomePage', (req, res) => {
    res.render('doctorHomePage'); 
});

app.get('/viewAllPatients', (req, res) => {
    res.render('viewAllPatients'); 
});

app.get('/searchByName', (req, res) => {
    res.render('searchByName', { patients: [] }); 
});
app.get('/selectedPatient/:id', async (req, res) => {
    try {
        const patientId = req.params.id;
        const patient = await selectPatient(patientId);
        if (!patient) {
            console.error('Patient not found for ID:', patientId);
        }
        res.render('selectedPatient', { patient });
    } catch (error) {
        console.error('Error retrieving patient:', error);

        res.status(500).json({ error: 'Error retrieving patient' });
    }
});



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/', require('./routes/guestRoutes'));
app.use('/admin', require('./routes/adminRoutes'));
app.use('/patient', require('./routes/patientRoutes'));
app.use('/doctor', require('./routes/doctorRoutes'))
app.use('/uploads/', express.static('uploads'));




app.post("/create-checkout-session", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map(item => {
          const storeItem = storeItems.get(item.id)
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: storeItem.name,
              },
              unit_amount: storeItem.priceInCents,
            },
            quantity: item.quantity,
          }
        }),
        success_url: 'localhost:3000/success',
        // cancel_url:  'localhost:3000/cancel',
      })
      res.json({ url: session.url })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })


app.use(errorHandler);

app.listen(port, () => console.log(`Server Started On Port ${port}...`.green.bold))