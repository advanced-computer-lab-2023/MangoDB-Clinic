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

            // Get admin from token without password
            req.user = await Admin.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Unauthorized')
        }
    }

    if (!token){
        res.status(401)
        throw new Error('No Token')
    }
})

const checkAdminPermission = (req, res, next) => {
    if (req.user && req.user.role == 'admin'){
        next()
    } else {
        res.status(403).json({message: 'Permission Denied'})
    }
}

module.exports = {checkAdminPermission, protectAdmin}