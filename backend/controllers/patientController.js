const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Prescription = require("../models/prescriptionModel");
const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");

const renderDashboard = (req, res) => {
	res.status(200).render("patientDashboard");
};

const renderAddFamilyMember = (req, res) => {
	res.status(200).render("addFamilyMember");
};

function generateOTP() {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

// @desc Login patient
// @route POST /patient/login
// @access Public
const loginPatient = asyncHandler(async (req, res) => {
	const { username, password } = req.body;

	if (!username) {
		res.status(400);
		throw new Error("Please Enter Your Username");
	} else if (!password) {
		res.status(400);
		throw new Error("Enter Your Password");
	}

	// Check for username
	const patient = await Patient.findOne({ username });

	if (patient && (await bcrypt.compare(password, patient.password))) {
		res.status(200).json({
			message: "Successful Login",
			_id: patient.id,
			username: patient.username,
			name: patient.firstName + patient.lastName,
			email: patient.email,
			token: generateToken(patient._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid Credentials");
	}
});

// @desc Request
// @route GET /patient/request-otp
// @access Private
const sendOTP = asyncHandler(async (req, res) => {
	const patient = await Patient.findOne({ email: req.body.email });

	if (!patient) {
		res.status(404).json({ message: "Patient Not Found" });
		return;
	}

	const otp = generateOTP();
	patient.passwordResetOTP = otp;
	await patient.save();

	const transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: "omarelzaher93@gmail.com",
			pass: "vtzilhuubkdtphww",
		},
	});

	const mailOptions = {
		from: "omarelzaher93@gmail.com",
		to: patient.email,
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
// @route POST /patient/verify-otp
// @access Private
const verifyOTP = asyncHandler(async (req, res) => {
	const otp = req.body.otp;
  const patient = await Patient.findOne({ email: req.body.email });

	if (otp === patient.passwordResetOTP) {
		res.status(200).json({ message: "Correct OTP" });
	} else {
		res.status(400);
		throw new Error("Invalid OTP Entered");
	}
});

// @desc Delete packages
// @route POST /patient/reset-password
// @access Private
const resetPassword = asyncHandler(async (req, res) => {
	try {
    const patient = await Patient.findOne({ email: req.body.email });
		const newPassword = req.body.password;

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);

		if (await bcrypt.compare(newPassword, patient.password)) {
			res
				.status(400)
				.json({ message: "New Password Cannot Be The Same As the Old One" });
		} else {
			patient.password = hashedPassword;
			await patient.save();
			res
				.status(200)
				.json({ message: "Your Password Has Been Reset Successfuly" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error resetting password" });
	}
});

// Generate Token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

//Get all patients
const getAllPatients = async (req, res) => {
	const patients = await Patient.find({}).sort({ createdAt: -1 });
	res.status(200).json(patients);
};

//Get a single patient
const getPatient = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such patient found" });
	}

	const patient = await Patient.findById(id);

	if (!patient) {
		return res.status(404).json({ error: "No such patient found" });
	}

	res.status(200).json(patient);
};

//Create a patient
//
const addPatient = async (req, res) => {
	const {
		name,
		email,
		password,
		dob,
		gender,
		mobile,
		emergencyContact,
		family,
		prescriptions,
	} = req.body;

	try {
		const patient = await Patient.create({
			name,
			email,
			password,
			dob,
			gender,
			mobile,
			emergencyContact,
			family,
			prescriptions,
		});
		res.status(201).json(patient);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

//Update a patient
const updatePatient = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such patient found" });
	}

	const patient = await Patient.findOneAndUpdate({ _id: id }, { ...req.body });

	if (!patient) {
		return res.status(404).json({ error: "No such patient found" });
	}

	res.status(200).json(patient);
};

//Delete a patient
const deletePatient = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such patient found" });
	}

	const patient = await Patient.findOneAndDelete({ _id: id });

	if (!patient) {
		return res.status(404).json({ error: "No such patient found" });
	}

	res.status(200).json(patient);
};

//Add family member
const addFamilyMember = asyncHandler(async (req, res) => {
	const id = req.params.id;

	try {
		const patient = await Patient.findById(id);
		if (!patient) return res.status(404).json({ message: "Patient not found" });

		patient.family.push(...req.body.family);
		await patient.save();
		res.status(200).json(patient);
	} catch (error) {
		return res.status(500).json({ error: "Something went wrong" });
	}
});

const getFamilyMembers = asyncHandler(async (req, res) => {
	const id = req.params.id;

	try {
		const patient = await Patient.findById(id);
		if (!patient) return res.status(404).json({ message: "Patient not found" });

		res.status(200).json(patient.family);
	} catch (error) {
		return res.status(500).json({ error: "Something went wrong" });
	}
});

const getSelectedDoctor = asyncHandler(async (req, res) => {
	const doctor_id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(doctor_id)) {
		return res.status(404).json({ error: "Doctor Not Found1" });
	}

	const doctor = await Doctor.findById(doctor_id);

	if (!doctor) {
		return res.status(404).json({ error: "Doctor Not Found" });
	}

	res.status(200).json(doctor);
});

const getAllPrescriptions = async (req, res) => {
	const { patientId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(patientId)) {
		return res.status(404).json({ error: "Id Not Found" });
	}

	try {
		const patient = await Patient.findById(patientId).populate({
			path: "prescriptions",
			populate: {
				path: "doctor",
				model: "Doctor",
			},
		});

		if (!patient) {
			return res.status(404).json({ error: "Patient Not Found" });
		}

		const prescriptions = patient.prescriptions;
		prescriptions.forEach(async (prescription) => {
			const doctorName = prescription.doctor.firstName;
		});

		res.status(200).json(patient.prescriptions);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
const selectPrescription = async (req, res) => {
	const { prescriptionId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(prescriptionId)) {
		return res.status(404).json({ error: "Id Not Found" });
	}

	try {
		const prescription = await Prescription.findById(prescriptionId).populate(
			"doctor"
		);

		if (!prescription) {
			return res.status(404).json({ error: "Prescription Not Found" });
		}

		res.status(200).json(prescription);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const filterPrescription = async (req, res) => {
	const patient = await Patient.findById(req.params.patientId).populate(
		"prescriptions"
	);

	if (!patient) {
		return res.status(404).json({ error: "Patient Id Not Found" });
	}

	// if (!mongoose.Types.ObjectId.isValid(patientId)) {
	//     return res.status(404).json({ error: 'Patient Id Not Found' });
	// }

	try {
		const { doctor, filled, date } = req.query;
		const query = {};

		if (doctor) {
			const doc = await Doctor.findOne({ firstName: doctor });

			if (doc) {
				query["doctor"] = doc._id;
			} else {
				return res.status(400).json({ error: "Not found" });
			}
		}

		if (filled) {
			if (filled === "true") {
				query["filled"] = true;
			} else if (filled === "false") {
				query["filled"] = false;
			}
		}
		if (date) {
			query.date = new Date(date);
		}

		const filteredPrescriptions = await Prescription.find({
			_id: { $in: patient.prescriptions },
			...query,
		}).populate("doctor");

		res.status(200).json(filteredPrescriptions);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const getAllAppointments = async (req, res) => {
	try {
		const appointments = await Appointment.find({
			patientId: req.params.id,
		}).populate({
			path: "doctorId",
			select: "firstName lastName",
		});
		res.status(200).json(appointments);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//Filter appointments by Date/Status
const filterAppointments = async (req, res) => {
	let { status, date_1, date_2 } = req.query;

	const patient = await Patient.findById(req.params.id);
	const appoint = await Appointment.find({ patientId: req.params.id }).populate(
		{
			path: "doctorId",
			select: "firstName lastName",
		}
	);

	if (patient) {
		if (!status && !date_1 && !date_2) return res.status(200).json(appoint);
		if (!status) status = "All";
		const filteredAppointments = appoint.filter((appointment) => {
			if (status !== "All") {
				const Date1 = new Date(date_1);
				const Date2 = new Date(date_2);

				if (Date1 && Date2 && typeof date_2 !== "undefined") {
					const WithinRange =
						appointment.date >= Date1 &&
						appointment.date <= Date2 &&
						appointment.status == status;
					return WithinRange;
				}

				if (
					Date1 &&
					typeof date_1 !== "undefined" &&
					typeof date_2 === "undefined"
				) {
					const ondate =
						appointment.date.toISOString().split("T")[0] ===
						Date1.toISOString().split("T")[0];
					return ondate;
				}

				if (typeof date_1 === "undefined" && typeof date_2 === "undefined")
					return appointment.status == status;
			} else if (status === "All") {
				const Date_1 = new Date(date_1);
				const Date_2 = new Date(date_2);

				if (Date_1 && Date_2 && typeof date_2 !== "undefined")
					return appointment.date >= Date_1 && appointment.date <= Date_2;

				if (
					Date_1 &&
					typeof date_1 !== "undefined" &&
					typeof date_2 === "undefined"
				)
					return (
						appointment.date.toISOString().split("T")[0] ===
						Date_1.toISOString().split("T")[0]
					);

				if (typeof date_1 === "undefined" && typeof date_2 === "undefined")
					return appointment;
			}
		});
		res.status(200).json({ filteredAppointments });
	} else res.status(404).json({ message: "Doctor not found" });
};

//View a list of all doctors along with their specialty, session price(based on subscribed health package if any)
const viewAllDoctors = asyncHandler(async (req, res) => {
	try {
		const doctors = await Doctor.find({}).sort({ createdAt: -1 });
		if (!doctors) {
			res.status(400).json({ error: "No Doctors Found" });
		} else {
			res.status(200).json(doctors);
		}
	} catch (error) {
		res.status(400);
		throw new Error("Error viewing Doctors");
	}
});

//Search for a doctor by Name/Specialty
const searchDoctor = asyncHandler(async (req, res) => {
	try {
		const { name, speciality } = req.query;
		const query = {};
		if (name) {
			firstName = name.split(" ")[0];
			query.firstName = { $regex: firstName, $options: "i" };
			lastName = name.split(" ")[1]; //.trim()
			if (typeof lastName === "string" && lastName.length > 0)
				query.lastName = { $regex: lastName, $options: "i" };
		}
		if (speciality) query.speciality = { $regex: speciality, $options: "i" };

		const doctor = await Doctor.find(query);
		res.status(200).json(doctor);
	} catch (error) {
		res.status(500).json({ error: "Error while searching for Doctor" });
	}
});

const filterDoctors = async (req, res) => {
	const { datetime, speciality } = req.query;

	try {
		const query = {};

		if (speciality) query.speciality = speciality;

		if (datetime) {
			const appointmentsForDate = await Appointment.find({
				date: new Date(datetime),
			});
			const doctorIdsWithAppointments = appointmentsForDate.map(
				(appointment) => appointment.doctorId
			);
			query._id = { $nin: doctorIdsWithAppointments };
		}
		const filteredDoctors = await Doctor.find(query);

		res.status(200).json(filteredDoctors);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

/////////////////////////////////

// UTILS

const addAppointment = async (req, res) => {
	const docid = req.params.doctorId;
	const patid = req.params.patientId;

	const data = req.body;
	try {
		const app = await Appointment.create({
			doctorId: docid,
			patientId: patid,
			...data,
		});
		res.status(200).json(app);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const addPrescription = async (req, res) => {
	const docid = req.params.id;
	const data = req.body;

	try {
		const pres = await Prescription.create({ doctor: docid, ...data });
		res.status(200).json(pres);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getAllPatients,
	getPatient,
	addPatient,
	updatePatient,
	deletePatient,
	addFamilyMember,
	getFamilyMembers,
	getSelectedDoctor,
	getAllPrescriptions,
	filterPrescription,
	selectPrescription,
	getAllAppointments,
	filterAppointments,
	viewAllDoctors,
	searchDoctor,
	filterDoctors,
	addAppointment,
	addPrescription,
	renderDashboard,
	renderAddFamilyMember,
	loginPatient,
	sendOTP,
	verifyOTP,
	resetPassword,
};
