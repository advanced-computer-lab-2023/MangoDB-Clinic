const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorModel");
const Patient = require("../models/patientModel.js");
const Appointment = require("../models/appointmentModel");
const Prescription = require("../models/prescriptionModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");
// const Pharmacist = require("../models/pharmacistModel");

function generateOTP() {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

const getMyInfo = asyncHandler(async (req, res) => {
	const doctor = await Doctor.findById(req.user.id);

	if (!doctor) {
		res.status(400);
		throw new Error("Doctor Does Not Exist");
	}

	res.status(200).json({
		_id: doctor.id,
		name: doctor.firstName + " " + doctor.lastName,
		username: doctor.username,
		email: doctor.email,
	});
});

// @desc Change Password
// @route POST /doctor/change-password
// @access Private
const changePassword = asyncHandler(async (req, res) => {
	try {
		const doctor = req.user;
		const oldPassword = req.body.oldPassword;
		const newPassword = req.body.newPassword;
		const confirmPassword = req.body.confirmPassword;

		const salt = await bcrypt.genSalt(10);

		if (!(await bcrypt.compare(oldPassword, doctor.password))) {
			res.status(400).json({ message: "Invalid Password" });
		}

		if (newPassword !== confirmPassword) {
			res.status(400).json({ message: "Passwords Do Not Match" });
		} else {
			if (await bcrypt.compare(newPassword, doctor.password)) {
				res.status(400).json({
					message: "New Password Cannot Be The Same As Old Password",
				});
			} else {
				doctor.password = await bcrypt.hash(newPassword, salt);
				await doctor.save();
				res.status(200).json({
					message: "Password Changed Successfuly",
				});
			}
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error", error });
	}
});

// FILTER APPOITMENT USING STATUS OR DATE
const filterStatus = async (req, res) => {
	// const { status, date_1, date_2, doctor } = req.body;
	const { status, date_1, date_2 } = req.body;
	const doctor = req.user._id;
	console.log(status, date_1, date_2, doctor);
	if (!status) {
		return res.status(400).json({ message: "Please enter status" });
	}

	const appoint = await Appointment.find({ doctorId: doctor });
	const filteredAppointments = appoint.filter((appointment) => {
		if (status !== "All") {
			const Date1 = new Date(date_1);
			const Date2 = new Date(date_2);

			if (Date1 && Date2) {
				if (
					appointment.date >= Date1 &&
					appointment.date <= Date2 &&
					appointment.status === status
				) {
					return true;
				}
			} else if (Date1 && !date_2) {
				if (
					appointment.date.toDateString() === Date1.toDateString() &&
					appointment.status === status
				) {
					return true;
				}
			}
		} else if (status === "All") {
			const Date_1 = new Date(date_1);
			const Date_2 = new Date(date_2);

			if (Date_1 && Date_2) {
				if (
					appointment.date >= Date_1 &&
					appointment.date <= Date_2 &&
					appointment.status === status
				) {
					return true;
				}
			} else if (Date_1 && !date_2) {
				if (
					appointment.date.toDateString() === Date_1.toDateString() &&
					appointment.status === status
				) {
					return true;
				}
			}
		} else if (status === "All") {
			const Date_1 = new Date(date_1);
			const Date_2 = new Date(date_2);

			if (Date_1 && Date_2) {
				if (appointment.date >= Date_1 && appointment.date <= Date_2) {
					return true;
				}
			} else if (Date_1 && !date_2) {
				if (appointment.date.toDateString() === Date_1.toDateString()) {
					return true;
				}
			}
		}
	});

	// GET PATIENT NAME
	const result = filteredAppointments.map(async (appointment) => {
		const patient = await Patient.findById(appointment.patientId);

		return {
			...appointment,
			patientFirstName: patient.firstName,
			patientLastName: patient.lastName,
		};
	});

	const resolvedResult = await Promise.all(result);

	const mergedDataArray = resolvedResult.map((appointment) => {
		const mergedData = {
			...appointment._doc,
			patientFirstName: appointment.patientFirstName,
			patientLastName: appointment.patientLastName,
			key: true,
		};

		// Remove the "$isNew" property
		delete mergedData.$isNew;

		return mergedData;
	});

	// console.log(mergedDataArray);
	res.json(mergedDataArray);
	/////////////////////////////////////////////////////////////////////

	//     console.log(filteredAppointments);
	//     res.status(200).json(filteredAppointments);
};

// filter patients by upcoming appointments
const upcoming = async (req, res) => {
	// const { doctorId } = req.body;
	const doctorId = req.user._id;

	try {
		const upappoint = await Appointment.find({ doctorId: doctorId });

		const currentDate = new Date();

		const upcomingApp = upappoint.filter(
			(appointment) => appointment.date > currentDate
		);
		const patientIds = upcomingApp.map((appointment) => appointment.patientId);
		const patients = await User.find({ _id: { $in: patientIds } });

		upcomingApp.sort((a, b) => new Date(a.date) - new Date(b.date));
		const finalup = upcomingApp.map((appointment) => {
			const patient = patients.find((patient) =>
				patient._id.equals(appointment.patientId)
			);
			return {
				date: appointment.date,
				status: appointment.status,
				firstName: patient ? patient.firstName : null,
				lastName: patient ? patient.lastName : null,
				email: patient ? patient.email : null,
				_id: patient ? patient._id : null,
				appointmentId: appointment._id,
			};
		});

		res.status(200).json({ finalup });
		console.log("Response sent successfully.");
	} catch (error) {
		console.error("Error filtering patient IDs:", error);
		res
			.status(500)
			.json({ error: "An error occurred while filtering patient IDs" });
	}
};

// @desc Login doctor
// @route POST /doctor/login
// @access Public
const loginDoctor = asyncHandler(async (req, res) => {
	const { username, password } = req.body;

	if (!username) {
		res.status(400);
		throw new Error("Please Enter Your Username");
	} else if (!password) {
		res.status(400);
		throw new Error("Enter Your Password");
	}

	// Check for username
	const doctor = await Doctor.findOne({ username });

	if (doctor && (await bcrypt.compare(password, doctor.password))) {
		res.status(200).json({
			message: "Successful Login",
			_id: doctor.id,
			username: doctor.username,
			name: doctor.firstName + doctor.lastName,
			email: doctor.email,
			token: generateToken(doctor._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid Credentials");
	}
});

// @desc Request
// @route POST /doctor/request-otp
// @access Private
const sendOTP = asyncHandler(async (req, res) => {
	const doctor = await Doctor.findOne({ email: req.body.email });

	if (!doctor) {
		res.status(404).json({ message: "Doctor not found" });
		return;
	}

	const otp = generateOTP();
	doctor.passwordResetOTP = otp;
	await doctor.save();

	const transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: "omarelzaher93@gmail.com",
			pass: "vtzilhuubkdtphww",
		},
	});

	const mailOptions = {
		from: "omarelzaher93@gmail.com",
		to: doctor.email,
		subject: "[NO REPLY] Your Password Reset Request",
		html: `<h1>You have requested to reset your password.<h1>
                <p>Your OTP is ${otp}<p>
                <p>If you did not request to reset your password, you can safely disregard this message.<p>
                <p>We wish you a fruitful experience using El7a2ny!<p>
                <p>This Is An Automated Message, Please Do Not Reply.<p>`,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			res.status(500);
			throw new Error("Failed to Send OTP Email.");
		} else {
			res.status(200).json({ message: "OTP Sent, Please Check Your Email" });
		}
	});
});

// @desc Delete packages
// @route POST /doctor/verify-otp
// @access Private
const verifyOTP = asyncHandler(async (req, res) => {
	const otp = req.body.otp;
	const doctor = await Doctor.findOne({ email: req.body.email });

	if (otp === doctor.passwordResetOTP) {
		res.status(200).json({ message: "Correct OTP" });
	} else {
		res.status(400);
		throw new Error("Invalid OTP Entered");
	}
});

// @desc Delete packages
// @route POST /doctor/reset-password
// @access Private
const resetPassword = asyncHandler(async (req, res) => {
	try {
		const doctor = await Doctor.findOne({ email: req.body.email });
		const newPassword = req.body.password;

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);

		if (await bcrypt.compare(newPassword, doctor.password)) {
			res
				.status(400)
				.json({ message: "New Password Cannot Be The Same As the Old One" });
		} else {
			doctor.password = hashedPassword;
			await doctor.save();
			res
				.status(200)
				.json({ message: "Your Password Has Been Reset Successfuly" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error resetting password" });
	}
});

// @desc Accept a follow up session request
// @route POST /doctor/acceptFollowUpSession/:id
// @access Private
const acceptFollowUpSession = asyncHandler(async (req, res) => {
	const doctor = req.user;
	const appointment = await Appointment.findOne({
		_id: req.params.id,
	}).populate("patientId");

	if (!appointment) {
		res.status(400);
		throw new Error("Appointment Not Found");
	} else {
		if (!appointment.followUp) {
			res.status(400);
			throw new Error("Appointment is not a follow up session");
		} else {
			if (appointment.status === "confirmed") {
				res.status(400);
				throw new Error("Appointment is already confirmed");
			} else {
				appointment.status = "confirmed";
				await appointment.save();
				res.status(200).json({ message: "Appointment confirmed successfully" });
			}
		}
	}
});

// @desc Decline a follow up session request
// @route POST /doctor/revokeFollowUpSession/:id
// @access Private
const revokeFollowUpSession = asyncHandler(async (req, res) => {
	const appointment = await Appointment.findOne({
		_id: req.params.id,
	}).populate("patientId");

	if (!appointment) {
		res.status(400);
		throw new Error("Appointment Not Found");
	} else {
		if (!appointment.followUp) {
			res.status(400);
			throw new Error("Appointment is not a follow up session");
		} else {
			if (appointment.status === "declined") {
				res.status(400);
				throw new Error("Appointment is already declined");
			} else {
				appointment.status = "declined";
				await appointment.save();
				res.status(200).json({ message: "Appointment Revoked Successfully" });
			}
		}
	}
});

// Generate Token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

//retrieve all users from the database

const getDoctors = async (req, res) => {
	const doctors = await Doctor.find({});
	res.status(200).json(doctors);
};

const updateEmail = async (req, res) => {
	console.log("Update email request received");
	const { email } = req.body;
	// const doctorId = req.params.id;
	const doctorId = req.user._id;
	console.log("Doctor ID:", doctorId);
	console.log("New Email:", email);

	try {
		const doctor = await Doctor.findByIdAndUpdate(
			doctorId,
			{ email: email },
			{ new: true }
		);

		if (!doctor) {
			return res.status(404).json({ error: "Doctor not found" });
		}

		console.log("Updated Doctor:", doctor);

		res.status(200).json(doctor);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error updating email" });
	}
};

const updateHourlyRate = async (req, res) => {
	const { hourlyRate } = req.body;
	// const doctorId = req.params.id;
	const doctorId = req.user._id;

	try {
		const doctor = await Doctor.findByIdAndUpdate(
			doctorId,
			{ hourlyRate },
			{ new: true }
		);
		res.status(200).json(doctor);
		console.log("Updated Doctor:", doctor);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "error updating hourly rate" });
	}
};

const updateAffiliation = async (req, res) => {
	const { affiliation } = req.body;
	// const doctorId = req.params.id;
	const doctorId = req.user._id;

	try {
		const doctor = await Doctor.findByIdAndUpdate(
			doctorId,
			{ affiliation },
			{ new: true }
		);
		res.status(200).json(doctor);
		console.log("Updated Doctor:", doctor);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "error updating Affiliation" });
	}
};

const searchPatientByName = async (req, res) => {
	try {
		// const doctorId = req.params.id;
		const doctorId = req.user._id;
		const { firstName } = req.body;

		console.log("Doctor ID:", doctorId);
		console.log("Patient Name:", firstName);

		const appointments = await Appointment.find({ doctorId: doctorId });

		const patientIds = new Set();

		for (const appointment of appointments) {
			patientIds.add(appointment.patientId.toString());
		}

		const patients = await Patient.find({
			_id: { $in: Array.from(patientIds) },
			firstName: firstName,
		});

		for (const appointment of appointments) {
			patientIds.add(appointment.patientId.toString());
		}

		if (patients.length > 0) {
			console.log("patient info: ", patients);
			res.json(patients);
		} else {
			res.json([]);
			// res.status(404).json({ error: 'No matching patients found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Something went wrong" });
	}
};

const viewAllPatients = async (doctorId) => {
	try {
		const appointments = await Appointment.find({ doctorId });

		if (!appointments || appointments.length === 0) {
			return [];
		}

		const patientIds = appointments.map((appointment) => appointment.patientId);

		const patients = await Patient.find({ _id: { $in: patientIds } }).select(
			"firstName lastName _id email"
		);

		if (!patients || patients.length === 0) {
			return [];
		}

		return patients;
	} catch (error) {
		console.error(error);
		return [];
	}
};

const getDoctor = async (req, res) => {
	const email = req.body.email;

	try {
		const doctor = await Doctor.findOne({ email: email });

		if (!doctor) {
			return res.status(404).json({ error: "No such doctor found" });
		}

		return res.status(200).json(doctor);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

const createDoctor = async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		dob,
		username,
		password,
		hourlyRate,
		affiliation,
		speciality,
		educationalBackground,
		userType,
		accountStatus,
	} = req.body;

	try {
		console.log(
			"Creating doctor with data:",
			firstName,
			lastName,
			email,
			dob,
			username,
			password,
			hourlyRate,
			affiliation,
			speciality,
			accountStatus,
			educationalBackground,
			userType
		);

		const doctor = await Doctor.create({
			firstName,
			lastName,
			email,
			dob,
			username,
			password,
			hourlyRate,
			affiliation,
			speciality,
			educationalBackground,
			userType,
			accountStatus,
		});
		if (!doctor) {
			return res.status(500).json({ error: "Doctor creation failed" });
		}

		res.status(201).json(doctor);
	} catch (error) {
		console.error("Error creating doctor:", error);
		res.status(500).json({ error: error.message });
	}
};

const createPatient = async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		username,
		password,
		mobile,
		dob,
		gender,
		emergency,
		family,
		userType,
		accountStatus,
	} = req.body;

	try {
		console.log(
			"Creating patient with data:",
			firstName,
			lastName,
			email,
			username,
			password,
			mobile,
			dob,
			gender,
			emergency,
			family,
			userType,
			accountStatus
		);

		const patient = await Patient.create({
			firstName,
			lastName,
			email,
			username,
			password,
			mobile,
			dob,
			gender,
			emergency,
			family,
			userType,
			accountStatus,
		});
		if (!patient) {
			return res.status(500).json({ error: "patient creation failed" });
		}

		res.status(201).json(patient);
	} catch (error) {
		console.error("Error creating patient:", error);
		res.status(500).json({ error: error.message });
	}
};

const createAppointment = async (req, res) => {
	const { doctorId, patientId, date, status } = req.body;

	try {
		console.log(
			"Creating appointment with data:",
			doctorId,
			patientId,
			date,
			status
		);

		const appointment = await Appointment.create({
			doctorId,
			patientId,
			date,
			status,
		});
		if (!appointment) {
			return res.status(500).json({ error: "Appointment creation failed" });
		}

		res.status(201).json(appointment);
	} catch (error) {
		console.error("Error creating appointment:", error);
		res.status(500).json({ error: error.message });
	}
};

const selectPatient = async (patientId) => {
	try {
		const patient = await Patient.findById(patientId).exec();
		return patient;
	} catch (error) {
		throw error;
	}
};

const getPatients = async (req, res) => {
	const patients = await Patient.find({});
	res.status(200).json(patients);
};

// UPDATED viewHealthRecords
const viewHealthRecords = async (req, res) => {
	// const patient = await Patient.findById(req.params.id);
	// const doctorId = req.params.id;
	const doctorId = req.user._id;
	const { patientId } = req.body;

	const patient = await Patient.findById(patientId);

	try {
		if (!patient) {
			res.status(400);
			throw new Error("Patient does not exist.");
		} else {
			const healthRecords = patient.healthRecord;
			if (healthRecords) {
				res.status(200).json(healthRecords);
			} else {
				res.status(400);
				throw new Error("Patient has no health record.");
			}
		}
	} catch (error) {
		res.status(400);
		throw new Error("Error viewing health records.");
	}
};

const getAllSpecialities = async (req, res) => {
	try {
		const uniqueSpecialities = await Doctor.distinct("speciality");
		res.status(200).json(uniqueSpecialities);
	} catch (err) {
		console.error("Error:", err);
	}
};

const viewWallet = async (req, res) => {
	// const id = req.params.id;
	const id = req.user._id;
	try {
		const doctor = await Doctor.findById(id).populate("wallet");

		if (doctor) {
			const wallet = doctor.wallet;

			res.status(200).json({ wallet: wallet });
		} else {
			res.status(404).json({ error: "Not Found" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const followUpDoc = async (req, res) => {
	const { doctorId, patientId, date, status } = req.body;

	try {
		console.log(
			"Creating follow up with data:",
			doctorId,
			patientId,
			date,
			status
		);

		const appointment = await Appointment.create({
			doctorId,
			patientId,
			date,
			status,
			followUp: true,
		});
		if (!appointment) {
			return res.status(500).json({ error: "Appointment creation failed" });
		}

		res.status(201).json(appointment);
	} catch (error) {
		console.error("Error creating appointment:", error);
		res.status(500).json({ error: error.message });
	}
};

const addNewSlots = async (req, res) => {
	try {
		// const doctorId = req.params.id;
		const doctorId = req.user._id;
		console.log(doctorId);
		const { weekday, startTime, endTime } = req.body;
		const newSlots = { weekday, startTime, endTime };
		console.log({ weekday, startTime, endTime });
		console.log("newSlots:", { weekday, startTime, endTime });
		const doc = await User.findById(doctorId);
		console.log(doc);
		doc.availableSlots = doc.availableSlots.concat({
			weekday,
			startTime,
			endTime,
		});
		await doc.save();

		if (!doc) {
			return res.status(404).json({ error: "Doctor not found" });
		}

		res.json(doc);
	} catch (error) {
		res.status(400).json({ error: "Failed to update slots" });
	}
};

const getMyAppointments = async (req, res) => {
	try {
		// const doctorId = req.params.id;
		const doctorId = req.user._id;

		const appointments = await Appointment.find({ doctorId });

		const result = appointments.map(async (appointment) => {
			const patient = await Patient.findById(appointment.patientId);

			return {
				...appointment,
				patientFirstName: patient.firstName,
				patientLastName: patient.lastName,
			};
		});

		const resolvedResult = await Promise.all(result);

		const mergedDataArray = resolvedResult.map((appointment) => {
			const mergedData = {
				...appointment._doc,
				patientFirstName: appointment.patientFirstName,
				patientLastName: appointment.patientLastName,
				key: true,
			};

			// Remove the "$isNew" property
			delete mergedData.$isNew;

			return mergedData;
		});

		// console.log(mergedDataArray);
		res.json(mergedDataArray);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch appointments" });
	}
};

const viewEmploymentContract = async (req, res) => {
	try {
		const doctorId = req.user._id;

		const doctor = await Doctor.findById(doctorId);

		if (!doctor) {
			return res.status(404).json({ error: "Doctor not found" });
		}

		if (!doctor.employmentContract || !doctor.employmentContract.file) {
			return res.status(404).json({ error: "Employment contract not found" });
		}

		// Construct the file path to the employment contract
		const filePath = path.join(
			__dirname,
			"../uploads/employment_contracts",
			doctor.employmentContract.file
		);

		// Check if the file exists
		if (fs.existsSync(filePath)) {
			// Return the file as a response
			res.download(filePath);
		} else {
			res.status(404).json({ error: "Employment contract file not found" });
		}
	} catch (error) {
		console.error("Error viewing employment contract:", error);
		res.status(500).json({ error: "An error occurred" });
	}
};

const addHealthRecord = async (req, res) => {
	try {
		const patientId = req.params.id;
		const patient = await Patient.findOne({ _id: patientId });

		if (!patient) {
			return res.status(404).json({ error: "Patient not found" });
		}

		const { content, files } = req.body;
		const healthRecord = {
			content,
			files,
		};

		patient.healthRecord.files.push(healthRecord);

		await patient.save();

		res.json(patient);
	} catch (error) {
		console.error("Error adding health record:", error);
		res.status(500).json({ error: "An error occurred" });
	}
};

// Extra frontend methods
const getDoctorInfo = (req, res) => {
	// const doctorId = req.params.id;
	const doctorId = req.user._id;
	Doctor.findById(doctorId)
		.then((result) => res.json(result))
		.catch((err) => res.status(404).json());
};

const getStatusOptions = async (req, res) => {
	try {
		// Use the distinct method to get unique status options
		const uniqueStatusOptions = await Appointment.distinct("status");
		uniqueStatusOptions.push("All");
		console.log("Unique Status Options:", uniqueStatusOptions);
		// return uniqueStatusOptions;
		res.status(200).json(uniqueStatusOptions);
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

const followUp = async (req, res) => {
	// const { doctorId, patientId, appointmentId, followUpDate } = req.params;
	// const {patientId,appointmentId} = req.query;
	const { patientId, appointmentId, followUpDate } = req.params;
	const doctorId = req.user._id;

	try {
		console.log("Doctor ID:", doctorId);
		console.log("Patient ID:", patientId);
		console.log("Appointment ID:", appointmentId);

		const updatedAppointment = await Appointment.findOneAndUpdate(
			{ _id: appointmentId, doctorId, patientId },
			{ $set: { followUp: true } },
			{ new: true }
		);
		const newAppointment = await Appointment.create({
			doctorId,
			patientId,
			date: new Date(followUpDate), // Convert followUpDate to a Date object
			status: "confirmed", // Set the status for the new appointment
			followUp: false, // Set followUp to false for the new appointment
		});

		console.log("Updated Appointment:", updatedAppointment);

		res.status(200).json(updatedAppointment);
	} catch (error) {
		console.error("Error updating appointment:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// Sprint 3
// reschedule an appointment for a patient
const rescheduleApp = async (req, res) => {
	try {
		const { appointmentId, newDate } = req.body;
		const appointment = await Appointment.findById(appointmentId);
		if (!appointment) {
			res.status(404).json({ message: "Appointment does not exist." });
		}

		appointment.date = newDate;

		await appointment.save();

		res.status(200).json({ message: "Appointment rescheduled successfully." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error rescheduling appointment." });
	}
};

// cancel an appointment
const cancelApp = async (req, res) => {
	try {
		const { appointmentId } = req.body;
		const appointment = await Appointment.findByIdAndDelete(appointmentId);
		if (!appointment) {
			res.status(404).json({ message: "Appointment does not exist" });
		}

		// REFUND SHOULD BE DONE HERE (Stripe?)
		const patient = await Patient.findById(appointment.patientId);
		const doctor = await Doctor.findById(appointment.doctorId);
		const patientWallet = await Wallet.findOne({ user: appointment.patientId });
		const doctorWallet = await Wallet.findOne({ user: appointment.doctorId });

		const packageType = patient.healthPackage
			? patient.healthPackage.name
			: null;
		let doctorSessionDiscount = 0;
		switch (packageType) {
			case "Silver":
				doctorSessionDiscount = 0.4;
				break;
			case "Gold":
				doctorSessionDiscount = 0.6;
				break;
			case "Platinum":
				doctorSessionDiscount = 0.8;
				break;
			default:
				doctorSessionDiscount = 0;
		}

		const amount = doctor.hourlyRate * 1.1 - doctor.hourlyRate * doctorSessionDiscount;

		patientWallet.balance += amount;
		doctorWallet.balance -= amount;

		await patientWallet.save();
		await doctorWallet.save();

		res.status(200).json({ message: "Appointment cancelled successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error cancelling appointment." });
	}
};

// Sprint 3 Requirement:
// view all new and old prescriptions and their statuses
const viewPrescriptionsByDoctor = async (req, res) => {
	const doctorId = req.user.id;

	try {
		const prescriptions = await Prescription.find({
			doctorId: doctorId,
		}).populate("patientId");
		res.status(200).json(prescriptions);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch prescriptions" });
	}
};

// Sprint 3 Requirement:
// add a patient's prescription
const addPrescription = async (req, res) => {
	const doctorId = req.user.id;
	const { patientName, date, medications } = req.body;

	if (!patientName || !date) {
		return res
			.status(400)
			.json({ message: "Please enter patient name and date." });
	}
	try {
		const patient = await Patient.findOne({ username: patientName });
		if(!patient) {
			return res.status(400).json({ message: "Patient not found." });
		}
		const prescription = await Prescription.create({
			patientId: patient._id,
			doctorId: doctorId,
			medications: medications,
			date: date,
		});
		const updatedPrescription = await prescription.populate("patientId");
		console.log(updatedPrescription);
		res.status(201).json(updatedPrescription);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error adding prescription." });
	}
};

// Sprint 3 Requirement:
// add/update dosage for each medicine added to the prescription
const addOrUpdateDosage = async (req, res) => {
	try {
		const { prescriptionId, medicationName, frequency } = req.body;

		const updatedPrescription = await Prescription.findOneAndUpdate(
			{
				_id: prescriptionId,
				"medications.medicationName": medicationName,
			},
			{
				$set: {
					"medications.$.frequency": frequency || null,
				},
			},
			{ new: true }
		);

		if (!updatedPrescription) {
			return res
				.status(404)
				.json({ message: "Prescription or Medicine not found." });
		}

		res.status(200).json({
			message: "Frequency updated successfully.",
			prescription: updatedPrescription,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error updating dosage." });
	}
};

module.exports = {
	getMyInfo,
	createDoctor,
	updateEmail,
	updateHourlyRate,
	updateAffiliation,
	createPatient,
	createAppointment,
	searchPatientByName,
	viewAllPatients,
	getDoctors,
	filterStatus,
	upcoming,
	selectPatient,
	getPatients,
	viewHealthRecords,
	getAllSpecialities,
	viewWallet,
	addNewSlots,
	getMyAppointments,
	followUpDoc,
	viewEmploymentContract,
	addHealthRecord,
	getDoctorInfo,
	loginDoctor,
	verifyOTP,
	sendOTP,
	resetPassword,
	followUp,
	getStatusOptions,
	getDoctor,
	changePassword,
	rescheduleApp,
	cancelApp,
	viewPrescriptionsByDoctor,
	addOrUpdateDosage,
	addPrescription,
	acceptFollowUpSession,
	revokeFollowUpSession,
};
