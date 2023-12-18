import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import PasswordIcon from "@mui/icons-material/Password";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Spinner from "../GeneralComponents/Spinner";
import theme from "../../theme";
import BackButton from "../GeneralComponents/BackButton";
import PatientHeader from "../GeneralComponents/patientHeader";

function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}
		>
			{"Copyright © "}
			<Link color='inherit' href='https://mui.com/'>
				El7a2ny
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const defaultTheme = theme;

export default function ChangePassword() {
	const navigate = useNavigate();
	const [formData, setFormData] = React.useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [error, setError] = React.useState(null);

	const [isLoading, setIsLoading] = React.useState(false);

	const handleChange = async () => {
		try {
			setIsLoading(true);

			const response = await axios.post(
				"http://localhost:4000/patient/change-password",
				{
					oldPassword: formData.oldPassword,
					newPassword: formData.newPassword,
					confirmPassword: formData.confirmPassword,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 200) {
				alert("Password Changed Successfully");
				setError(null);
				localStorage.removeItem("token");
				navigate("/login");
			}
		} catch (error) {
			if (error.response) {
				const responseData = error.response.data;

				if (responseData.message) {
					setError(responseData.message);
				} else {
					setError("An error occurred on the server.");
				}
			} else if (error.request) {
				setError("No response from the server.");
			} else {
				setError("Error setting up the request.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		handleChange();
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<PatientHeader/>
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
								<PasswordIcon />
							</Avatar>
							<Typography component='h1' variant='h5'>
								Change Password
							</Typography>
							<Box
								component='form'
								onSubmit={handleSubmit}
								noValidate
								sx={{ mt: 1 }}
							>
								{error && (
									<div
										style={{
											color: "red",
											marginBottom: "1rem",
											textAlign: "center",
											fontWeight: "bold",
										}}
									>
										{error}
									</div>
								)}
								<TextField
									margin='normal'
									required
									fullWidth
									id='oldPassword'
									label='Old Password'
									name='oldPassword'
									type='password'
									value={formData.oldPassword}
									onChange={handleInputChange}
									autoFocus
								/>
								<TextField
									margin='normal'
									required
									fullWidth
									name='newPassword'
									label='New Password'
									value={formData.newPassword}
									onChange={handleInputChange}
									type='password'
									id='newPassword'
								/>
								<TextField
									margin='normal'
									required
									fullWidth
									name='confirmPassword'
									label='Confirm Password'
									value={formData.confirmPassword}
									onChange={handleInputChange}
									type='password'
									id='confirmPassword'
								/>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									sx={{ mt: 3, mb: 2 }}
								>
									Change Password
								</Button>

								<BackButton/>
							</Box>
						</Box>
					</>
				)}
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}
