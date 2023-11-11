import { ListItemButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Card, CardContent, Typography  } from "@mui/material";
import MedicationIcon from '@mui/icons-material/Medication';
import { Link as RouterLink } from 'react-router-dom';
import React from "react";

const MedicationCard = ({ medication }) => (
    <Card style={{ marginBottom: '8px' }}>
        <CardContent>
            <Typography variant="subtitle1">{medication.medicationName}</Typography>
            <Typography variant="body2" color="textSecondary">{medication.frequency}</Typography>
        </CardContent>
    </Card>
);

const PrescriptionsTable = ( {data} ) => {

    return ( 
        <TableContainer component={Paper} xs={8}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                    <TableRow>
                        <TableCell>Doctor</TableCell>
                        <TableCell align="center">Medications & Frequency</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="left">Filled</TableCell>
                        <TableCell align="left">Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.map((prescription) => (
                        <TableRow key={prescription._id}>
                            <TableCell component="th" scope="row">
                                {prescription.doctorId.firstName + ' ' + prescription.doctorId.lastName}
                            </TableCell>
                            <TableCell align="left">
                                {prescription.medications.map((medication, index) => (
                                    <MedicationCard key={index} medication={medication} />
                                    ))}
                            </TableCell>
                            <TableCell align="center">{new Date(prescription.date).toLocaleDateString()}</TableCell>
                            <TableCell align="left">{prescription.filled.toString()}</TableCell>
                            <TableCell align="left">
                                <Tooltip title="View Details">
                                    <ListItemButton component={RouterLink} to={`/prescriptiondetails/${prescription._id}`}>
                                        <MedicationIcon />
                                    </ListItemButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
     );
}
 
export default PrescriptionsTable;