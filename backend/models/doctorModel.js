const mongoose = require('mongoose')
const User = require('./userModel')

const doctorSchema = mongoose.Schema({
    affiliation: {
        type: String,
        required: true
    },
    hourlyRate: {
        type: Number,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    educationalBackground: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'doctor'
    },
    state: {
        type: String,
        enum: ['active', 'inactive']
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }]

},)

const Doctor = User.discriminator('Doctor', doctorSchema)

module.exports = Doctor