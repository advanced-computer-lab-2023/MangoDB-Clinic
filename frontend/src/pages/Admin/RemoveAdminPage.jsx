import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import RemoveAdmin from "../../components/Admin/RemoveAdmin";

export default function RemoveAdminPage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Remove Admin | Admin Dashboard</title>
				</Helmet>
			</HelmetProvider>

			<RemoveAdmin />
		</>
	);
}
