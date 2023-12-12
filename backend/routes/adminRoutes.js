const express = require("express");
const router = express.Router();
const {
	createAdmin,
	loginAdmin,
	removeAdmin,
	removeDoctor,
	removePatient,
	getMyInfo,
	viewDoctorRequest,
	doctorApproval,
	doctorRejection,
	viewAllDoctorRequests,
	addPackages,
	deletePackages,
	updatePackages,
	renderDashboard,
	getPackages,
	getPackage,
	getAdmins,
	getDoctors,
	getPatients,
	resetPassword,
	sendOTP,
	verifyOTP,
	changePassword,
} = require("../controllers/adminController");

const { protectAdmin } = require("../middleware/adminMiddleware");

router.get("/", renderDashboard);

router.get("/my-info", protectAdmin, getMyInfo);
router.get("/view-doctor/:id", protectAdmin, viewDoctorRequest);
router.get("/view-requested-doctors", protectAdmin, viewAllDoctorRequests);
router.get("/get-packages", protectAdmin, getPackages);
router.get("/get-admins", protectAdmin, getAdmins);
router.get("/get-doctors", protectAdmin, getDoctors);
router.get("/get-patients", protectAdmin, getPatients);

router.post("/login", loginAdmin);
router.post("/create-admin", protectAdmin, createAdmin);
router.post("/add-packages", protectAdmin, addPackages);
router.post("/request-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.post("/change-password", protectAdmin, changePassword);
router.post("/get-package", protectAdmin, getPackage);

router.delete("/remove-doctor/:id", protectAdmin, removeDoctor);
router.delete("/remove-patient/:id", protectAdmin, removePatient);
router.delete("/remove-admin/:id", protectAdmin, removeAdmin);
router.delete("/remove-package/:id", protectAdmin, deletePackages);

router.put("/doctor-approval/:id", protectAdmin, doctorApproval);
router.put("/doctor-rejection/:id", protectAdmin, doctorRejection);
router.put("/update-package/:id", protectAdmin, updatePackages);

module.exports = router;
