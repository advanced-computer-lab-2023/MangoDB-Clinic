import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

import {
	ListItemButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	Card,
	CardContent,
	Typography,
	Box,
	Button,
	ThemeProvider,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { alpha } from "@mui/system";
import theme from "../../theme";
import axios from "axios";

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const MedicationCard = ({
	prescription,
	medication,
	userType,
	onOpenFreqDialog,
}) => (
	<Card style={{ display: "flex", marginBottom: "8px" }}>
		<CardContent
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<Box>
				<Typography variant='subtitle1'>{medication.medicationName}</Typography>
				<Typography variant='body2' color='textSecondary'>
					{medication.frequency}
				</Typography>
			</Box>
			{userType === "doctor" && (
				<Tooltip title='Edit Dosage'>
					<ListItemButton
						onClick={() => {
							onOpenFreqDialog(prescription, medication);
						}}
					>
						<EditIcon />
					</ListItemButton>
				</Tooltip>
			)}
		</CardContent>
	</Card>
);

const PrescriptionsTable = ({
	data,
	firstColumnName,
	userType,
	onOpenDialog,
	onOpenFreqDialog,
	onOpenEditDialog,
}) => {
	const navigate = useNavigate();

	const MedicationIcon = `${process.env.PUBLIC_URL}/icons/info.svg`;
	const EditPrescription = `${process.env.PUBLIC_URL}/icons/editDocument.svg`;

	{
		/* Sorting and Pagination */
	}
	const [tableData, setTableData] = useState(data);
	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("date"); // Default sorting by date
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [openAddMedicationDialog, setOpenAddMedicationDialog] = useState(false);
	const [medicationName, setMedicationName] = useState("");
	const [frequency, setFrequency] = useState("");
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

	const handleRequestSort = (property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
		console.log("Sort Clicked:", property, order);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		const newData = stableSort(tableData, getComparator(order, orderBy));
		// setTableData(newData);
		console.log("Page Changed:", newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleDownloadClick = async (prescription) => {
		const prescriptionPDF = new jsPDF();

		prescriptionPDF.text("Prescriptions", 90, 10);

		prescriptionPDF.text(
			`Doctor Name: ${prescription.doctorId.firstName} ${prescription.doctorId.lastName}`,
			10,
			20
		);
		prescriptionPDF.text(
			`Patient Name: ${prescription.patientId.firstName} ${prescription.patientId.lastName}`,
			10,
			30
		);
		prescriptionPDF.text("", 10, 40);

		prescriptionPDF.text("Medications:", 10, 50);

		let yPosition = 60;
		prescription.medications.forEach((medication) => {
			prescriptionPDF.text(
				`— Medicine Name: ${medication.medicationName}`,
				20,
				yPosition
			);
			prescriptionPDF.text(
				`Frequency: ${medication.frequency}`,
				40,
				yPosition + 10
			);
			yPosition += 20;
		});

		prescriptionPDF.text(
			`Date Issued: ${prescription.date}`,
			10,
			yPosition + 10
		);

		let filled = "";
		if (prescription.filled) {
			filled = "Yes";
		} else {
			filled = "No";
		}

		prescriptionPDF.text(`Filled? ${filled}`, 10, yPosition + 20);

		prescriptionPDF.save(
			`${prescription.patientId.firstName} ${prescription.patientId.lastName}'s Prescription From Dr. ${prescription.doctorId.lastName}.pdf`
		);
	};

	const handleOpenAddMedicationDialog = () => {
		setOpenAddMedicationDialog(true);
	};

	const handleCloseAddMedicationDialog = () => {
		setOpenAddMedicationDialog(false);
		setMedicationName("");
		setFrequency("");
		window.location.reload();
	};

	const handleAddMedication = async (prescriptionId) => {
		try {
			console.log(
				"Prescription ID:",
				medicationName,
				frequency,
				prescriptionId
			);
			const response = await axios.post(
				`http://localhost:4000/doctor/addMedication/${prescriptionId}`,
				{
					medicationName: medicationName,
					frequency: frequency,
				},
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
					handleCloseAddMedicationDialog();
				}, 1500);

			}
		} catch (error) {
			setIsSuccess(false);
			setState({
				...state,
				open: true,
				message: "Error adding medication!",
			});
		}
	};

	useEffect(() => {
		console.log("Data Changed:", data);
		const newData = stableSort(data, getComparator(order, orderBy)).slice(
			page * rowsPerPage,
			page * rowsPerPage + rowsPerPage
		);
		console.log("New Data:", newData);
		setTableData(newData);
	}, [data, order, orderBy, page, rowsPerPage]);

	if (!Array.isArray(data)) {
		console.error("Invalid data format. Expected an array.");
		return null;
	}
	return (
		<ThemeProvider theme={theme}>
			<TableContainer component={Paper} xs={8}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead sx={{ backgroundColor: alpha("#B2F0E8", 0.3) }}>
						<TableRow>
							<TableCell>
								<Typography variant='subtitle1' fontWeight='bold'>
									{firstColumnName}
								</Typography>
							</TableCell>
							<TableCell align='center'>
								<Typography variant='subtitle1' fontWeight='bold'>
									Medications & Frequency
								</Typography>
							</TableCell>
							<TableCell align='center'>
								<TableSortLabel
									active={orderBy === "date"}
									direction={order}
									onClick={() => handleRequestSort("date")}
								>
									<Typography variant='subtitle1' fontWeight='bold'>
										Date Issued
									</Typography>
								</TableSortLabel>
							</TableCell>
							<TableCell align='center'>
								<Typography variant='subtitle1' fontWeight='bold'>
									Filled
								</Typography>
							</TableCell>
							<TableCell align='center'>
								<Typography variant='subtitle1' fontWeight='bold'>
									{userType === "doctor" ? "Edit" : "Details"}
								</Typography>
							</TableCell>
							<TableCell align='center'>
								<Typography variant='subtitle1' fontWeight='bold'>
									Download
								</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tableData &&
							tableData.map((prescription) => (
								<TableRow key={prescription._id}>
									<TableCell component='th' scope='row'>
										{userType === "doctor"
											? prescription.patientId &&
											  prescription.patientId.firstName &&
											  prescription.patientId.lastName &&
											  prescription.patientId.firstName +
													" " +
													prescription.patientId.lastName
											: prescription.doctorId &&
											  prescription.doctorId.firstName &&
											  prescription.doctorId.lastName &&
											  prescription.doctorId.firstName +
													" " +
													prescription.doctorId.lastName}
									</TableCell>
									<TableCell align='left'>
										{prescription.medications.map((medication, index) => (
											<MedicationCard
												key={index}
												prescription={prescription}
												medication={medication}
												userType={userType}
												onOpenFreqDialog={onOpenFreqDialog}
											/>
										))}
										{userType === "doctor" && (
											<Tooltip title='Add Medication'>
												<ListItemButton onClick={handleOpenAddMedicationDialog}>
													<AddCircleOutlineIcon />
												</ListItemButton>
											</Tooltip>
										)}
										<Dialog
											open={openAddMedicationDialog}
											onClose={handleCloseAddMedicationDialog}
										>
											<DialogTitle>Add Medication</DialogTitle>
											<DialogContent>
												<TextField
													label='Medication Name'
													value={medicationName}
													onChange={(e) => setMedicationName(e.target.value)}
													fullWidth
													margin='normal'
												/>
												<TextField
													label='Frequency'
													value={frequency}
													onChange={(e) => setFrequency(e.target.value)}
													fullWidth
													margin='normal'
												/>
											</DialogContent>
											<DialogActions>
												<Button onClick={handleCloseAddMedicationDialog}>
													Cancel
												</Button>
												<Button
													onClick={() => handleAddMedication(prescription._id)}
													variant='contained'
												>
													Add
												</Button>
											</DialogActions>
										</Dialog>
									</TableCell>
									<TableCell align='center'>
										{new Date(prescription.date).toLocaleDateString()}
									</TableCell>
									<TableCell align='center'>
										{prescription.filled ? "Yes" : "No"}
									</TableCell>
									<TableCell align='center'>
										{userType === "doctor" ? (
											<Tooltip title='Edit Prescription'>
												<Button
													onClick={() => {
														onOpenEditDialog(prescription);
													}}
													// component={RouterLink}
													// to={`/prescriptiondetails/${prescription._id}`}
													variant='outlined'
													// sx={{ backgroundColor: alpha("#B2F0E8", 0.5)}}
												>
													<img
														src={EditPrescription}
														alt='edit Medication'
														// style={{marginLeft: "11rem"}}
														width={25}
														height={25}
													/>
												</Button>
											</Tooltip>
										) : (
											<Tooltip title='View Details'>
												<Button
													component={RouterLink}
													to={`/prescriptiondetails/${prescription._id}`}
													variant='outlined'
													// sx={{ backgroundColor: alpha("#B2F0E8", 0.5)}}
												>
													<img
														src={MedicationIcon}
														alt='view details'
														// style={{marginLeft: "11rem"}}
														width={25}
														height={25}
													/>
												</Button>
											</Tooltip>
										)}
									</TableCell>
									<TableCell align='center'>
										<Button
											variant='outlined'
											onClick={() => handleDownloadClick(prescription)}
										>
											<DownloadIcon />
										</Button>
									</TableCell>
								</TableRow>
							))}
						{userType === "doctor" && (
							<TableRow>
								<TableCell align='center' colSpan={5}>
									<Tooltip title='Add Prescription'>
										<Button
											variant='outlined'
											type='add'
											fullWidth
											onClick={() => {
												onOpenDialog();
											}}
										>
											Add Prescription
										</Button>
									</Tooltip>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</TableContainer>
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

			<div
				style={{
					display: "flex",
					justifyContent: "center",
					marginTop: "30px",
				}}
			>
				<Button
					variant='contained'
					onClick={() => navigate("/patientDashboard")}
				>
					Home
				</Button>
			</div>
		</ThemeProvider>
	);
};

export default PrescriptionsTable;
