const mongoose = require('mongoose')
const Doctor = require('../models/doctorModel')

const prescriptionSchema = mongoose.Schema({
    type: [ 
        {
            medicationName: {
                type: String,
                required: true
            },
            frequency: {
                type: String,
                required: true
            },
            filled: {
                type: Boolean,
                default: false,
            },
            date: {
                type: Date,
                required: true
            }
        }
    ],
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }
})

module.exports = mongoose.model('Prescription', prescriptionSchema)