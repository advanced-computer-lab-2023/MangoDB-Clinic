import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Grid, Paper, Typography, TextField, Table, TableHead, TableCell } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ReusableTable2 from "../../components/ReusableTable2";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { getPatientsDoctor, searchPatients } from "../../services/api";
import Spinner from "../../components/GeneralComponents/Spinner";
import PatientRow from "../../components/Doctor/PatientRow";
import DoctorHeader from "../../components/GeneralComponents/doctorHeader";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

const PatientList = () => {
	// const { id } = useParams();
	const [patients, setPatients] = useState([]);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);
	const [search, setSearch] = useState("");
	// const [ upcoming, setUpcoming ] = useState(false);

	// const getID = async () => {
	// 	try {
	// 		const response = await axios.post("http://localhost:4000/doctor/myInfo", {
	// 			headers: {
	// 				Authorization: `Bearer ${localStorage.getItem("token")}`,
	// 			},
	// 		});

	// 		if (response.status === 200) {
	// 			return response.data._id;
	// 		}
	// 	} catch (error) {}
	// };

	// const id = await getID();

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (search) {
			setIsPending(true);
			setPatients([]);

			searchPatients(search)
				.then((result) => {
					setPatients(result.data);
					setIsPending(false);
				})
				.catch((err) => {
					setError(err.message);
					setIsPending(false);
				});
		}
	};

	useEffect(() => {
		if (search == "") {
			setIsPending(true);
			setPatients([]);

			getPatientsDoctor()
				.then((res) => {
					setPatients(res.data);
					setIsPending(false);
				})
				.catch((err) => {
					setError(err.message);
					setIsPending(false);
				});
		}
	}, [search]);

	// const handleUpcomingClick = () => {
	//     setUpcoming(!upcoming);
	// }

	// useEffect(() => {
	//     if (search == '' && !upcoming) {
	//         setIsPending(true);
	//         setPatients([]);

	//         getPatientsDoctor(id)
	//             .then((res) => {
	//                 setPatients(res.data);
	//                 setIsPending(false);
	//             })
	//             .catch((err) => {
	//                 setError(err.message);
	//                 setIsPending(false);
	//             });
	//     }
	// }, [id, search, upcoming]);

	// useEffect(() => {
	//     setIsPending(true);
	//     setPatients([]);

	//     if (upcoming) {
	//         upcomingApp(id)
	//             .then((result) => {
	//                 setIsPending(false);
	//                 setPatients(result.data);
	//             })
	//             .catch((err) => {
	//                 setIsPending(false);
	//                 setError(err.message);
	//             })
	//     }
	// }, [upcoming])

	const columns = [
		{ id: "patientName", label: "Patient Name" },
		{ id: "email", label: "Email", align: "right" },
		// { id: "emergencyContact", label: "Emergency Contact", align: "right" },
	];

	const modifiedPatients =
		patients &&
		patients.map((patient) => ({
			...patient,
			patientName: `${patient.firstName} ${patient.lastName}`
		}));

	return (
		<div className='patient-list'>
			<DoctorHeader />
				<Paper sx={{ "margin": "auto", "width": "fit-content", "minWidth": "60%", "marginTop": "90px", "padding": "2%" }}>
					{
						<>
							<Grid item xs={12}>
								<Typography
									variant='h1'
									marginBottom="10px"
								>
									Patient List
								</Typography>
							</Grid>

							<div style={{ display: "flex", gap: "250px", marginBottom: "25px" }}>
								<form onSubmit={handleSubmit}>
									<Grid container direction="row" alignItems="center" item xs={12}>
										<Grid item>
											<TextField
												label='Search'
												type='text'
												size='small'
												value={search}
												onChange={handleChange}
												// sx={{ "marginTop": "11.5%", "marginRight": "2%" }}
												sx={{ "marginTop": "11.5%", "marginRight": "10px" }}
											/>
										</Grid>
										<Grid item>
											<Button variant='contained' type='submit'>
												Search
											</Button>
										</Grid>
									</Grid>
								</form>

								<Button
									component={Link}
									disabled={false}
									size='medium'
									variant='contained'
									// style={{ margin: "10px", color: "white", background: "#1976d2" }}
									sx={{ "marginBottom": "10px" }}
									to='/doctorAppointments'
								>
									Go To Appointments
								</Button>
							</div>
						</>
					}
					{/* { !upcoming &&
						<Button
							disabled={false}
							size="medium"
							variant="outlined"
							style={{ margin: '10px', color: '#1976d2' }}
							onClick={ handleUpcomingClick }
						>
							Upcoming Appointments
						</Button> 
					}
					{ upcoming &&
						<Button
							disabled={false}
							size="medium"
							variant="filled"
							style={{ margin: '10px', color: 'white', background: '#1976d2' }}
							onClick={ handleUpcomingClick }
						>
							Upcoming Appointments
						</Button> 
					} */}
					{/* {
						<Button
							component={Link}
							disabled={false}
							size='medium'
							variant='contained'
							// style={{ margin: "10px", color: "white", background: "#1976d2" }}
							sx={{ "marginBottom": "10px" }}
							to='/doctorAppointments'
						>
							Go To Appointments
						</Button>
					} */}
					{/* {isPending && <div>Loading...</div>} */}
					{ isPending && <Spinner /> }
					{/* {error && <div>{error}</div>} */}
					{error && (
						<Snackbar open={open}>
							<Alert severity="error" sx={{ width: '100%' }}>
								{ error }
							</Alert>
						</Snackbar>
					)}
					{/* {!isPending && !error && patients.length < 1 && (
						<div>No patients to display...</div>
					)} */}
					{/* {patients.length > 0 && (
						// <>
						//     <label>Search: </label>
						//     <input
						//         type="text"
						//         value={ search }
						//         onChange={ handleChange }
						//     />

						//     { patients.map((patient) => (
						//         <div className='patient-preview' key={ patient._id }>
						//             <Link to={ `/selectedPatient/${ patient._id }` }>
						//                 <h2>{ patient.firstName + " " + patient.lastName }</h2>
						//                 <p>{ patient.email }</p>
						//             </Link>
						//         </div>
						//     )) }
						// </>

						<Grid
							container
							direction='column'
							justifyContent='center'
							alignItems='flex-start'
							spacing={3}
						>
							{patients.map((patient, index) => (
								<Grid
									item
									xs={12}
									sm={6}
									md={4}
									key={
										patient.appointmentId
											? `${patient.appointmentId}-${patient._id}`
											: patient._id
									}
								>
									<div>
										<Link
											to={`/selectedPatient/${patient._id}`}
											style={{ textDecoration: "none" }}
										>
											<Item>
												<Typography variant='h6' style={{ color: "black" }}>
													{patient.firstName + " " + patient.lastName}
												</Typography>
												<Typography variant='body2'>{patient.email}</Typography>
												{/* { upcoming &&
													<>
														<Typography variant="body2">
															{ `Date: ${new Date(patient.date).toLocaleDateString()}` }
														</Typography>
														<Typography variant="body2">
															{ `Time: ${new Date(patient.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` }
														</Typography>
														<Typography variant="body2">
															{ `Status: ${ patient.status }` }
														</Typography>
													</>
												} //}
											</Item>
										</Link>
									</div>
								</Grid>
								// <Grid item xs={2} sm={4} md={4} key={index}>
								//     <Item>xs=2</Item>
								// </Grid>
							))}
						</Grid>
					)} */}
					{/* { patients && (
						<ReusableTable2
							data={modifiedPatients}
							columns={columns}
							linkPath='/selectedPatient'
						/>
					) } */}
					<Paper>
						{ patients && (
							<>
								<Table>
									<TableHead
										sx={{ "backgroundColor": "#b2f0e8" }}
									>
										<TableCell
											sx={{ fontWeight: "bold" }}
										>
											Patient Name
										</TableCell>

										<TableCell
											sx={{ fontWeight: "bold" }}
										>
											Email
										</TableCell>

										<TableCell
											sx={{ fontWeight: "bold" }}
										>
											Create Video Chat
										</TableCell>
									</TableHead>
									{ modifiedPatients.map((patient) => (
										<PatientRow patient={patient} />
									)) }
								</Table>
							</>
						) }
					</Paper>
				</Paper>
		</div>
	);
};

export default PatientList;
