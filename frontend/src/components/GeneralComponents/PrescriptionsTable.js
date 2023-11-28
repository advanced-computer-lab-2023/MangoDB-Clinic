import { Link as RouterLink } from "react-router-dom";
import React from "react";

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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MedicationIcon from "@mui/icons-material/Medication";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

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
	console.log("Data:", data);

	if (!Array.isArray(data)) {
		console.error("Invalid data format. Expected an array.");
		return null;
	}
	return (
		<TableContainer component={Paper} xs={8}>
			<Table sx={{ minWidth: 650 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>{firstColumnName}</TableCell>
						<TableCell align='center'>Medications & Frequency</TableCell>
						<TableCell align='center'>Date Issued</TableCell>
						<TableCell align='left'>Filled</TableCell>
						<TableCell align='left'>Edit</TableCell>
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
									<Tooltip title='Add Medication'>
										<ListItemButton onClick={() => {}}>
											<AddCircleOutlineIcon />
										</ListItemButton>
									</Tooltip>
								</TableCell>
								<TableCell align='center'>
									{new Date(prescription.date).toLocaleDateString()}
								</TableCell>
								<TableCell align='left'>
									{prescription.filled ? "Yes" : "No"}
								</TableCell>
								<TableCell align='center'>
									<Tooltip title='View Details'>
										<ListItemButton
											component={RouterLink}
											to={`/prescriptiondetails/${prescription._id}`}
										>
											<MedicationIcon />
										</ListItemButton>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
					{userType === "doctor" && (
						<TableRow>
							<TableCell align='left' colSpan={5}>
								<Tooltip title='Add Prescription'>
									<ListItemButton
										onClick={() => {
											onOpenDialog();
										}}
									>
										<AddIcon />
									</ListItemButton>
								</Tooltip>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default PrescriptionsTable;
