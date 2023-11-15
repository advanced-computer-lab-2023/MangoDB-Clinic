import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import ForgotPasswordUser from "../../components/GeneralComponents/ForgotPasswordUser";

export default function ForgotPasswordUserPage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Reset Password</title>
				</Helmet>
			</HelmetProvider>

			<ForgotPasswordUser />
		</>
	);
}
