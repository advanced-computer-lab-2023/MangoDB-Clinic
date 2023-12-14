const mongoose = require('mongoose');
const User = require('./userModel');

const doctorSchema = mongoose.Schema({
  affiliation: {
    type: String,
    required: true
  },
  passwordResetOTP: {
        type: String,
        default: ''
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
  availableSlots: [
    {
      weekday: {
        type: Number,
        required: true,
        enum: [0, 1, 2, 3, 4, 5, 6]
      },
      startTime: {
        type: Date,
        required: true,
      },
      endTime: {
        type: Date,
        required: true,
      },
    },
  ],
  documents: [
    {
      name: {
        type: String,
        required: true
      },
      file: {
        type: String,
        required: true
      }
    }
  ],
  employmentContract: {
    name: {
      type: String,
      required: false 
    },
    file: {
      type: String,
      required: false 
    }
  },
  notifications: [
    {
      title: {
          type: String,
          required: true
      },
      body: {
        type: String,
        required: true
      },
      seen: {
        type: Boolean,
        default: false
      }
    }
  ],
},
{
  timestamps: true
});

const Doctor = User.discriminator('Doctor', doctorSchema);

module.exports = Doctor;
