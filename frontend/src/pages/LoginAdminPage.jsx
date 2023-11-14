import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import LoginAdmin from "../components/LoginAdmin";

export default function LoginPage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Login | Admin Dashboard</title>
				</Helmet>
			</HelmetProvider>

			<LoginAdmin />
		</>
	);
}
