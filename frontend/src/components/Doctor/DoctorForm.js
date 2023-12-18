import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Input,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Typography,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  Tooltip,
  Snackbar,
  FormHelperText,
  Alert,
} from "@mui/material";

import { addDoctor } from "../../services/api";

const DoctorForm = () => {
  const uploadIcon = `${process.env.PUBLIC_URL}/icons/upload.svg`;

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [warningOpen, setWarningOpen] = React.useState(false);

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [educationalBackground, setEducationalBackground] = useState("");
  const [documents, setDocuments] = useState([]);
  const [speciality, setSpeciality] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    navigate("/Home"); // Redirect to the login page after successful registration
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  const handleWarningClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setWarningOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("dob", dob);
    formData.append("affiliation", affiliation);
    formData.append("hourlyRate", hourlyRate);
    formData.append("educationalBackground", educationalBackground);
    formData.append("speciality", speciality);
    documents.forEach((file) => {
      formData.append(`documents`, file);
    });

    setIsPending(true);

    addDoctor(formData)
      .then(() => {
        setIsPending(false);
        alert("Registered Successfully, Please Wait To Be Approved");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding doctor:", error);
        setIsPending(false);
      });
  };
  return (
    <Grid container justifyContent="center" style={{ padding: "2rem" }}>
      <Grid item xs={12} sm={6}>
        <Paper elevation={3} style={{ padding: "2rem" }}>
          <Typography variant="h3">Register as a Doctor</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  type="text"
                  fullWidth
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  type="text"
                  fullWidth
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Username"
                  type="text"
                  size="large"
                  fullWidth
                  required
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  type="password"
                  required
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  required
                  fullWidth
                  value={dob}
                  onChange={(e) => setDOB(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Speciality"
                  type="text"
                  size="large"
                  fullWidth
                  required
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Affiliation"
                  type="text"
                  size="large"
                  fullWidth
                  required
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Educational Background"
                  type="text"
                  size="large"
                  fullWidth
                  required
                  value={educationalBackground}
                  onChange={(e) => setEducationalBackground(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Hourly Rate"
                  type="number"
                  required
                  fullWidth
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>

              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  component="label"
                  startIcon={
                    <img
                      src={uploadIcon}
                      alt="Upload Icon"
                      style={{ filter: "invert(1)" }}
                      width="20"
                      height="20"
                    />
                  }
                  onClick={() => document.getElementById("fileInput").click()}
                  fullWidth // This makes the button take up the full width of the Grid item
                >
                  Upload
                </Button>
                <Input
                  id="fileInput"
                  type="file"
                  name="picture"
                  onChange={(e) => setDocuments(Array.from(e.target.files))}
                  style={{ display: "none" }}
                />
                <FormHelperText>
                  Upload id , medicine degree or working license
                </FormHelperText>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              style={{ marginTop: "2rem" }}
            >
              {isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register"
              )}
            </Button>
            <Grid item xs sx={{ pt: 3 }}>
              <Typography variant="body2">Already registered?</Typography>
              <Link href="/login" variant="body2" sx={{ color: "#15678d" }}>
                Login
              </Link>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSuccessClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Patient registration was successful. You will be redirected to the
          home page shortly.
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={handleErrorClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Patient registration failed. Please try again.
        </Alert>
      </Snackbar>

      <Snackbar
        open={warningOpen} // You need to control this state variable
        autoHideDuration={6000}
        onClose={handleWarningClose} // And this function
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleWarningClose}
          severity="warning"
          sx={{ width: "100%" }}
        >
          A field is missing or a username is taken. Please check your input.
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default DoctorForm;
