import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import PrescriptionDetails from "../components/PrescriptionDetails";

export default function PrescriptionDetials() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Prescription Details | Patient</title>
				</Helmet>
			</HelmetProvider>

			<PrescriptionDetails />
		</>
	);
}
