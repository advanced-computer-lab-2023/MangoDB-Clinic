import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import { ThemeProvider } from "@mui/material/styles";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AdminHeader from "../GeneralComponents/adminHeader";

import Spinner from "../GeneralComponents/Spinner";
import theme from "../../theme";

const defaultTheme = theme;

export default function EditHealthPackage() {
	const navigate = useNavigate();
	const name = decodeURIComponent(
		new URL(window.location.href).pathname.split("/")[3]
	);
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const [healthPackage, setHealthPackage] = React.useState({});
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

	const handleChange = (e) => {
		const { name, value } = e.target;
		setHealthPackage((prevPackage) => ({
			...prevPackage,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await axios.put(
				`http://localhost:4000/admin/update-package/${healthPackage._id}`,
				{
					name: healthPackage.name,
					description: healthPackage.description,
					price: healthPackage.price,
					doctorSessionDiscount: healthPackage.doctorSessionDiscount,
					medicineDiscount: healthPackage.medicineDiscount,
					familyDiscount: healthPackage.familyDiscount,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 200) {
				setError(null);
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
			setError(error.response.data.message);
		}
		setIsLoading(false);
	};

	const fetchHealthPackage = async () => {
		setIsLoading(true);
		try {
			const response = await axios.post(
				`http://localhost:4000/admin/get-package`,
				{
					name: name,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 200) {
				console.log("RESPONSE: ", JSON.stringify(response.data));
				setHealthPackage(response.data);
				console.log("HEALTH PACK: ", healthPackage);
			}
		} catch (error) {
			setError(error.response.data.message);
		}
		setIsLoading(false);
	};

	React.useEffect(() => {
		fetchHealthPackage();
	}, []);

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : error ? (
				<Typography variant='h1' color='error'>
					{error}
				</Typography>
			) : (
				<>
					<ThemeProvider theme={defaultTheme}>
						<AdminHeader/>
						<Container component='main' maxWidth='xs'>
							<CssBaseline />
							<Box
								sx={{
									marginTop: 8,
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
							>
								<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
									<EditIcon />
								</Avatar>
								<Typography component='h1' variant='h5'>
									Edit Package
								</Typography>
								<Box
									component='form'
									noValidate
									onSubmit={handleSubmit}
									sx={{ mt: 3 }}
								>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={6}>
											<TextField
												autoComplete='given-name'
												name='name'
												required
												fullWidth
												id='name'
												label='Name'
												value={healthPackage.name}
												disabled
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												required
												fullWidth
												id='price'
												label='Price'
												name='price'
												value={healthPackage.price}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												required
												fullWidth
												id='description'
												label='Description'
												name='description'
												multiline
												minRows={3} // Set the minimum number of rows
												maxRows={10} // Set the maximum number of rows
												value={healthPackage.description}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												required
												fullWidth
												id='doctorSessionDiscount'
												label='Doctor Session Discount'
												name='doctorSessionDiscount'
												value={healthPackage.doctorSessionDiscount}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												required
												fullWidth
												id='medicineDiscount'
												label='Medicine Discount'
												name='medicineDiscount'
												value={healthPackage.medicineDiscount}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												required
												fullWidth
												id='familyDiscount'
												label='Family Discount'
												name='familyDiscount'
												value={healthPackage.familyDiscount}
												onChange={handleChange}
											/>
										</Grid>
									</Grid>
									<Button
										type='submit'
										fullWidth
										variant='contained'
										sx={{ mt: 3, mb: 2 }}
									>
										Update
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
						</Container>
					</ThemeProvider>
				</>
			)}
		</>
	);
}
