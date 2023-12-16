import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";

const Home = () => {
	const navigate = useNavigate();

	function isLoggedIn() {
		if (localStorage.getItem("token")) {
			return true;
		}

		return false;
	}

	function isPatient() {
		if (localStorage.getItem("type") === "Patient") {
			return true;
		}

		return false;
	}

	return (
		<div className='home-container'>
			<Typography variant='h1'>EL7A2NY ⛑️</Typography>
			<br />
			<Typography variant='h4'>Your Health, Our Priority</Typography>

			<div style={{ marginTop: "20px" }}>
				<Button
					variant='contained'
					onClick={() => navigate("/patientform")}
					style={{ margin: "10px" }}
				>
					Patient Registration
				</Button>

				{isLoggedIn() ? (
					<></>
				) : (
					<Button
						variant='contained'
						onClick={() => navigate("/login")}
						style={{ margin: "10px" }}
					>
						Login
					</Button>
				)}

				<Button
					variant='contained'
					onClick={() => navigate("/doctorform")}
					style={{ margin: "10px" }}
				>
					Doctor Registration
				</Button>
			</div>
			{isLoggedIn() ? (
				isPatient() ? (
					<>
						<Button
							variant='contained'
							style={{ margin: "10px" }}
							onClick={() => navigate("/patientdashboard")}
						>
							Your Dashboard
						</Button>
					</>
				) : (
					<>
						<Button
							variant='contained'
							style={{ margin: "10px" }}
							onClick={() => navigate("/doctordashboard")}
						>
							Your Dashboard
						</Button>
					</>
				)
			) : (
				<></>
			)}
		</div>
	);
};

export default Home;
