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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Packages",
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
  },
  {
    timestamps: true,
  }
);

const Patient = User.discriminator("Patient", patientSchema);
module.exports = Patient;
