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
} from "@mui/material";
import MedicationIcon from "@mui/icons-material/Medication";
import AddIcon from "@mui/icons-material/Add";

const MedicationCard = ({ medication }) => (
	<Card style={{ marginBottom: "8px" }}>
		<CardContent>
			<Typography variant='subtitle1'>{medication.medicationName}</Typography>
			<Typography variant='body2' color='textSecondary'>
				{medication.frequency}
			</Typography>
		</CardContent>
	</Card>
);

const PrescriptionsTable = ({ data, firstColumnName, userType, onAddPrescription }) => {
	return (
		<TableContainer component={Paper} xs={8}>
			<Table sx={{ minWidth: 650 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>{firstColumnName}</TableCell>
						<TableCell align='center'>Medications & Frequency</TableCell>
						<TableCell align='center'>Date</TableCell>
						<TableCell align='left'>Filled</TableCell>
						<TableCell align='left'>Details</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data &&
						data.map((prescription) => (
							<TableRow key={prescription._id}>
								<TableCell component='th' scope='row'>
									{prescription.patientId.firstName +
										" " +
										prescription.patientId.lastName}
								</TableCell>
								<TableCell align='left'>
									{prescription.medications.map((medication, index) => (
										<MedicationCard key={index} medication={medication} />
									))}
								</TableCell>
								<TableCell align='center'>
									{new Date(prescription.date).toLocaleDateString()}
								</TableCell>
								<TableCell align='left'>
									{prescription.filled.toString()}
								</TableCell>
								<TableCell align='left'>
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
							<TableCell align="left" colSpan={5}>
								<Tooltip title="Add Prescription">
									<ListItemButton onClick={onAddPrescription}>
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
