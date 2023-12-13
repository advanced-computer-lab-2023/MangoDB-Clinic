const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Doctor = require('../models/doctorModel')
const JWT_SECRET = 'abc123';
const SECRET = 'abc123';
const protectDoctor = asyncHandler( async (req,res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, JWT_SECRET)

            const doctor = await Doctor.findById(decoded.id)

            if(!doctor){
                res.status(401)
                throw new Error('Unauthorized')
            }

            req.user = doctor

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Error: Unauthorized')
        }
    }

    if (!token){
        res.status(401)
        throw new Error('No Token')
    }
})

module.exports = {protectDoctor}