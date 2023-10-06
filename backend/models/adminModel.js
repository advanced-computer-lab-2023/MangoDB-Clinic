const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    
},
{
    timestamps: true
})

module.exports = mongoose.model('Admin', adminSchema)