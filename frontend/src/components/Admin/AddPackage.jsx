import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Spinner from "../GeneralComponents/Spinner";
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
				El7a2ny
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const defaultTheme = theme;

export default function AddPackage() {
	const navigate = useNavigate();
	const [formData, setFormData] = React.useState({
		name: "",
		price: "",
		description: "",
		doctorSessionDiscount: "",
		medicineDiscount: "",
		familyDiscount: "",
	});

	const [isLoading, setIsLoading] = React.useState(false);
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

	const handleAdd = async () => {
		try {
			setIsLoading(true);

			const response = await axios.post(
				"http://localhost:4000/admin/add-packages",
				formData,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 201) {
				setIsSuccess(true);
				setState({
					open: true,
					Transition: SlideTransition,
					message: `${response.data.message}, Redirecting...`,
				});
				setTimeout(() => {
					setState({
						...state,
						open: false,
					});
					navigate("/admin/health-packs");
				}, 1500);
			}
		} catch (error) {
			setIsSuccess(false);
			setState({
				open: true,
				Transition: SlideTransition,
				message: error.response.data.message,
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		handleAdd();
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	return (
		<ThemeProvider theme={defaultTheme}>
			<AdminHeader />
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				{isLoading ? (
					<Spinner />
				) : (
					<>
						<Box
							sx={{
								marginTop: 8,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
								<AddIcon />
							</Avatar>
							<Typography component='h1' variant='h5'>
								Add Package
							</Typography>
							<Box
								component='form'
								noValidate
								onSubmit={handleSubmit}
								sx={{ mt: 3 }}
							>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											name='name'
											required
											fullWidth
											id='name'
											label='Name'
											value={formData.name}
											onChange={handleInputChange}
											autoFocus
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											name='description'
											required
											fullWidth
											id='description'
											value={formData.description}
											onChange={handleInputChange}
											label='Description'
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											required
											fullWidth
											id='price'
											label='Price'
											value={formData.price}
											onChange={handleInputChange}
											name='price'
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											required
											fullWidth
											id='doctorSessionDiscount'
											label='Doctor Discount'
											value={formData.doctorSessionDiscount}
											onChange={handleInputChange}
											name='doctorSessionDiscount'
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											required
											fullWidth
											name='medicineDiscount'
											value={formData.medicineDiscount}
											onChange={handleInputChange}
											label='Medicine Discount'
											id='medicineDiscount'
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											required
											fullWidth
											name='familyDiscount'
											value={formData.familyDiscount}
											onChange={handleInputChange}
											label='Family Discount'
											id='familyDiscount'
										/>
									</Grid>
								</Grid>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									sx={{ mt: 3, mb: 2 }}
								>
									Add Package
								</Button>
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
							</Box>
						</Box>
						<Copyright sx={{ mt: 5 }} />
					</>
				)}
			</Container>
		</ThemeProvider>
	);
}
