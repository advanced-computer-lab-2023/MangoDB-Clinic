const mongoose = require('mongoose')

const patientSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    emergency: {
        type:
          {
             name: {
                type: String,
                required: true
            },
            mobile: {
                type: String,
                required: true,
                unique: true
            }
          }
    },
    family: {
        type: [
            {
                name: {
                    type: String,
                    required: true
                },
                nationalID: {
                    type: String,
                    required: true,
                    unique: true
                },
                age: {
                    type: Number,
                    required: true
                },
                gender: {
                    type: String,
                    required: true
                },
                relation: {
                    type: String,
                    required: true,
                    enum: ['wife', 'husband', 'child']
                }
            }
        ],
        default: []
    }

},
{
    timestamps: true
})

module.exports = mongoose.model('Patient', patientSchema)