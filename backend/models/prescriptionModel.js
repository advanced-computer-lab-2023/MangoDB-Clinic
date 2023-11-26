const mongoose = require('mongoose')
const Doctor = require('../models/doctorModel')

const prescriptionSchema = mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    medications: [
        {
            medicationName: {
                type: String,
            },
            frequency: {
                type: String,
            }
        }
    ],
    date: {
        type: Date,
        required: true
    },
    filled: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model('Prescription', prescriptionSchema)