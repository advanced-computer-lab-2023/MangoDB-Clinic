import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import AddAdmin from "../../components/Admin/AddAdmin";

export default function AddAdminPage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Add Admin | Admin Dashboard</title>
				</Helmet>
			</HelmetProvider>

			<AddAdmin />
		</>
	);
}
