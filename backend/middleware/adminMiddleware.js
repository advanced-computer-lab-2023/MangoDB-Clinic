const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')

const protectAdmin = asyncHandler( async (req,res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            const admin = await Admin.findById(decoded.id)

            if(!admin){
                res.status(401)
                throw new Error('Unauthorized')
            }

            req.user = admin

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

module.exports = {protectAdmin}