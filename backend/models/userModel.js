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
        enum: ['patient', 'doctor', 'admin'],
        required: true
    },
    accountStatus: {
        type: String,
        enum: ['active', 'inactive'],
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)