import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Typography, Card, CardContent, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Spinner from "./GeneralComponents/Spinner";
import { checkout2, patientPayPrescription,checkout1 } from "../services/api";

const defaultTheme = createTheme();

export default function PrescriptionDetails() {
	const navigate = useNavigate();
	const [data, setData] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const { id } = useParams();

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
	const handleWallet = async() => {
		try {
			let totalPrice=50;
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
					alert(message);
				} else {
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
// 	const handleCredit= async() => {
// 		try {
// 			// Make a request to /create-checkout-session using Axios
// 			// const response = await axios.post('http://localhost:4000/create-checkout-session', {
// 			//   items: [
// 			//     { id: 1, quantity: 3 },
// 			//     { id: 2, quantity: 1 },
// 			//   ],
// 			// });
// 			const totalPrice=50;
// 			const items = [{ id: 1, quantity: 1 }];
// // API.post(`/payments/create-checkout-session/${id}`, { totalPirce });
// 			// const response = await checkout(id, items);
// 			// const response = await axios.post(
// 			// 	`/payments/create-checkout-session-prescription/${id}`, 
// 			// 	{items},
// 			// 	// {
// 			// 	// 	headers: {
// 			// 	// 		Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your actual token
// 			// 	// 	},
// 			// 	// }
// 			// );
// 			try {
// 				const response = await checkout2(id, items);
// 				console.log(response);
			
			
// 			// Check if the request was successful (status code 2xx)
// 			if (response.status === 200) {
// 				const { url } = response.data;
// 				console.log("Checkout Session:", response.data);
// 				// Handle the session object as needed (e.g., redirect to the checkout page)
// 				window.location = url;
// 			} else {
// 				console.error("Failed to create checkout session");
// 				// Handle error as needed
// 			}} catch (error) {
// 				console.log('aaaaaaa');
// 				console.error(error);
// 			}
// 		} catch (error) {
// 			console.error("Error during checkout:", error);
// 			// Handle error as needed
// 		}
// 	};
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
					{console.log("Data: " + JSON.stringify(data))}
					{data ? (
						<>
							<Card>
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
														<li>{medication.medicationName}</li>
														<ul>
															<li>{medication.frequency}</li>
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
									<Button variant='outlined' onClick={handleWallet}>
										Pay using wallet
									</Button>
									<Button variant='outlined' onClick={handleCredit}>
										Pay using credit card
									</Button>
								</CardContent>
							</Card>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									marginTop: "30px",
								}}
							>
								<Button variant='outlined' onClick={handleGoBack}>
									Go Back
								</Button>
							</div>
						</>
					) : (
						<div>No data available</div>
					)}
				</>
			)}
		</>
	);
}
