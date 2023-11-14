import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import { linkPatAsFam } from '../services/api'; // Function to link patient as a family member
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LinkPatientAsFam = () => {
    const id = '6526d30a0f83f5e462288354'; // Extract 'patientId' from useParams or use a default value

    const [patientInfo, setPatientInfo] = useState({
        email: '',
        phone: '',
        relation: '',
    });

    const handleChange = (field, value) => {
        setPatientInfo(prevInfo => ({
            ...prevInfo,
            [field]: value,
        }));
    };

    // const getID = async () => {
	// 	try {
	// 		const response = await axios.post(
	// 			"http://localhost:4000/Patient/myInfo",
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${localStorage.getItem("token")}`,
	// 				},
	// 			}
	// 		);

	// 		if (response.status === 200) {
	// 			return response.data._id;
	// 		}
	// 	} catch (error) {}
	// };
    const handleLink = async () => {
        try {
            const { email, phone, relation } = patientInfo;
            //const isEmptyEmail = email.trim(); // Check if the email field is empty or only whitespace
            const email2 = email&&email!==''

            await linkPatAsFam(id, email, phone, relation, email2);

            setPatientInfo({ email: '', phone: '', relation: '' }); // Reset the form after linking
        } catch (error) {
            console.error('Error linking patient as family member:', error);
        }
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        label="Email"
                        value={patientInfo.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="Phone Number"
                        value={patientInfo.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="Relation"
                        value={patientInfo.relation}
                        onChange={(e) => handleChange('relation', e.target.value)}
                    />
                </Grid>
            </Grid>

            <Button variant="contained" onClick={handleLink}>
                Link Patient as Family Member
            </Button>
        </div>
    );
};

export default LinkPatientAsFam;
