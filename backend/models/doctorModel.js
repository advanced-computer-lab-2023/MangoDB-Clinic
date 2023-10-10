const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true, 
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true, 
        unique: true, 
    },
    dob: {
        type: Date,
        required: true, 
    },
    username: {
        type: String,
        required: true, 
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    hourlyRate: {
      type : Number,
    },
    affiliation: {
      type: String
    },
    walletAmount: {
      type: Number
    },
    specialty: {
      type: String,
    },
    educationalBackground: {
      type: String,

    },
    status: {
      type: String,
      enum: ['active', 'inactive']
    },
    appointments: [{
      date: {
          type: Date ,
          required: true,
      },
      status:{
          type:String,
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
          },
      },
  }]

},
 {
    timestamps: true,
});

module.exports = mongoose.model('Doctor', doctorSchema);