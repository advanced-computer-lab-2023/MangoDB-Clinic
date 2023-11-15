import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Button, FormControl, Grid, Paper, Input } from "@mui/material";

import { uploadHealthRecord } from "../services/api";

const AddHealthRecordsPatient = async () => {
	const [documents, setDocuments] = useState();
	const [isPending, setIsPending] = useState(false);
	const navigate = useNavigate();

	// const id = '65394ff997fe2d0027faca14'

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
	const id = await getID();

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		documents.forEach((file) => {
			formData.append(`document`, file);
		});

		console.log(formData);
		console.log(formData.getAll("document"));

		setIsPending(true);

		uploadHealthRecord(id, formData)
			.then(() => {
				setIsPending(false);
				navigate("/patientdashboard");
			})
			.catch((error) => {
				console.error("Error uploading documents:", error);
				setIsPending(false);
			});

		//getHealthRecords(id)
	};

	const handleViewHealthRecords = () => {
		navigate(`/viewhealthrecpat/${id}`); // Adjust the route path as needed
	};

	return (
		<div>
			<Grid container justifyContent='center' style={{ padding: "2rem" }}>
				<Grid item xs={6}>
					<Paper elevation={3} style={{ padding: "2rem" }}>
						<h2>Upload Documents</h2>
						<form onSubmit={handleSubmit}>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<FormControl fullWidth>
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
									Upload
								</Button>
							) : (
								<Button variant='contained' disabled fullWidth>
									Uploading
								</Button>
							)}
						</form>

						{/* Add the button to redirect to ViewHealthRecordsPat */}
						<Button
							variant='contained'
							onClick={handleViewHealthRecords}
							fullWidth
							style={{ marginTop: "10px" }}
						>
							View Health Records
						</Button>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default AddHealthRecordsPatient;
