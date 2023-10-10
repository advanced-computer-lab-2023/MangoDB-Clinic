const mongoose = require('mongoose')
const User = require('./userModel')
const Appointment = require('./appointmentModel')

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
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }]

},
  {
    timestamps: true
  })

const Doctor = User.discriminator('Doctor', doctorSchema)

module.exports = Doctor