const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  messageText: { type: String, required: true },
  timeDate: { type: Date, default: Date.now },
  senderRole: {
    type: String,
    enum: ['doctor', 'patient', 'pharmacist'],
    required: true,
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;