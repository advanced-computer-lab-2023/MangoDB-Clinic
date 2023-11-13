
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Prescription = require("../models/prescriptionModel");
const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const Packages = require("../models/packagesModel");
const Wallet = require('../models/walletModel')


const port = process.env.PORT;

const renderDashboard = (req, res) => {
  res.status(200).render("patientDashboard");
};

const renderAddFamilyMember = (req, res) => {
  res.status(200).render("addFamilyMember");
};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// @desc Login patient
// @route POST /patient/login
// @access Public
const loginPatient = asyncHandler( async (req, res) => {
  const {username, password} = req.body

  if (!username){
      res.status(400)
      throw new Error("Please Enter Your Username")
  } else if (!password) {
      res.status(400)
      throw new Error("Enter Your Password")
  }

  // Check for username
  const patient = await Patient.findOne({username})

  if (patient && (await bcrypt.compare(password, patient.password))){
      res.status(200).json({
          message: "Successful Login",
          _id: patient.id,
          username: patient.username,
          name: patient.firstName + patient.lastName,
          email: patient.email,
          token: generateToken(patient._id)
      })
  } else {
      res.status(400)
      throw new Error("Invalid Credentials")
  }
})

// @desc Request 
// @route GET /patient/request-otp
// @access Private
const sendOTP = asyncHandler( async(req, res) => {
  const patient = req.user

  const otp = generateOTP()
  patient.passwordResetOTP = otp
  await patient.save()

  const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'omarelzaher93@gmail.com',
          pass: 'vtzilhuubkdtphww'
      }
  })

    const mailOptions = {
      from: 'omarelzaher93@gmail.com',
      to: patient.email,
      subject: '[NO REPLY] Your Password Reset Request',
      html: `<h1>You have requested to reset your password.<h1>
              <p>Your OTP is ${otp}<p>
              <p>If you did not request to reset your password, you can safely disregard this message.<p>
              <p>We wish you a fruitful experience using El7a2ny!<p>
              <p>This Is An Automated Message, Please Do Not Reply.<p>`
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error){
          res.status(500)
          throw new Error("Failed to Send OTP Email.")
      } else {
          res.status(200).json({ message: 'OTP Sent, Please Check Your Email'})
      }
    })
})

// @desc Delete packages
// @route POST /patient/verify-otp
// @access Private
const verifyOTP = asyncHandler( async(req, res) => {
  const {otp} = req.body
  const patient = req.user

  if (otp === patient.passwordResetOTP){
      res.status(200).json({message: "Correct OTP"})
  } else {
      res.status(400)
      throw new Error("Invalid OTP Entered")
  }
})

// @desc Delete packages
// @route POST /patient/reset-password
// @access Private
const resetPassword = asyncHandler(async (req, res) => {
  try {
      const { newPassword } = req.body;
      const patient = req.user;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      if (await bcrypt.compare(newPassword, patient.password)) {
          res.status(400).json({message: "New Password Cannot Be The Same As the Old One"});
      } else {
          patient.password = hashedPassword;
          await patient.save();
          res.status(200).json({ message: 'Your Password Has Been Reset Successfuly' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error resetting password' });
  }
});


// Generate Token
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
      expiresIn: '30d'
  })
}

//Get all patients
const getAllPatients = async (req, res) => {
  const patients = await Patient.find({});
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

  res.status(200).json(patient);
};

//Create a patient
const addPatient = async (req, res) => {
  const {
    name,
    email,
    password,
    dob,
    gender,
    mobile,
    emergencyContact,
    family,
    prescriptions,
  } = req.body;

  try {
    const patient = await Patient.create({
      name,
      email,
      password,
      dob,
      gender,
      mobile,
      emergencyContact,
      family,
      prescriptions,
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
  const id = req.params.id;

  try {
    const patient = await Patient.findById(id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.status(200).json(patient.family);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

const getSelectedDoctor = asyncHandler(async (req, res) => {
  const doctor_id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(doctor_id)) {
    return res.status(404).json({ error: "Doctor Not Found1" });
  }

  const doctor = await Doctor.findById(doctor_id);

  if (!doctor) {
    return res.status(404).json({ error: "Doctor Not Found" });
  }

  res.status(200).json(doctor);
});

const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({}).populate("doctorId").populate("patientId");
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllPrescriptionsOfPatient = async (req, res) => {
  const patientId = req.patientId;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    return res.status(404).json({ error: "Id Not Found" });
  }

  try {
    const patient = await Patient.findById(patientId)

    if (!patient) {
      return res.status(404).json({ error: "Patient Not Found" });
    }

    const prescriptions = await Prescription.find({patientId: patientId}).populate('doctorId')
    res.status(200).json(prescriptions);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const selectPrescription = async (req, res) => {
  const { prescriptionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(prescriptionId)) {
    return res.status(404).json({ error: "Id Not Found" });
  }

  try {

    const prescription = await Prescription.findById(prescriptionId).populate('doctorId');

    if (!prescription) {
      return res.status(404).json({ error: "Prescription Not Found" });
    }

    res.status(200).json(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const filterPrescription = async (req, res) => {
  const patient = await Patient.findById(req.params.patientId)

  if (!patient) {
    return res.status(404).json({ error: "Patient Id Not Found" });
  }

  // if (!mongoose.Types.ObjectId.isValid(patientId)) {
  //     return res.status(404).json({ error: 'Patient Id Not Found' });
  // }

  try {
    const { doctor, filled, date } = req.query;
    const query = {};

    query['patientId'] = req.params.patientId

    if (doctor) {
      const doc = await Doctor.findOne({ firstName: doctor.split(' ')[0], lastName: doctor.split(' ')[1] });
      if (doc) {
        query['doctorId'] = doc._id;
      } else {
        return res.status(400).json({ error: "Not found" });
      }
    }

    if (filled) {
      if (filled === "true") {
        query["filled"] = true;
      } else if (filled === "false") {
        query["filled"] = false;
      }
    }
    if (date) {
      query.date = new Date(date);
    }

    const filteredPrescriptions = await Prescription.find({
      ...query
    }).populate('doctorId')

    res.status(200).json(filteredPrescriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.params.id,
    }).populate({
      path: "doctorId",
      select: "firstName lastName",
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Filter appointments by Date/Status
const filterAppointments = async (req, res) => {
  let { status, date_1, date_2 } = req.query;

  const patient = await Patient.findById(req.params.id);
  const appoint = await Appointment.find({ patientId: req.params.id }).populate(
    {
      path: "doctorId",
      select: "firstName lastName",
    }
  );

  if (patient) {
    if (!status && !date_1 && !date_2) return res.status(200).json(appoint);
    if (!status) status = "All";
    const filteredAppointments = appoint.filter((appointment) => {
      if (status !== "All") {
        const Date1 = new Date(date_1);
        const Date2 = new Date(date_2);

        if (Date1 && Date2 && typeof date_2 !== "undefined") {
          const WithinRange =
            appointment.date >= Date1 &&
            appointment.date <= Date2 &&
            appointment.status == status;
          return WithinRange;
        }

        if (
          Date1 &&
          typeof date_1 !== "undefined" &&
          typeof date_2 === "undefined"
        ) {
          const ondate =
            appointment.date.toISOString().split("T")[0] ===
            Date1.toISOString().split("T")[0];
          return ondate;
        }

        if (typeof date_1 === "undefined" && typeof date_2 === "undefined")
          return appointment.status == status;
      } else if (status === "All") {
        const Date_1 = new Date(date_1);
        const Date_2 = new Date(date_2);

        if (Date_1 && Date_2 && typeof date_2 !== "undefined")
          return appointment.date >= Date_1 && appointment.date <= Date_2;

        if (
          Date_1 &&
          typeof date_1 !== "undefined" &&
          typeof date_2 === "undefined"
        )
          return (
            appointment.date.toISOString().split("T")[0] ===
            Date_1.toISOString().split("T")[0]
          );

        if (typeof date_1 === "undefined" && typeof date_2 === "undefined")
          return appointment;
      }
    });
    res.status(200).json({ filteredAppointments });
  } else res.status(404).json({ message: "Doctor not found" });
};

// FILTER APPOITMENT USING STATUS OR DATE
const filterStatus = async (req, res) => {
  const { status, date_1, date_2, patient } = req.body;
  console.log(status, date_1, date_2, patient)
  if (!status) {
      return res.status(400).json({ message: 'Please enter status' });
  }

  const appoint = await Appointment.find({ 'patientId': patient });
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
  console.log(filteredAppointments);
  res.status(200).json(filteredAppointments);
};


//View a list of all doctors along with their specialty, session price(based on subscribed health package if any)
const viewAllDoctors = asyncHandler(async (req, res) => {
  try {
    const doctors = await Doctor.find({/*accountStatus: 'active'*/}).sort({ createdAt: -1 });
    if (!doctors) {
      res.status(400).json({ error: "No Doctors Found" });
    } else {
      const patient = await Patient.findById(req.params.id).populate('healthPackage')
      if(!patient)
        res.status(400).json({ error: "An error occured"})
      let discount;
      if(patient.healthPackage)
        discount = patient.healthPackage.doctorSessionDiscount / 100
      const doctorsWithPrices = doctors.map((doctor) => {
        const sessionPrice = Math.ceil(1.1 * doctor.hourlyRate +  - (doctor.hourlyRate * discount || 0));
        return { ...doctor._doc, sessionPrice };
      });


      res.status(200).json(doctorsWithPrices);
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
    const query = {accountStats: 'active'};
    if (name) {
      firstName = name.split(" ")[0];
      query.firstName = { $regex: firstName, $options: "i" };
      lastName = name.split(" ")[1]; //.trim()
      if (typeof lastName === "string" && lastName.length > 0)
        query.lastName = { $regex: lastName, $options: "i" };
    }
    if (speciality) query.speciality = { $regex: speciality, $options: "i" };

    const doctor = await Doctor.find(query);
    const patient = await Patient.findById(req.params.id).populate('healthPackage')
      if(!patient)
        res.status(400).json({ error: "An error occured"})
      let discount;
      if(patient.healthPackage)
        discount = patient.healthPackage.doctorSessionDiscount / 100
      const doctorsWithPrices = doctor.map((doctor) => {
        const sessionPrice = Math.ceil(1.1 * doctor.hourlyRate - (doctor.hourlyRate * discount || 0));
        return { ...doctor._doc, sessionPrice };
      });
    res.status(200).json(doctorsWithPrices);
  } catch (error) {
    res.status(500).json({ error: "Error while searching for Doctor" });
  }
});

const filterDoctors = async (req, res) => {
  const { datetime, speciality } = req.query;
  try {
    const query = {accountStats: 'active'};

    if (speciality) query.speciality = speciality;

    if (datetime) {
      const appointmentsForDate = await Appointment.find({
        date: new Date(datetime),
      });
      const doctorIdsWithAppointments = appointmentsForDate.map(
        (appointment) => appointment.doctorId
      );
      query._id = { $nin: doctorIdsWithAppointments };
    }
    const filteredDoctors = await Doctor.find(query);
    const patient = await Patient.findById(req.params.id).populate('healthPackage')
      if(!patient)
        res.status(400).json({ error: "An error occured"})
      let discount;
      if(patient.healthPackage)
        discount = patient.healthPackage.doctorSessionDiscount / 100
      const doctorsWithPrices = filteredDoctors.map((doctor) => {
        const sessionPrice = Math.ceil(1.1 * doctor.hourlyRate - (doctor.hourlyRate * discount || 0));
        return { ...doctor._doc, sessionPrice };
      });
      res.status(200).json(doctorsWithPrices)
    //res.status(200).json(filteredDoctors);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const viewHealthRecords = async (req, res) => {
  const patient = await Patient.findById(req.params.id);
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

const viewHealthPackages = asyncHandler(async (req, res) => {
  try {
    const packages = await Packages.find({}).sort({ createdAt: -1 });
    if (!packages) {
      res.status(400).json({ error: "No Packages Found" });
    } else {
      res.status(200).json(packages);
    }
  } catch (error) {
    res.status(400);
    throw new Error("Error viewing Packages");
  }
});

const viewSubscribedhealthPackage = async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  try {
    if (!patient) {
      res.status(400);
      throw new Error("Patient does not exist.");
    } else {
      const patientsPackage = patient.healthPackage;
      if (patientsPackage) {
        for (const familyMember of patient.family) {
          if (familyMember.userId) {
            const member = await Patient.findById(familyMember.userId);
            if (member) {
              patientsPackage += member.healthPackage;
            }
          }
        }

        res.status(200).json(patientsPackage);
      } else {
        res.status(400);
        throw new Error("Patient has no packages.");
      }
    }
  } catch (error) {
    res.status(400);
    throw new Error("Error viewing Packages");
  }
};

const cancelHealthPackage = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);

    if (patient) {
      if (!patient.healthPackage) {
        return res
          .status(400)
          .json({ error: "You are not subscribed to a Health Package." });
      }

      patient.healthPackage = null;
      patient.healthPackage.status = "Cancelled";

      for (const familyMember of patient.family) {
        if (familyMember.userId) {
          const member = await Patient.findById(familyMember.userId);
          if (member) {
            member.healthPackage = null;
            await member.save();
          }
        }
      }

      await patient.save();

      res.status(200).json({
        message: "Successfully canceled health package subscription.",
      });
    }
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
};

const viewWallet = async (req, res) => {
  const id = req.params.id;
  try {
    const patient = await Patient.findById(id).populate("wallet");

    if (patient) {
      if (!patient.wallet) {
        res.status(500).json({ error: "an error occured" });
      }

      const wallet = patient.wallet;

      res.status(200).json({ wallet: wallet });
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addDocuments = async (req, res) => {
  const id = req.params.id;
  try {
    const patient = await Patient.findById(id);

    if (patient) {
      const healthRecord = patient.healthRecord;

      if (req.files) {
        for (const file of req.files) {
          const url = `http://localhost:${port}/uploads/${file.originalname}`;
          const document = {
            name: file.originalname,
            file: url,
          };
          healthRecord.files.push(document);
        }
        await patient.save();
        res.status(200).json("Added successfully");
      } else res.status(400).json({ error: "No documents provided" });
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const deleteDocument = async (req, res) => {
  const patientId = req.params.patientId;
  const documentId = req.params.documentId;

  try {
    const patient = await Patient.findById(patientId);

    if (patient) {
      const healthRecord = patient.healthRecord;
      const documentIndex = healthRecord.files.findIndex(
        (doc) => doc._id.toString() === documentId
      );

      if (documentIndex !== -1) {
        healthRecord.files.splice(documentIndex, 1);
        await patient.save();
        res.status(200).json("Document removed successfully");
      } else {
        res.status(404).json({ error: "Document Not Found" });
      }
    } else {
      res.status(404).json({ error: "Patient Not Found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const linkFamilyMember = async (req, res) => {
  const id = req.params.id;
  const {email, relation, mobile, linkWithEmail} = req.query

  try {
    console.log("id:",id)
    const patient = await Patient.findById(id);

    console.log(patient.json)
    if (patient) {
      let member;
      if(linkWithEmail){
      console.log("email:", email)
        member = await Patient.findOne({ email: email });}
      else{
        console.log("phone:", mobile)
        member = await Patient.findOne({ mobile: mobile})}
      if (member) {
        const memberExists = patient.family.some(
          (mem) => mem.userId && mem.userId.toString() === member._id.toString()
        );
        if (!memberExists) {
          const entry = {
            name: member.firstName + " " + member.lastName,
            nationalID: member.nationalID,
            age: Math.floor(
              (new Date() - member.dob) / (1000 * 60 * 60 * 24 * 365.25)
            ),
            gender: member.gender,
            relation: relation,
            userId: member._id,
          };
          patient.family.push(entry);
          await patient.save();

          res
            .status(200)
            .json({ message: "Family member linked successfully" });
        } else {
          res.status(200).json({ message: "Family member already linked" });
        }
      } else {
        res.status(404).json({ message: "Family Member Not Found" });
      }
    } else {
      res.status(404).json({ message: "Patient Not Found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const subscribeToHealthPackage = async (req, res) => {
  const patientId = req.params.patientId;
  const packageId = req.params.packageId;

  try {
    const patient = await Patient.findById(patientId);

    if (patient) {
      if (patient.healthPackage) {
        return res.status(400).json({
          error:
            "You are already subscribed to a health package. Cancel your subscription first",
        });
      }

      patient.healthPackage = packageId;

      for (const familyMember of patient.family) {
        if (familyMember.userId) {
          const member = await Patient.findById(familyMember.userId);
          if (member) {
            member.healthPackage = packageId;
            await member.save();
          }
        }
      }

      await patient.save();

      res
        .status(200)
        .json({ message: "Successfully subscribed to health package" });
    }
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
};

/////////////////////////////////

// UTILS

const addAppointment = async (req, res) => {
  const docid = req.params.doctorId;
  const patid = req.params.patientId;

  const data = req.body;
  try {
    const app = await Appointment.create({
      doctorId: docid,
      patientId: patid,
      date:data,
      status:'scheduled',
    });
    res.status(200).json(app);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const addPrescription = async (req, res) => {
  const docid = req.params.doctorId;
  const patid = req.params.patientId;
  const data = req.body;

  try {
    const pres = await Prescription.create({ doctorId: docid, patientId: patid, ...data });
    res.status(200).json(pres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

const getSpecialities = async (req, res) => {
  try {
    const specialities = await Doctor.distinct('speciality')

    res.status(200).json(specialities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


////////////////////////

// //view all available appoitnments of a selected doctor
// const getAvailableAppointments = async (req, res) => {
//   let {doctorId } = req.query;
//   try {
//    const doctor = await Doctor.findById(doctorId);
//     if (!doctor) {
//       throw new Error('Doctor not found');
//     }
//     const availableAppointments = doctor.appointments.filter(appointment => 
//       new RegExp('available', 'i').test(appointment.status)); //available bas msh case sensitive 

//       //available 3ade 3shan le el tanya bayza 
// //  const availableAppointments = doctor.appointments.filter(appointment => appointment.status === 'available');
//     return availableAppointments;
//   } catch (error) {
//     console.error(error.message);
//     throw error;
//   }
// }




const getAvailableAppointments = async (req, res) => {
  try {
    const doctorId = req.params.id

    const selectedDate = new Date(req.query.date)
    const doctor = await Doctor.findOne({ _id: doctorId }).exec();

    if (doctor) {
      const availabilitySlots = doctor.availableSlots;
      const selectedWeekday = selectedDate.getDay(); // 0 for Sunday, 1 for Monday, ...

      const appointments = await Appointment.find({
        doctorId,
        date: {
          $gte: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()),
          $lt: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1),
        }
      }).exec();
      
      const bookedTimeSlots = appointments.map(appointment => appointment.date.getHours() - 2);
      const availableSlots = [];
      
      availabilitySlots.forEach(slot => {
        if (slot.weekday === selectedWeekday) {
          for (let hour = slot.startTime.getHours() - 2; hour <= slot.endTime.getHours() - 2; hour++) {
            if (!bookedTimeSlots.includes(hour)) {
              availableSlots.push(hour);
            }
          }
        }
      });

          res.status(200).json(availableSlots);
        } else {
          res.status(404).json("Not found");
        }
      } catch (error) {
          res.stats(500).json({error: error.message});
      }
    };

//select an appointment date and time for myself or for a family member
const makeAppointment = async (req, res) => {
//el patient hyd5al esm el doctor w pass lel function el id bta3 el doctor 
//el patient hyd5al esm el hy7gezlo 3shan momkn ykon be esmo aw be esm a family member w pass lel function el id bta3 el patient keda keda 
  // let {doctorId,patientId,date,patientName } = req.body;
  let {nationalID, date, docid, patientid} = req.query;
  try {
    const doctor = await Doctor.findById(docid);
     if (!doctor) {
       throw new Error('Doctor not found');
     }

    //  const doctorName = doctor.firstName;

    //  const patient = await Patient.findById(patientId); 
    // //  const patientrName = patient.name;

    //  //check if time is available for this dr 
    //  const isAppointmentAvailable = doctor.appointments.some(appointment =>
    //   appointment.date.getTime() === date.getTime() && appointment.status === 'available'
    // );
    // if (!isAppointmentAvailable) {
    //   throw new Error('Selected appointment date and time is not available');
    // }
    
    // //check if this is his name 
    // const isPatient = patient.firstName === patientName;
    // //check lw el name bta3 a family member
    // const isFamilyMember = patient.family.some(member =>
    //   member.name === patientName
     const patient = await Patient.findById(patientid); 
    
    //check if this is his name 
    const isPatient = patient.nationalID === nationalID;
    //check lw el name bta3 a family member
    const isFamilyMember = patient.family.some(member =>
      member.nationalID === nationalID
    );
    if(!isPatient&& !isFamilyMember){
      throw new Error('this ID is not a patient/familyMember national ID ');
    }

    // const appointment = new Appointment({
    //   doctorId,
    //   patientId,
    //   date,
    //   status: 'scheduled',
     
    // });
    let appPatientID = patientid
    if(isFamilyMember){
      for (const familyMember of patient.family) {
        if (familyMember.userId) {
          const member = await Patient.findOne({nationalID: nationalID});
          if (member) {
            appPatientID = member.id
          }
        }
      }
    }
    const app = await Appointment.create({
      patientId: appPatientID,
      doctorId: docid,
      date: date,
      status: 'confirmed'
    })
    console.log(app);

     res.status(200).json(app)

  // return appointment;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
// pay with wallet
const payFromWallet = async (req, res) => {
  try {
    // appointment 
    const appointmentId = req.params.appointmentId;
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    //patient
    const patientId = appointment.patientId; 

    if (!patientId) {
      return res.status(404).json({ error: 'Patient ID not found for the appointment' });
    }

     // Retrieve the patient from the database and populate the healthPackage field
     const patient = await Patient.findById(patientId).populate('healthPackage');
     const patientName=patient.firstName;

     if (!patient) {
       return res.status(404).json({ error: 'Patient not found' });
     }
    //dr
    const doctorId = appointment.doctorId; 

    if (!doctorId) {
      return res.status(404).json({ error: 'doctor ID not found for the appointment' });
    }
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      throw new Error('Doctor not found');
    }

    // Extract the hourly rate from the doctor data
    const hourlyRate = doctor.hourlyRate;

    // Retrieve the package type from the associated healthPackage
    const packageType = patient.healthPackage ? patient.healthPackage.name : null;

    if (!packageType) {
      return res.status(404).json({ error: 'Package not found for the patient' });
    }

    // Initialize discount values
    let doctorSessionDiscount = 0;
  

    // Calculate discounts based on the packageType
    switch (packageType) {
      case 'Silver':
        doctorSessionDiscount = 0.4;
       
        break;

      case 'Gold':
        doctorSessionDiscount = 0.6;
      
        break;

      case 'Platinum':
        doctorSessionDiscount = 0.8;
       
        break;

      default:
        // Handle the case where an invalid package type is provided
        console.error('Invalid package type');
        return res.status(400).json({ error: 'Invalid package type' });
    }

    
    const paymentAmount= (hourlyRate*1.1)-(hourlyRate*doctorSessionDiscount);
    
    

    // Example: Update wallet balance and transactions
    try {
      const wallet = await Wallet.findById(patient.wallet);

      if (!wallet) {
        throw new Error('Wallet not found');
      }

      // Use the calculated discounts and other variables in your payment logic
      // const paymentAmount = calculatePaymentAmount(drRate, doctorSessionDiscount, familyDiscount);

      if (wallet.balance < paymentAmount) {
        throw new Error('Insufficient funds in the wallet');
      }

      // Deduct the payment amount from the wallet balance
      wallet.balance -= paymentAmount;

      // Record the transaction in the wallet
      wallet.transactions.push({
        type: 'debit',
        amount: paymentAmount,
        date: new Date(),
      });

      // Save the updated wallet
      await wallet.save();

      // Respond with success message or other necessary data
      res.json({ success: true, message: 'Payment successful' });

    } catch (error) {
      console.error('Error processing payment:', error);
      res.status(500).json({ error: 'Internal server error during payment' });
    }

  } catch (error) {
    console.error('Error in payFromWallet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// filter patients by upcoming appointments
const upcoming = async (req, res) => {

  const { patientId } = req.body;
  try {
    const upcomingAppointments = await Appointment.find({
      patientId,
      date: { $gte: new Date() }, // Get appointments with dates greater than or equal to the current date
    })
      .populate({
      path: "doctorId",
      select: "firstName lastName"}) // Populate doctor details
      .sort({ date: 1 }); // Sort appointments by date in ascending order

      res.status(200).json(upcomingAppointments);
  } catch (error) {
    throw new Error(error.message);
  }

  // try {
  //     const upappoint = await Appointment.find({ 'patientId': patientId });

  //     const currentDate = new Date();

  //     const upcomingApp = upappoint.filter(appointment => appointment.date > currentDate);
  //     const doctorIds = upcomingApp.map(appointment => appointment.doctorId);
  //     const doctors = await User.find({ _id: { $in: doctorIds } });

  //     upcomingApp.sort((a, b) => new Date(a.date) - new Date(b.date));
  //     const finalup = upcomingApp.map((appointment) => {
  //         const doctor = doctors.find(doctor => doctor._id.equals(appointment.doctorId));
  //         return {
  //             date: appointment.date,
  //             status: appointment.status,
  //             firstName: doctor ? doctor.firstName : null,
  //             lastName: doctor ? doctor.lastName : null,
  //             email: doctor ? doctor.email : null,
  //             _id: doctor ? doctor._id : null,
  //             appointmentId: appointment._id
  //         };
  //     });


  //     // res.status(200).json(finalup);
  //     res.status(200).json(upcomingApp)
  //     console.log("Response sent successfully.");
  //     // console.log(finalup)
  // } catch (error) {
  //     console.error('Error filtering patient IDs:', error);
  //     res.status(500).json({ error: 'An error occurred while filtering patient IDs' });
  // }
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
  getAllPrescriptionsOfPatient,
  filterPrescription,
  selectPrescription,
  getAllAppointments,
  filterAppointments,
  viewAllDoctors,
  searchDoctor,
  filterDoctors,
  addAppointment,
  addPrescription,
  getSpecialities,
  renderDashboard,
  renderAddFamilyMember,
  viewHealthRecords,
  viewHealthPackages,
  viewSubscribedhealthPackage,
  cancelHealthPackage,
  viewWallet,
  addDocuments,
  deleteDocument,
  linkFamilyMember,
  subscribeToHealthPackage,
  getAllPrescriptions,
  makeAppointment,
  getAvailableAppointments,
  payFromWallet,
  upcoming,
  filterStatus,
  loginPatient,
  sendOTP,
  verifyOTP,
  resetPassword,
}

