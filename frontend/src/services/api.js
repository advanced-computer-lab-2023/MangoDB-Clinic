import axios from 'axios';

const port = 4000

const API = axios.create({
    baseURL: `http://localhost:${port}`, // backend API URL
    timeout: 5000, // Timeout duration
    headers: {
        'Content-Type': 'application/json',
    },
});

//API requests
export const getPatients = () => API.get('/patients');
export const addPatient = (patient) => API.post('/patientRegistration', patient);
export const viewRegFamMembers = (id) => API.get(`/Patient/get_family_members/${ id }`);
export const linkFam = (id, family) => {
    const familyData = family.map(member => ({
        name: member.name,
        nationalID: member.nationalID,
        age: member.age,
        gender: member.gender,
        relation: member.relation
        // Add other fields as needed
    }));

    return API.put(`/Patient/add_family_member/${id}`, { family: familyData });
};export const addSlots= (id,weekday,startTime,endTime) => API.patch(`/doctor/addSlots/${id}`,{weekday,startTime,endTime})
export const getHealthRecords = (id) => API.get(`/Patient/view_health_records/${ id }`);

export const getPatientsDoctor = (id) => API.get(`/doctor/viewAllPatients/${ id }`);
export const selectPatient = (id) => API.get(`/doctor/selectedPatient/${ id }`);

export const getSelectedDoctor = (id) => API.get(`/patient/get_selected_doctor/${ id }`);


const API2 = axios.create({
    baseURL: `http://localhost:${port}`,
    timeout: 5000,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
export const addDoctor = (doctor) => API2.post('/doctorRegistration', doctor)



export default API;
