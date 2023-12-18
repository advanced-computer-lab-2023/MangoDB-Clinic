const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { protectPatient } = require("../middleware/patientMiddleware");

const {
	getMyInfo,
	getAllPatients,
	getPatient,
	addPatient,
	updatePatient,
	deletePatient,
	addFamilyMember,
	getFamilyMembers,
	getSelectedDoctor,
	getAllPrescriptions,
	getAllPrescriptionsOfPatient,
	filterPrescription,
	selectPrescription,
	filterDoctors,
	searchDoctor,
	viewAllDoctors,
	getAllAppointments,
	filterAppointments,
	addAppointment,
	addPrescription,
	viewHealthRecords,
	viewHealthPackages,
	viewSubscribedhealthPackage,
	viewWallet,
	addDocuments,
	deleteDocument,
	linkFamilyMember,
	subscribeToHealthPackage,
	upcoming,
	filterStatus,
	payFromWallet,
	cancelHealthPackage,
	getSpecialities,
	loginPatient,
	resetPassword,
	sendOTP,
	verifyOTP,
	getAvailableAppointments,
	makeAppointment,
	changePassword,
	cancelApp,
	rescheduleAppointment,
	payPescriptionWallet,
	viewSelectedPrescription,
	requestFollowUp,
	downloadPrescription,
	clearNotifs,
	createVideoChat,
	checkHealthPackageSubscription,
	seenNotifs,
	payHealthPackageWithWallet,
	getPatient2
} = require("../controllers/patientController");

router.get("/myInfo", protectPatient, getMyInfo);

router.post("/login", loginPatient);
router.post("/request-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.post("/change-password", protectPatient, changePassword);
router.post("/createVideoChat/:doctorId", protectPatient, createVideoChat);

//GET all patients
router.get("/get_all_patients", getAllPatients);

router.get(
	"/viewSelectedPrescription/:prescriptionId",
	viewSelectedPrescription
);

//GET a single patient
router.post("/get_patient", getPatient);
router.get("/getPatient2", protectPatient, getPatient2);

//POST a single patient
router.post("/add_patient", addPatient);

//DELETE a single patient
router.delete("/delet_patient/:id", deletePatient);

//UPDATE a single patient
router.put("/update_patient/:id", updatePatient);

router.put("/add_family_member/", protectPatient, addFamilyMember);

router.get("/get_family_members/", protectPatient, getFamilyMembers);

router.get("/get_selected_doctor/:id", getSelectedDoctor);

router.get("/get_all_prescriptions/:id", getAllPrescriptions);

//GET all prescriptions of a single patient
router.get("/get_prescriptions_of_patient", protectPatient, getAllPrescriptionsOfPatient);

//filter prescriptions
router.get("/filter_prescription", protectPatient, filterPrescription);

//select a prescription from my list of prescriptions
router.get("/select_prescription", protectPatient, selectPrescription);

router.get("/get_all_doctors", protectPatient, viewAllDoctors);

router.get("/filter_doctors", protectPatient, filterDoctors);

router.get("/get_all_appointments", protectPatient, getAllAppointments);

router.get("/filter_appointments", protectPatient, filterAppointments);
// =======
// router.get("/filter_appointments/",protectPatient, filterAppointments);
// >>>>>>> frontend

router.get("/search_doctor", protectPatient, searchDoctor);

router.get("/view_health_records/", protectPatient, viewHealthRecords);

router.get("/view_health_packages", protectPatient, viewHealthPackages);

router.get(
	"/view_subscribed_health_package/",
	protectPatient,
	viewSubscribedhealthPackage
);

router.get("/check_health_package_subscription", protectPatient, checkHealthPackageSubscription);

router.get("/pay_package_with_wallet/:packageId", protectPatient, payHealthPackageWithWallet);

router.put("/cancel_health_package", protectPatient, cancelHealthPackage);

router.get("/downloadPrescription/", protectPatient, downloadPrescription);

router.get("/view_wallet", protectPatient, viewWallet);

router.put(
	"/add_documents",
	upload.array("document"), protectPatient,
	addDocuments
);

router.delete(
	"/delete_document/:patientId/:documentId",

	deleteDocument
);

router.put("/link_family_member/", protectPatient, linkFamilyMember);

router.put(
	"/subscribe_to_health_package/:packageId",
	protectPatient,
	subscribeToHealthPackage
);

// utils
router.post(
	"/add_prescription/:doctorId/:patientId",

	addPrescription
);
router.post(
	"/add_appointment/:doctorId/:patientId",

	addAppointment
);
router.get("/get_specialities", getSpecialities);
router.get(
	"/getAvailableAppointments",
	protectPatient,
	getAvailableAppointments
);

router.get(
	"/get_available_appointments/:id",
	protectPatient,
	getAvailableAppointments
);

router.post("/make_appointment", protectPatient, makeAppointment);

router.post("/upcoming", protectPatient, upcoming);

router.post("/filterapp", protectPatient, filterStatus);

router.post("/payFromWallet/:appointmentId", payFromWallet);

router.patch("/cancelApp", protectPatient, cancelApp);

router.patch("/rescheduleAppointment", protectPatient, rescheduleAppointment);

router.post(
	"/payPescriptionWallet/:totalPrice",
	protectPatient,
	payPescriptionWallet
);

router.post("/requestFollowUp", protectPatient, requestFollowUp);

router.patch("/clearNotifs", protectPatient, clearNotifs);
router.patch("/seenNotifs", protectPatient, seenNotifs)

module.exports = router;
