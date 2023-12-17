import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import LockedOutlinedIcon from "@mui/icons-material/LockOutlined";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Spinner from "./Spinner";
import theme from "../../theme";

export default function Profile() {
	const PasswordIcon = `${process.env.PUBLIC_URL}/icons/password.svg`;
	const EditIcon = `${process.env.PUBLIC_URL}/icons/editDocument.svg`;
	const PersonIcon = `${process.env.PUBLIC_URL}/icons/person.svg`;

	const navigate = useNavigate();
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [isSuccess, setIsSuccess] = React.useState(false);
	const [state, setState] = React.useState({
		open: false,
		Transition: Slide,
		message: "",
	});

	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
	});

	function SlideTransition(props) {
		return <Slide {...props} direction='down' />;
	}

	const handleClose = () => {
		setState({
			...state,
			open: false,
		});
	};

	// All Users
	const handleChangePassword = async () => {};

	// If Doctor
	const handleEditProfile = async () => {};

	// If Patient
	const handleAddFamilyMember = async () => {};

	// If Patient
	const handleViewFamilyMembers = async () => {};

	// If Patient
	const handleViewHealthRecords = async () => {};

	return (
		<ThemeProvider theme={theme}>
			<Paper
				sx={{
					margin: "auto",
					width: "55%",
					marginTop: "90px",
					padding: "20px",
				}}
			>
				<Container component='main' maxWidth='xs'>
					<CssBaseline />
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
							<img src={PersonIcon} alt='Person' width={25} height={25} />
						</Avatar>
						<Typography component='h1' variant='h5' sx={{ mt: 2 }}>
							User Name
						</Typography>
						<Box sx={{ mt: 3 }}>
							<Button variant='contained' onClick={handleEditProfile}>
								<img
									src={EditIcon}
									alt='Password'
									width={25}
									height={25}
									style={{ marginRight: "10px" }}
								/>
								Edit My Information
							</Button>
						</Box>
						<Box sx={{ mt: 3 }}>
							<Button variant='contained' onClick={handleChangePassword}>
								<img
									src={PasswordIcon}
									alt='Password'
									width={25}
									height={25}
									style={{ marginRight: "10px" }}
								/>
								Change Password
							</Button>
						</Box>
						{localStorage.getItem("role") === "doctor" ? (
							<></>
						) : (
							<>
								<Box sx={{ mt: 3 }}>
									<Button variant='contained' onClick={handleChangePassword}>
										<img
											src={PasswordIcon}
											alt='Password'
											width={25}
											height={25}
											style={{ marginRight: "10px" }}
										/>
										Change Password
									</Button>
								</Box>
							</>
						)}
					</Box>
				</Container>
			</Paper>
		</ThemeProvider>
	);
}
