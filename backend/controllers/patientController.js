const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

const Patient = require('../models/patientModel')
const Doctor = require('../models/doctorModel')
const Prescription = require('../models/prescriptionModel')

//Get all patients
const getAllPatients = async (req, res) => {
    const patients = await Patient.find({}).sort({ createdAt: -1 })
    res.status(200).json(patients)
}

//Get a single patient
const getPatient = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such patient found' })
    }

    const patient = await Patient.findById(id)

    if (!patient) {
        return res.status(404).json({ error: 'No such patient found' })
    }

    res.status(200).json(patient)
}

//Create a patient
//
const addPatient = async (req, res) => {
    const {
        name, email, password, dob, gender, mobile, emergencyContact, family, prescriptions
    } = req.body

    try{
        const patient = await Patient.create({name, email, password, dob, gender, mobile, emergencyContact, family, prescriptions})
        res.status(201).json(patient)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

//Update a patient
const updatePatient = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such patient found' })
    }

    const patient = await Patient.findOneAndUpdate({ _id: id }, { ...req.body })

    if (!patient) {
        return res.status(404).json({ error: 'No such patient found' })
    }

    res.status(200).json(patient)
}

//Delete a patient
const deletePatient = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such patient found' })
    }

    const patient = await Patient.findOneAndDelete({ _id: id })

    if (!patient) {
        return res.status(404).json({ error: 'No such patient found' })
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
        if (!patient)
            return res.status(404).json({ message: 'Patient not found' })

        res.status(200).json(patient.family)
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

const getSelectedDoctor = asyncHandler(async (req, res) => {
    const doctor_id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(doctor_id)) {
        return res.status(404).json({ error: 'Doctor Not Found1' })
    }

    const doctor = await Doctor.findById(doctor_id)

    if (!doctor) {
        return res.status(404).json({ error: 'Doctor Not Found' })
    }

    res.status(200).json(doctor)
})


const getAllPrescriptions = async (req, res) => {
    const {patientId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(404).json({ error: 'Id Not Found' });
    }

    try {
      const patient = await Patient.findById(patientId).populate('prescriptions');
  
      if (!patient) {
        return res.status(404).json({ error: 'Patient Not Found' });
      }
  
      res.status(200).json(patient.prescriptions);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const selectPrescription = async (req, res) => {
    const {patientId } = req.params;
    const { prescriptionId } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(404).json({ error: 'Id Not Found' });
    }

    try {
        const patient = await Patient.findById(patientId).populate('prescriptions');

        if (!patient) {
            return res.status(404).json({ error: 'Patient Not Found' });
        }

        const singlePrescription = patient.prescriptions.find((prescription) =>
            prescription._id.equals(prescriptionId)
        );

        if (!singlePrescription) {
            return res.status(404).json({ error: 'Prescription Not Found' });
        }
  
        res.status(200).json(singlePrescription);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const filterPrescription = async (req, res) => {
    const { patientId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
        return res.status(404).json({ error: 'Patient Id Not Found' });
    }

    try {
        const patient = await Patient.findById(patientId).populate('prescriptions');

        if (!patient) {
            return res.status(404).json({ error: 'Patient Not Found' });
        }

        let filteredPrescriptions = patient.prescriptions;

        // Check if the "doctor" query parameter is provided
        if (req.query.doctor) {
            const doctorName = req.query.doctor;
            filteredPrescriptions = filteredPrescriptions.filter((prescription) => {
                filterPrescription = prescription.doctor.name === doctorName;
            });
        }

        // Check if the "date" query parameter is provided
        else if (req.query.date) {
            const date = req.query.date;
            filteredPrescriptions = filteredPrescriptions.filter((prescription) => {
                filteredPrescriptions = prescription.date.toISOString().split('T')[0] === date;
            });
        }
        
        // Check if the "filled" query parameter is provided
        else if (req.query.filled) {
            const isFilled = req.query.filled === 'true';
            filteredPrescriptions = filteredPrescriptions.filter((prescription) => {
                filteredPrescriptions = prescription.filled === isFilled;
            });
        }

        res.status(200).json(filteredPrescriptions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
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
    filterPrescription
}