import React from "react";
import { useParams } from "react-router-dom";

import { checkout, wallet } from "../services/api";
import {
	Grid,
	Paper,
	Typography,
	TextField,
	ThemeProvider,
	TableContainer,
	TableHead,
	TableRow,
	Table,
	TableBody,
	TableCell,
	Radio,
	RadioGroup,
	FormControlLabel,
} from "@mui/material";
import theme from "../theme";
import { experimentalStyled as styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));
const Checkout = () => {
	const { id } = useParams();
	const WalletIcon = `${process.env.PUBLIC_URL}/icons/wallet.svg`;
	const creditCardIcon = `${process.env.PUBLIC_URL}/icons/creditcard.svg`;
	const navigate = useNavigate();
	const handleCheckoutClick = async () => {
		try {
			const items = [{ id: 1, quantity: 1 }];

			const response = await checkout(id, items);

			// Check if the request was successful (status code 2xx)
			if (response.status === 200) {
				const { url } = response.data;
				console.log("Checkout Session:", response.data);
				window.open(url, "_blank");
			} else {
				console.error("Failed to create checkout session");
				// Handle error as needed
			}
		} catch (error) {
			console.error("Error during checkout:", error);
			// Handle error as needed
		}
	};

	const handleWallet = async () => {
		try {
			// Call your backend API endpoint for wallet payment
			const response = await wallet(id);

			// Check if the request was successful (status code 2xx)
			if (response.status === 200) {
				const { success, message } = response.data;
				console.log("Wallet Payment:", response.data);

				if (success) {
					// Handle success as needed
					alert(message);
					navigate(-1);
				} else {
					// Handle failure as needed
					// console.error('Wallet payment failed:', message);
					alert("Insufficient funds in the wallet");
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

	return (
		<Paper
			sx={{ margin: "auto", width: "90%", marginTop: "200px", padding: "2%" }}
		>
			<ThemeProvider theme={theme}>
				<Typography variant='h3' marginLeft={"450px"} marginBottom={"20px"}>
					Choose a payment method
				</Typography>
				<Grid container spacing={3}>
					<Grid style={{ marginLeft: "470px" }}>
						<Button
							variant='contained'
							color='secondary'
							component='label'
							endIcon={
								<img
									src={WalletIcon}
									alt='Upload Icon'
									style={{ filter: "invert(1)" }}
									width='20'
									height='20'
								/>
							}
							onClick={handleWallet}
							// fullWidth // This makes the button take up the full width of the Grid item
						>
							Wallet
						</Button>
					</Grid>
					<Grid style={{ marginLeft: "20px" }}>
						<Button
							variant='contained'
							color='secondary'
							component='label'
							endIcon={
								<img
									src={creditCardIcon}
									alt='Upload Icon'
									style={{ filter: "invert(1)" }}
									width='20'
									height='20'
								/>
							}
							onClick={handleCheckoutClick}
							// fullWidth // This makes the button take up the full width of the Grid item
						>
							Credit card
						</Button>
					</Grid>
					<Grid style={{ marginLeft: "20px" }}>
						<Button
							variant='contained'
							onClick={() => {
								navigate(-1);
							}}
						>
							Cancel
						</Button>
					</Grid>
				</Grid>
			</ThemeProvider>
		</Paper>
	);
};

const styles = {
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: "20px",
	},
	heading: {
		fontSize: "24px",
		marginBottom: "20px",
	},
	button: {
		padding: "10px",
		margin: "10px",
		fontSize: "16px",
		cursor: "pointer",
	},
};

export default Checkout;
