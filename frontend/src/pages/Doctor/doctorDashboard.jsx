import * as React from "react";
import { useNavigate } from "react-router-dom";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { DoctorListItems } from "../../components/Doctor/DoctorListItems";
import { useState } from "react";
import { useEffect } from "react";
import { clearNotifsDoctor, getDoctor } from "../../services/api";

function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}
		>
			{"Copyright © "}
			<Link color='inherit' href='https://mui.com/'>
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	"& .MuiDrawer-paper": {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: "border-box",
		...(!open && {
			overflowX: "hidden",
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(9),
			},
		}),
	},
}));

const defaultTheme = createTheme();

export default function DoctorDashboard() {
	const [notifications, setNotifications] = useState([]);
	const [error, setError] = useState(null);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [doctorName, setDoctorName] = useState("");

	const navigate = useNavigate();
	const [open, setOpen] = React.useState(true);
	const toggleDrawer = () => {
		setOpen(!open);
	};

	const handleLogout = () => {
		localStorage.clear();
		navigate("/");
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		// clearNotifsDoctor();
		window.location.reload();
	};

	const isOpen = Boolean(anchorEl);
	const id = isOpen ? "simple-popover" : undefined;

	useEffect(() => {
		getDoctor()
			.then((result) => {
				setDoctorName(`${result.data.firstName} ${result.data.lastName}`);
				setNotifications(result.data.notifications);
			})
			.catch((err) => setError(err.message));
	}, []);

	return (
		<ThemeProvider theme={defaultTheme}>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<AppBar position='absolute' open={open}>
					<Toolbar
						sx={{
							pr: "24px", // keep right padding when drawer closed
						}}
					>
						<IconButton
							edge='start'
							color='inherit'
							aria-label='open drawer'
							onClick={toggleDrawer}
							sx={{
								marginRight: "36px",
								...(open && { display: "none" }),
							}}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							component='h1'
							variant='h6'
							color='inherit'
							noWrap
							sx={{ flexGrow: 1 }}
						>
							Doctor Dashboard
						</Typography>
						<div>
							<Typography
								component='h1'
								variant='h6'
								color='inherit'
								noWrap
								sx={{ flexGrow: 1 }}
								aria-describedby={id}
								onClick={handleClick}
							>
								{`Notifications (${notifications.length})`}
							</Typography>
							<Popover
								id={id}
								open={isOpen}
								anchorEl={anchorEl}
								onClose={handleClose}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "center",
								}}
								transformOrigin={{
									vertical: "top",
									horizontal: "center",
								}}
							>
								<div>
									{notifications.map((notification) => (
										<div key={notification._id}>
											<h4>{notification.title}</h4>
											<p>{notification.body}</p>
										</div>
									))}
									<DeleteForeverIcon />
									{ /* x button id=notifId calls->deleteNotif(notifId) */ }
								</div>
							</Popover>
						</div>
						<IconButton color='inherit'>
							<LogoutIcon onClick={handleLogout} />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Drawer variant='permanent' open={open}>
					<Toolbar
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-end",
							px: [1],
						}}
					>
						<IconButton onClick={toggleDrawer}>
							<ChevronLeftIcon />
						</IconButton>
					</Toolbar>
					<Divider />
					<List component='nav'>
						{DoctorListItems}
						<Divider sx={{ my: 1 }} />
					</List>
				</Drawer>
				<Box
					component='main'
					sx={{
						backgroundColor: (theme) =>
							theme.palette.mode === "light"
								? theme.palette.grey[100]
								: theme.palette.grey[900],
						flexGrow: 1,
						height: "100vh",
						overflow: "auto",
					}}
				>
					<Toolbar />
					<Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
						<Grid container spacing={3}>
							{`Welcome Dr. ${doctorName}`}
							<Grid item xs={12} md={8} lg={9}>
								<Paper
									sx={{
										p: 2,
										display: "flex",
										flexDirection: "column",
										height: 240,
									}}
								>
									{/* <DoctorsTable /> */}
								</Paper>
							</Grid>
							{/* Recent Deposits */}
							<Grid item xs={12} md={4} lg={3}>
								<Paper
									sx={{
										p: 2,
										display: "flex",
										flexDirection: "column",
										height: 240,
									}}
								>
									{/* <Deposits /> */}
								</Paper>
							</Grid>
							{/* Recent Orders */}
							<Grid item xs={12}>
								<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
									{/* <Orders /> */}
								</Paper>
							</Grid>
						</Grid>
						<Copyright sx={{ pt: 4 }} />
					</Container>
				</Box>
			</Box>
		</ThemeProvider>
	);
}
