import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
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
import { mainListItems } from "./listItems";
import { useNavigate } from "react-router-dom";
import GlobalStyles from "@mui/material/GlobalStyles";
import Button from "@mui/material/Button";

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

const tiers = [
	{
		title: "Free",
		price: "0",
		description: [
			"10 users included",
			"2 GB of storage",
			"Help center access",
			"Email support",
		],
		buttonText: "Sign up for free",
		buttonVariant: "outlined",
	},
	{
		title: "Pro",
		subheader: "Most popular",
		price: "15",
		description: [
			"20 users included",
			"10 GB of storage",
			"Help center access",
			"Priority email support",
		],
		buttonText: "Get started",
		buttonVariant: "contained",
	},
	{
		title: "Enterprise",
		price: "30",
		description: [
			"50 users included",
			"30 GB of storage",
			"Help center access",
			"Phone & email support",
		],
		buttonText: "Contact us",
		buttonVariant: "outlined",
	},
];

const defaultTheme = createTheme();

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

	return (
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyles
				styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
			/>
			<Box sx={{ display: "inline" }}>
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
							Dashboard
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
				</Drawer>

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

				<Container maxWidth='md' component='main'>
					<Grid container spacing={5} alignItems='flex-end'>
						<Grid item key={"addAdmin"} xs={12} sm={12} md={4}>
							<Button variant='contained'>Add Admin</Button>
						</Grid>

						<Grid item key={"removeAdmin"} xs={12} sm={12} md={4}>
							<Button variant='contained'>Remove Admin</Button>
						</Grid>

						<Grid item key={"removePatient"} xs={12} sm={12} md={4}>
							<Button variant='contained'>Remove Patient</Button>
						</Grid>

						<Grid item key={"removeDoctor"} xs={12} sm={12} md={4}>
							<Button variant='contained'>Remove Doctor</Button>
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
			</Box>
		</ThemeProvider>
	);
}
