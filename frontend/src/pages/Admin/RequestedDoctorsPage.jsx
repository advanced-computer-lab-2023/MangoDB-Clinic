import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import RequestedDoctors from "../../components/Admin/RequestedDoctors";

export default function DashboardPage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Requested Doctors | Admin</title>
				</Helmet>
			</HelmetProvider>

			<RequestedDoctors />
		</>
	);
}
