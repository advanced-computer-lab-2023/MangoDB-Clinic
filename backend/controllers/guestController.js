const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Patient = require('../models/patientModel')
const Doctor = require('../models/doctorModel')


const registerUser = async (req, res, model, fields) => {
    const data = req.body;
    for (const field of fields) {
        if (!data[field]) {
            return res.status(400).json({ message: 'Fill all fields' });
        }
    }

    const userExists = await model.findOne({ username: data.username });
    if (userExists)
        return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await model.create({
        ...data,
        password: hashedPassword,
    });

    if (user) {
        return res.status(201).json({
            _id: user._id,
            username: user.username,
            name: user.name,
            token: genToken(user._id),
        });
    } else {
        return res.status(400).json({ error: 'Error occurred' });
    }
};

const registerAsPatient = asyncHandler(async (req, res) => {
    await registerUser(req, res, Patient, ['username', 'name', 'email', 'password', 'dob', 'mobile', 'emergency']);
});

const registerAsDoctor = asyncHandler(async (req, res) => {
    await registerUser(req, res, Doctor, ['username', 'name', 'email', 'password', 'dob', 'rate', 'affiliation', 'education']);
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




