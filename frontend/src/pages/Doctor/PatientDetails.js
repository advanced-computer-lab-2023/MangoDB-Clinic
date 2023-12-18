import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
	Grid,
	Paper,
	TableBody,
	TableCell,
	TableContainer,
	Tooltip,
	Button,
	Dialog,
	DialogContent,
	Card,
	CardContent,
} from "@mui/material";

import { Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { uploadHealthRecord, selectPatient } from "../../services/api";
import Spinner from '../../components/GeneralComponents/Spinner'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import BackButton from "../../components/GeneralComponents/BackButton";
import DoctorHeader from "../../components/GeneralComponents/doctorHeader";

/**
 * TODO: 1-Get the patient using the id param (Done)
 *       2-View basic information (Done)
 *       3-View health records
 */

const PatientDetails = () => {
	const { id } = useParams();
	const [patient, setPatient] = useState("");
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);
	const [open, setOpen] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);

	useEffect(() => {
		setTimeout(() => {
			selectPatient(id)
				.then((res) => {
					setPatient(res.data);
					setIsPending(false);
				})
				.catch((err) => {
					console.log(err);
					setError(err.message);
					setIsPending(false);
				});
		}, 1000);
	}, [id, open]);

	// const handleFileChange = (event) => {
	//     const file = { originalname: event.target.files[0].name };
	//     console.log(file);
	//     setSelectedFile(file);
	// }

	// const handleUpload = () => {
	//     console.log("Selected File: ", selectedFile);

	//     uploadHealthRecord(id, [].push(selectedFile))
	//     .then((res) => {
	//         console.log(res);

	//     })
	//     .catch((err) => {
	//         console.log(err);
	//         setError(err.message);
	//     })

	//     setOpen(false);
	// }

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
	};

	const handleUpload = () => {
		if (!selectedFile) {
			setError("No file selected");
			return;
		}

		const formData = new FormData();
		formData.append("document", selectedFile);

		uploadHealthRecord(id, formData)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				setError(err.message);
			});

		// Reset the state
		setSelectedFile(null);
		setOpen(false);
	};

	return (
		<div>
			<DoctorHeader/>
				{/* {isPending && <div>Loading...</div>} */}
				{isPending && (
					// <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
					// 	<CircularProgress color="success" sx={{ color: 'green', margin: '50vh' }} />
					// </Box>
					<Spinner />
				)}
				{/* {error && <div>{error}</div>} */}
				{error && (
					<Snackbar open={open}>
						<Alert severity="error" sx={{ width: '100%' }}>
						  	{ error }
						</Alert>
					</Snackbar>
				)}
				<Paper sx={{ "margin": "auto", width: "fit-content", "marginTop": "90px", p: "10px" }}>
					{patient && (
						<div>
							<Typography
								variant="h1"
								align="left"
								sx={{ paddingLeft: "35px", paddingTop: "35px" }}
							>
								Patient Info
							</Typography>
							<Typography
								variant="body1"
								align='left'
								fontWeight='bold'
								sx={{ paddingLeft: "35px" }}
							>
								Patient Name: {patient.firstName + " " + patient.lastName}
							</Typography>
							<Typography
								variant="body1"
								align='left'
								fontWeight='bold'
								sx={{ paddingLeft: "35px" }}
							>
								Email: {patient.email}
							</Typography>
							<Typography
								variant="body1"
								align='left'
								fontWeight='bold'
								sx={{ paddingLeft: "35px" }}
							>
								Emergency Contact: {patient.emergencyContact.name} - Number:{" "}
								{patient.emergencyContact.mobile}
							</Typography>
							
							{/* <h2>Patient Name: {patient.firstName + " " + patient.lastName} </h2> */}
							{/* <h3>Email: {patient.email}</h3> */}
							{/* <p>
								Emergency Contact: {patient.emergencyContact.name} - Number:{" "}
								{patient.emergencyContact.mobile}
							</p> */}
							<br />

							<Grid container justifyContent='center' style={{ padding: "2rem" }}>
								<Grid item xs={12}>
									<Paper elevation={3} style={{ padding: "2rem" }}>
										<Typography
											style={{ margin: "1rem" }}
											align='left'
											variant='h4'
										>
											Health Records:{" "}
										</Typography>
										<TableContainer component={Paper} sx={{p:"2px"}}>
											<TableBody
												style={{
													display: "flex",
													flexFlow: "row wrap",
													justifyContent: "center",
													alignItems: "center",
												}}
											>
												{patient.healthRecord.files.length == 0
													? "No records to display"
													: patient.healthRecord.files.map((file, index) => (
															<TableCell>
																<img
																	key={index + file.name}
																	src={file.file}
																	alt={file.name}
																	// crossOrigin="anonymous"
																/>
															</TableCell>
													))}
												<TableCell>
													<Tooltip title='Add Record' align='center'>
														<Button onClick={() => setOpen(true)}>
															<AddCircleIcon color='secondary' />
														</Button>
													</Tooltip>
												</TableCell>
											</TableBody>
										</TableContainer>
									</Paper>
									<Dialog open={open} onClose={() => setOpen(false)}>
										<DialogContent>
											<Card variant='outlined'>
												<CardContent>
													<Typography variant='h6' component='div'>
														Upload Health Record
													</Typography>
													<Typography variant='body2' component='div'>
														please add only one document at a time
													</Typography>
													<input type='file' onChange={handleFileChange} />
													<Button
														variant='contained'
														color='primary'
														onClick={handleUpload}
													>
														Upload
													</Button>
												</CardContent>
											</Card>
										</DialogContent>
									</Dialog>
									<BackButton/>
								</Grid>
							</Grid>
						</div>
					)}
				</Paper>
		</div>
	);
};

export default PatientDetails;
