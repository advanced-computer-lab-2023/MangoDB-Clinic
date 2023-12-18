import React, { useState } from "react";

import { Button, TextField, Grid, Typography, Paper } from "@mui/material";

import BackButton from "../components/GeneralComponents/BackButton";
import { linkPatAsFam } from "../services/api";
import PatientHeader from "../components/GeneralComponents/patientHeader";

const LinkPatientAsFam = () => {
	//const id = "6526d30a0f83f5e462288354"; // Extract 'patientId' from useParams or use a default value

	const [patientInfo, setPatientInfo] = useState({
		email: "",
		phone: "",
		relation: "",
	});

	const handleChange = (field, value) => {
		setPatientInfo((prevInfo) => ({
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
			//const email2 = email && email !== "";

			if (email == "" && phone == "") {
				alert("Please provide either an Email or Phone number");
			}

			await linkPatAsFam(email, phone, relation);

			setPatientInfo({ email: "", phone: "", relation: "" }); // Reset the form after linking
		} catch (error) {
			console.error("Error linking patient as family member:", error);
		}
	};

	return (
		<>
			<PatientHeader />
			<Grid container justifyContent='center' style={{ padding: "2rem" }}>
				<Grid item xs={6}>
					<Paper elevation={3} style={{ padding: "2rem" }}>
						<Typography variant='h3' paddingBottom={10}>
							Link Patient as Family Member
						</Typography>
						<Grid
							container
							spacing={2}
							sx={{ display: "flex", flexDirection: "column" }}
						>
							<Grid
								container
								spacing={2}
								sx={{ display: "flex", flexDirection: "row" }}
							>
								<Grid item xs={4}>
									<TextField
										label='Email'
										value={patientInfo.email}
										fullWidth
										InputLabelProps={{ shrink: true }}
										onChange={(e) => handleChange("email", e.target.value)}
									/>
								</Grid>
								<br />
								<Typography variant='p' paddingTop={5} paddingLeft={3}>
									-OR-
								</Typography>

								<Grid item xs={4}>
									<TextField
										label='Phone Number'
										value={patientInfo.phone}
										fullWidth
										InputLabelProps={{ shrink: true }}
										onChange={(e) => handleChange("phone", e.target.value)}
									/>
								</Grid>
							</Grid>
							<br></br>
							<Grid item xs={4}>
								<TextField
									label='Relation'
									value={patientInfo.relation}
									fullWidth
									required
									InputLabelProps={{ shrink: true }}
									onChange={(e) => handleChange("relation", e.target.value)}
								/>
							</Grid>
						</Grid>

						<Button
							variant='contained'
							type='submit'
							fullWidth
							onClick={handleLink}
						>
							Link Patient as Family Member
						</Button>
						<BackButton />
					</Paper>
				</Grid>
			</Grid>
		</>
	);
};

export default LinkPatientAsFam;
