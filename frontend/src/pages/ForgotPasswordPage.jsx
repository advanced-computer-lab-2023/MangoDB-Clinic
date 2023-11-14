import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import ForgotPassword from "../components/ForgotPassword";

export default function ForgotPasswordPage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Reset Password | Admin</title>
				</Helmet>
			</HelmetProvider>

			<ForgotPassword />
		</>
	);
}
