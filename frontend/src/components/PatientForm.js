import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Paper } from '@mui/material';
import { addPatient } from '../services/api';

const PatientForm = () => {
    const[username, setUserName] = useState('karimgabr100');
    const[name, setName] = useState('Karim Gabr');
    const[email, setEmail] = useState('karimgabr26@gmail.com');
    const[password, setPassword] = useState('ahmedmohsen');
    const[dob, setDOB] = useState('27/05/2002');
    const[gender, setGender] = useState('');
    const[mobile, setMobile] = useState('0102334455');
    const [emergencyContact, setEmergencyContact] = useState({ fullName: 'ahmed', mobileNumber: '1232132123' });
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const patient = {username, name, email, password, dob, gender, mobile, emergencyContact};

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
        <Grid container justifyContent="center">
            <Gird item xs={6}>
                <Paper elevation={3} style={{ padding: '2rem' }}>
                    <h2>Register As Patient</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            type="text"
                            fullWidth
                            required
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            style={{ marginBottom: '1rem' }}
                        />
                        <TextField
                            label="Name"
                            type="text"
                            fullWidth
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ marginBottom: '1rem' }}
                        />
                        <TextField
                            label="Email"
                            type='email'
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ marginBottom: '1rem' }}
                        />
                        <TextField
                            label="Password"
                            type='password'
                            required
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ marginBottom: '1rem' }}
                        />
                        <TextField
                            label="Date of Birth"
                            type="date"
                            required
                            fullWidth
                            value={dob}
                            onChange={(e) => setDOB(e.target.value)}
                            style={{ marginBottom: '1rem' }}
                        />
                        {/* <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="Male">Male</option>
                            <option value="yoshi">Female</option>
                        </select>
                        <label>Mobile Number: </label>
                        <textarea
                            type="tel"
                            required
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        ></textarea>
                        <label>Emergency Contact Full Name:</label>
                            <input 
                                type="text" 
                                required
                                value={emergencyContact.fullName}
                                onChange={(e) => setEmergencyContact({ ...emergencyContact, fullName: e.target.value })}
                            />

                            <label>Emergency Contact Mobile Number:</label>
                            <input 
                                type="tel" 
                                required
                                value={emergencyContact.mobileNumber}
                                onChange={(e) => setEmergencyContact({ ...emergencyContact, mobileNumber: e.target.value })}
                            /> */}
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
            </Gird>
        </Grid>
     );
}
 
export default PatientForm;