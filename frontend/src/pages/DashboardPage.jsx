import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import Dashboard from "../components/Dashboard.jsx";

export default function DashboardPage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title> Admin Dashboard</title>
				</Helmet>
			</HelmetProvider>

			<Dashboard />
		</>
	);
}
