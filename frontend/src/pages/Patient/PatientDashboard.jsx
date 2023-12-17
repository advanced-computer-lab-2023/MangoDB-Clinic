import React from "react";
import { Paper, Typography, Grid, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PatientHeader from "../../components/GeneralComponents/patientHeader";


// Import your icons
const Icon1 = `${process.env.PUBLIC_URL}/icons/profile.svg`;
const Icon2 = `${process.env.PUBLIC_URL}/icons/doctor.svg`;
const Icon3 = `${process.env.PUBLIC_URL}/icons/appointment.svg`;
const Icon4 = `${process.env.PUBLIC_URL}/icons/healthPackage.svg`;
const Icon5 = `${process.env.PUBLIC_URL}/icons/prescription.svg`;
const Icon6 = `${process.env.PUBLIC_URL}/icons/wallet.svg`;

const Dashboard = () => {
	const navigate = useNavigate();

  // Define your data
  const papers = [
    {
      icon: Icon1,
      title: "Profile",
      description: "View/Edit Profile",
	  route: "/viewprofile",
      cta: "View",
    },
    {
      icon: Icon2,
      title: "Doctors",
      description: "Search for doctors",
	  route: "/search-doctors",
      cta: "View",
    },
    {
      icon: Icon3,
      title: "Appointments",
      description: "Schedule appointments with doctor ",
	  route: "/viewappointments",
      cta: "View",
    },
    {
      icon: Icon4,
      title: "Health Packages",
      description: "Subscribe for me or family members",
	  route: "/viewpackages",
      cta: "View",
    },
    {
      icon: Icon5,
      title: "Prescriptions",
      description: "View prescribed medicines",
	  route: "/viewPrescriptionsOfPatient",
      cta: "View",
    },
    {
      icon: Icon6,
      title: "Wallet",
      description: "View wallet balance",
	  route: "/view_wallet",
      cta: "View",
    },
  ];

  const handleButtonClick = (route) => {
    navigate(route);
  };

  return (
	<div>
		<PatientHeader />
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
                  color="textSecondary"
                  sx={{ pb: -1 }}
                >
                  {paper.description}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => handleButtonClick(paper.route)}>
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

export default Dashboard;
