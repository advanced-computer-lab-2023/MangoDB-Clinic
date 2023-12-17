import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import Profile from "../../components/GeneralComponents/Profile";

export default function ProfilePage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>My Profile</title>
				</Helmet>
			</HelmetProvider>

			<Profile />
		</>
	);
}
