const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");

const renderPatientRegistration = (req, res) => {
	res.status(200).render("patientRegistration");
};

const renderDoctorRegistration = (req, res) => {
	res.status(200).render("doctorRegistration");
};

const registerUser = async (req, res, model, userType, fields) => {
	const data = req.body;
	for (const field of fields) {
		if (!data[field]) {
			return res.status(400).json({ message: "Fill all fields" });
		}
	}

	try {
		const usernameExists = await User.findOne({ username: data.username });
		if (usernameExists)
			return res.status(400).json({ error: "Username already exists" });

		const emailExists = await User.findOne({ email: data.email });
		if (emailExists)
			return res.status(400).json({ error: "Email already exists" });

		const hashedPassword = await bcrypt.hash(data.password, 10);

		const user = await model.create({
			...data,
			password: hashedPassword,
			userType: userType,
			accountStatus: userType === "patient" ? "active" : "inactive",
		});

		return res.status(201).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			token: genToken(user._id),
		});
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const registerAsPatient = asyncHandler(async (req, res) => {
	await registerUser(req, res, Patient, "patient", [
		"mobile",
		"emergencyContact",
	]);
});

const registerAsDoctor = asyncHandler(async (req, res) => {
	await registerUser(req, res, Doctor, "doctor", [
		"affiliation",
		"hourlyRate",
		"speciality",
		"educationalBackground",
	]);
});

const login = asyncHandler(async (req, res) => {
	const { username, password } = req.body;

	const user = await User.findOne({ username });
	if (!user) res.status(404).json({ message: "User not found" });

	const correctPassword = await bcrypt.compare(password, user.password);
	if (!correctPassword)
		res.status(400).json({ message: "Password is incorrect" });

	res.status(200).json({
		_id: user.id,
		type: user.__t,
		username: user.username,
		token: genToken(user._id),
	});
});

const genToken = (id) => {
	return jwt.sign({ id }, process.env.SECRET);
};

module.exports = {
	registerAsPatient,
	registerAsDoctor,
	login,
	renderPatientRegistration,
	renderDoctorRegistration,
};
