const asyncHandler = require('express-async-handler')
const Doctor = require('../models/doctorModel')
const bcrypt = require('bcryptjs')

const emailValidator = function (email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
}

// @desc Register doctor
// @route POST /register-doctor
// @access Public
const registerDoctor = asyncHandler( async (req, res) => {
    const {
        username,
        email,
        password,
        firstName,
        lastName,
        dob,
        affiliation,
        hourlyRate,
        speciality,
        educationalBackground
    } = req.body

    if (!username ||
        !email ||
        !password ||
        !firstName ||
        !lastName ||
        !dob ||
        !affiliation ||
        !hourlyRate ||
        !speciality ||
        !educationalBackground
    ) {
        res.status(400)
        throw new Error("Please Enter All Fields")
    }

    if (!emailValidator(email)){
        res.status(400)
        throw new Error("Invalid Email Format")
    }

    const salt = await bcrypt.genSalt(10)
    hashedPassword = await bcrypt.hash(password, salt)

    const doctor = await Doctor.create({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        dob,
        state: 'inactive',
        affiliation,
        hourlyRate,
        speciality,
        educationalBackground
    })

    if (doctor){
        res.status(200).json({message: "Request Submitted Successfuly! Pending Approval..."})
    } else {
        res.status(400)
        throw new Error("Something Went Wrong, Please Try Again")
    }

})

module.exports = {
    registerDoctor
}