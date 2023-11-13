const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Patient = require('../models/patientModel')

const protectPatient = asyncHandler( async (req,res, next) => {
    const token = req.cookies.jwt;
    
    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            // console.log('You are not logged in.');
            // res send status 401 you are not logged in
            res.status(401).json({message:"You are not logged in."})
            // res.redirect('/login');
        } else {
            req.patientId = decodedToken.id;
            console.log(req.patientId);
            next();
        }
        });
    } else {
        res.status(401).json({message:"You are not logged in."})
    }
    
    // let token

    // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    //     try {
    //         // Get token from header
    //         token = req.headers.authorization.split(' ')[1]

    //         // Verify token
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET)

    //         const patient = await Patient.findById(decoded.id)

    //         if(!patient){
    //             res.status(401)
    //             throw new Error('Unauthorized')
    //         }

    //         req.user = patient

    //         next()
    //     } catch (error) {
    //         console.log(error)
    //         res.status(401)
    //         throw new Error('Error: Unauthorized')
    //     }
    // }

    // if (!token){
    //     res.status(401)
    //     throw new Error('No Token')
    // }
})

module.exports = {protectPatient}