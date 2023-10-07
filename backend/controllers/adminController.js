const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Admin = require('../models/adminModel')
const Doctor = require('../models/doctorModel')
const Patient = require('../models/patientModel')

const generateRandomUsername = (maxLength = 10) => {
    const prefix = 'admin-'
    const suffix = Math.random().toString(36).substring(2, 2 + (maxLength - prefix.length))
    return prefix + suffix
}

const generateRandomPassword = (length = 10) => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercaseChars = 'abcdefghijklmnopqrtuvwxyz'
    const specialChars = '!@#$%^&*-_'
    const digitChars = '1234567890'

    const characters = [
        uppercaseChars,
        lowercaseChars,
        specialChars,
        digitChars
    ]

    let password = ''
    characters.forEach((charSet) => {
        const randomChar = charSet[Math.floor(Math.random() * charSet.length)]
        password += randomChar
    })

    const remainingLength = length - password.length
    for (let i = 0 ; i < remainingLength ; i++){
        const randomCharSet = characters[Math.floor(Math.random() * characters.length)]
        const randomChar = randomCharSet[Math.floor(Math.random() * randomCharSet.length)]
        password += randomChar
    }

    let j
    password = password.split('')
    for (let i = password.length - 1 ; i > 0 ; i--){
        j = Math.floor(Math.random() * (i + 1))
        [password[i], password[j]] = [password[j], password[i]]
    }
    password = password.join('')

    return password
}

const emailValidator = function (email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
}

// @desc Create new admin
// @route POST /admin/create-admin
// @access Private
const createAdmin = asyncHandler( async (req, res) => {
    const {email, firstName, lastName} = req.body

    if (!email || !firstName || !lastName){
        res.status(400)
        throw new Error("Please Enter All Fields")
    }

    if (!emailValidator(email)){
        res.status(400)
        throw new Error("Invalid Email Format")
    }

    // Check if admin exists
    const adminExists = await Admin.findOne({email})

    if(adminExists){
        res.status(400)
        throw new Error("An Admin With This Email Already Exists")
    }

    const randomUsername = generateRandomUsername()
    const password = generateRandomPassword()

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const admin = await Admin.create({
        username: randomUsername,
        email,
        password: hashedPassword,
        firstName,
        lastName,
    })

    if (admin){
        res.status(201).json({
            _id: admin.id,
            name: admin.firstName + ' ' + admin.lastName,
            username: randomUsername,
            password: password,
            token: generateToken(admin._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid Data")
    }
})

// @desc Login admin
// @route POST /admin/login
// @access Public
const loginAdmin = asyncHandler( async (req, res) => {
    const {username, password} = req.body

    if (!username){
        res.status(400)
        throw new Error("Please Enter Your Username")
    } else if (!password) {
        res.status(400)
        throw new Error("Enter Your Password")
    }

    // Check for username
    const admin = await Admin.findOne({username})

    if (admin && (await bcrypt.compare(password, admin.password))){
        res.status(200).json({
            message: "Successful Login",
            _id: admin.id,
            username: admin.username,
            name: admin.firstName + admin.lastName,
            email: admin.email,
            token: generateToken(admin._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid Credentials")
    }
})

// @desc Remove doctor from system
// @route DELETE /admin/remove-doctor/:id
// @access Public
const removeDoctor = asyncHandler( async (req, res) => {
    const doctor = await Doctor.findById(req.params.id)

    if (!doctor){
        res.status(400)
        throw new Error("Not Found")
    }

    await Doctor.findByIdAndDelete(req.params.id)

    res.status(200).json({message: "Successfuly deleted"})
})

// @desc Remove patient from system
// @route DELETE /admin/remove-patient/:id
// @access Public
const removePatient = asyncHandler( async (req, res) => {
    const patient = await Patient.findById(req.params.id)

    if (!patient){
        res.status(400)
        throw new Error("Not Found")
    }

    await Patient.findByIdAndDelete(req.params.id)

    res.status(200).json({message: "Successfuly deleted"})
})

// @desc Remove admin from system
// @route DELETE /admin/remove-admin/:id
// @access Public
const removeAdmin = asyncHandler( async (req, res) => {
    const admin = await Admin.findById(req.params.id)

    if (!admin){
        res.status(400)
        throw new Error("Not Found")
    }

    await Admin.findByIdAndDelete(req.params.id)

    res.status(200).json({message: "Successfuly deleted"})
})

// @desc Get my (admin) info
// @route GET /admin/my-info
// @access Public
const getMyInfo = asyncHandler( async (req, res) => {
    const admin = await Admin.findById(req.user.id)

    if (!admin){
        res.status(400)
        throw new Error("Admin Does Not Exist")
    }

    res.status(200).json({
        _id: admin.id,
        name: admin.firstName + ' ' + admin.lastName,
        username: admin.username,
        email: admin.email,
        role: admin.role
    })
})


// Generate Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    createAdmin,
    loginAdmin,
    removeDoctor,
    removePatient,
    removeAdmin,
    getMyInfo
}