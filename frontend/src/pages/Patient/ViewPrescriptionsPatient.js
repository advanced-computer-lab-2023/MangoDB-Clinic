import { useState, useEffect } from "react";

import {
	Dialog,
	Grid,
	DialogContent,
	Paper,
	Card,
	CardContent,
	TextField,
	FormControlLabel,
	Checkbox,
	Tooltip,
	Typography,
	Button,
	ThemeProvider,
} from "@mui/material";

// import FilterListIcon from "../../../public/icons/filter.svg";
import theme from "../../theme";
import PrescriptionsTable from "../../components/GeneralComponents/PrescriptionsTable";
import PatientHeader from "../../components/GeneralComponents/patientHeader";

const ViewPrescriptionsPatient = () => {
	const FilterListIcon = `${process.env.PUBLIC_URL}/icons/filter.svg`;
	const firstColumnName = "Doctor";
	const [prescriptions, setPrescriptions] = useState([]);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);
	const [isFilterApplied, setIsFilterApplied] = useState(false);
	const [open, setOpen] = useState(false);
	const [filterByDate, setFilterByDate] = useState("");
	const [filterByDoctor, setFilterByDoctor] = useState("");
	const [filterByFilled, setFilterByFilled] = useState(null);
	const filterParams = [];

	useEffect(() => {
		const fetchData = async () => {
			try {
				setPrescriptions([]);
				setIsPending(true);
				setError(null);

				if (!isFilterApplied) {
					const token = localStorage.getItem("token");

					const response = await fetch(
						"http://localhost:4000/patient/get_prescriptions_of_patient",
						{
							method: "GET",
							headers: {
								Authorization: `Bearer ${token}`,
								"Content-Type": "application/json",
							},
						}
					);

					if (!response.ok) {
						throw new Error("Could not fetch the data for that resource");
					}

					const data = await response.json();
					setPrescriptions(data);
					setIsPending(false);
					setError(null);
				}
			} catch (err) {
				setIsPending(false);
				setError(err.message);
			}
		};

		fetchData();
	}, [isFilterApplied]);

	const handleFilter = async () => {
		setOpen(false);
		setIsFilterApplied(true);
		setIsPending(true);
		setPrescriptions([]);
		setError(null);

		const token = localStorage.getItem("token");

		if (filterByDoctor) {
			filterParams.push(`doctor=${encodeURIComponent(filterByDoctor)}`);
		}

		if (filterByDate) {
			const formattedDate = formatDateForBackend(filterByDate);
			filterParams.push(`date=${encodeURIComponent(formattedDate)}`);
		}

		if (filterByFilled !== null) {
			filterParams.push(`filled=${encodeURIComponent(filterByFilled)}`);
		}

		console.log(filterParams);

		const url = `http://localhost:4000/patient/filter_prescription?${filterParams.join(
			"&"
		)}`;

		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("Could not fetch the data for that resource");
			}

			const data = await response.json();
			setPrescriptions(data);
			setIsPending(false);
			setError(null);
		} catch (err) {
			setIsPending(false);
			setError(err.message);
		}
	};

	const handleCheckboxChange = (event) => {
		setFilterByFilled(event.target.checked);
	};

	const formatDateForBackend = (dateString) => {
		const dateObject = new Date(dateString);
		return dateObject.toISOString();
	};

	const handleClearFilter = () => {
		setFilterByDate("");
		setFilterByDoctor("");
		setFilterByFilled(null);
		setIsFilterApplied(false);
	};

	return (
		<ThemeProvider theme={theme}>
			<PatientHeader />
			<Grid container justifyContent='center' style={{ padding: "7rem" }}>
				<Grid item xs={12}>
					<Paper elevation={3} style={{ padding: "2rem" }}>
						<Grid
							container
							spacing={2}
							style={{ display: "flex", justifyContent: "space-between" }}
						>
							<Typography style={{ margin: "1rem" }} variant='h4' align='left'>
								Prescriptions
							</Typography>
							<Tooltip title='Filter List' style={{ margin: "1rem" }}>
								<Button variant='outlined' onClick={() => setOpen(true)}>
									<img
										src={FilterListIcon}
										alt='Filter List'
										// style={{marginLeft: "11rem"}}
										width={25}
										height={25}
									/>
								</Button>
							</Tooltip>
						</Grid>
						<PrescriptionsTable
							data={prescriptions}
							firstColumnName={firstColumnName}
						/>
						{isPending && <div>Loading...</div>}
						{error && <div>{error}</div>}
					</Paper>
					<Dialog open={open} onClose={() => setOpen(false)}>
						<DialogContent>
							<Card variant='outlined'>
								<CardContent>
									<Typography variant='h6' component='div'>
										Filter Options
										<Typography variant='body2' component='div'>
											Select only one option
										</Typography>
									</Typography>
									<TextField
										id='doctor-filter'
										label='Doctor Name'
										variant='outlined'
										value={filterByDoctor}
										onChange={(e) => setFilterByDoctor(e.target.value)}
										style={{ margin: "1rem" }}
									/>
									<TextField
										id='date-filter'
										label='Date'
										type='date'
										variant='outlined'
										value={filterByDate}
										onChange={(e) => setFilterByDate(e.target.value)}
										InputLabelProps={{
											shrink: true,
										}}
										style={{ margin: "1rem" }}
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={filterByFilled}
												onChange={handleCheckboxChange}
											/>
										}
										label='Filled'
										style={{ margin: "1rem" }}
									/>
									{!isFilterApplied ? (
										<Button disabled>Clear Filters</Button>
									) : (
										<Button variant='outlined' onClick={handleClearFilter}>
											Clear Filters
										</Button>
									)}
									<Button variant='contained' onClick={handleFilter}>
										Apply Filter
									</Button>
								</CardContent>
							</Card>
						</DialogContent>
					</Dialog>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};

export default ViewPrescriptionsPatient;
