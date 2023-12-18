import { useState, useEffect } from "react";
import React from "react";
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
    DialogTitle,
    DialogActions,
    Snackbar
} from "@mui/material";
import axios from "axios";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import PrescriptionsTable from "../../components/GeneralComponents/PrescriptionsTable";
import theme from "../../theme";
import DoctorHeader from "../../components/GeneralComponents/doctorHeader";

const ViewPrescriptionsDoctor = () => {

    const firstColumnName = "Patient";
    const [prescriptions, setPrescriptions] = useState([]);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);
    const [patientUsername, setPatientUsername] = useState("");
    const [date, setDate] = useState("");
    const [filled, setFilled] = useState(false);
    const [medications, setMedications] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openFreqDialog, setOpenFreqDialog] = useState(false);
    const [prescriptionToBeUpdated, setPrescriptionToBeUpdated] = useState("");
    const [medicationToBeUpdated, setMedicationToBeUpdated] = useState("");
    const [freqToBeUpdated, setFreqToBeUpdated] = useState("");

    const [openAddMedicationDialog, setOpenAddMedicationDialog] = useState(false);
    const [prescOfMedicationToBeAdded, setPrescOfMedicationToBeAdded] = useState("");
    const [medicationToBeAdded, setMedicationToBeAdded] = useState("");
    const [freqToBeAdded, setFreqToBeAdded] = useState("");

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

    useEffect(() => {
        const fetchData = async () => {
          try {
                setIsPending(true);
                setError(null);

                const token = localStorage.getItem("token");
                // setTimeout(async () => {
                    const response = await fetch(
                    "http://localhost:4000/doctor/viewAllPrescriptionsByDoctor",
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
                    console.log('Fetched Data:', data);
                    setPrescriptions(data);
                    setIsPending(false);
                    setError(null);
                // }, 10000);
            } catch (err) {
            setIsPending(false);
            setError(err.message);
            }
        };
      fetchData();
    }, [setPrescriptions]);

    const handleAddPrescription = async () => {
        setOpenDialog(false);
		setIsPending(true);
		setError(null);

        const token = localStorage.getItem("token");

        try {
			const response = await fetch("http://localhost:4000/doctor/addPrescription", {
			  method: "POST",
			  headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			  },
              body: JSON.stringify({
                patientName: patientUsername,
                date: date,
                filled: filled,
                }),
			});
		
			if (!response.ok) {
			  throw new Error("Could not fetch the data for that resource");
			}
		
			const newPrescription = await response.json();
            console.log('New Prescription:', newPrescription);

            setPrescriptions((prevPrescriptions) => [...prevPrescriptions, newPrescription]);

			setIsPending(false);
			setError(null);

		  } catch (err) {
			setIsPending(false);
			setError(err.message);
		  }
        setPatientUsername("");
        setDate("");
        setFilled(false);
        alert("Prescription added successfully!");
    };



    useEffect(() => {
        if (openEditDialog && prescriptionToBeUpdated) {
            setPatientUsername(prescriptionToBeUpdated.patientId.username);
            setDate(prescriptionToBeUpdated.date.split('T')[0]);
            setFilled(prescriptionToBeUpdated.filled);
            setMedications(prescriptionToBeUpdated.medications);
        }
    }, [openEditDialog, prescriptionToBeUpdated]);


    const handleAddMedication = async () => {
        setOpenAddMedicationDialog(false);
        setIsPending(true);
        setError(null);

		try {
			console.log(
				"Prescription ID:",
				medicationToBeAdded,
				freqToBeAdded,
				prescOfMedicationToBeAdded
			);
			const response = await axios.post(
				`http://localhost:4000/doctor/addMedication/${prescOfMedicationToBeAdded._id}`,
				{
					medicationName: medicationToBeAdded,
					frequency: freqToBeAdded,
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
                    window.location.reload();
					setOpenAddMedicationDialog(false);
				}, 1500);

			}
		} catch (error) {
			setIsSuccess(false);
			setState({
				...state,
				open: true,
				message: error.response.data.message,
			});
		}
	};


    const handleEditPrescription = async () => {
        setOpenEditDialog(false);
		setIsPending(true);
		setError(null);

        const token = localStorage.getItem("token");
        let newPrescription;
        try {
			const response = await fetch(`http://localhost:4000/doctor/updatePrescription/${prescriptionToBeUpdated._id}`, {
			  method: "PATCH",
			  headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			  },
              body: JSON.stringify({
                date: date,
                filled: filled,
                medications: medications
                }),
			});
		
			if (!response.ok) {
			  throw new Error("Could not edit this prescription");
			}
		
			newPrescription = await response.json();
            console.log('New Prescription:', newPrescription);

            setPrescriptions((prevPrescriptions) =>
            prevPrescriptions.map((prescription) =>
                prescription._id === newPrescription._id
                    ? newPrescription
                    : prescription
                )
            );
			setIsPending(false);
			setError(null);

		  } catch (err) {
			setIsPending(false);
			setError(err.message);
		  }
        alert("Prescription edited successfully!");
    };

    const handleEditDosage = async () => {
        setOpenFreqDialog(false);
        setIsPending(true);
        setError(null);

        try {
            const { _id } = prescriptionToBeUpdated;
            const frequency = freqToBeUpdated;
            const medicationName = medicationToBeUpdated ? medicationToBeUpdated.medicationName : '';

            if (!_id || !frequency) {
                console.error("Invalid request parameters");
                console.log("_id:", _id);
                console.log("frequency:", frequency);
                return;
            }

            const updatedPrescription = await fetch(`http://localhost:4000/doctor/addOrUpdateDosage`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prescriptionId: _id,
                    medicationName: medicationName,
                    frequency: frequency,
                }),
            });

            if (!updatedPrescription.ok) {
                throw new Error("Could not update dosage");
            }

            const updatedPrescriptionData = await updatedPrescription.json();
            console.log('Updated Prescription:', updatedPrescriptionData);

            // Now update the state with the new prescription data
            setPrescriptions((prevPrescriptions) =>
                prevPrescriptions.map((prescription) =>
                    prescription._id === updatedPrescriptionData.prescription._id
                        ? updatedPrescriptionData.prescription
                        : prescription
                )
            );
            setIsPending(false);
			setError(null);

        } catch (err) {
            setIsPending(false);
            setError(err.message);
        }
        alert("Dosage Updated successfully!");
    };

    const handleCheckboxChange = (event) => {
		setFilled(event.target.checked);
	};

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleOpenEditDialog = (prescription) => {
        setPrescriptionToBeUpdated(prescription);
        setOpenEditDialog(true);
    };

    const handleRemoveMedicine = (indexToRemove) => {
        setMedications((prevMedications) =>
            prevMedications.filter((_, index) => index !== indexToRemove)
        );
    };
    
    const handleFrequencyChange = (event, indexToUpdate) => {
        const newMedications = [...medications];
        newMedications[indexToUpdate].frequency = event.target.value;
        setMedications(newMedications);
    };
    
    const handleMedicineNameChange = (event, indexToUpdate) => {
        const newMedications = [...medications];
        newMedications[indexToUpdate].medicationName = event.target.value;
        setMedications(newMedications);
    };

    const handleAddMedicine = () => {
        setMedications((prevMedications) => [
            ...prevMedications,
            { medicationName: "", frequency: "" },
        ]);
    };

    const handleOpenFreqDialog = (prescription, medication) => {
        console.log('Medication:', medication);
        console.log('Prescription:', prescription);
        setMedicationToBeUpdated(medication);
        setPrescriptionToBeUpdated(prescription);
        setOpenFreqDialog(true);
    };

    const handleOpenAddMedicationDialog = (prescription) => {
        console.log("ya rab");
        setPrescOfMedicationToBeAdded(prescription);
		setOpenAddMedicationDialog(true);
	};

    return ( 
        <ThemeProvider theme={theme}>
            <DoctorHeader/>
            <Grid container justifyContent='center' style={{ padding: "3rem" }}>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: "2rem" }}>
                        <Grid container spacing={2}>
                            <Typography style={{ margin: "1rem" }} variant='h4' align='left'>
                                List Of Prescriptions
                            </Typography>
                        </Grid>
                        <PrescriptionsTable 
                            firstColumnName={firstColumnName} 
                            data={prescriptions} 
                            userType="doctor"
                            onOpenDialog={handleOpenDialog}
                            onOpenFreqDialog={handleOpenFreqDialog}
                            onOpenEditDialog={handleOpenEditDialog}
                            onOpenAddMedicationDialog={handleOpenAddMedicationDialog}
                        />
                        {isPending && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                    </Paper>
                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                        <DialogContent>
                            <Card variant='outlined'>
                                <CardContent>
                                    <Typography variant='h6' component='div'>
                                        Insert Prescription
                                        {/* <Typography variant='body2' component='div'>
                                            Select only one option
                                        </Typography> */}
                                    </Typography>
                                    <TextField
                                        id='patient-username'
                                        label='Patient Username'
                                        variant='outlined'
                                        required
                                        value={patientUsername}
                                        onChange={(e) => setPatientUsername(e.target.value)}
                                        style={{ margin: "1rem" }}
                                    />
                                    <TextField
                                        id='date-filter'
                                        label='Date'
                                        type='date'
                                        variant='outlined'
                                        required
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        style={{ margin: "1rem" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={filled}
                                                onChange={handleCheckboxChange}
                                            />
                                        }
                                        label='Filled'
                                        style={{ margin: "1rem" }}
                                    />
                                    <Button variant='contained' onClick={handleAddPrescription} disabled={!patientUsername || !date}>
                                        Add
                                    </Button>
                                </CardContent>
                            </Card>
                        </DialogContent>
                    </Dialog>



                    <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                        <DialogContent>
                            <Card variant='outlined'>
                                <CardContent>
                                    <Typography variant='h4' component='div'>
                                        Edit Prescription
                                        {/* <Typography variant='body2' component='div'>
                                            Select only one option
                                        </Typography> */}
                                    </Typography>
                                    <TextField
                                        id='patient-username'
                                        label='Patient Username'
                                        variant='outlined'
                                        required
                                        value={patientUsername}
                                        onChange={(e) => setPatientUsername(e.target.value)}
                                        style={{ margin: "1rem" }}
                                    />
                                    <TextField
                                        id='date-filter'
                                        label='Date'
                                        type='date'
                                        variant='outlined'
                                        required
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        style={{ margin: "1rem" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={filled}
                                                onChange={handleCheckboxChange}
                                                
                                                
                                            />
                                        }
                                        label='Filled'
                                        style={{ margin: "1rem" }}
                                    />


                                    <Typography variant='subtitle1'>Medicines:</Typography>
                                    {medications.map((medication, index) => (
                                        <div key={index}>
                                            <TextField
                                                label={`Medicine Name`}
                                                variant='outlined'
                                                required
                                                value={medication.medicationName}
                                                onChange={(e) => handleMedicineNameChange(e, index)}
                                                style={{ margin: "0.5rem" }}
                                            />
                                            <TextField
                                                label={`Frequency`}
                                                variant='outlined'
                                                required
                                                value={medication.frequency}
                                                onChange={(e) => handleFrequencyChange(e, index)}
                                                style={{ margin: "0.5rem" }}
                                            />
                                            <Button
                                                variant='outlined'
                                                onClick={() => handleRemoveMedicine(index)}
                                                style={{ margin: "0.5rem" }}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        variant='outlined'
                                        onClick={handleAddMedicine}
                                        style={{ margin: "0.5rem" }}
                                    >
                                        Add Medicine
                                    </Button>

                                    <Button variant='contained' onClick={handleEditPrescription} disabled={!patientUsername || !date}>
                                        Edit
                                    </Button>
                                </CardContent>
                            </Card>
                        </DialogContent>
                    </Dialog>




                    <Dialog open={openFreqDialog} onClose={() => setOpenFreqDialog(false)}>
                        <DialogContent>
                            <Card variant='outlined'>
                                <CardContent>
                                    <Typography variant='h6' component='div'>
                                        Edit Dosage
                                        {/* <Typography variant='body2' component='div'>
                                            Select only one option
                                        </Typography> */}
                                    </Typography>
                                    <TextField
                                        id='frequency'
                                        label='Frequency'
                                        variant='outlined'
                                        required
                                        value={freqToBeUpdated}
                                        onChange={(e) => setFreqToBeUpdated(e.target.value)}
                                        style={{ margin: "1rem" }}
                                    />
                                    <Button variant='contained' onClick={handleEditDosage}>
                                        Edit
                                    </Button>
                                </CardContent>
                            </Card>
                        </DialogContent>
                    </Dialog>

                    <Dialog
                        open={openAddMedicationDialog}
                        onClose={() => setOpenAddMedicationDialog(false)}
                    >
                        <DialogTitle>Add Medication</DialogTitle>
                        <DialogContent>
                            <TextField
                                label='Medication Name'
                                value={medicationToBeAdded}
                                onChange={(e) => setMedicationToBeAdded(e.target.value)}
                                fullWidth
                                margin='normal'
                            />
                            <TextField
                                label='Frequency'
                                value={freqToBeAdded}
                                onChange={(e) => setFreqToBeAdded(e.target.value)}
                                fullWidth
                                margin='normal'
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenAddMedicationDialog(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleAddMedication}
                                variant='contained'
                            >
                                Add
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
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
        </ThemeProvider>
    );
}
 
export default ViewPrescriptionsDoctor;