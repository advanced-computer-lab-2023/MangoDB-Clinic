import * as React from "react";
import { useState, useEffect } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

import { subscribeToHealthPackage } from "../services/api";

export default function SuccessfulPackagePayment() {
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		subscribeToHealthPackage()
			.then((result) => {
				setSuccess(true);
			})
			.catch((err) => {
				setError(err.message);
			});
	}, []);

	return (
		//<ThemeProvider>
		<div>
			<AppBar
				position='static'
				color='default'
				elevation={0}
				sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
			>
				<Toolbar sx={{ flexWrap: "wrap" }}>
					<Link
						variant='h6'
						href='/patientdashboard'
						color='inherit'
						noWrap
						sx={{ flexGrow: 1 }}
					>
						El7a2ny
					</Link>
					<nav>
						<Link
							variant='button'
							color='text.primary'
							href='#'
							sx={{ my: 1, mx: 1.5 }}
						>
							Features
						</Link>
						<Link
							variant='button'
							color='text.primary'
							href='#'
							sx={{ my: 1, mx: 1.5 }}
						>
							Enterprise
						</Link>
						<Link
							variant='button'
							color='text.primary'
							href='#'
							sx={{ my: 1, mx: 1.5 }}
						>
							Support
						</Link>
					</nav>
					<Button href='#' variant='outlined' sx={{ my: 1, mx: 1.5 }}>
						Login
					</Button>
				</Toolbar>
			</AppBar>
			{!success && !error && <div>Loading...</div>}{" "}
			{error && <div>{error} </div>}
			{success && (
				<div>
					<h1>
						Your payment has been successful. You will be redirected to the
						patient dashboard in a few seconds, or you can skip the wait and
						click on the button on the Navigation Bar.
					</h1>
				</div>
			)}
		</div>
		//</ThemeProvider>
	);
}
