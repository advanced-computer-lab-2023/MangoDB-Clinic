const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true
    },
    password: {
        type: String,
    },
    firstName: {
        type: String,
        required: [true, "Please Enter Your First Name"]
    },
    lastName: {
        type: String,
        required: [true, "Please Enter Your Last Name"]
    },
    role: {
        type: String,
        default: "admin"
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Admin', adminSchema)