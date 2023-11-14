const express = require("express");
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');
const Appointment = require('../models/appointmentModel');

router.post('/create-checkout-session/:id', async (req, res) => {
    try {
        // const storeItems = new Map([
        //     [1, { priceInCents: 10000, name: "Learn React Today" }], // priceInSharks = pounds * 100
        //     [2, { priceInCents: 20000, name: "Learn CSS Today" }],
        // ])

        // START OF PASTE
        // appointment 
        const appointmentId = req.params.id;
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        //patient
        const patientId = appointment.patientId; 
          
        if (!patientId) {
            return res.status(404).json({ error: 'Patient ID not found for the appointment' });
        }
          
        // Retrieve the patient from the database and populate the healthPackage field
        const patient = await Patient.findById(patientId).populate('healthPackage');
        // const patientName = patient.firstName;
          
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        //dr
        const doctorId = appointment.doctorId; 
          
        if (!doctorId) {
            return res.status(404).json({ error: 'doctor ID not found for the appointment' });
        }
        const doctor = await Doctor.findById(doctorId);
          
        if (!doctor) {
            throw new Error('Doctor not found');
        }
          
        // Extract the hourly rate from the doctor data
        const hourlyRate = doctor.hourlyRate;
          
        // Retrieve the package type from the associated healthPackage
        const packageType = patient.healthPackage ? patient.healthPackage.name : null;
          
        // if (!packageType) {
        //     return res.status(404).json({ error: 'Package not found for the patient' });
        // }
          
        // Initialize discount values
        let doctorSessionDiscount = 0;
        
          
        // Calculate discounts based on the packageType
        // switch (patient.healthPackage.name) {
        switch (packageType) {
            case 'Silver':
                doctorSessionDiscount = 0.4; break;
          
            case 'Gold':
                doctorSessionDiscount = 0.6; break;
          
            case 'Platinum':
                doctorSessionDiscount = 0.8; break;
          
            default:
                // Handle the case where an invalid package type is provided
                // console.error('Invalid package type');
                // return res.status(400).json({ error: 'Invalid package type' });
                doctorSessionDiscount = 0;
        }
          
              
        const paymentAmount = (hourlyRate * 1.1) - (hourlyRate * doctorSessionDiscount);

        const storeItems = new Map([
            [1, { priceInCents: paymentAmount * 100, name: `Appointment for ${ patient.firstName } - Dr. ${ doctor.firstName }` }], // priceInSharks = pounds * 100
           
        ])
        // END OF PASTE



        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id);

                if (!storeItem) {
                    throw new Error("Item does not exists");
                }

                return {
                    price_data: {
                        currency: 'egp',
                        product_data: {
                            name: storeItem.name,
                        },
                        unit_amount: storeItem.priceInCents,
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        res.json({ url: session.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/create-checkout-session-packages/:id', async (req, res) => {
    try {
        const packageType = req.params.id;
        let paymentAmount = 0;
        
        switch (packageType) {
            case 'Silver':
                paymentAmount = 3600; break;
          
            case 'Gold':
                paymentAmount = 6000; break;
          
            case 'Platinum':
                paymentAmount = 9000; break;
          
            default:
                paymentAmount = 0;
        }
          
              
        // const paymentAmount = (hourlyRate * 1.1) - (hourlyRate * doctorSessionDiscount);

        const storeItems = new Map([
            [1, { priceInCents: paymentAmount * 100, name: `${ packageType } Health Package` }], // priceInSharks = pounds * 100
           
        ])
        // END OF PASTE



        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id);

                if (!storeItem) {
                    throw new Error("Item does not exists");
                }

                return {
                    price_data: {
                        currency: 'egp',
                        product_data: {
                            name: storeItem.name,
                        },
                        unit_amount: storeItem.priceInCents,
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        res.json({ url: session.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// app.post("/create-checkout-session", async (req, res) => {
//     try {
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         mode: "payment",
//         line_items: req.body.items.map(item => {
//           const storeItem = storeItems.get(item.id);
  
//           if (!storeItem) {
//             // throw new Error(Store item not found for id: ${item.id});
//             throw new Error('blalblabla')
//           }
//            return {
//             price_data: {
//               currency: "usd",
//               product_data: {
//                 name: storeItem.name,
//               },
//               unit_amount: storeItem.priceInCents,
//             },
//             quantity: item.quantity,
//           };
//         }),
//         success_url:'http://localhost:3000/success',
//         cancel_url:'http://localhost:3000/cancel',
//       });
  
//       res.json({ url: session.url });
//     } catch (e) {
//       res.status(500).json({ error: e.message });
//     }
// });

module.exports = router;