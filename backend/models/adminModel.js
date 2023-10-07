const mongoose = require('mongoose')

const emailValidator = function (email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
}

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Enter a Username"],
         unique: true
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        validate: [emailValidator, "Invalid email address format"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Enter a Password"]
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
    },
    permissions: [{
        type: String,
        enum: ['superadmin', 'manager', 'basic'],
        default: 'basic'
    }]
},
{
    timestamps: true
})

module.exports = mongoose.model('Admin', adminSchema)