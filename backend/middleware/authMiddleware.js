const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Patient = require('../models/patientModel')
const Doctor = require('../models/doctorModel')
const User = require('../models/userModel')

const authenticate = asyncHandler(async (req, res, next) => {

    const header = req.headers.authorization
    let token

    if (header && header.startsWith('Bearer')) {
        try {
            token = header.split(' ')[1]
            const decoded = jwt.verify(token, process.env.SECRET)

            req.user = await Patient.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            res.status(401).json({ error: 'Not Authorized!' })
        }
    }

    if (!token)
        res.status(401).json({ error: 'Authorization Error. No Token!' })

})

module.exports = authenticate