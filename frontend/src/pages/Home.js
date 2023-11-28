import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";

const Home = () => {
	const navigate = useNavigate();

	return (
		<div className='home-container'>
			<Typography variant='h1'>El7a2ni ⛑️</Typography>
			<Typography variant='h3'>Your Health, Our Priority</Typography>

			<div style={{ marginTop: "20px" }}>
				<Button
					variant='contained'
					onClick={() => navigate("/patientform")}
					style={{ margin: "10px" }}
				>
					Patient Registration
				</Button>
				{localStorage.getItem("token") ? (
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

				{localStorage.getItem("token") ? (
					<>
						<Button
							variant='contained'
							style={{ margin: "10px" }}
							onClick={() => navigate("/patientdashboard")}
						>
							Patient Dashboard
						</Button>

						<Button
							variant='contained'
							style={{ margin: "10px" }}
							onClick={() => navigate("/doctordashboard")}
						>
							Doctor Dashboard
						</Button>
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Home;
