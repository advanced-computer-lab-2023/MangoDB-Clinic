import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import ChangePassword from "../../components/Admin/ChangePasswordAdmin";

export default function ChangePasswordPage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Reset Password | Admin</title>
				</Helmet>
			</HelmetProvider>

			<ChangePassword />
		</>
	);
}
