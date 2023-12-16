import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
	const navigate = useNavigate();

	useEffect(() => {
		// Use setTimeout to delay the redirection
		const timeoutId = setTimeout(() => {
			// Redirect to the home page after 5 seconds
			navigate("/viewpackages");
		}, 5000);

		// Clear the timeout when the component is unmounted
		return () => clearTimeout(timeoutId);
	}, [navigate]);

	return (
		<div>
			<h1>Payment Cancelled</h1>
			<p>Redirecting to the packages page...</p>
		</div>
	);
};

export default Cancel;
