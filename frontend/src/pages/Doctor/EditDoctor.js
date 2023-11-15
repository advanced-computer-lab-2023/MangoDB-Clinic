import { useState, useEffect } from "react";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
	getDoctor,
	updateDoctorAffiliation,
	updateDoctorEmail,
	updateDoctorRate,
} from "../../services/api";

const EditDoctor = async () => {
	// const { id } = useParams();
	const [doctor, setDoctor] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const defaultTheme = createTheme();

	const getID = async () => {
		try {
			const response = await axios.post("http://localhost:4000/doctor/myInfo", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			if (response.status === 200) {
				return response.data._id;
			}
		} catch (error) {}
	};

	const id = await getID();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setDoctor((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		updateDoctorEmail(id, doctor);
		updateDoctorRate(id, doctor);
		updateDoctorAffiliation(id, doctor);
		setSuccess(true);

		setTimeout(() => {
			window.location.reload();
		}, 2000);
	};

	useEffect(() => {
		getDoctor(id)
			.then((res) => {
				setDoctor(res.data);
				setIsPending(false);
			})
			.catch((err) => setError(err.message));
	}, [id]);

	return (
		<div>
			{isPending && <div>Loading...</div>}
			{error && <div>{error}</div>}
			{doctor && (
				<ThemeProvider theme={defaultTheme}>
					<Container component='main' maxWidth='xs'>
						<CssBaseline />
						<Box
							sx={{
								marginTop: 8,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
								{/* <LockOutlinedIcon /> */}
							</Avatar>
							<Typography component='h1' variant='h5'>
								Edit Info
							</Typography>
							<Box
								component='form'
								noValidate
								onSubmit={handleSubmit}
								sx={{ mt: 3 }}
							>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<TextField
											autoComplete='given-name'
											name='firstName'
											required
											fullWidth
											id='firstName'
											label='First Name'
											// autoFocus
											value={doctor.firstName}
											disabled
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											required
											fullWidth
											id='lastName'
											label='Last Name'
											name='lastName'
											autoComplete='family-name'
											value={doctor.lastName}
											disabled
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											required
											fullWidth
											id='email'
											label='Email Address'
											name='email'
											value={doctor.email}
											onChange={handleChange}
											autoComplete='email'
										/>
									</Grid>
									{/* <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid> */}
									<Grid item xs={12}>
										<TextField
											required
											fullWidth
											id='rate'
											label='Hourly Rate'
											name='hourlyRate'
											value={doctor.hourlyRate}
											onChange={handleChange}
											autoComplete='Hourly Rate'
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											required
											fullWidth
											id='affiliation'
											label='Affiliation'
											name='affiliation'
											value={doctor.affiliation}
											onChange={handleChange}
											autoComplete='Affiliation'
										/>
									</Grid>
									{/* <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid> */}
								</Grid>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									sx={{ mt: 3, mb: 2 }}
								>
									Submit
								</Button>
								{/* <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid> */}
							</Box>
						</Box>
					</Container>
				</ThemeProvider>
			)}
			{success && (
				<Alert severity='success'>
					<AlertTitle>Success</AlertTitle>
					Submitted Successfully!
				</Alert>
			)}
		</div>
	);
};

export default EditDoctor;
