import { ListItemButton, Grid, Link, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, Button  } from "@mui/material";
// import { createFilterOptions } from '@mui/material/Autocomplete';
import { useState } from "react";
import useFetch from "../useFetch";
import MedicationIcon from '@mui/icons-material/Medication';
import { Component } from "react";
import { Link as RouterLink } from 'react-router-dom';
import FilterListIcon from '@mui/icons-material/FilterList';

const ViewPrescriptions = () => {
    const patient_id = '6526d2210f83f5e46228834c';
    const [filterValue, setFilterValue] = useState('');
    const [open, setOpen] = useState(false);

    const { data: prescriptions, error, isPending} = 
        useFetch('http://localhost:4000/patient/get_prescriptions_of_patient/' + patient_id);

    const handleFilter = () => {
        setOpen(false);
    }

    return ( 
        <Grid container  justifyContent="center" style={{ padding: '2rem' }}>
            <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: '2rem' }}>
                    <Grid container spacing={2}>
                        <Typography style={{margin: '1rem' }} variant="h4" align="left">List Of Prescriptions</Typography>
                        <Tooltip title="Filter List" align="right">
                            <Button onClick={() => setOpen(true)}>
                                <FilterListIcon />
                            </Button>
                        </Tooltip>
                    </Grid>
                    <TableContainer component={Paper} xs={8}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                                <TableRow>
                                    <TableCell>Doctor</TableCell>
                                    <TableCell align="center">
                                        <TableCell align="center">Medications</TableCell>
                                        <TableCell align="center">Frequency</TableCell>
                                    </TableCell>
                                    <TableCell align="left">Date</TableCell>
                                    <TableCell align="left">Filled</TableCell>
                                    <TableCell align="left">Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {prescriptions && prescriptions.map((prescription) => (
                                    <TableRow key={prescription._id}>
                                        <TableCell component="th" scope="row">
                                            {prescription.doctorId.firstName + ' ' + prescription.doctorId.lastName}
                                        </TableCell>
                                        <TableCell align="center">
                                            {prescription.medications.map((medication, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align="right">{medication.medicationName}</TableCell>
                                                    <TableCell align="right">{medication.frequency}</TableCell>
                                                </TableRow>
                                                ))}
                                        </TableCell>
                                        <TableCell align="left">{new Date(prescription.date).toLocaleDateString()}</TableCell>
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
                    { isPending && <div>Loading...</div> }
                    { error && <div>{ error }</div> }
                </Paper>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogContent>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    Filter Options
                                </Typography>
                                <TextField
                                    id="doctor-filter"
                                    label="Doctor Name"
                                    variant="outlined"
                                    value={filterValue}
                                    onChange={(e) => setFilterValue(e.target.value)}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <TextField
                                    id="date-filter"
                                    label="Date"
                                    type="date"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                }}
                                style={{ marginBottom: '1rem' }}
                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Filled"
                                    style={{ marginBottom: '1rem' }}
                                />
                                <Button variant="contained" onClick={handleFilter}>
                                    Apply Filters
                                </Button>
                            </CardContent>
                        </Card>
                    </DialogContent>
                </Dialog>
            </Grid>
        </Grid>
     );
}
 
export default ViewPrescriptions;

// const [prescriptions, setPrescriptions] = useState(null);
    // const [isPending, setIsPending] = useState(true);
    // const [error, setError] = useState(null);

// useEffect(() => {
    //     fetch('http://localhost:4000/patient/get_prescriptions_of_patient/' + patient_id)
    //     .then(res => {
    //         if (!res.ok) {
    //             throw Error('Could not fetch the data for that resource');
    //         }
    //         return res.json();
    //     })
    //     .then(data => {
    //         setPrescriptions(data);
    //         setIsPending(false);
    //         setError(null);
    //     })
    //     .catch(err => {
    //         setIsPending(false);
    //         setError(err.message);
    //     })
    // }, []);