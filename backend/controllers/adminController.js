const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const Admin = require("../models/adminModel");
const Doctor = require("../models/doctorModel");
const Patient = require("../models/patientModel");
const Packages = require("../models/packagesModel");
const { jsPDF } = require("jspdf");

const renderDashboard = (req, res) => {
	res.status(200).render("adminDashboard");
};

function generateOTP() {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

const generateRandomUsername = (maxLength = 10) => {
	const prefix = "admin-";
	const suffix = Math.random()
		.toString(36)
		.substring(2, 2 + (maxLength - prefix.length));
	return prefix + suffix;
};

const generateRandomPassword = (length = 10) => {
	const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lowercaseChars = "abcdefghijklmnopqrtuvwxyz";
	const specialChars = "!@#$%^&*-_";
	const digitChars = "1234567890";

	const characters = [uppercaseChars, lowercaseChars, specialChars, digitChars];

	let password = "";
	characters.forEach((charSet) => {
		const randomChar = charSet[Math.floor(Math.random() * charSet.length)];
		password += randomChar;
	});

	const remainingLength = length - password.length;
	for (let i = 0; i < remainingLength; i++) {
		const randomCharSet =
			characters[Math.floor(Math.random() * characters.length)];
		const randomChar =
			randomCharSet[Math.floor(Math.random() * randomCharSet.length)];
		password += randomChar;
	}

	let j;
	password = password.split("");
	for (let i = password.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1))[(password[i], password[j])] = [
			password[j],
			password[i],
		];
	}
	password = password.join("");

	return password;
};

const emailValidator = function (email) {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailRegex.test(email);
};

// @desc Create new admin
// @route POST /admin/create-admin
// @access Private
const createAdmin = asyncHandler(async (req, res) => {
	const { email, firstName, lastName } = req.body;

	if (!email || !firstName || !lastName) {
		res.status(400);
		throw new Error("Please Enter All Fields");
	}

	if (!emailValidator(email)) {
		res.status(400);
		throw new Error("Invalid Email Format");
	}

	// Check if admin exists
	const adminExists = await Admin.findOne({ email });

	if (adminExists) {
		res.status(400);
		throw new Error("An Admin With This Email Already Exists");
	}

	const randomUsername = generateRandomUsername();
	const password = generateRandomPassword();

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const admin = await Admin.create({
		username: randomUsername,
		email,
		password: hashedPassword,
		firstName,
		lastName,
	});

	if (admin) {
		res.status(201).json({
			_id: admin.id,
			name: admin.firstName + " " + admin.lastName,
			username: randomUsername,
			password: password,
		});
	} else {
		res.status(400);
		throw new Error("Invalid Data");
	}
});

// @desc get all admins
// @route GET /admin/get-admins
// @access Private
const getAdmins = asyncHandler(async (req, res) => {
	const admins = await Admin.find();

	if (admins.length === 0) {
		res.status(400);
		throw new Error("No Admins");
	} else {
		res.status(200).json(admins);
	}
});

// @desc get all patients
// @route GET /admin/get-patients
// @access Private
const getPatients = asyncHandler(async (req, res) => {
	const patients = await Patient.find();

	if (patients.length === 0) {
		res.status(400);
		throw new Error("No Patients Found");
	} else {
		res.status(200).json(patients);
	}
});

// @desc get all doctors
// @route GET /admin/get-doctors
// @access Private
const getDoctors = asyncHandler(async (req, res) => {
	const doctors = await Doctor.find({ accountStatus: "active" });

	if (doctors.length === 0) {
		res.status(400);
		throw new Error("No Active Doctors Found");
	} else {
		res.status(200).json(doctors);
	}
});

// @desc Login admin
// @route POST /admin/login
// @access Public
const loginAdmin = asyncHandler(async (req, res) => {
	const { username, password } = req.body;

	if (!username) {
		res.status(400);
		throw new Error("Please Enter Your Username");
	} else if (!password) {
		res.status(400);
		throw new Error("Enter Your Password");
	}

	// Check for username
	const admin = await Admin.findOne({ username });

	if (admin && (await bcrypt.compare(password, admin.password))) {
		const initials = (admin.firstName ? admin.firstName[0] : '') +
					   (admin.lastName ? admin.lastName[0] : '');

		res.status(200).json({
			message: "Successful Login",
			_id: admin.id,
			username: admin.username,
			// name: admin.firstName + admin.lastName,
			name: admin.firstName,
			lastName: admin.lastName,
			email: admin.email,
			initials: initials, 
			token: generateToken(admin._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid Credentials");
	}
});

// @desc Remove doctor from system
// @route DELETE /admin/remove-doctor/:id
// @access Public
const removeDoctor = asyncHandler(async (req, res) => {
	const doctor = await Doctor.findById(req.params.id);

	if (!doctor) {
		res.status(400);
		throw new Error("Not Found");
	}

	await Doctor.findByIdAndDelete(req.params.id);

	res.status(200).json({ message: "Successfully deleted" });
});

// @desc Remove patient from system
// @route DELETE /admin/remove-patient/:id
// @access Public
const removePatient = asyncHandler(async (req, res) => {
	const patient = await Patient.findById(req.params.id);

	if (!patient) {
		res.status(400);
		throw new Error("Not Found");
	}

	await Patient.findByIdAndDelete(req.params.id);

	res.status(200).json({ message: "Successfully deleted" });
});

// @desc Remove admin from system
// @route DELETE /admin/remove-admin/:id
// @access Public
const removeAdmin = asyncHandler(async (req, res) => {
	const admin = await Admin.findById(req.params.id);

	if (!admin) {
		res.status(400);
		throw new Error("Not Found");
	}

	await Admin.findByIdAndDelete(req.params.id);

	res.status(200).json({ message: "Successfully deleted" });
});

// @desc Get my (admin) info
// @route GET /admin/my-info
// @access Public
const getMyInfo = asyncHandler(async (req, res) => {
	const admin = await Admin.findById(req.user.id);

	if (!admin) {
		res.status(400);
		throw new Error("Admin Does Not Exist");
	}

	res.status(200).json({
		_id: admin.id,
		name: admin.firstName + " " + admin.lastName,
		username: admin.username,
		email: admin.email,
	});
});

// @desc View all the information of doctor requesting to join
// @route GET /admin/view-doctor/:id
// @access Private
const viewDoctorRequest = asyncHandler(async (req, res) => {
	const doctor = await Doctor.findById(req.params.id);

	if (!doctor) {
		res.status(400);
		throw new Error("Not Found!");
	} else {
		res.status(200).json(doctor);
	}
});

// @desc View all the information of doctors requesting to join
// @route GET /admin/view-requested-doctors
// @access Private
const viewAllDoctorRequests = asyncHandler(async (req, res) => {
	const doctors = await Doctor.find({ accountStatus: "inactive" });

	if (doctors.length === 0) {
		res.status(400);
		throw new Error("No Doctors Found!");
	} else {
		res.status(200).json(doctors);
	}
});

// @desc Approve doctor registration
// @route PUT /admin/doctor-approval/:id
// @access Private
const doctorApproval = asyncHandler(async (req, res) => {
	try {
		const doctor = await Doctor.findById(req.params.id);

		if (!doctor) {
			res.status(400);
			throw new Error("Doctor not found");
		}

		if (doctor.accountStatus === "inactive") {
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
				subject:
					"[NO REPLY] Congratulations! You Have Been Approved To Use El7any!",
				html: `<h1> Congratulations Dr. ${doctor.lastName}<h1>
                <p>Everything looks good on your part and we have decided to accept you to use our service! <p>
                <p>Please login to the system and accept your personal employment contract to be able to fully use or clinic! <p>
                <p>We wish you a fruitful experience using El7a2ny!<p>
                <p>This Is An Automated Message, Please Do Not Reply.<p>`,
			};

			transporter.sendMail(mailOptions, async (error, info) => {
				if (error) {
					res.status(500);
					throw new Error("Something Went Wrong");
				} else {
					doctor.accountStatus = "pending";
					await doctor.save();
					res.status(200).json({
						message: "Doctor Has Been Approved And Email Has Been Sent!",
					});
				}
			});
		} else {
			res.status(400).json({ message: "Doctor Is Already Active!" });
		}
	} catch (error) {
		res.status(500);
		throw new Error("Doctor Approval Failed");
	}
});

// @desc Reject doctor registration
// @route GET /admin/doctor-rejection/:id
// @access Private
const doctorRejection = asyncHandler(async (req, res) => {
	try {
		const doctor = await Doctor.findById(req.params.id);

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
			subject: "[NO REPLY] Update On Your El7any Request To Join",
			html: `<h1> Dear Dr. ${doctor.lastName}<h1>
                <p>We regret to inform you that after extensive research, we have come to the conclusion of rejecting your doctor request<p>
                <p>We hope this rejection will not alter your perception of our service.<p>
                <p>This Is An Automated Message, Please Do Not Reply.<p>`,
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				res.status(500);
				throw new Error("Something Went Wrong");
			}
		});

		await Doctor.findByIdAndDelete(req.params.id);

		res.status(200).json({
			message: "Doctor Has Been Rejected, Deleted, and Informed via Email",
		});
	} catch (error) {
		res.status(500);
		throw new Error("Doctor Rejection Failed");
	}
});

// @desc Get all packages
// @route GET /admin/get-packages
// @access Private
const getPackages = asyncHandler(async (req, res) => {
	const packages = await Packages.find();

	if (packages.length === 0) {
		res.status(400);
		throw new Error("No Packages Found");
	} else {
		res.status(200).json(packages);
	}
});

// @desc Get all packages
// @route POST /admin/get-package
// @access Private
const getPackage = asyncHandler(async (req, res) => {
	const package = await Packages.findOne({ name: req.body.name });

	if (!package) {
		res.status(400);
		throw new Error("Package Not Found");
	} else {
		res.status(200).json(package);
	}
});

// @desc Add new packages
// @route POST /admin/add-packages
// @access Private
const addPackages = asyncHandler(async (req, res) => {
	const {
		name,
		description,
		price,
		doctorSessionDiscount,
		medicineDiscount,
		familyDiscount,
	} = req.body;

	if (
		!name ||
		!description ||
		!price ||
		!doctorSessionDiscount ||
		!medicineDiscount ||
		!familyDiscount
	) {
		res.status(400);
		throw new Error("Please Enter All Fields");
	}

	if (await Packages.findOne({ name })) {
		res.status(400);
		throw new Error("A Package With This Name Already Exists");
	}

	const package = await Packages.create({
		name,
		description,
		price,
		doctorSessionDiscount,
		medicineDiscount,
		familyDiscount,
	});

	if (package) {
		res.status(201).json({
			message: "Package Added Successfully",
		});
	} else {
		res.status(400);
		throw new Error("Something Went Wrong, Please Try Again");
	}
});

// @desc Update packages
// @route PUT /admin/update-package/:id
// @access Private
const updatePackages = asyncHandler(async (req, res) => {
	const package = await Packages.findById(req.params.id);

	if (!package) {
		res.status(400);
		throw new Error("Not Found!");
	} else {
		const updatedPackageInfo = await Packages.findByIdAndUpdate(
			req.params.id,
			req.body
		);
		if (updatedPackageInfo) {
			res.status(200).json({ message: "Successfully Updated" });
		} else {
			res.status(400);
			throw new Error("Something Went Wrong");
		}
	}
});

// @desc Delete packages
// @route DELETE /admin/remove-package/:id
// @access Private
const deletePackages = asyncHandler(async (req, res) => {
	const package = await Packages.findById(req.params.id);

	if (!package) {
		res.status(400);
		throw new Error("Not Found!");
	} else {
		await Packages.findByIdAndDelete(req.params.id);
		res.status(200).json({
			message: "Deleted Successfully",
		});
	}
});

// @desc Request
// @route GET /admin/request-otp
// @access Private
const sendOTP = asyncHandler(async (req, res) => {
	const admin = await Admin.findOne({ email: req.body.email });

	if (!admin) {
		res.status(404).json({ message: "Admin Not Found" });
		return;
	}

	const otp = generateOTP();
	admin.passwordResetOTP = otp;
	await admin.save();

	const transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: "omarelzaher93@gmail.com",
			pass: "vtzilhuubkdtphww",
		},
	});

	const mailOptions = {
		from: "omarelzaher93@gmail.com",
		to: admin.email,
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
// @route POST /admin/verify-otp
// @access Private
const verifyOTP = asyncHandler(async (req, res) => {
	const otp = req.body.otp;
	const admin = await Admin.findOne({ email: req.body.email });

	if (otp === admin.passwordResetOTP) {
		res.status(200).json({ message: "Correct OTP" });
	} else {
		res.status(400);
		throw new Error("Invalid OTP Entered");
	}
});

// @desc Delete packages
// @route POST /admin/reset-password
// @access Private
const resetPassword = asyncHandler(async (req, res) => {
	try {
		const admin = await Admin.findOne({ email: req.body.email });
		const newPassword = req.body.password;

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);

		if (await bcrypt.compare(newPassword, admin.password)) {
			res
				.status(400)
				.json({ message: "New Password Cannot Be The Same As the Old One" });
		} else {
			admin.password = hashedPassword;
			await admin.save();
			res
				.status(200)
				.json({ message: "Your Password Has Been Reset Successfuly" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error resetting password" });
	}
});

// @desc Change Password
// @route POST /admin/change-password
// @access Private
const changePassword = asyncHandler(async (req, res) => {
	try {
		const admin = req.user;
		const oldPassword = req.body.oldPassword;
		const newPassword = req.body.newPassword;
		const confirmPassword = req.body.confirmPassword;

		const salt = await bcrypt.genSalt(10);

		if (!(await bcrypt.compare(oldPassword, admin.password))) {
			res.status(400).json({ message: "Invalid Password" });
		}

		if (newPassword !== confirmPassword) {
			res.status(400).json({ message: "Passwords Do Not Match" });
		} else {
			if (await bcrypt.compare(newPassword, admin.password)) {
				res.status(400).json({
					message: "New Password Cannot Be The Same As Old Password",
				});
			} else {
				admin.password = await bcrypt.hash(newPassword, salt);
				await admin.save();
				res.status(200).json({
					message: "Password Changed Successfuly",
				});
			}
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error", error });
	}
});

// Generate Token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

module.exports = {
	createAdmin,
	loginAdmin,
	removeDoctor,
	removePatient,
	removeAdmin,
	getMyInfo,
	doctorApproval,
	doctorRejection,
	viewDoctorRequest,
	viewAllDoctorRequests,
	addPackages,
	updatePackages,
	deletePackages,
	renderDashboard,
	getPackages,
	getPackage,
	getAdmins,
	getDoctors,
	getPatients,
	sendOTP,
	verifyOTP,
	resetPassword,
	changePassword,
};
