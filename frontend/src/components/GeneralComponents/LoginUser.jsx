import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Spinner from "./Spinner";

function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}
		>
			{"Copyright © "}
			<Link color='inherit' href='#'>
				El7a2ny
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const defaultTheme = createTheme();

export default function LoginUser() {
	const navigate = useNavigate();
	const [formData, setFormData] = React.useState({
		username: "",
		password: "",
	});

	const [isLoading, setIsLoading] = React.useState(false);

	const handleLogin = async () => {
		try {
			setIsLoading(true);
			const response = await axios.post(
				`http://localhost:4000/login`,
				formData
			);

			if (response.status === 200) {
				localStorage.setItem("token", response.data.token);
				switch (response.data.type) {
					case "Patient":
						navigate("/patientdashboard");
						break;
					case "Doctor":
						navigate("/doctordashboard");
						break;
					default:
						break;
				}
			}
		} catch (error) {
			alert(error.response.data.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		handleLogin();
	};

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
								<LockOutlinedIcon />
							</Avatar>
							<Typography component='h1' variant='h5'>
								Welcome Back 👋🏽
							</Typography>

							<Typography component='h4' variant='h5'>
								Login To Use The Dashboard
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
									id='username'
									label='Username'
									name='username'
									value={formData.username}
									onChange={handleInputChange}
									autoComplete='username'
									autoFocus
								/>
								<TextField
									margin='normal'
									required
									fullWidth
									name='password'
									label='Password'
									type='password'
									id='password'
									onChange={handleInputChange}
									value={formData.password}
									autoComplete='current-password'
								/>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									sx={{ mt: 3, mb: 2 }}
								>
									Login
								</Button>
								<Grid container>
									<Grid item xs>
										<Link href='/forgot-password' variant='body2'>
											Forgot password?
										</Link>
									</Grid>
								</Grid>
							</Box>
						</Box>
						<Copyright sx={{ mt: 8, mb: 4 }} />
					</>
				)}
			</Container>
		</ThemeProvider>
	);
}
