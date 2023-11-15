import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockResetIcon from "@mui/icons-material/LockReset";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Spinner from "./Spinner";

const defaultTheme = createTheme();

let entity = null;

export default function ForgotPasswordUser() {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = React.useState(false);
	const [requestOTP, setRequestOTP] = React.useState(true);
	const [verifyOTP, setVerifyOTP] = React.useState(false);
	const [resetPassword, setResetPassword] = React.useState(false);

	const [formDataRequest, setFormDataRequest] = React.useState({
		email: "",
	});

	const [formDataVerify, setFormDataVerify] = React.useState({
		otp: "",
	});

	const [formDataReset, setFormDataReset] = React.useState({
		password: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		if (requestOTP) {
			setFormDataRequest({ ...formDataRequest, [name]: value });
		} else if (verifyOTP) {
			setFormDataVerify({ ...formDataVerify, [name]: value });
		} else if (resetPassword) {
			setFormDataReset({ ...formDataReset, [name]: value });
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (requestOTP) {
			handleRequest();
		} else if (verifyOTP) {
			handleVerify();
		} else if (resetPassword) {
			handleReset();
		}
	};

	const checkIfDoctor = async () => {
		try {
			const res = await axios.post(
				"http://localhost:4000/doctor/get_doctor",
				formDataRequest
			);

			console.log("Response: " + res.status);

			if (res.status === 200) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			// alert(error);
		}
	};

	const checkIfPatient = async () => {
		try {
			const res = await axios.post(
				"http://localhost:4000/patient/get_patient",
				formDataRequest
			);

			console.log("Response: " + res.status);

			if (res.status === 200) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			// alert(error);
		}
	};

	const handleRequest = async () => {
		if (await checkIfDoctor()) {
			entity = "doctor";
		} else if (await checkIfPatient()) {
			entity = "patient";
		} else {
			alert("Invalid Email");
			return;
		}

		try {
			setIsLoading(true);
			const response = await axios.post(
				entity === "doctor"
					? `http://localhost:4000/doctor/request-otp`
					: `http://localhost:4000/patient/request-otp`,
				formDataRequest
			);

			if (response.status === 200) {
				alert(response.data.message);
				setRequestOTP(false);
				setVerifyOTP(true);
			}
		} catch (error) {
			alert(error.response.data.message);
		} finally {
			console.log("Entity: " + entity);
			setIsLoading(false);
		}
	};

	const handleVerify = async () => {
		try {
			setIsLoading(true);
			console.log("Entity Verify: " + entity);
			const response = await axios.post(
				entity === "doctor"
					? `http://localhost:4000/doctor/verify-otp`
					: `http://localhost:4000/patient/verify-otp`,
				{
					email: formDataRequest.email,
					otp: formDataVerify.otp,
				}
			);

			if (response.status === 200) {
				alert(response.data.message);
				setVerifyOTP(false);
				setResetPassword(true);
			}
		} catch (error) {
			alert("Invalid OTP");
		} finally {
			setIsLoading(false);
		}
	};

	const handleReset = async () => {
		try {
			setIsLoading(true);
			const response = await axios.post(
				entity === "doctor"
					? `http://localhost:4000/doctor/reset-password`
					: `http://localhost:4000/patient/reset-password`,
				{
					email: formDataRequest.email,
					password: formDataReset.password,
				}
			);

			if (response.status === 200) {
				alert(response.data.message);
				setResetPassword(false);
				navigate("/login");
			}
		} catch (error) {
			alert("New Password Cannot Be The Same As The Old One");
		} finally {
			setIsLoading(false);
		}
	};

	if (requestOTP) {
		return (
			<ThemeProvider theme={defaultTheme}>
				<Container component='main' maxWidth='xs'>
					<CssBaseline />
					{isLoading ? (
						<Spinner />
					) : (
						<>
							<Box
								sx={{
									marginTop: 8,
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
							>
								<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
									<LockResetIcon />
								</Avatar>
								<Typography component='h1' variant='h5'>
									Reset Password
								</Typography>

								<Box
									component='form'
									onSubmit={handleSubmit}
									noValidate
									sx={{ mt: 1 }}
								>
									<TextField
										margin='normal'
										required
										fullWidth
										id='email'
										label='Email Address'
										name='email'
										value={formDataRequest.email}
										onChange={handleInputChange}
										autoComplete='email'
										autoFocus
									/>
									<Button
										type='submit'
										fullWidth
										variant='contained'
										sx={{ mt: 3, mb: 2 }}
									>
										Request OTP
									</Button>
								</Box>
							</Box>
						</>
					)}
				</Container>
			</ThemeProvider>
		);
	} else if (verifyOTP) {
		return (
			<ThemeProvider theme={defaultTheme}>
				<Container component='main' maxWidth='xs'>
					<CssBaseline />
					{isLoading ? (
						<Spinner />
					) : (
						<>
							<Box
								sx={{
									marginTop: 8,
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
							>
								<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
									<LockResetIcon />
								</Avatar>
								<Typography component='h1' variant='h5'>
									Reset Password
								</Typography>

								<Box
									component='form'
									onSubmit={handleSubmit}
									noValidate
									sx={{ mt: 1 }}
								>
									<TextField
										margin='normal'
										required
										fullWidth
										id='otp'
										label='Enter OTP'
										name='otp'
										value={formDataVerify.otp}
										onChange={handleInputChange}
										autoComplete='otp'
										autoFocus
									/>
									<Button
										type='submit'
										fullWidth
										variant='contained'
										sx={{ mt: 3, mb: 2 }}
									>
										Confirm
									</Button>
								</Box>
							</Box>
						</>
					)}
				</Container>
			</ThemeProvider>
		);
	} else if (resetPassword) {
		return (
			<ThemeProvider theme={defaultTheme}>
				<Container component='main' maxWidth='xs'>
					<CssBaseline />
					{isLoading ? (
						<Spinner />
					) : (
						<>
							<Box
								sx={{
									marginTop: 8,
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
							>
								<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
									<LockResetIcon />
								</Avatar>
								<Typography component='h1' variant='h5'>
									Reset Password
								</Typography>

								<Box
									component='form'
									onSubmit={handleSubmit}
									noValidate
									sx={{ mt: 1 }}
								>
									<TextField
										margin='normal'
										required
										fullWidth
										name='password'
										label='New Password'
										type='password'
										id='password'
										onChange={handleInputChange}
										value={formDataReset.password}
										autoComplete='current-password'
									/>
									<Button
										type='submit'
										fullWidth
										variant='contained'
										sx={{ mt: 3, mb: 2 }}
									>
										Change Password
									</Button>
								</Box>
							</Box>
						</>
					)}
				</Container>
			</ThemeProvider>
		);
	}
}
