const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		dob: {
			type: Date,
			required: true,
		},
		userType: {
			type: String,
			enum: ["patient", "doctor", "Pharmacist"],
		},
		accountStatus: {
			type: String,
			enum: ["active", "inactive", "pending"],
			default: "inactive",
		},
		wallet: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Wallet",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("User", userSchema);
