const mongoose = require('mongoose')

const emailValidator = function (email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
}

const phoneNumberValidator = function (phoneNumber) {
    const numberRegex = /^(\+20|0020)?(10|11|12|15)[0-9]{8}$/
    return numberRegex.test(phoneNumber)
}

const emergencyContactSchema = mongoose.Schema({
    name: {
            type: String,
            required: [true, "Please Enter The Name of your Emergency Contact"]
        },
    mobileNumber: {
        type: String,
        validate: [phoneNumberValidator, 'Please Enter A Correct Mobile Number'],
        required: [true, "Please Enter Your Emergency Contacts Mobile Number"],
        unique: true
    }
})

const patientSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please Enter a Username'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Please Enter Your Full Name']
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email Address"],
        unique: true,
        validate: [emailValidator, 'Invalid email address format'],
    },
    password: {
        type: String,
        required: [true, "Please Enter a Password"]
    },
    dob: {
        type: Date,
        required: [true, "Please Enter Your Date of Birth"]
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: [true, "Please Enter Your Gender"]
    },
    mobileNumber: {
        type: String,
        validate: [phoneNumberValidator, 'Please Enter A Correct Mobile Number'],
        required: [true, "Please Enter Your Mobile Number"],
        unique: true
    },
    emergencyContact: [emergencyContactSchema]
},
{
    timestamps: true
})

module.exports = mongoose.model('Patient', patientSchema)