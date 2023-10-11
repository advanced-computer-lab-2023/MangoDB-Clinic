const asyncHandler = require("express-async-handler");
const Patient = require("../models/patientModel");
const mongoose = require("mongoose");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");

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

  res.status(200).json(workout);
};

//Create a patient
const addPatient = async (req, res) => {
  const {
    username,
    name,
    email,
    password,
    dob,
    gender,
    mobileNumber,
    emergencyContact,
  } = req.body;

  try {
    const patient = await Patient.create({
      username,
      name,
      email,
      password,
      dob,
      gender,
      mobileNumber,
      emergencyContact,
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
  const id = req.user._id;

  try {
    const patient = await Patient.findById(id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.status(200).json(patient.family);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

//Filter appointments by Date/Status
const filterAppointments = asyncHandler(async (req, res) => {
  const { status, date_1, date_2 } = req.body;

  const doctor = await Doctor.findById(req.params.id);
  if (doctor) {
    const filteredAppointments = doctor.appointments.filter((appointment) => {
      if (status != "All") {
        const Date1 = new Date(date_1);
        const Date2 = new Date(date_2);
        if (Date1 && Date2 && typeof date_2 !== "undefined") {
          const WithinRange =
            appointment.date >= Date1 &&
            appointment.date <= Date2 &&
            appointment.status == status;
          return WithinRange;
        }

        if (Date1 && typeof date_2 === "undefined") {
          const ondate = appointment.date.toString() == Date1;
          return ondate;
        }

        if (typeof Date1 === "undefined" && typeof Date2 === "undefined")
          return appointment.status == status;
      }
      if (status == "All") {
        const Date_1 = new Date(date_1);
        const Date_2 = new Date(date_2);

        if (Date_1 && Date_2 && typeof date_2 !== "undefined")
          return appointment.date >= Date_1 && appointment.date <= Date_2;

        if (Date_1 && typeof date_2 === "undefined") {
          return appointment.date.toString() == Date_1;
        }
      }
    });
    res.status(200).json({ filteredAppointments });
  } else {
    res.status(404).json({ message: "Appointment not found" });
  }
});

//View a list of all doctors along with their specialty, session price(based on subscribed health package if any)
const viewAllDoctors = asyncHandler(async (req, res) => {
  try {
    const doctors = await Doctor.find({})
      .sort({ createdAt: -1 })
      .select("specialty hourlyRate");
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
    const { name, specialty } = req.query;
    const query = {};
    if (name) {
      query.name = { $regex: search, $options: "i" };
    }
    if (specialty) {
      query.use = { $regex: use, $options: "i" };
    }

    const doctor = await Doctor.find(query);

    res.json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while searching for Doctor" });
  }
});

//Filter a doctor by specialty and/or availability on a certain date and at a specific time.
const filterDoctor = asyncHandler(async (req, res) => {
  const { status, date_1, date_2 } = req.body;

  const doctor = await Doctor.findById(req.params.id);
  if (doctor) {
    const filteredAppointments = doctor.appointments.filter((appointment) => {
      if (status != "All") {
        const Date1 = new Date(date_1);
        const Date2 = new Date(date_2);
        if (Date1 && Date2 && typeof date_2 !== "undefined") {
          const WithinRange =
            appointment.date >= Date1 &&
            appointment.date <= Date2 &&
            appointment.status == status;
          return WithinRange;
        }

        if (Date1 && typeof date_2 === "undefined") {
          const ondate = appointment.date.toString() == Date1;
          return ondate;
        }

        if (typeof Date1 === "undefined" && typeof Date2 === "undefined")
          return appointment.status == status;
      }
      if (status == "All") {
        const Date_1 = new Date(date_1);
        const Date_2 = new Date(date_2);

        if (Date_1 && Date_2 && typeof date_2 !== "undefined")
          return appointment.date >= Date_1 && appointment.date <= Date_2;

        if (Date_1 && typeof date_2 === "undefined") {
          return appointment.date.toString() == Date_1;
        }
      }
    });
    const filteredDoctors = filteredAppointments.select("doctorName");
    res.status(200).json({ filteredDoctors });
  } else {
    res.status(404).json({ message: "No Doctor found" });
  }
});

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
    filterAppointments,
    viewAllDoctors,
    searchDoctor,
    filterDoctor,
};
