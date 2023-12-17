import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


import { Button, FormControl, Grid, Paper, Input, FormHelperText } from "@mui/material";

import { uploadHealthRecord } from "../services/api";

const AddHealthRecordsPatient = () => {
	const [documents, setDocuments] = useState();
	const [isPending, setIsPending] = useState(false);
	const navigate = useNavigate();

	const uploadIcon = `${process.env.PUBLIC_URL}/icons/upload.svg`;


	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		documents.forEach((file) => {
			formData.append(`document`, file);
		});

		console.log(formData);
		console.log(formData.getAll("document"));

		setIsPending(true);

		uploadHealthRecord(formData)
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
		navigate(`/viewhealthrecpat}`); // Adjust the route path as needed
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
									Upload PDFs, JPGs or PNGs
								</FormHelperText>
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
