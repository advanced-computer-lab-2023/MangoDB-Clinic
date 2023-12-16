import * as React from "react";
import axios from "axios";

import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Slide, { SlideProps } from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Spinner from "../GeneralComponents/Spinner";

export default function RequestedDoctors({ maxRows, seeMore }) {
	const [rows, setRows] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
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

	const getData = async () => {
		try {
			setLoading(true);
			const response = await axios.get(
				"http://localhost:4000/admin/view-requested-doctors",
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			setError(error.response.data.message);
			return [];
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		try {
			const data = await getData();
			setRows(data);
		} catch (error) {
			// setState({
			// 	open: true,
			// 	Transition: SlideTransition,
			// });
		} finally {
			setLoading(false);
		}
	};

	const handleAccept = async (id) => {
		try {
			setLoading(true);
			const response = await axios.put(
				`http://localhost:4000/admin/doctor-approval/${id}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 200) {
				setState({
					open: true,
					Transition: SlideTransition,
					message: response.data.message,
				});
				setTimeout(() => {
					setState({
						...state,
						open: false,
					});
					fetchData();
				}, 2000);
			}
		} catch (error) {
			setState({
				open: true,
				Transition: SlideTransition,
				message: error.response.data.message,
			});
		} finally {
			setLoading(false);
		}
	};

	const handleDecline = async (id) => {
		try {
			setLoading(true);
			const response = await axios.put(
				`http://localhost:4000/admin/doctor-rejection/${id}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 200) {
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
					fetchData();
				}, 2000);
			}
		} catch (error) {
			setState({
				open: true,
				Transition: SlideTransition,
				message: error.response.data.message,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<React.Fragment>
					<Typography variant='h5'>Requested Doctors</Typography>
					{error ? (
						<>
							<Typography variant='h6' color='error'>
								{error}
							</Typography>
						</>
					) : (
						<>
							<Table size='small'>
								<TableHead>
									<TableRow>
										<TableCell>Name</TableCell>
										<TableCell>Email</TableCell>
										<TableCell>Speciality</TableCell>
										<TableCell>Affiliation</TableCell>
										<TableCell>Educational Background</TableCell>
										<TableCell></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.slice(0, maxRows).map((row) => (
										<TableRow key={row._id}>
											<TableCell>
												{row.firstName + " " + row.lastName}
											</TableCell>
											<TableCell>{row.email}</TableCell>
											<TableCell>{row.speciality}</TableCell>
											<TableCell>{row.affiliation}</TableCell>
											<TableCell>{row.educationalBackground}</TableCell>
											<TableCell align='right'>
												<Stack spacing={2} direction='row'>
													<Button
														variant='contained'
														onClick={() => handleAccept(row._id)}
														color='success'
													>
														Accept
													</Button>
													<Button
														onClick={() => handleDecline(row._id)}
														variant='outlined'
													>
														Decline
													</Button>
												</Stack>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
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
						</>
					)}

					{seeMore ? (
						<Link
							color='secondary'
							href='/admin/requested-doctors'
							sx={{ mt: 3 }}
						>
							See More
						</Link>
					) : (
						<></>
					)}
				</React.Fragment>
			)}
		</>
	);
}

RequestedDoctors.defaultProps = {
	maxRows: 5,
	seeMore: true,
};
