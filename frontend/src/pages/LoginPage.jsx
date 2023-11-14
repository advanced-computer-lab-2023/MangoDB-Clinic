import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import Login from "../components/Login";

export default function LoginPage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Login | Admin Dashboard</title>
				</Helmet>
			</HelmetProvider>

			<Login />
		</>
	);
}
