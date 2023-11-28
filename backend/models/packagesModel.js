const mongoose = require("mongoose");

const packagesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  doctorSessionDiscount: {
    type: Number,
    required: true,
  },
  medicineDiscount: {
    type: Number,
    required: true,
  },
  familyDiscount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'Unsubscribed'
  },
  renewalDate: {
    type: Date,
    default: null
  },
  cancellationDate: {
    type: Date,
    default: null
  },
});

module.exports = mongoose.model("Packages", packagesSchema);
