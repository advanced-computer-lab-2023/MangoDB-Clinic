import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import ForgotPasswordAdmin from "../components/ForgotPasswordAdmin";

export default function ForgotPasswordAdminPage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Reset Password | Admin</title>
				</Helmet>
			</HelmetProvider>

			<ForgotPasswordAdmin />
		</>
	);
}
