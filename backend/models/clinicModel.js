const mongoose = require('mongoose')

const clinicSchema = mongoose.Schema({
    
},
{
    timestamps: true
})

module.exports = mongoose.model('Clinic', clinicSchema)