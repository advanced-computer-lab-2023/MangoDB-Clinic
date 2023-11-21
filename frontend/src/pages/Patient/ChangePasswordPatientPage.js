import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import ChangePasswordPatient from "../../components/ChangePasswordPatient";

export default function ChangePasswordPage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Reset Password | Patient</title>
				</Helmet>
			</HelmetProvider>

			<ChangePasswordPatient />
		</>
	);
}
