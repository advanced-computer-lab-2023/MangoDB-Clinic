const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");
const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const Wallet = require("../models/walletModel");
const Pharmacist = require("../models/pharmacistModel");

const port = process.env.PORT;

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
		if (usernameExists) {
			res.status(400);
			throw new Error("Username already exists");
		}
		// .json({ error: "Username already exists" });

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

		if (userType === "doctor" && req.files) {
			for (const file of req.files) {
				const url = `http://localhost:${port}/uploads/${file.originalname}`;
				const document = {
					name: file.originalname,
					file: url,
				};
				user.documents.push(document);
			}
			await user.save();
		}

		const wallet = await Wallet.create({ user: user._id });

		user.wallet = wallet._id;
		await user.save();

		return res.status(201).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
		});
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const registerAsPatient = asyncHandler(async (req, res) => {
	console.log(req.body);
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

JWT_SECRET = "abc123";
const login = asyncHandler(async (req, res) => {
	const { username, password } = req.body;

	const user = await User.findOne({ username });
	if (!user) res.status(404).json({ message: "User not found" });

	const correctPassword = await bcrypt.compare(password, user.password);
	if (!correctPassword)
		res.status(400).json({ message: "Password is incorrect" });

	if (user.accountStatus === "inactive") {
		res.status(400);
		throw new Error("Account has not been activated yet.");
	}

	res.status(200).json({
		_id: user.id,
		type: user.__t,
		accountStatus: user.accountStatus,
		username: user.username,
		token: genToken(user._id),
	});
});

const getType = asyncHandler(async (req, res) => {
	const user = req.user;
	res.status(200).json({ type: user.__t });
});

const genToken = (id) => {
	return jwt.sign({ id }, JWT_SECRET);
};

const createPharmacist = async (req, res) => {
	try {
	  const {
		username,
		email,
		password,
		firstName,
		lastName,
		dob,
		userType,
		rate,
		affiliation,
		education,
		status,
		documents,
	  } = req.body;
  
	  const newPharmacist = new Pharmacist({
		username,
		email,
		password,
		firstName,
		lastName,
		dob,
		userType,
		rate,
		affiliation,
		education,
		status,
		documents,
	  });
  
	  await newPharmacist.save();
  
	  res.status(201).json({
		success: true,
		message: 'Pharmacist created successfully',
		data: newPharmacist,
	  });
	} catch (error) {
	  console.error('Error creating pharmacist:', error);
	  res.status(500).json({
		success: false,
		message: 'Internal server error',
		error: error.message,
	  });
	}
  };

module.exports = {
	registerAsPatient,
	registerAsDoctor,
	login,
	renderPatientRegistration,
	renderDoctorRegistration,
	getType,
	createPharmacist
};
