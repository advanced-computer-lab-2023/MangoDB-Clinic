import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import RemovePatient from "../../components/Admin/RemovePatient";

export default function RemovePatientPage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Remove Patient | Admin Dashboard</title>
				</Helmet>
			</HelmetProvider>

			<RemovePatient />
		</>
	);
}
