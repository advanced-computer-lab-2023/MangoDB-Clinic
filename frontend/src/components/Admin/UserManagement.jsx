import * as React from "react";
import { useNavigate } from "react-router-dom";

import { styled, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import GlobalStyles from "@mui/material/GlobalStyles";
import Button from "@mui/material/Button";

import { mainListItems } from "./listItems";
import theme from "../../theme";
import AdminHeader from "../GeneralComponents/adminHeader";

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
				El7a2ni
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		flexGrow: 1,
		height: "100vh",
		display: "flex",
		flexDirection: "column", // Stack children vertically
		justifyContent: "center", // Center children vertically
		alignItems: "center", // Center children horizontally
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
		...(open && {
			marginLeft: 0,
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		}),
	})
);

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

const defaultTheme = theme;

export default function UserManagement() {
	const [open, setOpen] = React.useState(true);
	const navigate = useNavigate();

	const toggleDrawer = () => {
		setOpen(!open);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/admin/login");
	};

	const handleAddAdmin = () => {
		navigate("/admin/add-admin");
	};

	const handleRemoveAdmin = () => {
		navigate("/admin/remove-admin");
	};

	const handleRemovePatient = () => {
		navigate("/admin/remove-patient");
	};

	const handleRemoveDoctor = () => {
		navigate("/admin/remove-doctor");
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<AdminHeader />
			<GlobalStyles
				styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
			/>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				{/* <AppBar position='absolute' open={open}>
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
							User Management
						</Typography>
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
					<List component='nav'>{mainListItems}</List>
				</Drawer> */}

				<Main open={open}>
					<Container
						disableGutters
						maxWidth='sm'
						component='main'
						sx={{ pt: 8, pb: 6 }}
					>
						<Typography
							component='h1'
							variant='h3'
							align='center'
							color='text.primary'
						>
							Select An Action
						</Typography>
					</Container>

					<Container maxWidth='xs' component='main'>
						<Grid container spacing={4} alignItems='flex-end'>
							<Grid item key={"removeAdmin"} xs={12} sm={12} md={4}>
								<Button variant='contained' onClick={handleRemoveAdmin}>
									Remove Admin
								</Button>
							</Grid>

							<Grid item key={"removePatient"} xs={12} sm={12} md={4}>
								<Button variant='contained' onClick={handleRemovePatient}>
									Remove Patient
								</Button>
							</Grid>

							<Grid item key={"removeDoctor"} xs={12} sm={12} md={4}>
								<Button variant='contained' onClick={handleRemoveDoctor}>
									Remove Doctor
								</Button>
							</Grid>
						</Grid>
					</Container>

					{/* Footer */}
					<Container
						maxWidth='md'
						component='footer'
						sx={{
							borderTop: (theme) => `1px solid ${theme.palette.divider}`,
							mt: 8,
							py: [3, 6],
						}}
					>
						<Copyright sx={{ mt: 5 }} />
					</Container>
					{/* End footer */}
				</Main>
			</Box>
		</ThemeProvider>
	);
}
