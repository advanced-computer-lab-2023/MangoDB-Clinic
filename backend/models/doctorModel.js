const mongoose = require('mongoose')

const doctorSchema = mongoose.Schema({
    
},
{
    timestamps: true
})

module.exports = mongoose.model('Doctor', doctorSchema)