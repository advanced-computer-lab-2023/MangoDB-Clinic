import React, { useState } from "react";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";

import { addPatient } from "../../services/api";

const PatientForm = () => {
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [warningOpen, setWarningOpen] = React.useState(false);

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [emergencyContact, setEmergencyContact] = useState({
    name: "",
    mobile: "",
  });
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
    const patient = {
      username,
      email,
      password,
      firstName,
      lastName,
      dob,
      nationalID,
      gender,
      mobile,
      emergencyContact,
    };

    localStorage.clear();

    setIsPending(true);

    addPatient(patient)
      .then(() => {
        setIsPending(false);
        alert("Account Created Successfully, Please Login");
        navigate("/login");
      })
      .catch((error) => {
        alert(error.response.data.error);
        setIsPending(false);
      });
  };
  return (
    <Grid container justifyContent="center" style={{ padding: "2rem" }}>
      <Grid item xs={12} md={8} lg={6}>
        <Paper
          elevation={3}
          style={{ padding: "2rem" }}
          sx={{ maxWidth: "80%", margin: "auto" }}
        >
          <Typography variant="h3" sx={{ pb: "1rem" }}>
            Register As Patient
          </Typography>
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
                <Tooltip
                  title="Your password must be at least 8 characters long, contain at least one number and have a mix of uppercase and lowercase letters."
                  placement="right"
                  PopperProps={{
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -10], // Adjust these values as needed
                        },
                      },
                    ],
                  }}
                >
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    required
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: "1rem" }}
                  />
                </Tooltip>
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
                  label="Mobile Number"
                  type="tel"
                  required
                  fullWidth
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl required fullWidth margin="normal">
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender-select"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <TextField
                label="National ID"
                type="number"
                required
                fullWidth
                value={nationalID}
                onChange={(e) => setNationalID(e.target.value)}
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  marginLeft: "1rem",
                }}
              />
            </Grid>

            <Typography variant="h5" style={{ margin: "1rem" }}>
              Emergency Contact Information:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Emergency Contact Name"
                  type="text"
                  required
                  fullWidth
                  value={emergencyContact.name}
                  onChange={(e) =>
                    setEmergencyContact({
                      ...emergencyContact,
                      name: e.target.value,
                    })
                  }
                  // style={{ margin: '1rem' }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Emergency Contact Mobile Number"
                  type="tel"
                  required
                  fullWidth
                  value={emergencyContact.mobile}
                  onChange={(e) =>
                    setEmergencyContact({
                      ...emergencyContact,
                      mobile: e.target.value,
                    })
                  }
                  // style={{ margin: '1rem' }}
                />
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

export default PatientForm;
