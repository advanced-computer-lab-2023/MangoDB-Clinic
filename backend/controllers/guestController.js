const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Patient = require('../models/patientModel')
const Doctor = require('../models/doctorModel')
const User = require('../models/userModel')


const registerUser = async (req, res, model, userType, fields) => {
    const data = req.body;
    for (const field of fields) {
        if (!data[field]) {
            return res.status(400).json({ message: 'Fill all fields' });
        }
    }

    const userExists = await User.findOne({ username: data.username });
    if (userExists)
        return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
        username: data.username,
        password: hashedPassword,
        userType: userType
    })

    if (user) {
        const user2 = await model.create({...data, user: user._id})
        return res.status(201).json({
            _id: user._id,
            username: user.username,
            name: user2.name,
            token: genToken(user._id),
        });
    } else {
        return res.status(400).json({ error: 'Error occurred' });
    }
};

const registerAsPatient = asyncHandler(async (req, res) => {
    await registerUser(req, res, Patient, 'patient', ['name', 'email', 'dob', 'mobile', 'emergency', 'family']);
});

const registerAsDoctor = asyncHandler(async (req, res) => {
    await registerUser(req, res, Doctor, 'doctor', ['name', 'email', 'dob', 'rate', 'affiliation', 'education']);
});

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    const user = await Patient.findOne({username})
    if(!user)
        res.status(404).json({ message: 'User not found'})


    const correctPassword = await bcrypt.compare(password, user.password)
    if(!correctPassword)
        res.status(400).json({ message: 'Password is incorrect' })

    res.status(200).json({
        _id: user.id,
        username: user.username,
        token: genToken(user._id),
    })
})

const genToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET)
}


module.exports = {
    registerAsPatient,
    registerAsDoctor,
    login
}




