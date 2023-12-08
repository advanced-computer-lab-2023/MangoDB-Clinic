import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";

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
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { alpha } from '@mui/system';
import theme from "../../theme";


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
}) => {

	const MedicationIcon = `${process.env.PUBLIC_URL}/icons/info.svg`;
	const EditPrescription = `${process.env.PUBLIC_URL}/icons/editDocument.svg`;
	const navigate = useNavigate();
	console.log("Data:", data);

	if (!Array.isArray(data)) {
		console.error("Invalid data format. Expected an array.");
		return null;
	}
	return (
		<ThemeProvider theme={theme}>
			<TableContainer component={Paper} xs={8}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead sx={{backgroundColor: alpha("#B2F0E8", 0.3)}}> 
						<TableRow>
							<TableCell>
								<Typography variant="subtitle1" fontWeight="bold">
									{firstColumnName}
								</Typography>
							</TableCell>
							<TableCell align='center'>
								<Typography variant="subtitle1" fontWeight="bold">
									Medications & Frequency
								</Typography>
							</TableCell>
							<TableCell align='center'>
								<Typography variant="subtitle1" fontWeight="bold">
									Date Issued
								</Typography>
							</TableCell>
							<TableCell align='left'>
								<Typography variant="subtitle1" fontWeight="bold">
									Filled
								</Typography>
							</TableCell>
							<TableCell align='left'>
								<Typography variant="subtitle1" fontWeight="bold">
									{userType === "doctor" ? "Edit" : "Details"}
								</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data &&
							data.map((prescription) => (
								<TableRow key={prescription._id}>
									<TableCell component='th' scope='row'>
										{prescription.patientId &&
											prescription.patientId.firstName &&
											prescription.patientId.lastName &&
											prescription.patientId.firstName +
												" " +
												prescription.patientId.lastName}
										{prescription.doctorId &&
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
												<ListItemButton onClick={() => {}}>
													<AddCircleOutlineIcon />
												</ListItemButton>
											</Tooltip>
										)}
									</TableCell>
									<TableCell align='center'>
										{new Date(prescription.date).toLocaleDateString()}
									</TableCell>
									<TableCell align='left'>
										{prescription.filled ? "Yes" : "No"}
									</TableCell>
									<TableCell align='left'>
										{userType === "doctor" ? (
											<Tooltip title='Edit Medication' >
												<Button
													// component={RouterLink}
													// to={`/prescriptiondetails/${prescription._id}`}
													variant="outlined"
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
												<Tooltip title='View Details' >
												<Button
													component={RouterLink}
													to={`/prescriptiondetails/${prescription._id}`}
													variant="outlined"
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
								</TableRow>
							))}
						{userType === "doctor" && (
							<TableRow>
								<TableCell align='center' colSpan={5}>
									<Tooltip title='Add Prescription'>
										<Button
											variant='outlined'
											type="add"
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
			</TableContainer>

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
