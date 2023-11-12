const asyncHandler = require('express-async-handler');
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel.js');
const Appointment = require('../models/appointmentModel');
const Prescription = require('../models/prescriptionModel');
const User = require('../models/userModel')
const fs = require('fs');
const path = require('path');


// FILTER APPOITMENT USING STATUS OR DATE
const filterStatus = async (req, res) => {
    const { status, date_1, date_2, doctor } = req.body;
    console.log(status, date_1, date_2, doctor)
    if (!status) {
        return res.status(400).json({ message: 'Please enter status' });
    }

    const appoint = await Appointment.find({ 'doctorId': doctor });
    const filteredAppointments = appoint.filter(appointment => {
        if (status !== 'All') {

            const Date1 = new Date(date_1);
            const Date2 = new Date(date_2);

            if (Date1 && Date2) {
                if (appointment.date >= Date1 && appointment.date <= Date2 && appointment.status === status) {
                    return true;
                }
            } else if (Date1 && !date_2) {
                if (appointment.date.toDateString() === Date1.toDateString() && appointment.status === status) {
                    return true;
                }
            }
        } else if (status === 'All') {
            const Date_1 = new Date(date_1);
            const Date_2 = new Date(date_2);

            if (Date_1 && Date_2) {
                if (appointment.date >= Date_1 && appointment.date <= Date_2) {
                    return true;
                }
            } else if (Date_1 && !date_2) {
                if (appointment.date.toDateString() === Date_1.toDateString()) {
                    return true;
                }
            }
        }
    });

    // GET PATIENT NAME
    const result = filteredAppointments.map(async (appointment) => {
        const patient = await Patient.findById(appointment.patientId);

        return {
            ...appointment,
            patientFirstName: patient.firstName,
            patientLastName: patient.lastName 
        };
    });

    const resolvedResult = await Promise.all(result);

    const mergedDataArray = resolvedResult.map(appointment => {
        const mergedData = {
            ...appointment._doc,
            patientFirstName: appointment.patientFirstName,
            patientLastName: appointment.patientLastName,
            key: true
        };
    
        // Remove the "$isNew" property
        delete mergedData.$isNew;
    
        return mergedData;
    });
    
    // console.log(mergedDataArray);
    res.json(mergedDataArray);
    /////////////////////////////////////////////////////////////////////

//     console.log(filteredAppointments);
//     res.status(200).json(filteredAppointments);
};


// filter patients by upcoming appointments
const upcoming = async (req, res) => {

    const { doctorId } = req.body;

    try {
        const upappoint = await Appointment.find({ 'doctorId': doctorId });

        const currentDate = new Date();

        const upcomingApp = upappoint.filter(appointment => appointment.date > currentDate);
        const patientIds = upcomingApp.map(appointment => appointment.patientId);
        const patients = await User.find({ _id: { $in: patientIds } });

        upcomingApp.sort((a, b) => new Date(a.date) - new Date(b.date));
        const finalup = upcomingApp.map((appointment) => {
            const patient = patients.find(patient => patient._id.equals(appointment.patientId));
            return {
                date: appointment.date,
                status: appointment.status,
                firstName: patient ? patient.firstName : null,
                lastName: patient ? patient.lastName : null,
                email: patient ? patient.email : null,
                _id: patient ? patient._id : null,
                appointmentId: appointment._id
            };
        });


        res.status(200).json(finalup);
        console.log("Response sent successfully.");
        console.log(finalup)
    } catch (error) {
        console.error('Error filtering patient IDs:', error);
        res.status(500).json({ error: 'An error occurred while filtering patient IDs' });
    }
};




//retrieve all users from the database

const getDoctors = async (req, res) => {

    const doctors = await Doctor.find({});
    res.status(200).json(doctors);


}

const updateEmail = async (req, res) => {
    console.log('Update email request received');
    const { email } = req.body;
    const doctorId = req.params.id;
    console.log('Doctor ID:', doctorId);
    console.log('New Email:', email);

    try {
        const doctor = await Doctor.findByIdAndUpdate(doctorId, { email: email }, { new: true });

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        console.log('Updated Doctor:', doctor);

        res.status(200).json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating email" });
    }

};

const updateHourlyRate = async (req, res) => {

    const { hourlyRate } = req.body;
    const doctorId = req.params.id;

    try {
        const doctor = await Doctor.findByIdAndUpdate(doctorId, { hourlyRate }, { new: true });
        res.status(200).json(doctor);
        console.log('Updated Doctor:', doctor);
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: "error updating hourly rate" });
    }
}

const updateAffiliation = async (req, res) => {

    const { affiliation } = req.body;
    const doctorId = req.params.id;

    try {
        const doctor = await Doctor.findByIdAndUpdate(doctorId, { affiliation }, { new: true });
        res.status(200).json(doctor);
        console.log('Updated Doctor:', doctor);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "error updating Affiliation" });
    }
}


// const searchPatientByName = async (req, res) => {
//     try {
//         const doctorId = req.params.id;
//         const { patientName } = req.body;

//         console.log('Doctor ID:', doctorId);
//         console.log('Patient Name:', patientName);

//         const appointments = await Appointment.find({
//             doctorId: doctorId,
//             patientName: patientName,
//         });

//         const patientIds = [];

//         for (const appointment of appointments) {
//             patientIds.push(appointment.patientId);
//         }

//         const patients = await Patient.find({ _id: { $in: patientIds } });

//         if (patients.length > 0) {

//             res.json(patients);
//         } else {

//             res.status(404).json({ error: 'No matching patients found' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Something went wrong' });
//     }
// };

// const searchPatientByName = async (doctorId, firstName) => {
//     try {
//         console.log('Doctor ID:', doctorId);
//         console.log('Patient Name:', firstName);

//         const appointments = await Appointment.find({ doctorId: doctorId });
//         console.log('Appointments:', appointments);

//         const patientIds = new Set();

//         for (const appointment of appointments) {
//             patientIds.add(appointment.patientId.toString());
//         }
//         console.log('Patient IDs:', Array.from(patientIds));

//         const patients = await Patient.find({
//             _id: { $in: Array.from(patientIds) },
//             firstName: firstName
//         });
//         console.log('Patients:', patients);

//         return patients; // Return the patients to be rendered
//     } catch (error) {
//         throw error; // Throw the error to be caught in the route handler
//     }
// };

const searchPatientByName = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const { firstName } = req.body;

        console.log('Doctor ID:', doctorId);
        console.log('Patient Name:', firstName);


        const appointments = await Appointment.find({ doctorId: doctorId });

        const patientIds = new Set();


        for (const appointment of appointments) {
            patientIds.add(appointment.patientId.toString());
        }


        const patients = await Patient.find({
            _id: { $in: Array.from(patientIds) },
            firstName: firstName
        });

        if (patients.length > 0) {
            console.log('patient info: ', patients);
            res.json(patients);
        } else {
            res.json([]);
            // res.status(404).json({ error: 'No matching patients found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};





// const viewAllPatients = async (req, res) => {
//     try {
//       const docId = req.params.id;
//       const appointments = await Appointment.find({ doctorId: docId });

//       if (!appointments || appointments.length === 0) {
//         return res.status(404).json({ message: 'No appointments found for this doctor.' });
//       }

//       const patientIds = appointments.map((appointment) => appointment.patientId);

//       const patients = await Patient.find({ _id: { $in: patientIds } });

//       if (!patients || patients.length === 0) {
//         return res.status(404).json({ message: 'No patients found for this doctor.' });
//       }

//       res.status(200).json(patients);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error retrieving patients' });
//     }
//   };

const viewAllPatients = async (doctorId) => {
    try {
        const appointments = await Appointment.find({ doctorId });

        if (!appointments || appointments.length === 0) {
            return [];
        }

        const patientIds = appointments.map((appointment) => appointment.patientId);

        const patients = await Patient.find({ _id: { $in: patientIds } })
            .select('firstName lastName _id email');

        if (!patients || patients.length === 0) {
            return [];
        }

        return patients;
    } catch (error) {
        console.error(error);
        return [];
    }
};


const createDoctor = async (req, res) => {

    const {
        firstName, lastName, email, dob, username, password, hourlyRate, affiliation, speciality, educationalBackground, userType, accountStatus
    } = req.body;

    try {
        console.log('Creating doctor with data:', firstName, lastName, email, dob, username, password, hourlyRate, affiliation, speciality, accountStatus,
            educationalBackground, userType,);

        const doctor = await Doctor.create({
            firstName,
            lastName,
            email,
            dob,
            username,
            password,
            hourlyRate,
            affiliation,
            speciality,
            educationalBackground,
            userType,
            accountStatus
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
        firstName, lastName, email, username, password, mobile, dob, gender, emergency, family, userType, accountStatus
    } = req.body;

    try {
        console.log('Creating patient with data:', firstName, lastName, email, username, password, mobile, dob, gender, emergency, family, userType, accountStatus);

        const patient = await Patient.create({
            firstName,
            lastName,
            email,
            username,
            password,
            mobile,
            dob,
            gender,
            emergency,
            family, userType, accountStatus
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
    const { doctorId, patientId, date, status } = req.body;

    try {
        console.log('Creating appointment with data:', doctorId, patientId, date, status);

        const appointment = await Appointment.create({
            doctorId,
            patientId,
            date,
            status
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

// const selectPatient = async (req, res) => {
//     try {
//         const patientId = req.params.id;
//         const patient = await Patient.findById(patientId).select('firstName lastName email username dob gender accountStatus userType mobile emergency family prescriptions');

//         if (!patient) {
//             return res.status(404).json({ message: 'Patient not found' });
//         }

//         // Render the "selectedPatient.ejs" template with patient data
//         console.log('patient info: ', patient);
//         res.render('selectedPatient', { patient });
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(500).json({ message: 'Error retrieving patient information', error: error.message }); // Return a more detailed error response
//     }
// };
const selectPatient = async (patientId) => {
    try {
        const patient = await Patient.findById(patientId).exec();
        return patient;
    } catch (error) {
        throw error;
    }
};


const getPatients = async (req, res) => {

    const patients = await Patient.find({});
    res.status(200).json(patients);


}
// const viewHealthRecords = async (req, res) => {
//     try {
//         const doctorId = req.params.id;

//         const { patientId } = req.body;

//         const appointments = await Appointment.find({
//             doctorId: doctorId,
//             patientId: patientId,
//         });

//         if (appointments.length === 0) {
//             return res.status(404).json({ message: 'No appointments found for this patient.' });
//         }
//         const patient = await Patient.findById(patientId).populate('prescriptions');

//         if (!patient) {
//             return res.status(404).json({ message: 'Patient not found.' });
//         }

//         res.status(200).json({ appointments, prescriptions: patient.prescriptions });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error retrieving appointments and prescriptions' });
//     }
// };

// UPDATED viewHealthRecords
const viewHealthRecords = async (req, res) => {
    // const patient = await Patient.findById(req.params.id);
    const doctorId = req.params.id;
    const { patientId } = req.body;

    const patient = await Patient.findById(patientId);

    try {
      if (!patient) {
        res.status(400);
        throw new Error("Patient does not exist.");
      } else {
        const healthRecords = patient.healthRecord;
        if (healthRecords) {
          res.status(200).json(healthRecords);
        } else {
          res.status(400);
          throw new Error("Patient has no health record.");
        }
      }
    } catch (error) {
      res.status(400);
      throw new Error("Error viewing health records.");
    }
};

const getAllSpecialities = async (req, res) => {
    try {
        const uniqueSpecialities = await Doctor.distinct('speciality');
        res.status(200).json(uniqueSpecialities)
    } catch (err) {
        console.error('Error:', err);
    }
}

const viewWallet = async (req, res) => {
    const id = req.params.id
    try {
      const doctor = await Doctor.findById(id).populate('wallet');
  
      if(doctor){
        const wallet = doctor.wallet
    
        res.status(200).json({ wallet: wallet})
      }
      else{
        res.status(404).json({ error: "Not Found"})
      }
    }
    catch (err) {
      res.status(500).json({error: err.message})
    }
  }
  const followUpDoc = async (req, res) => {
    const { doctorId, patientId,date,status } = req.body;
  
    try {
        console.log('Creating follow up with data:', doctorId, patientId,date,status);
  
        const appointment = await Appointment.create({
            doctorId,
            patientId, 
            date,
            status,
            followUp: true
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
  const addNewSlots = async (req, res) => {
    try {
      const doctorId = req.body.doctorId;
      console.log(doctorId)
      const newSlots = req.body.availableSlots; 
      
      console.log('newSlots:', newSlots);
      const doc = await User.findById(doctorId);
      console.log(doc);
      doc.availableSlots = doc.availableSlots.concat(newSlots);
        await doc.save();
  
      
      if (!doc) {
        return res.status(404).json({ error: 'Doctor not found' });
      }
  
      res.json(doc);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update slots' });
    }
  };
const getMyAppointments = async (req, res) => {
    try {
        const doctorId = req.params.id; 
        
        const appointments = await Appointment.find({ doctorId });

        const result = appointments.map(async (appointment) => {
            const patient = await Patient.findById(appointment.patientId);

            return {
                ...appointment,
                patientFirstName: patient.firstName,
                patientLastName: patient.lastName 
            };
        });

        const resolvedResult = await Promise.all(result);

        const mergedDataArray = resolvedResult.map(appointment => {
            const mergedData = {
                ...appointment._doc,
                patientFirstName: appointment.patientFirstName,
                patientLastName: appointment.patientLastName,
                key: true
            };
        
            // Remove the "$isNew" property
            delete mergedData.$isNew;
        
            return mergedData;
        });
        
        // console.log(mergedDataArray);
        res.json(mergedDataArray);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch appointments' });
      }
};
    const viewEmploymentContract = async (req, res) => {
      try {
        const doctorId = req.user.id; // Assuming you have the doctor's ID in the user object (e.g., after authentication)
    
        const doctor = await Doctor.findById(doctorId);
    
        if (!doctor) {
          return res.status(404).json({ error: 'Doctor not found' });
        }
    
        if (!doctor.employmentContract || !doctor.employmentContract.file) {
          return res.status(404).json({ error: 'Employment contract not found' });
        }
    
        // Construct the file path to the employment contract
        const filePath = path.join(__dirname, '../uploads/employment_contracts', doctor.employmentContract.file);
    
        // Check if the file exists
        if (fs.existsSync(filePath)) {
          // Return the file as a response
          res.download(filePath);
        } else {
          res.status(404).json({ error: 'Employment contract file not found' });
        }
      } catch (error) {
        console.error('Error viewing employment contract:', error);
        res.status(500).json({ error: 'An error occurred' });
      }
    };
  //  const Patient = require('../models/Patient'); 
const addHealthRecord = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findOne({ _id: patientId });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const { content, files } = req.body; 
    const healthRecord = {
      content,
      files,
    };

    patient.healthRecord.files.push(healthRecord);

    await patient.save();

    res.json(patient); 
  } catch (error) {
    console.error('Error adding health record:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
  

// Extra frontend methods
const getDoctorInfo = (req, res) => {
    const doctorId = req.params.id;
    Doctor.findById(doctorId)
          .then((result) => res.json(result))
          .catch((err) => res.status(404).json());
};

module.exports = {
    createDoctor,
    updateEmail,
    updateHourlyRate,
    updateAffiliation,
    createPatient,
    createAppointment,
    searchPatientByName,
    viewAllPatients,
    getDoctors,
    filterStatus,
    upcoming,
    selectPatient,
    getPatients,
    viewHealthRecords,
    getAllSpecialities,
    viewWallet,
    addNewSlots,
    getMyAppointments,
    followUpDoc,
    viewEmploymentContract,
    addHealthRecord,
    getDoctorInfo
}

