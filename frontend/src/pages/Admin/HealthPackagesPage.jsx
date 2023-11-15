import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import HealthPackages from "../../components/Admin/HealthPackages";

export default function HealthPackagesPage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Health Packages | Admin</title>
				</Helmet>
			</HelmetProvider>

			<HealthPackages />
		</>
	);
}
