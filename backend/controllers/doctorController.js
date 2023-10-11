const asyncHandler = require('express-async-handler');
const Doctor = require('../models/doctorModel.js');
const Patient = require('../models/patientModel.js');
const Appointment = require('../models/appointmentModel');
const Prescription = require('../models/prescriptionModel');


const filterStatus = async(req, res) => {
    const{status,date_1,date_2}= req.body;
    
    const doctor = await Doctor.findById(req.params.id); 
    if (doctor){
        const filteredAppointments = Doctor.appointments.filter(appointment =>{
           
             if( status!='All'){
                const Date1 = new Date(date_1);
                const Date2 = new Date(date_2);
                if(Date1 && Date2 && typeof date_2 !== 'undefined'  ){
                 const WithinRange = appointment.date >= Date1 && appointment.date <= Date2 &&  appointment.status == status  ;
                return WithinRange;}
               
                if(Date1  && typeof date_2 === 'undefined' ){

                        const ondate = appointment.date.toString() == Date1;
                        return ondate;}

               if(typeof Date1 === 'undefined' && typeof Date2 === 'undefined' )
               return appointment.status == status;
                
            }
            if(status == 'All'){

                const Date_1 = new Date(date_1);
                const Date_2 = new Date(date_2);

                if(Date_1  && Date_2 && typeof date_2 !== 'undefined' )
                return (appointment.date >= Date_1 && appointment.date <= Date_2 );
               
                if(Date_1  && typeof date_2 === 'undefined' ){
                return (appointment.date.toString() == Date_1 );}
               

            }
        });
        res.status(200).json({ filteredAppointments });
    }
    else{
        res.status(404).json({ message: 'Doctor not found' });
    }
    }



  // filter patients by upcoming appointments
  const upcoming = async (req, res) => {
    const doctorId = req.params.id;

  try {
      const doctor = await Doctor.findById(doctorId);

      if (!doctor) {
          return res.status(404).json({ message: 'Doctor not found' });
      }

      const currentDate = new Date();

      const upcomingApp = Doctor.appointments.filter(appointment => appointment.date > currentDate);
      upcomingApp.sort((a, b) => new Date(a.date) - new Date(b.date));


      res.status(200).json({ upcomingApp });
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
    const { email } = req.body;
    const doctorId = req.params.id; 

    try {
        const doctor = await Doctor.findByIdAndUpdate(doctorId, { email }, { new: true });
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
            const doctor = await Doctor.findByIdAndUpdate(doctorId,{hourlyRate},{new: true});
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
            const doctor = await Doctor.findByIdAndUpdate(doctorId,{affiliation}, {new: true});
            res.status(200).json(doctor);
        }
        catch (error){
            console.error(error);
            res.status(500).json({ error: "error updating Affiliation"});
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
            res.json(patients);
        } else {
            res.status(404).json({ error: 'No matching patients found' });
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

const viewAllPatients = async (req, res) => {
    try {
      const docId = req.params.id;
      const appointments = await Appointment.find({ doctorId: docId });
  
      if (!appointments || appointments.length === 0) {
        return res.status(404).json({ message: 'No appointments found for this doctor.' });
      }
  
      const patientIds = appointments.map((appointment) => appointment.patientId);
  
      const patients = await Patient.find({ _id: { $in: patientIds } })
        .select('firstName lastName _id email'); // Specify the fields you want to select
  
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
        firstName, lastName, email, dob, username, password, hourlyRate, affiliation,  speciality, educationalBackground, userType,accountStatus
    } = req.body;

    try {
        console.log('Creating doctor with data:', firstName, lastName, email, dob, username, password, hourlyRate, affiliation, speciality,accountStatus,
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
        firstName,lastName, email, username, password, mobile,dob,gender,emergency, family,userType,accountStatus
    } = req.body;

    try {
        console.log('Creating patient with data:', firstName,lastName, email, username, password, mobile,dob,gender,emergency, family,userType,accountStatus);

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
            family,userType,accountStatus
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
    const { doctorId, patientId,date,status } = req.body;

    try {
        console.log('Creating appointment with data:', doctorId, patientId,date,status);

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

const selectPatient = async (req, res) => {
    try {
      const patientId = req.params.id;
  
      const patient = await Patient.findById(patientId).select('firstName lastName email username dob gender accountStatus userType mobile emergency family prescriptions');
  
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      res.status(200).json(patient);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving patient information' });
    }
  };

  const getPatients = async (req, res) => {
    
    const patients = await Patient.find({});
    res.status(200).json(patients);
   

  }
  const viewHealthRecords = async (req, res) => {
    try {
      const doctorId = req.params.id;
  
      const { patientId } = req.body;
  
      const appointments = await Appointment.find({
        doctorId: doctorId,
        patientId: patientId,
      });
  
      if (appointments.length === 0) {
        return res.status(404).json({ message: 'No appointments found for this patient.' });
      }
      const patient = await Patient.findById(patientId).populate('prescriptions');
  
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found.' });
      }
  
      res.status(200).json({ appointments, prescriptions: patient.prescriptions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving appointments and prescriptions' });
    }
  };

  module.exports ={
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
    viewHealthRecords
}
