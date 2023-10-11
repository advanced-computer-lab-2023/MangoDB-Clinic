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
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    patient: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Patient'
      },
      name: {
        type: String,
        required: true,
      }
    }
  }]

},
  {
    timestamps: true
  })

module.exports = mongoose.model('Doctor', doctorSchema)