const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const Prescription = require('../models/prescriptionModel')
const Patient = require('../models/patientModel')
const Doctor = require('../models/doctorModel')
const Appointment = require('../models/appointmentModel')

const renderDashboard = (req, res) => {
  res.status(200).render('patientDashboard')
}

const renderAddFamilyMember = (req, res) => {
  res.status(200).render('addFamilyMember')
}

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

  try {
    const patient = await Patient.create({ name, email, password, dob, gender, mobile, emergencyContact, family, prescriptions })
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
  const id = req.params.id

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
  const { patientId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    return res.status(404).json({ error: 'Id Not Found' });
  }

  try {
    const patient = await Patient.findById(patientId).populate({
      path: 'prescriptions',
      populate: {
        path: 'doctor',
        model: 'Doctor'
      }
    })

    if (!patient) {
      return res.status(404).json({ error: 'Patient Not Found' });
    }

    const prescriptions = patient.prescriptions
    prescriptions.forEach(async prescription => {
      const doctorName = prescription.doctor.firstName
    });

    res.status(200).json(patient.prescriptions);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const selectPrescription = async (req, res) => {
  const { prescriptionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(prescriptionId)) {
    return res.status(404).json({ error: 'Id Not Found' });
  }

  try {

    const prescription = await Prescription.findById(prescriptionId).populate('doctor');

    if (!prescription) {
      return res.status(404).json({ error: 'Prescription Not Found' });
    }

    res.status(200).json(prescription);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


const filterPrescription = async (req, res) => {
  const patient = await Patient.findById(req.params.patientId).populate('prescriptions')

  if (!patient) {
    return res.status(404).json({ error: 'Patient Id Not Found' });
  }

  // if (!mongoose.Types.ObjectId.isValid(patientId)) {
  //     return res.status(404).json({ error: 'Patient Id Not Found' });
  // }

  try {
    const { doctor, filled, date } = req.query
    const query = {}

    if (doctor) {
      query['doctor'] = doctor;
    }

    if (filled) {
      if (filled === 'true') {
        query['filled'] = true;
      } else if (filled === 'false') {
        query['filled'] = false;
      }
    }
    if (date) {
      query.date = new Date(date);
    }

    const filteredPrescriptions = await Prescription.find({
      _id: { $in: patient.prescriptions },
      ...query
    }).populate('doctor')

    res.status(200).json(filteredPrescriptions)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Filter appointments by Date/Status
const filterAppointments = async (req, res) => {
  let { status, date_1, date_2 } = req.query;

  const patient = await Patient.findById(req.params.id);
  const appoint = await Appointment.find({ patientId: req.params.id })

  if (patient) {
    if (!status && !date_1 && !date_2)
      return res.status(200).json(appoint)
    if (!status)
      status = 'All'
    const filteredAppointments = appoint.filter(appointment => {
      if (status !== 'All') {
        const Date1 = new Date(date_1);
        const Date2 = new Date(date_2);

        if (Date1 && Date2 && typeof date_2 !== 'undefined') {
          const WithinRange = appointment.date >= Date1 && appointment.date <= Date2 && appointment.status == status;
          return WithinRange;
        }

        if (Date1 && typeof date_1 !== 'undefined' && typeof date_2 === 'undefined') {
          const ondate = appointment.date.toISOString().split('T')[0] === Date1.toISOString().split('T')[0];
          return ondate;
        }

        if (typeof date_1 === 'undefined' && typeof date_2 === 'undefined')
          return appointment.status == status;
      }
      else if (status === 'All') {
        const Date_1 = new Date(date_1);
        const Date_2 = new Date(date_2);

        if (Date_1 && Date_2 && typeof date_2 !== 'undefined')
          return (appointment.date >= Date_1 && appointment.date <= Date_2);

        if (Date_1 && typeof date_1 !== 'undefined' && typeof date_2 === 'undefined')
          return (appointment.date.toISOString().split('T')[0] === Date_1.toISOString().split('T')[0]);

        if (typeof date_1 === 'undefined' && typeof date_2 === 'undefined')
          return (appointment);
      }
    });
    res.status(200).json({ filteredAppointments });
  }
  else
    res.status(404).json({ message: 'Doctor not found' });
}


//View a list of all doctors along with their specialty, session price(based on subscribed health package if any)
const viewAllDoctors = asyncHandler(async (req, res) => {
  try {
    const doctors = await Doctor.find({})
      .sort({ createdAt: -1 })
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
    const { name, speciality } = req.query;
    const query = {};
    if (name) {
      firstName = name.split(' ')[0]
      query.firstName = { $regex: firstName, $options: "i" };
      lastName = name.split(' ')[1]//.trim()
      if (typeof lastName === "string" && lastName.length > 0)
        query.lastName = { $regex: lastName, $options: "i" };
    }
    if (speciality)
      query.speciality = { $regex: speciality, $options: "i" };

    const doctor = await Doctor.find(query);
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: "Error while searching for Doctor" });
  }
});


const filterDoctors = async (req, res) => {
  const { datetime, speciality } = req.query;

  try {
    const query = {}

    if (speciality)
      query.speciality = speciality

    if (datetime) {
      const appointmentsForDate = await Appointment.find({ date: new Date(datetime) })
      const doctorIdsWithAppointments = appointmentsForDate.map(appointment => appointment.doctorId)
      query._id = { $nin: doctorIdsWithAppointments }
    }
    const filteredDoctors = await Doctor.find(query)

    res.status(200).json(filteredDoctors)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
};


/////////////////////////////////

// UTILS

const addAppointment = async (req, res) => {
  const docid = req.params.doctorId
  const patid = req.params.patientId

  const data = req.body
  try {
    const app = await Appointment.create({ doctorId: docid, patientId: patid, ...data })
    res.status(200).json(app);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const addPrescription = async (req, res) => {
  const docid = req.params.id
  const data = req.body

  try {
    const pres = await Prescription.create({ doctor: docid, ...data })
    res.status(200).json(pres)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
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
  getAllPrescriptions,
  filterPrescription,
  selectPrescription,
  filterAppointments,
  viewAllDoctors,
  searchDoctor,
  filterDoctors,
  addAppointment,
  addPrescription,
  renderDashboard,
  renderAddFamilyMember,
}