const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['patient', 'doctor', 'admin']
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)