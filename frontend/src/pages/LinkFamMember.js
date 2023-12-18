import React, { useState } from "react";
import axios from "axios";

import { Button, TextField, Grid,Typography,Paper, Tooltip } from "@mui/material";

import BackButton from "../components/GeneralComponents/BackButton";
import { linkFam } from "../services/api";
import PatientHeader from "../components/GeneralComponents/patientHeader";

const LinkFamMember = () => {
	//const id = "6526d30a0f83f5e462288354"; // Extract 'patientId' from useParams or use the default value

	const [family, setFamily] = useState({
		name: "",
		nationalID: "",
		age: "",
		gender: "",
		relation: "",
	});

	const handleChange = (field, value) => {
		setFamily((prevState) => ({
			...prevState,
			[field]: value,
		}));
	};
	const getID = async () => {
		try {
			const response = await axios.post(
				"http://localhost:4000/Patient/myInfo",
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 200) {
				return response.data._id;
			}
		} catch (error) {}
	};

	const handleLink = async () => {
		try {
			await linkFam( [family]);
			setFamily({
				name: "",
				nationalID: "",
				age: "",
				gender: "",
				relation: "",
			});
		} catch (error) {
			console.error("Error linking family member:", error);
		}
	};

	return (
		<>
			<PatientHeader />
			<Grid container justifyContent='center' style={{ padding: "2rem" }}>
				<Grid item xs={6}>
					<Paper
						elevation={3}
						sx={{ maxWidth: "80%", margin: "auto" }}
						style={{ padding: "2rem" }}
					>
						<Typography variant='h4' paddingBottom={3}>
							Add Family Member
						</Typography>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<TextField
									label='Name'
									value={family.name}
									fullWidth
									required
									InputLabelProps={{ shrink: true }}
									placeholder='Name'
									onChange={(e) => handleChange("name", e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									label='National ID'
									value={family.nationalID}
									fullWidth
									required
									InputLabelProps={{ shrink: true }}
									placeholder='0123456789'
									onChange={(e) => handleChange("nationalID", e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									label='Age'
									value={family.age}
									fullWidth
									required
									InputLabelProps={{ shrink: true }}
									placeholder='00'
									onChange={(e) => handleChange("age", e.target.value)}
								/>
							</Grid>
							<Grid item xs={6}>
								<Tooltip
									title='Gender can only be male or female.'
									placement='right'
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
										label='Gender'
										value={family.gender}
										fullWidth
										required
										InputLabelProps={{ shrink: true }}
										placeholder='Gender'
										onChange={(e) => handleChange("gender", e.target.value)}
									/>
								</Tooltip>
							</Grid>
							<Grid item xs={6}>
								<Tooltip
									title='Relation can only be husband, wife, or child.'
									placement='right'
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
										label='Relation'
										value={family.relation}
										fullWidth
										required
										InputLabelProps={{ shrink: true }}
										placeholder='Relation'
										onChange={(e) => handleChange("relation", e.target.value)}
									/>
								</Tooltip>
							</Grid>
						</Grid>

						<Button
							variant='contained'
							type='submit'
							fullWidth
							onClick={handleLink}
						>
							Link
						</Button>
						<BackButton />
					</Paper>
				</Grid>
			</Grid>
		</>
	);
};

export default LinkFamMember;
