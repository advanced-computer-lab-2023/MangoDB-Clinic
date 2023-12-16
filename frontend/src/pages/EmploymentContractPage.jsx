import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import EmploymentContract from "../components/EmploymentContract";

export default function EmploymentContractPage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Employment Contract | Doctor</title>
				</Helmet>
			</HelmetProvider>

			<EmploymentContract />
		</>
	);
}
