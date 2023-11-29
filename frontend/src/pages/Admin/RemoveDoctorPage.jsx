import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import RemoveDoctor from "../../components/Admin/RemoveDoctor";

export default function RemoveDoctorPage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Remove Doctor | Admin Dashboard</title>
				</Helmet>
			</HelmetProvider>

			<RemoveDoctor />
		</>
	);
}
