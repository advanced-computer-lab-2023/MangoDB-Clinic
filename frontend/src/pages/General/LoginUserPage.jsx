import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import LoginUser from "../../components/GeneralComponents/LoginUser";

export default function LoginUserPage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Login | Dashboard</title>
				</Helmet>
			</HelmetProvider>

			<LoginUser />
		</>
	);
}
