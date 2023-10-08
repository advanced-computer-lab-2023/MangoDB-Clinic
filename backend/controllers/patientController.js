const asyncHandler = require('express-async-handler')
const Patient = require('../models/patientModel')
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

    res.status(200).json(workout)
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

    const patient = await patient.findOneAndUpdate({_id: id}, { ...req.body })

    if(!patient){
        return res.status(404).json({error: 'No such patient found'})
    }

    res.status(200).json(patient)
}

//Delete a patient
const deletPatient = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such patient found'})
    }

    const patient = await patient.findOneAndDelete({_id: id})

    if(!patient){
        return res.status(404).json({error: 'No such patient found'})
    }

    res.status(200).json(patient)
}

//Add family member
const addFamilyMember = async (req, res) => {
    const id = req.params.id

    try {
        const patient = await Patient.findById(id)
        if (!patient)
            return res.status(404).json({ message: 'Patient not found' });

        patient.family.push(...req.body.family)
        await patient.save()
        res.status(200).json(patient)

    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
}

module.exports = {
    getAllPatients,
    getPatient,
    addPatient,
    updatePatient,
    deletePatient,
    addFamilyMember
}