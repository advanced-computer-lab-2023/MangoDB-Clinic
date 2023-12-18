import React from "react";
import { Paper, Typography, Grid, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DoctorHeader from "../../components/GeneralComponents/doctorHeader";

// Import your icons
const Profile = `${process.env.PUBLIC_URL}/icons/profile.svg`;
const Prescription = `${process.env.PUBLIC_URL}/icons/prescription.svg`;
const Patients = `${process.env.PUBLIC_URL}/icons/patient.svg`;
const Appointments = `${process.env.PUBLIC_URL}/icons/appointment.svg`;
const AddSlots = `${process.env.PUBLIC_URL}/icons/date.svg`;
const HealthRecords = `${process.env.PUBLIC_URL}/icons/clinicalRecord.svg`;

const DashboardAdmin = () => {
  const navigate = useNavigate();

  // Define your data
  const papers = [
    {
      icon: Profile,
      title: "Profile",
      description: "View / Edit Profile",
      cta: "View",
      route: "/editDoctor",
    },
    {
      icon: Prescription,
      title: "Prescription",
      description: "Add, edit, or update a patient's prescriptions",
      cta: "View",
      route: "/viewPrescriptionsByDoctor",
    },
    {
      icon: Patients,
      title: "Patients",
      description: "View a list of all patients",
      cta: "View",
      route: "/viewAllPatients",
    },
    {
      icon: Appointments,
      title: "Appointments",
      description: "View past or upcoming appointments",
      cta: "View",
      route: "/doctorAppointments",
    },
    {
      icon: AddSlots,
      title: "Add slots",
      description: "Add available time slots",
      cta: "Add",
      route: "/addslots",
    },
    {
      icon: HealthRecords,
      title: "Health Records",
      description: "View records of my patients",
      cta: "View",
      route: "/",
    },
  ];

  const handleButtonClick = (route) => {
    navigate(route);
  };

  return (
    <div>
      <DoctorHeader />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper sx={{ p: 2, width: 1200, height: 600, pl: 5 }}>
          <Typography variant="h2" align="left" sx={{ pb: 10, pl: 4, pt: 5 }}>
            Dashboard
          </Typography>
          <Grid container spacing={5}>
            {papers.map((paper, index) => (
              <Grid item xs={6} sm={4} key={index}>
                <Paper
                  sx={{
                    p: 2,

                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: 250,
                    m: 3,
                  }}
                >
                  <img
                    src={paper.icon}
                    alt={paper.title}
                    width="40"
                    height="40"
                  />
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {paper.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    color="textSecondary"
                    sx={{ pb: -1 }}
                  >
                    {paper.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick(paper.route)}
                  >
                    {paper.cta}
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </div>
  );
};

export default DashboardAdmin;
