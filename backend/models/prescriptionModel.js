const mongoose = require('mongoose')
const Doctor = require('../models/doctorModel')

const prescriptionSchema = mongoose.Schema({
    medications: [
        {
            medicationName: {
                type: String,
                required: true
            },
            frequency: {
                type: String,
                required: true
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
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    }
})

module.exports = mongoose.model('Prescription', prescriptionSchema)