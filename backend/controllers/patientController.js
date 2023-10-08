const asyncHandler = require('express-async-handler')
const Patient = require('../models/patientModel')
const Doctor = require('../models/doctorModel')
const mongoose = require('mongoose')

//Get all patients
const getAllPatients = async (req, res) => {
    const patients = await Patient.find({}).sort({createdAt: -1})
    res.status(200).json(patients)
}

//Get a single patient
const getPatient = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such patient found'})
    }

    const patient = await Patient.findById(id)

    if(!patient){
        return res.status(404).json({error: 'No such patient found'})
    }

    res.status(200).json(patient)
}

//Create a patient
const addPatient = async (req, res) => {
    const {
        username, name, email, password, dob, gender, mobileNumber, emergencyContact
    } = req.body

    try{
        const patient = await Patient.create({username, name, email, password, dob, gender, mobileNumber, emergencyContact})
        res.status(201).json(patient)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

//Update a patient
const updatePatient = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such patient found'})
    }

    const patient = await Patient.findOneAndUpdate({_id: id}, { ...req.body })

    if(!patient){
        return res.status(404).json({error: 'No such patient found'})
    }

    res.status(200).json(patient)
}

//Delete a patient
const deletePatient = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such patient found'})
    }

    const patient = await Patient.findOneAndDelete({_id: id})

    if(!patient){
        return res.status(404).json({error: 'No such patient found'})
    }

    res.status(200).json(patient)
}

//Add family member
const addFamilyMember = asyncHandler(async (req, res) => {
    const id = req.params.id

    try {
        const patient = await Patient.findById(id)
        if (!patient)
            return res.status(404).json({ message: 'Patient not found' })

        patient.family.push(...req.body.family)
        await patient.save()
        res.status(200).json(patient)

    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

const getFamilyMembers = asyncHandler(async (req, res) => {
    const id = req.user._id

    try {
        const patient = await Patient.findById(id)
        if(!patient)
            return res.status(404).json({ message: 'Patient not found'})

        res.status(200).json(patient.family)
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong'})
    }
})

const getSelectedDoctor = async (req, res) => {
    const {doctor_id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(doctor_id)) {
        return res.status(404).json({error: 'Doctor Not Found'})
    }

    const doctor = await Doctor.findById(doctor_id)

    if(!doctor){
        return res.status(404).json({error: 'Doctor Not Found'})
    }

    res.status(200).json(doctor)
}

const getAllPrescriptions = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Id Not Found' });
    }
  
    try {
      // populating the 'prescription.doctor' field with the doctor's data
      const patient = await Patient.findById(id).populate('prescription.doctor');
  
      if (!patient) {
        return res.status(404).json({ error: 'Patient Not Found' });
      }

      const prescriptionsWithDoctorNames = patient.prescription.map((prescription) => ({
        medicationName: prescription.medicationName,
        frequency: prescription.frequency,
        doctorName: prescription.doctor.name, // Access the doctor's name
      }));
  
      res.status(200).json(prescriptionsWithDoctorNames);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPrescription = async (req, res) => {
    
}
  


module.exports = {
    getAllPatients,
    getPatient,
    addPatient,
    updatePatient,
    deletePatient,
    addFamilyMember,
    getFamilyMembers,
    getSelectedDoctor,
    getAllPrescriptions
}