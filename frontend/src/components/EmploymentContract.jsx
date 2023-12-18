import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Paper, ThemeProvider } from "@mui/material";
import Slide, { SlideProps } from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Spinner from "./GeneralComponents/Spinner";
import theme from "../theme";

const defaultTheme = theme;

export default function EmploymentContract() {
	const navigate = useNavigate();
	const [doctor, setDoctor] = React.useState({});
	const [error, setError] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(false);
	const [isSuccess, setIsSuccess] = React.useState(false);
	const [state, setState] = React.useState({
		open: false,
		Transition: Slide,
		message: "",
	});

	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
	});

	function SlideTransition(props) {
		return <Slide {...props} direction='down' />;
	}

	const handleClose = () => {
		setState({
			...state,
			open: false,
		});
	};

	const getDoctorInfo = async () => {
		try {
			const response = await axios.get(
				"http://localhost:4000/doctor/doctorInfo",
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				}
			);

			if (response.status === 200) {
				return response.data;
			}
		} catch (error) {
			setError(error.response.data.message);
		}
	};

	React.useEffect(() => {
		getDoctorInfo().then((data) => setDoctor(data));
	}, []);

	const handleReturn = async () => {
		localStorage.removeItem("token");
		navigate("/login");
	};
	const handleAccept = async () => {
		try {
			setIsLoading(true);
			const response = await axios.post(
				"http://localhost:4000/doctor/acceptContract",
				{},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 200) {
				setIsSuccess(true);
				setState({
					open: true,
					Transition: Slide,
					message: "Contract Accepted, You can now login to your account",
				});
				setTimeout(() => {
					setState({
						...state,
						open: false,
					});
					navigate("/login");
				}, 2000);
			}
		} catch (error) {
			setIsSuccess(false);
			setState({
				open: true,
				Transition: Slide,
				message: error.response.data.message,
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleReject = async () => {
		try {
			setIsLoading(true);
			const response = await axios.post(
				"http://localhost:4000/doctor/rejectContract",
				{},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 200) {
				localStorage.clear();
				setIsSuccess(true);
				setState({
					open: true,
					Transition: Slide,
					message: response.data.message,
				});
				setTimeout(() => {
					setState({
						...state,
						open: false,
					});
					navigate("/");
				}, 2000);
			}
		} catch (error) {
			setIsSuccess(false);
			setState({
				open: true,
				Transition: Slide,
				message: error.response.data.message,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<Typography variant='h1' gutterBottom sx={{pl: "415px", pt: "10px"}}>
						EMPLOYMENT AGREEMENT
					</Typography>
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Paper sx={{ width: "70%", margin: "auto", marginBottom: 5 }}>
							<Paper sx={{padding:"10px"}}>
								<Typography variant='p'>
									This Employment Agreement ("Agreement") is entered into on{" "}
									{new Date().toDateString()} by and between EL7A2NY VIRTUAL
									CLINIC ("Employer"), and {doctor.firstName} {doctor.lastName},
									a licensed physician ("Doctor").
								</Typography>
								<Typography>1. POSITION AND DUTIES</Typography>
								<Typography>
									Employer agrees to employ Doctor as a {doctor.speciality} at
									EL7A2NY VIRTUAL CLINIC. Doctor agrees to diligently and
									professionally perform the duties and responsibilities
									associated with the position, as determined by Employer.
								</Typography>
								<Typography>2. COMPENSATION</Typography>
								<Typography>
									Employer agrees to pay Doctor a salary of {doctor.hourlyRate}{" "}
									per hour. Payment will be made on an hourly basis via In App
									Wallet.
								</Typography>
								<Typography>3. WORK HOURS</Typography>
								<Typography>
									Doctor agrees to work desired hours per week, with specific
									workdays and hours to be mutually agreed upon by Doctor and
									Employer.
								</Typography>
								<Typography>4. TERM OF EMPLOYMENT</Typography>
								<Typography>
									This Agreement shall commence on {new Date().toDateString()}{" "}
									and continue until terminated by either party.
								</Typography>
								<Typography>5. LICENSES AND CREDENTIALS</Typography>
								<Typography>
									Doctor represents and warrants that they possess all necessary
									licenses and credentials required to practice medicine in
									Egypt.
								</Typography>
								<Typography>6. CONFIDENTIALITY</Typography>
								<Typography>
									Doctor agrees to maintain the confidentiality of patient
									information and all proprietary information of the
									clinic/hospital.
								</Typography>
								<Typography>7. TERMINATION</Typography>
								<Typography>
									Either party may terminate this Agreement with or without
									cause upon written notice to the other party.
								</Typography>
								<Typography>8. GOVERNING LAW</Typography>
								<Typography>
									This Agreement shall be governed by and construed in
									accordance with the laws of the Arab Republic of Egypt.
								</Typography>
								<br />
								<Typography>
									IN WITNESS WHEREOF, the parties hereto have executed this
									Agreement as of the date first above written.
									<br></br>
								</Typography>
							</Paper>
						</Paper>
					</div>

					<div style={{ display: "flex", justifyContent: "center" }}>
						<Button
							variant='contained'
							onClick={handleAccept}
							sx={{ width: "20%", margin: "auto" }}
						>
							Accept
						</Button>
						<Button
							variant='contained'
							onClick={handleReturn}
							sx={{ width: "20%", margin: "auto" }}
						>
							Return To Login
						</Button>
						<Button
							variant='outlined'
							onClick={handleReject}
							sx={{ width: "20%", margin: "auto" }}
						>
							Reject
						</Button>
					</div>
					{isSuccess ? (
						<Snackbar
							open={state.open}
							onClose={handleClose}
							TransitionComponent={state.Transition}
							key={state.Transition.name}
							autoHideDuration={2000}
						>
							<Alert severity='success' sx={{ width: "100%" }}>
								{state.message}
							</Alert>
						</Snackbar>
					) : (
						<Snackbar
							open={state.open}
							onClose={handleClose}
							TransitionComponent={state.Transition}
							key={state.Transition.name}
							autoHideDuration={2000}
						>
							<Alert severity='error' sx={{ width: "100%" }}>
								{state.message}
							</Alert>
						</Snackbar>
					)}
				</>
			)}
		</ThemeProvider>
	);
}
