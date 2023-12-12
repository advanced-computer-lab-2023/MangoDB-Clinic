const express = require("express");
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');
const Appointment = require('../models/appointmentModel');
const Prescription = require("../models/prescriptionModel");
const Package = require("../models/packagesModel");
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
    console.log("henanaa");
    try {
        
        const items = req.body.items;
        console.log(items);
        const packageType = req.params.id;
        const package = await Package.findOne({name: packageType + " Package"});
        const packageId = package._id;
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

        console.log(paymentAmount);

        const storeItems = new Map([
            [1, { priceInCents: paymentAmount * 100, name: 'Payment' }], // priceInSharks = pounds * 100
           
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
            success_url: `http://localhost:3000/Success?packageId=${packageId}`,
            cancel_url: 'http://localhost:3000/Cancel',
        });

        res.json({ url: session.url });
    } catch (err) {
        res.status(500).json({ error: err.message, message: "error" });
    }
});
// router.get('/ayhga/:packageName', async (req, res) => {
//     console.log("henanaa");
// });

// router.post('/create-checkout-session-daaaaaaa/:id', async (req, res) => {
//     try {
//         // const {totalPirce }= req.body;
//         const prescriptionId = req.params.id;

//         const prescription = await Appointment.findById(prescriptionId);
//         if (!prescription) {
//             return res.status(404).json({ error: 'prescription not found' });
//         }
//         //patient
//         const patientId = prescription.patientId; 
          
//         if (!patientId) {
//             return res.status(404).json({ error: 'Patient ID not found for the appointment' });
//         }
          
//         // Retrieve the patient from the database and populate the healthPackage field
//         const patient = await Patient.findById(patientId).populate('healthPackage');
//         // const patientName = patient.firstName;
          
//         if (!patient) {
//             return res.status(404).json({ error: 'Patient not found' });
//         }

//         const packageType = patient.healthPackage ? patient.healthPackage.name : null;

//         let discount = 0;
        
//         switch (packageType) {
//             case 'Silver':
//                 discount = 0.2; break;
          
//             case 'Gold':
//                 discount = 0.3; break;
          
//             case 'Platinum':
//                 discount = 0.4; break;
          
//             default:
//                 discount = 0;
//         }
//         const totalPirce=50;
//         const paymentAmount = totalPirce  - totalPirce * discount;
//         const storeItems = new Map([
//             [1, { priceInCents: paymentAmount * 100, name: 'prescription' }], // priceInSharks = pounds * 100
           
//         ])
//         // END OF PASTE

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             mode: 'payment',
//             line_items: req.body.items.map(item => {
//                 const storeItem = storeItems.get(item.id);

//                 if (!storeItem) {
//                     throw new Error("Item does not exists");
//                 }

//                 return {
//                     price_data: {
//                         currency: 'egp',
//                         product_data: {
//                             name: storeItem.name,
//                         },
//                         unit_amount: storeItem.priceInCents,
//                     },
//                     quantity: item.quantity,
//                 };
//             }),
//             success_url: 'http://localhost:3000/successulPackagePayment',
//             cancel_url: 'http://localhost:3000/viewpackages',
//         });

//         res.json({ url: session.url });
//     } catch (err) {
//         // console.log('aaaaaaaa')
//         res.status(500).json({ error: err.message });
//     }
// });
router.post('/create-checkout-session-daaaaaaa/:id', async (req, res) => {
    try {
        const prescriptionId=req.params.id;
       const prescription = await Prescription.findById(prescriptionId);
     
                if (!prescription) {
                    return res.status(404).json({ error: 'prescription not found' });
                }
       const patientId = prescription.patientId; 
       
        if (!patientId) {
            return res.status(404).json({ error: 'Patient ID not found for the appointment' });
        }
       const patient = await Patient.findById(patientId).populate('healthPackage');
        // const patientName = patient.firstName;
          
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        console.log(patient);
        const packageType = patient.healthPackage ? patient.healthPackage.name : null;
        // const packageType = req.params.id;
         let discount = 0;
        
        switch (packageType) {
            case 'Silver':
                discount = 0.2; break;
          
            case 'Gold':
                discount = 0.3; break;
          
            case 'Platinum':
                discount = 0.4; break;
          
            default:
                discount = 0;
        }
        const totalPirce=50;
        const paymentAmount = totalPirce  - totalPirce * discount;
        // const storeItems = new Map([
        //     [1, { priceInCents: paymentAmount * 100, name: 'prescription' }], // priceInSharks = pounds * 100
           
        // ])

        const storeItems = new Map([
            [1, { priceInCents: paymentAmount * 100, name: 'Payment' }], // priceInSharks = pounds * 100
           
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
            success_url: 'http://localhost:3000/Success',
            cancel_url: 'http://localhost:3000/Cancel',
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