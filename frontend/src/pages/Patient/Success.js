import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import{  
	Snackbar
	} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Success = () => {
	const navigate = useNavigate();
	const location = useLocation();
    const packageId = new URLSearchParams(location.search).get("packageId");
	const [openSuccess, setOpenSuccess] = useState(true);

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
			navigate("/patientdashboard");
		}, 5000);

		// Clear the timeout when the component is unmounted
		return () => clearTimeout(timeoutId);
	}, [navigate]);

	return (
		<div>
			{/* <p>Redirecting to the home page...</p> */}
			<Snackbar
				open={openSuccess}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				autoHideDuration={6000}
				onClose={() => setOpenSuccess(false)}
				>
				<MuiAlert
					onClose={() => setOpenSuccess(false)}
					severity="success"
					elevation={6}
					variant="filled"
				>
					Congratulations Payment was Successful. You will be redirected to the Patient Dashboard.
				</MuiAlert>
            </Snackbar>
		</div>
	);
};

export default Success;
