const mongoose = require("mongoose");
const User = require('./userModel');


const patientSchema = mongoose.Schema(
  {
    nationalID: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    passwordResetOTP: {
        type: String,
        default: ''
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    emergencyContact: {
      type: {
        name: {
          type: String,
          required: true,
        },
        mobile: {
          type: String,
          required: true,
          unique: true,
        },
      },
    },
    family: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          nationalID: {
            type: String,
            required: true,
            sparse: true,
            unique: true,
          },
          age: {
            type: Number,
            required: true,
          },
          gender: {
            type: String,
            required: true,
          },
          relation: {
            type: String,
            required: true,
            enum: ["wife", "husband", "child"],
          },
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
          },
        },
      ],
      default: [],
    },
    healthPackage: {
      packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Packages",
        default: null,
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
      }
    },
    healthRecord: {
      content: {
        type: String,
      },
      files: [
        {
          name: {
            type: String,
          },
          file: {
            type: String,
          },
        },
      ],
    },
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
  {
    timestamps: true,
  }
);

const Patient = User.discriminator("Patient", patientSchema);
module.exports = Patient;
