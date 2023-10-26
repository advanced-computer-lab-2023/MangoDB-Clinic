const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Doctor',
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient',
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  followUp: {
    type: Boolean,
    default: false
  }

},
  {
    timestamps: true,
  });

appointmentSchema.index({ doctorId: 1, date: 1}, { unique: true });

module.exports = mongoose.model('Appointment', appointmentSchema);

