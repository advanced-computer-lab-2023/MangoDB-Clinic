const mongoose = require('mongoose')
const patientdb = require('./patientSchema')
const doctordb = require('./doctorSchema')
const appointmentSchema = mongoose.Schema({
    
    patientID: {
        type: Number,
        required: true,
      },
      doctorID: {
        type: Number,
        required: true,
      }
    
    },

{
    timestamps: true
})


module.exports = mongoose.model('Doctor', doctorSchema)

