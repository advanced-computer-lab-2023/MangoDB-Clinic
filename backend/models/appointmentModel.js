const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({

  doctorId: {
    type :mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Doctor',
  },
  patientId: {
    type :mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Patient',
  },
    doctorName: {
      type: String,
      required:true,
    },
    patientName: {
      type: String,
      required:true,
    }
    
}, 
{
    timestamps: true,
});

module.exports = mongoose.model('Appointment', appointmentSchema);