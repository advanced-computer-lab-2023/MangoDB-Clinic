import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { styled, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MuiAppBar from "@mui/material/AppBar";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MuiDrawer from "@mui/material/Drawer";
import Slide, { SlideProps } from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { mainListItems } from "./listItems";
import theme from "../../theme";
import AdminHeader from "../GeneralComponents/adminHeader";

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

const defaultTheme = theme;

export default function HealthPackages() {
	const [cards, setCards] = React.useState([1, 2, 3]);
	const [packages, setPackages] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const [isSuccess, setIsSuccess] = React.useState(false);
	const [state, setState] = React.useState({
		open: false,
		Transition: Slide,
		message: "",
	});
	let packID = null;
	const navigate = useNavigate();

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

	const toggleDrawer = () => {
		setOpen(!open);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/admin/login");
	};

	async function getPackagesData() {
		try {
			const response = await axios.get(
				"http://localhost:4000/admin/get-packages",
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				}
			);

			if (response.status === 200) {
				const dataLength = Object.keys(response.data).length;
				const sequentialArray = Array.from(
					{ length: dataLength },
					(_, index) => index + 1
				);

				setCards(sequentialArray);
				setPackages(response.data);

				console.log("CARDS ==> ", sequentialArray);
				console.log("PACKAGES ====> ", response.data);
			} else {
				console.error("Unexpected response status:", response.status);
			}
		} catch (error) {
			console.error("Error fetching packages:", error);
		}
	}

	const handleEdit = (packName) => {
		console.log("Edit");
		console.log("Name: ", packName);
		navigate(`/admin/edit-health-package/${packName}`);
	};

	const handleDelete = async (packName) => {
		try {
			const response = await axios.post(
				"http://localhost:4000/admin/get-package",
				{
					name: packName,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 200) {
				packID = response.data._id;
			}
		} catch (error) {
			alert("Package Not Found");
		}

		try {
			const response = await axios.delete(
				`http://localhost:4000/admin/remove-package/${packID}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 200) {
				setIsSuccess(true);
				setState({
					open: true,
					Transition: SlideTransition,
					message: `${response.data.message}`,
				});
				setTimeout(() => {
					setState({
						...state,
						open: false,
					});
					getPackagesData();
				}, 1500);
			}
		} catch (error) {
			setIsSuccess(false);
			setState({
				open: true,
				Transition: SlideTransition,
				message: error.response.data.message,
			});
		}
	};

	React.useEffect(() => {
		getPackagesData();
	}, []);

	return (
		<ThemeProvider theme={defaultTheme}>
			<AdminHeader />
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
						Dashboard
					</Typography>
					<IconButton color='inherit'>
						<LogoutIcon onClick={handleLogout} />
					</IconButton>
				</Toolbar>
			</AppBar> */}

			<div style={{ display: "flex" }}>
				{/* <Drawer variant='permanent' open={open}>
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

				<Container sx={{ py: 8 }} maxWidth='md'>
					<br />
					<br />
					<Typography
						variant='h2'
						align='center'
						paragraph
					>
						Existing Packages
					</Typography>
					<Grid container spacing={4}>
						{packages.map((pack, index) => (
							<Grid item key={cards[index]} xs={12} sm={6} md={4}>
								<Card
									sx={{
										height: "100%",
										display: "flex",
										flexDirection: "column",
									}}
								>
									<CardContent sx={{ flexGrow: 1}}>
										<Typography gutterBottom variant='h5' component='h2'>
											{pack.name}
										</Typography>
										<Typography>{pack.description}</Typography>
									</CardContent>
									<CardActions>
										<Button
											size='small'
											variant='contained'
											onClick={() => handleEdit(pack.name)}
										>
											Edit
										</Button>
										<Button
											size='small'
											variant='outlined'
											onClick={() => handleDelete(pack.name)}
										>
											Delete
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
					{isSuccess ? (
						<Snackbar
							open={state.open}
							onClose={handleClose}
							TransitionComponent={state.Transition}
							key={state.Transition.name}
							autoHideDuration={2000}
						>
							<Alert severity='success' sx={{ width: "100%" }}>
								{state.message}
							</Alert>
						</Snackbar>
					) : (
						<Snackbar
							open={state.open}
							onClose={handleClose}
							TransitionComponent={state.Transition}
							key={state.Transition.name}
							autoHideDuration={2000}
						>
							<Alert severity='error' sx={{ width: "100%" }}>
								{state.message}
							</Alert>
						</Snackbar>
					)}
				</Container>
			</div>
		</ThemeProvider>
	);
}
