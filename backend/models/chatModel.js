const mongoose = require('mongoose');
const Message = require('./messageModel'); // Import the Message model

const chatSchema = new mongoose.Schema({
  userId1: { type: String, required: true },
  userId2: { type: String, required: true },
  messages: [Message.schema], // Array of messages using the Message schema
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;