import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Typography, Card, CardContent, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Spinner from "./GeneralComponents/Spinner";

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
										Date Issued: {data.date}
									</Typography>

									<Typography variant='body1'>
										Filled: {data.filled ? "Yes" : "No"}
									</Typography>
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
