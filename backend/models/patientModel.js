const mongoose = require('mongoose')

const patientSchema = mongoose.Schema({

},
{
    timestamps: true
})

module.exports = mongoose.model('Patient', patientSchema)