import React from "react";

import { HelmetProvider, Helmet } from "react-helmet-async";

import AddPackage from "../../components/Admin/AddPackage";

export default function AddPackagePage() {
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Add Health Package | Admin</title>
				</Helmet>
			</HelmetProvider>

			<AddPackage />
		</>
	);
}
