import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import ChangePasswordDoctor from "../../components/ChangePasswordDoctor";

export default function ChangePasswordPage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Reset Password | Doctor</title>
				</Helmet>
			</HelmetProvider>

			<ChangePasswordDoctor />
		</>
	);
}
