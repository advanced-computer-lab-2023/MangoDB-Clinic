import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	Button,
	TextField,
	FormControl,
	InputLabel,
	Grid,
	Paper,
	Input,
} from "@mui/material";

import { addDoctor } from "../services/api";

const DoctorForm = () => {
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

	const handleSubmit = (e) => {
		e.preventDefault();
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
				navigate("/doctordashboard");
			})
			.catch((error) => {
				console.error("Error adding doctor:", error);
				setIsPending(false);
			});
	};
	return (
		<Grid container justifyContent='center' style={{ padding: "2rem" }}>
			<Grid item xs={6}>
				<Paper elevation={3} style={{ padding: "2rem" }}>
					<h2>Register As Doctor</h2>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<TextField
									label='First Name'
									type='text'
									fullWidth
									required
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									style={{ marginBottom: "1rem" }}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									label='Last Name'
									type='text'
									fullWidth
									required
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									style={{ marginBottom: "1rem" }}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									label='Username'
									type='text'
									size='large'
									fullWidth
									required
									value={username}
									onChange={(e) => setUserName(e.target.value)}
									style={{ marginBottom: "1rem" }}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									label='Email'
									type='email'
									fullWidth
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									style={{ marginBottom: "1rem" }}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									label='Password'
									type='password'
									required
									fullWidth
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									style={{ marginBottom: "1rem" }}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									label='Date of Birth'
									type='date'
									required
									fullWidth
									value={dob}
									onChange={(e) => setDOB(e.target.value)}
									style={{ marginBottom: "1rem" }}
								/>
							</Grid>

							<Grid item xs={6}>
								<TextField
									label='Speciality'
									type='text'
									size='large'
									fullWidth
									required
									value={speciality}
									onChange={(e) => setSpeciality(e.target.value)}
									style={{ marginBottom: "1rem" }}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									label='Affiliation'
									type='text'
									size='large'
									fullWidth
									required
									value={affiliation}
									onChange={(e) => setAffiliation(e.target.value)}
									style={{ marginBottom: "1rem" }}
								/>
							</Grid>

							<Grid item xs={6}>
								<TextField
									label='Educational Background'
									type='text'
									size='large'
									fullWidth
									required
									value={educationalBackground}
									onChange={(e) => setEducationalBackground(e.target.value)}
									style={{ marginBottom: "1rem" }}
								/>
							</Grid>

							<Grid item xs={6}>
								<TextField
									label='Hourly Rate'
									type='number'
									required
									fullWidth
									value={hourlyRate}
									onChange={(e) => setHourlyRate(e.target.value)}
									style={{ marginBottom: "1rem" }}
								/>
							</Grid>

							<Grid item xs={6}>
								<FormControl fullWidth>
									<InputLabel>Upload Documents</InputLabel>
									<Input
										type='file'
										onChange={(e) => setDocuments(Array.from(e.target.files))}
										style={{ marginBottom: "5rem" }}
										inputProps={{ multiple: true }}
									/>
								</FormControl>
							</Grid>
						</Grid>

						{!isPending ? (
							<Button variant='contained' type='submit' fullWidth>
								Register
							</Button>
						) : (
							<Button variant='contained' disabled fullWidth>
								Registering
							</Button>
						)}
					</form>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default DoctorForm;
