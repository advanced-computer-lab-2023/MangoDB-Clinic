import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Paper, Typography } from '@mui/material';
import { addPatient } from '../services/api';

const PatientForm = () => {
    const[username, setUserName] = useState('karimgabr100');
    const[email, setEmail] = useState('karimgabr26@gmail.com');
    const[password, setPassword] = useState('ahmedmohsen');
    const[firstName, setFirstName] = useState('Karim Gabr');
    const[lastName, setLastName] = useState('Karim Gabr');
    const[dob, setDOB] = useState('27/05/2002');
    const[nationalID, setNationalID] = useState('Karim Gabr');
    const[gender, setGender] = useState('');
    const[mobile, setMobile] = useState('0102334455');
    const [emergencyContact, setEmergencyContact] = useState({ name: 'ahmed', mobile: '1232132123' });
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

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
            emergencyContact: {
                name: emergencyContact.name || '', // Add a default value to prevent errors
                mobile: emergencyContact.mobile || '', // Add a default value to prevent errors
            },
        };

        setIsPending(true);

        addPatient(patient)
            .then(() => {
                setIsPending(false);
                history.push('/');
            })
            .catch((error) => {
                console.error('Error adding patient:', error);
                setIsPending(false);
            });

        // fetch('http://localhost:4000/patientRegistration', {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json"},
        //     body: JSON.stringify(patient)
        // }).then(() => {
        //     setIsPending(false);
        //     // history.go(-1);
        //     history.push('/');
        // })
    }
    return ( 
        
        <Grid container  justifyContent="center" style={{ padding: '2rem' }}>
            <Grid item xs={6}>
                <Paper elevation={3} style={{ padding: '2rem' }}>
                    <h2>Register As Patient</h2>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="First Name"
                                    type="text"
                                    fullWidth
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    style={{ marginBottom: '1rem' }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Last Name"
                                    type="text"
                                    fullWidth
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    style={{ marginBottom: '1rem' }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Username"
                                    type="text"
                                    size='large'
                                    fullWidth
                                    required
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    style={{ marginBottom: '1rem' }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Email"
                                    type='email'
                                    fullWidth
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ marginBottom: '1rem' }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Password"
                                    type='password'
                                    required
                                    fullWidth
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ marginBottom: '1rem' }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Date of Birth"
                                    type="date"
                                    required
                                    fullWidth
                                    value={dob}
                                    onChange={(e) => setDOB(e.target.value)}
                                    style={{ marginBottom: '1rem' }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Mobile Number"
                                    type="tel"
                                    required
                                    fullWidth
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    style={{ marginBottom: '1rem' }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        fullWidth
                                        // color='primary'
                                        style={{ marginBottom: '1rem' }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
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
                                    style={{ marginTop: '1rem', marginBottom: '1rem', marginLeft: '1rem' }}
                                />
                            
                        </Grid>
                        <Paper elevation={3} style={{ padding: '1rem', marginTop: '1rem' ,marginBottom: '2rem', marginRight: '1rem', marginLeft: '1rem' }}>
                            <h3>Emergency Contact Information:</h3>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField 
                                            label="Emergency Contact Name"
                                            type="text" 
                                            required
                                            fullWidth
                                            value={emergencyContact.name}
                                            onChange={(e) => setEmergencyContact({ ...emergencyContact, name: e.target.value })}
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
                                            onChange={(e) => setEmergencyContact({ ...emergencyContact, mobile: e.target.value })}
                                            // style={{ margin: '1rem' }}
                                        />
                                    </Grid>
                                </Grid>
                        </Paper>
                    {!isPending ? (
                        <Button variant="contained" type="submit" fullWidth>
                            Register
                        </Button>
                    ) : (
                        <Button variant="contained" disabled fullWidth>
                            Registering
                        </Button>
                    )}
                        
                    </form>
                </Paper>
            </Grid>
        </Grid>
     );
}
 
export default PatientForm;