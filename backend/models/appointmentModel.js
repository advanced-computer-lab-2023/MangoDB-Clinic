const mongoose = require('mongoose')
const Patient = require('./patientModel')
const Doctor = require('./doctorModel')

const appointmentSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Patient'
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor'
    },
})

module.exports = mongoose.model('Appointment', appointmentSchema)