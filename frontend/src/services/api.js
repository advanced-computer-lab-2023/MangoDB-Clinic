import axios from "axios";

const port = 4000;

const API = axios.create({
	baseURL: `http://localhost:${port}`, // backend API URL
	timeout: 5000, // Timeout duration
	headers: {
		"Content-Type": "application/json",
	},
});

//API requests
export const getPatients = () => API.get("/patients");

export const getPatient2 = () => API.get("/patient/getPatient2", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const addPatient = (patient) =>
	API.post("/patientRegistration", patient);

export const uploadHealthRecord = (id, files) =>
	API.put(`/patient/add_documents`, files, {
		headers: { "Content-Type": "multipart/form-data" ,
		Authorization: `Bearer ${localStorage.getItem("token")}` }
	});

export const getDoctor = () => API.get(`/doctor/doctorInfo`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
export const getPatient = () => API.get(`/patient/get_patient`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
export const getPatientInfo = () => API.get(`/patient/myInfo`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const clearNotifsPatient = (id) => API.patch('/patient/clearNotifs', { id }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
export const clearNotifsDoctor = (id) => API.patch('/doctor/clearNotifs', { id }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
export const seenNotifsDoctor = () => API.patch('/doctor/seenNotifs', {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
export const seenNotifsPatient = () => API.patch('/patient/seenNotifs', {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const statusEnum = () => API.get("/doctor/statusOptions");

export const getPatientsDoctor = () =>
	API.get(`/doctor/viewAllPatients`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const searchPatients = (firstName) =>
	API.post(`/doctor/searchPatientByName`, { firstName }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const upcomingApp = () =>
	API.post("/doctor/upcoming", {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const selectPatient = (id) => API.get(`/doctor/selectedPatient/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const updateDoctorEmail = (doctor) =>
	API.put(`/doctor/updateEmail`, doctor, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const updateDoctorRate = (doctor) =>
	API.put(`/doctor/updateHourlyRate`, doctor, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const updateDoctorAffiliation = (doctor) =>
	API.put(`/doctor/updateAffiliation`, doctor, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const viewRegFamMembers = () =>
	API.get(`/patient/get_family_members`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const linkFam = ( family) => {
	const familyData = family.map((member) => ({
		name: member.name,
		nationalID: member.nationalID,
		age: member.age,
		gender: member.gender,
		relation: member.relation,
		// Add other fields as needed
	}));

	return API.put(`/Patient/add_family_member`, { family: familyData }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
};

export const linkPatAsFam = ( email, mobile, relation) => {
	

		console.log("hena68");
	return API.put(`/Patient/link_family_member`,{email,mobile,relation}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
};
// export const addSlots = (id, weekday, startTime, endTime) =>
// 	API.patch(`/doctor/addSlots/${id}`, { weekday, startTime, endTime });
	export const addSlots = (weekday, startTime, endTime) =>
	API.patch(`/doctor/addSlots`, { weekday, startTime, endTime }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
export const getHealthRecords = () =>
	API.get(`/Patient/view_health_records`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const getEmploymentContract = async () => {
	try {
		const response = await API.get(`/doctor/viewEmploymentContract`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
		return response.data; // You might receive the PDF blob or link here
	} catch (error) {
		throw new Error("Failed to fetch employment contract");
	}
};

export const getMyAppointments = () =>
	API.get(`/doctor/getMyAppointments`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const filterAppointments = (query) =>
	API.post("/doctor/filterapp", query, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const viewWallet = () => API.get(`/patient/view_wallet`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const viewWalletDoctor = () => API.get(`/doctor/view_wallet`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const viewPatientAppointments = () =>
	API.get(`/patient/get_all_appointments`,{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const upcomingPatientApp = () =>
	API.post("/patient/upcoming", {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const filterPatientAppointments = (query) =>
	API.post("/patient/filterapp", query, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const checkout = (id, items) =>
	API.post(`/payments/create-checkout-session/${id}`, { items });

export const checkout1 = (packageName, items) =>
	API.post(`/payments/create-checkout-session-packages/${packageName}`, { items });

export const checkoutWithWallet = (packageId) =>
	API.get(`/patient/pay_package_with_wallet/${packageId}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
);

export const checkout2 = (id, items) =>
API.post(`/payments/create-checkout-session-daaaaaaa/${id}`, { items });

export const wallet = (appointmentId) =>
	API.post(`/patient/payFromWallet/${appointmentId}`);

export const getSelectedDoctor = (id) =>
	API.get(`/patient/get_selected_doctor/${id}`);

export const addAppointment = (patientId, doctorId, date) =>
	API.get(`/patient/add_appointment/${patientId}/${doctorId}`, date);

export const scheduleFollowup = (
	doctorId,
	patientId,
	appointmentId,
	followUpDate
) =>
	API.patch(
		`/doctor/scheduleFollowup/${doctorId}/${patientId}/${appointmentId}/${followUpDate}`
	);

export const subscribeToHealthPackage = (packageId) =>
	API.put(
		`/subscribe_to_health_package/${packageId}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
	);

export const viewAllDoctors = () =>
	API.put(`/patient/get_all_doctors/`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const cancelHealthPackage = () =>
	API.put(`/patient/cancel_health_package/`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const viewSubscribedhealthPackage = () =>
	API.get(`/patient/view_subscribed_health_package/`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

//////////////////////////////////////////////////////////// sprint 3 ////////////////////////////////////////////////////////////
export const doctorRescheduleApp = (appointment) =>
	API.patch(`doctor/rescheduleApp`, appointment, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const doctorCancelApp = (appointment) =>
	API.patch(`doctor/cancelApp`, appointment, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const patientCancelApp = (appointment) =>
	API.patch(`patient/cancelApp`, appointment, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const patientReschuleApp = (appointmentId, newDate) =>
	API.patch(`patient/rescheduleAppointment`, {appointmentId, newDate}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const patientReqFollowup = (appId, date) =>
API.post(`patient/requestFollowUp`, {appId, date}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const patientPayPrescription = (totalPirce) =>
API.post(`patient/payPescriptionWallet ${totalPirce}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });	


export const viewChats = () =>
API.get('/Doctor/viewChats', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
  
export const getAllPharmacists = () => API.get(`/Doctor/getAllPharmacists`,{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const createChat = (pharmacistFirstName, pharmacistLastName) => API.post("/Doctor/createChat",{ pharmacistFirstName,pharmacistLastName },{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const getChat = ({ pharmacistId }) =>
API.post("/Doctor/getChat", { pharmacistId }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
  .then((response) => response.data)
  .catch((error) => {
    console.error("Error fetching chat:", error);
    throw error;
  });

export const sendMessage = ( messageText, receiverId) => API.post("/Doctor/sendMessage",{ messageText, receiverId},{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const getPharmacistbyId = (id) => API.get(`/Doctor/getPharmacistById/${id}`);


const API2 = axios.create({
	baseURL: `http://localhost:${port}`,
	timeout: 5000,
	headers: {
		"Content-Type": "multipart/form-data",
	},
});

export const addDoctor = (doctor) => API2.post("/doctorRegistration", doctor);

export default API;
