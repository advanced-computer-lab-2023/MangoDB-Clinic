import React, { useState, useEffect } from "react";

import AccountBalance from "../components/AccountBalance";
import { Grid } from "@mui/material";
import { viewWallet } from "../services/api";
import PatientHeader from "../components/GeneralComponents/patientHeader";
import BackButton from "../components/GeneralComponents/BackButton";

const ViewWallet = () => {
	const [wallet, setWallet] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsPending(true);
				setError(null);

				const token = localStorage.getItem("token");
				// setTimeout(async () => {
				const response = await fetch(
					"http://localhost:4000/patient/view_wallet",
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					}
				);

				if (!response.ok) {
					throw new Error("Could not fetch the data for that resource");
				}

				const data = await response.json();
				setWallet(data);
				setIsPending(false);
				setError(null);
				// }, 10000);
			} catch (err) {
				setIsPending(false);
				setError(err.message);
			}
		};
		fetchData();
	}, []);

	return (
		<>
			<PatientHeader />
			<Grid container justifyContent='center' style={{ padding: "2rem" }}>
				{isPending && <div>Loading...</div>}
				{error && <div>{error}</div>}
				{wallet !== null && (
					<>
						<Grid container justifyContent='center' style={{ padding: "2rem" }}>
							<Grid xs={12} style={{ ml: "500px" }}>
								<AccountBalance balance={wallet.balance} />
							</Grid>
							<Grid item xs={12} style={{ padding: "5px" }}>
								<BackButton />
							</Grid>
						</Grid>
					</>
				)}
			</Grid>
		</>
	);
};

export default ViewWallet;
