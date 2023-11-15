import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import UserManagement from "../../components/Admin/UserManagement";

export default function UserManagementPage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>User Management | Admin</title>
				</Helmet>
			</HelmetProvider>

			<UserManagement />
		</>
	);
}
