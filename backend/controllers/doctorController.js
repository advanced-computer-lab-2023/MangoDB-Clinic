const asyncHandler = require('express-async-handler');
const Doctor = require('../models/doctorModel.js');
const doctorModel = require('../models/doctorModel.js');
const Patient = require('../models/patientModel.js');
const AppointmentModel = require('../models/appointmentModel');
const Appointment = require('../models/appointmentModel');


const updateEmail = async (req, res) => {
    const { email } = req.body;
    const doctorId = req.params.id; 

    try {
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, { email }, { new: true });
        res.status(200).json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating email" });
    }
};

   const updateHourlyRate = async (req, res) => {
   
    const {hourlyRate}= req.body;
        const doctorId = req.params.id;
    
        try{
            const doctor = await doctorModel.findByIdAndUpdate(doctorId,{hourlyRate},{new: true});
            res.status(200).json(doctor);
        }
        catch (error){
            console.error(error);
            res.status(500).json({ error: "error updating hourly rate"});
        }
   }

   const updateAffiliation = async (req, res) => {
   
    const {affiliation} = req.body;
        const doctorId = req.params.id;
    
        try{
            const doctor = await doctorModel.findByIdAndUpdate(doctorId,{affiliation}, {new: true});
            res.status(200).json(doctor);
        }
        catch (error){
            console.error(error);
            res.status(500).json({ error: "error updating Affiliation"});
        }
   }


const searchPatientByName = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const { patientName } = req.body;

        console.log('Doctor ID:', doctorId);
        console.log('Patient Name:', patientName);

        const appointments = await Appointment.find({
            doctorId: doctorId,
            patientName: patientName,
        });

        const patientIds = [];

        for (const appointment of appointments) {
            patientIds.push(appointment.patientId);
        }

        const patients = await Patient.find({ _id: { $in: patientIds } });

        if (patients.length > 0) {

            res.json(patients);
        } else {
     
            res.status(404).json({ error: 'No matching patients found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};



const viewAllPatients = async (req, res) => {
    try {
      const docId = req.params.id;
      const appointments = await Appointment.find({ doctorId: docId });
  
      if (!appointments || appointments.length === 0) {
        return res.status(404).json({ message: 'No appointments found for this doctor.' });
      }
  
      const patientIds = appointments.map((appointment) => appointment.patientId);
      
      const patients = await Patient.find({ _id: { $in: patientIds } });
  
      if (!patients || patients.length === 0) {
        return res.status(404).json({ message: 'No patients found for this doctor.' });
      }
  
      res.status(200).json(patients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving patients' });
    }
  };

   
   const createDoctor = async (req, res) => {

    const {
        firstName, lastName, email, dob, username, password, hourlyRate, affiliation
    } = req.body;

    try {
        console.log('Creating doctor with data:', firstName, lastName, email, dob, username, password, hourlyRate, affiliation);

        const doctor = await Doctor.create({
            firstName, 
            lastName, 
            email, 
            dob, 
            username, 
            password, 
            hourlyRate, 
            affiliation
        });
        if (!doctor) {
            return res.status(500).json({ error: 'Doctor creation failed' });
        }

        res.status(201).json(doctor);
    } catch (error) {
        console.error('Error creating doctor:', error);
        res.status(500).json({ error: error.message });
    }
};

   const createPatient = async (req, res) => {

    const {
        name, email, username, password, mobile,dob,gender,emergency, family
    } = req.body;

    try {
        console.log('Creating patient with data:', name, email, username, password,mobile,dob,gender,emergency, family);

        const patient = await Patient.create({
             name,
             email, 
             username,
             password,
             mobile,
             dob,
             gender,
             emergency, 
             family
        });
        if (!patient) {
            return res.status(500).json({ error: 'patient creation failed' });
        }

        res.status(201).json(patient);
    } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({ error: error.message });
    }
};

const createAppointment = async (req, res) => {
    const { doctorId, patientId, doctorName, patientName } = req.body;

    try {
        console.log('Creating appointment with data:', doctorId, patientId, doctorName, patientName);

        const appointment = await Appointment.create({
            doctorId,
            patientId, 
            doctorName, 
            patientName
        });
        if (!appointment) {
            return res.status(500).json({ error: 'Appointment creation failed' });
        }

        res.status(201).json(appointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ error: error.message });
    }
};
module.exports ={
    createDoctor,updateEmail,updateHourlyRate,updateAffiliation,createPatient,createAppointment,searchPatientByName,viewAllPatients
}
