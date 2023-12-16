import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material";
import Slide, { SlideProps } from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Spinner from "./GeneralComponents/Spinner";
import theme from "../theme";

const defaultTheme = theme;

export default function EmploymentContract() {
	const navigate = useNavigate();
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
					<Typography variant='body1' gutterBottom>
						EMPLOYMENT CONTRACT
					</Typography>

					<Typography>DETAILS ETC...</Typography>

					<Button variant='contained' onClick={handleAccept}>
						Accept
					</Button>
					<Button variant='outlined' onClick={handleReject}>
						Reject
					</Button>

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
