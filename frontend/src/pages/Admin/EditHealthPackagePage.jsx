import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import EditHealthPackage from "../../components/Admin/EditHealthPackage";

export default function EditHealthPackagePage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Edit Health Package | Admin Dashboard</title>
				</Helmet>
			</HelmetProvider>

			<EditHealthPackage />
		</>
	);
}
