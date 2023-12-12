import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Success = () => {
	const navigate = useNavigate();
	const location = useLocation();
    const packageId = new URLSearchParams(location.search).get("packageId");

	useEffect(() => {
		// Use setTimeout to delay the redirection
		const timeoutId = setTimeout(() => {
			const subscribe = async () => {

				const token = localStorage.getItem("token");

				try{
					const response = await fetch(
						`http://localhost:4000/patient/subscribe_to_health_package/${packageId}`,
						{
							method: "PUT",
							headers: {
								Authorization: `Bearer ${token}`,
								"Content-Type": "application/json",
							},
						}
					);
					
					if (!response.ok) {
						throw Error("Error in Subscribing to the package");
					}

				} catch (error) {
					console.error("Error subscribing to the package:", error.message);
				}
			}

			subscribe();
			navigate("/viewpackages");
		}, 5000);

		// Clear the timeout when the component is unmounted
		return () => clearTimeout(timeoutId);
	}, [navigate]);

	return (
		<div>
			<h1>Payment successful</h1>
			<p>Redirecting to the home page...</p>
		</div>
	);
};

export default Success;
