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
  doctorName: {
    type: String,
    
  },
  patientName: {
    type: String,
   
  }

},
  {
    timestamps: true,
  });

module.exports = mongoose.model('Appointment', appointmentSchema);
