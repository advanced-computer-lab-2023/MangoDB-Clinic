const mongoose = require("mongoose");
const User = require("./userModel");
const Schema = mongoose.Schema;

const pharmacistSchema = new Schema(
  {
    rate: {
      type: Number,
      required: true,
    },
    passwordResetOTP: {
      type: String,
      default: "",
    },
    affiliation: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["hired", "pending", "rejected"],
      default: "pending",
    },
    documents: [
      {
        name: {
          type: String,
          required: true,
        },
        file: {
          type: String,
          required: true,
        },
      },
    ],
    notifications: [
      {
        title: {
            type: String,
            required: true
        },
        body: {
          type: String,
          required: true
        },
        seen: {
          type: Boolean,
          default: false
        }
      }
    ],
  },
  { timestamps: true }
);

// const pharmacistModel = mongoose.model('Pharmacist', pharmacistSchema);

const Pharmacist = User.discriminator("Pharmacist", pharmacistSchema);

module.exports = Pharmacist;