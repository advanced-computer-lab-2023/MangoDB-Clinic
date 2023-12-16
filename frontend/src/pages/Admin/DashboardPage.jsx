import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import Dashboard from "../../components/Admin/AdminDashboard";
import AdminHeader from "../../components/GeneralComponents/adminHeader";

export default function DashboardPage() {
	return (
		<>
			{/* <AdminHeader /> */}
			<HelmetProvider>
				<Helmet>
					<title> Admin Dashboard</title>
				</Helmet>
			</HelmetProvider>
			<Dashboard />
		</>
	);
}
