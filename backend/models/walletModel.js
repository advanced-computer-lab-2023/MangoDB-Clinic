const mongoose = require('mongoose');

const walletSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    transactions: [
        {
            type: {
                type: String,
                enum: ['credit', 'debit'],
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Wallet', walletSchema);
