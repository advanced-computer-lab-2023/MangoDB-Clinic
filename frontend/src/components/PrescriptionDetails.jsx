import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Typography, Card, CardContent, Button, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import Spinner from "./GeneralComponents/Spinner";
import { checkout2 } from "../services/api";

import { SvgIcon } from "@mui/material";

import WalletIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Box from "@mui/material/Box";
import BackButton from "./GeneralComponents/BackButton";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import theme from "../theme";
import PatientHeader from "./GeneralComponents/patientHeader";

const defaultTheme = theme;

export default function PrescriptionDetails() {
	const navigate = useNavigate();
	const [data, setData] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const { id } = useParams();

	const [open, setOpen] = React.useState(false);
	const [alertMessage, setAlertMessage] = React.useState("");

	//  const WalletIcon = `${process.env.PUBLIC_URL}/icons/wallet.svg`;

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};
	const getData = async (id) => {
		try {
			setLoading(true);
			const response = await axios.get(
				`http://localhost:4000/patient/viewSelectedPrescription/${id}`
			);

			if (response.status === 200) {
				console.log("Response Status: " + response.status);
				console.log("Response Data: " + JSON.stringify(response.data));
				return response.data;
			}
		} catch (error) {
			alert(error.message);
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		try {
			const data = await getData(id);
			setData(data);
		} catch (error) {
			alert(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleGoBack = () => {
		navigate(-1);
	};
	const handleWallet = async () => {
		try {
			let totalPrice = 50;
			// Call your backend API endpoint for wallet payment
			const response = await axios.post(
				`http://localhost:4000/patient/payPescriptionWallet/${totalPrice}`,
				null,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your actual token
					},
				}
			);

			// Check if the request was successful (status code 2xx)
			if (response.status === 200) {
				const { success, message } = response.data;
				console.log("Wallet Payment:", response.data);

				if (success) {
					// Handle success as needed
					setAlertMessage(message);
					setOpen(true);
				} else {
					setAlertMessage("Insufficient funds in the wallet");
					setOpen(true);
				}
			} else {
				console.error(
					"Failed to process wallet payment. Status:",
					response.status
				);
				// Log the full response for debugging purposes
				console.error("Full response:", response);

				// Handle error as needed
			}
		} catch (error) {
			// Log the details of the AxiosError
			console.error("Error during wallet payment:", error);
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.error("Server responded with status:", error.response.status);
				console.error("Response data:", error.response.data);
			} else if (error.request) {
				// The request was made but no response was received
				console.error("No response received");
			} else {
				// Something happened in setting up the request that triggered an Error
				console.error("Error message:", error.message);
			}
			// Handle error as needed
		}
	};

	const handleCredit = async (e) => {
		try {
			console.log(e.currentTarget);
			const items = [{ id: 1, quantity: 1 }];

			const response = await checkout2(id, items);

			// Check if the request was successful (status code 2xx)
			if (response.status === 200) {
				const { url } = response.data;
				console.log("Checkout Session:", response.data);
				// Handle the session object as needed (e.g., redirect to the checkout page)
				window.location = url;
			} else {
				console.error("Failed to create checkout session");
				// Handle error as needed
			}
		} catch (error) {
			console.error("Error during checkout:", error);
			// Handle error as needed
		}
	};

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<>
					<PatientHeader />
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "80vh", // Adjust as needed
						}}
					>
						{console.log("Data: " + JSON.stringify(data))}
						{data ? (
							<>
								<ThemeProvider theme={theme}>
									<Card sx={{ width: "50%", alignContent: "center" }}>
										<CardContent>
											<Typography variant='h6'>Prescription Details</Typography>

											<Typography variant='body1'>
												Doctor:{" "}
												{`${data.doctorId.firstName} ${data.doctorId.lastName}`}
											</Typography>

											<Typography variant='body1'>
												Medications:
												{data.medications ? (
													data.medications.map((medication) => (
														<div key={medication.medicationName}>
															<ul>
																<li>
																	<Typography variant='p'>
																		{medication.medicationName}
																	</Typography>
																</li>
																<ul>
																	<li>
																		<Typography variant='p'>
																			{medication.frequency}
																		</Typography>
																	</li>
																</ul>
															</ul>
														</div>
													))
												) : (
													<div>No medications available</div>
												)}
											</Typography>

											<Typography variant='body1'>
												Date Issued: {new Date(data.date).toLocaleDateString()}
											</Typography>

											<Typography variant='body1'>
												Filled: {data.filled ? "Yes" : "No"}
											</Typography>

											<h3 variant='body1'>Pay using:</h3>
											{/* <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group"> */}
											<Grid container spacing={3}>
												<Grid style={{ marginLeft: "100px" }}>
													<Button
														variant='outlined'
														component='label'
														endIcon={<WalletIcon />}
														onClick={handleWallet}
													>
														Wallet
													</Button>
												</Grid>
												<Grid style={{ marginLeft: "20px" }}>
													<Button
														variant='outlined'
														color='secondary'
														component='label'
														endIcon={
															<SvgIcon>
																<CreditCardIcon />
															</SvgIcon>
														}
														onClick={handleCredit}
													>
														Credit card
													</Button>
												</Grid>
												<Grid container spacing={-30} sx={{pl: "10px"}}>
													<BackButton />
												</Grid>
											</Grid>

											{/* </ButtonGroup> */}

											<Snackbar
												open={open}
												autoHideDuration={6000}
												onClose={handleClose}
											>
												<MuiAlert
													onClose={handleClose}
													severity='success'
													sx={{ width: "100%" }}
												>
													{alertMessage}
												</MuiAlert>
											</Snackbar>
										</CardContent>
									</Card>
								</ThemeProvider>
							</>
						) : (
							<div>No data available</div>
						)}
					</Box>
				</>
			)}
		</>
	);
}
