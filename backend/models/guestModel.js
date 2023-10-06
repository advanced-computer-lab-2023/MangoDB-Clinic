const mongoose = require('mongoose')

const guestSchema = mongoose.Schema({
    
},
{
    timestamps: true
})

module.exports = mongoose.model('Guest', guestSchema)