const mongoose = require('mongoose')
const patientdb = require('./patientSchema')
const doctorSchema = mongoose.Schema({

    First_Name: {
        type: String,
        required: true,
      },
      Last_Name: {
        type: String,
        required: true,
      },
      Email: {
        type: String,
        required: true,
        unique: true
      },
      Age: {
        type: Number,
        required: true,
      },
      Username: {
        type: String,
        required: true,
        unique: true
      },
      Password: {
        type: String,
        required: true,
      },
      Affiliation: {
        type: String,
        required: true,
      },
      Hourly_rate: {
        type: Number,
      },
    Wallet_amount: {
        type : Number,
        
    },
      Avialable_time_slots: {
        type: timestamps,
        
      },
    Appoitments: [{
        date: {
            type:Date ,
            required: true,
        },
        status:{
            type:String,
            required: true,

        },
        pateint_id :{
            type :Number,
            required:true
        }

    }]
},
{
    timestamps: true
})

module.exports = mongoose.model('Doctor', doctorSchema)
