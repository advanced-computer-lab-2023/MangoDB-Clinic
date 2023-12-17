import { useEffect, useState } from "react";
import React from "react";
import { Grid, Paper, Typography, TextField ,ThemeProvider,	TableContainer,
	TableHead,
	TableRow,
Table,
TableBody,TableCell,Radio, RadioGroup,FormControlLabel} from "@mui/material";
import theme from "../theme";
import { experimentalStyled as styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { alpha } from "@mui/system";
import TableSortLabel from "@mui/material/TableSortLabel";
import FollowUpIcon from '@mui/icons-material/EventNote'
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import DialogContentText from '@mui/material/DialogContentText';


import {
	viewPatientAppointments,
	upcomingPatientApp,
	filterPatientAppointments,
	statusEnum,
	patientReschuleApp,
	patientCancelApp,
	patientReqFollowup
} from "../services/api";
import PatientHeader from "../components/GeneralComponents/patientHeader";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

const ViewAppointments = () => {
	const navigate = useNavigate();
	const rejectIcon = `${process.env.PUBLIC_URL}/icons/reject.svg`;
	// const id = "6526d30a0f83f5e462288354";
	const [appointments, setAppointments] = useState([]);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState("");
	const [status, setStatus] = useState("All");
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	const [upcoming, setUpcoming] = useState(false);
	const [statEnum, setStatEnum] = useState(["All"]);
	const [newDateTime, setNewDateTime] = useState('');
	const [toReschdule, setToReschdule] = useState('');
	const [sortDirection, setSortDirection] = React.useState('asc');

	const [open, setOpen] = useState(false);
	const [openCancel, setOpenCancel] = useState(false);
	const [openFollowup, setOpenFollowup] = React.useState(false);
	const [openFilter, setOpenFilter] = useState(false);
	const [value, setValue] = useState('option1');
	const handleClickOpenFilter = () => {
		setOpenFilter(true);
	  };
	  const handleCloseFilter = () => {
		setOpenFilter(false);
	  };
const handleClickOpenFollowup = () => {
	setOpenFollowup(true);
};

const handleCloseFollowup= () => {
	setOpenFollowup(false);
};

	const handleClose = () => {
		setOpenCancel(false);
	  };
	function convertToISOFormat(dateString) {
		// Split the input string into day, month, and year
		const [day, month, year] = dateString.split("/");

		// Create a new Date object using the components
		const dateObject = new Date(`${year}-${month}-${day}`);

		// Use the toISOString method to get the date in ISO format
		const isoDateString = dateObject.toISOString().split("T")[0];

		return isoDateString;
	}
	const handleSort = () => {
		// Toggle sort direction
		const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		setSortDirection(newDirection);
	
		// Sort appointments
		appointments.sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);
	
			// Compare dates depending on sort direction
			if (newDirection === 'asc') {
				return dateA - dateB;
			} else {
				return dateB - dateA;
			}
		});
	};
	
	const handleUpcomingClick = () => {
		setUpcoming(!upcoming);
		setStatus("All");
		setFrom("");
		setTo("");
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		switch (name) {
			case "status":
				setStatus(value);
				break;
			case "from":
				setFrom(convertToISOFormat(value));
				break;
			case "to":
				setTo(convertToISOFormat(value));
				break;
		}
	};
	// const handleChangee = (appointmentId) => (event) => {
	// 	const newDate = event.target.value;
	// 	console.log(appointmentId)
	// 	patientReschuleApp(appointmentId,newDate).then(() => {
	// 		window.location.reload();
	// 	});
		
	// };

	const handleChangee = (event) => {
		const newDateTime = event.target.value;
		setToReschdule(event.target.value);
		setNewDateTime(newDateTime);
	};
	// const handleReschedule = (appointmentId) => {
	// 	// console.log(appointment._id)
	// 	patientReschuleApp(appointmentId, newDateTime).then(() => {
	// 		window.location.reload();
	// 	});
	// };
	const handleSubmit = (e) => {
		e.preventDefault();

		setIsPending(true);
		setAppointments([]);

		const query = { status, date_1: from, date_2: to  };

		if (!query[status]) {
			query[status] = "All";
		}

		if (!query["date_1"]) {
			query["date_1"] = convertToISOFormat("01/01/1960");
		}

		if (!query["date_2"]) {
			query["date_2"] = convertToISOFormat("31/12/2060");
		}

		console.log(query);
		filterPatientAppointments(query)
			.then((result) => {
				setAppointments(result.data);
				setIsPending(false);
			})
			.catch((err) => {
				setError(err.message);
				setIsPending(false);
			});
	};
	useEffect(() => {
		setIsPending(true);
		statusEnum()
			.then((result) => {
				setStatEnum(result.data);
				console.log(result.data);
				setIsPending(false);
			})
			.catch((err) => {
				setError(err.message);
				setIsPending(false);
			});
	}, []);
	
	useEffect(() => {
		if (!upcoming) {
			setAppointments([]);
			setIsPending(true);
			viewPatientAppointments()
				.then((result) => {
					setAppointments(result.data);
					setIsPending(false);
				})
				.catch((err) => {
					setError(err.message);
					setIsPending(false);
				});
		}
	}, [ upcoming]);

	useEffect(() => {
		setIsPending(true);
		setAppointments([]);

		if (upcoming) {
			upcomingPatientApp()
				.then((result) => {
					setIsPending(false);
					setAppointments(result.data);
				})
				.catch((err) => {
					setIsPending(false);
					setError(err.message);
				});
		}
	}, [upcoming]);

	useEffect(() => {
		console.log(appointments);
	}, [appointments]);

	return (
		<div>
			<PatientHeader />
		<Paper sx={{ "margin": "auto", "width": "90%", "marginTop": "90px", "padding": "2%" }}>
		<ThemeProvider theme={theme}>
		
			<Typography variant='h3'>My Appointments</Typography>
			<div className='app-p'>
			

				<br />
				
			</div>

			{isPending && <div>Loading...</div>}
			{error && <div>{error}</div>}
			{!isPending && !error && appointments.length < 1 && (
				<div>No appointments to show...</div>
			)}
			{appointments.length > 0 && (
			<TableContainer component={Paper} xs={8}>
			<TableRow>
			  <TableCell>
				<div>
				<form onSubmit={handleSubmit}>
  <Grid container spacing={4} alignItems="center">
    <Grid item xs={1.2}>
      <FormControl
        fullWidth
        variant='outlined'
        size='small'
        style={{ minWidth: "5vw", width: "auto" }}
      >
        <InputLabel id='status-label'>Status</InputLabel>
        <Select
          labelId='status-label'
          id='status'
          name='status'
          label='Status'
          variant='outlined'
          size='small'
          value={status}
          onChange={handleChange}
        >
          {statEnum.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={2.2}>
      <TextField
        id='from'
        name='from'
        label='From'
        variant='outlined'
        value={from}
        onChange={handleChange}
        size='small'
        type='date'
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={2.2}>
      <TextField
        id='to'
        name='to'
        label='To'
        variant='outlined'
        value={to}
        onChange={handleChange}
        size='small'
        type='date'
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={2}>
      <Button variant='contained' type='submit' style={{ height: '35px', width: '70px' ,marginTop: '0px',fontSize :"15px"}}>
        Filter
      </Button>
    </Grid>
    <Grid item xs={1}>
      {!upcoming && (
        <Button
          disabled={false}
          size='small'
          variant='contained'
          style={{ margin: "10px" ,height: '45px', width: '300px',fontSize :"14px"}}
          onClick={handleUpcomingClick}
        >
          Show Upcoming Appointments
        </Button>
      )}
      {upcoming && (
               <Button
			   disabled={false}
			   size='small'
			   variant='contained'
			   style={{ margin: "10px" ,height: '45px', width: '300px',fontSize :"14px"}}
			   onClick={handleUpcomingClick}
			 >
			   Show All Appointments
			 </Button>
      )}
    </Grid>
  </Grid>
</form>

				</div>
				{/* {!upcoming && (
				  <Button
					disabled={false}
					size='medium'
					variant='outlined'
					style={{ margin: "10px", color: "#1976d2" }}
					onClick={handleUpcomingClick}
				  >
					Upcoming Appointments
				  </Button>
				)}
				{upcoming && (
				  <Button
					disabled={false}
					size='medium'
					variant='filled'
					style={{ margin: "10px", color: "white", background: "#1976d2" }}
					onClick={handleUpcomingClick}
				  >
					Upcoming Appointments
				  </Button>
				)} */}
			  </TableCell>
			</TableRow>
		
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
				<TableHead sx={{ backgroundColor: alpha("#B2F0E8", 0.3) }}>
				<TableRow>
				<TableCell >
					<Typography variant='subtitle1' fontWeight='bold'>Doctor</Typography>
				</TableCell>
				<TableCell >
					<TableSortLabel active={true} direction={sortDirection} onClick={handleSort}>
						<Typography variant='subtitle1' fontWeight='bold'>Date</Typography>
					</TableSortLabel>
				</TableCell>
				<TableCell >
					<Typography variant='subtitle1' fontWeight='bold'>Status</Typography>
				</TableCell>
				<TableCell >
					<Typography variant='subtitle1' fontWeight='bold'>Followup</Typography>
				</TableCell>
				
				<TableCell >
					<Typography variant='subtitle1' fontWeight='bold'>Reschedule</Typography>
				</TableCell>
				<TableCell >
					<Typography variant='subtitle1' fontWeight='bold'>Schedule followup</Typography>
				</TableCell>
				<TableCell >
					<Typography variant='subtitle1' fontWeight='bold'>Cancel</Typography>
				</TableCell>
				
			</TableRow>

					</TableHead>
				
				<TableBody>
					{appointments.map((appointment) => (
						// <Grid className='app-preview' key={appointment.id}>
						<TableRow>
							<TableCell>
									 {appointment.doctorId.firstName} {appointment.doctorId.lastName}
							</TableCell>
							<TableCell>
								
									{`${new Date(appointment.date).toLocaleDateString()}`}
									{`         Time: ${new Date(
										appointment.date
									).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit",
									})}`}
								
							</TableCell>
							<TableCell>
							 {appointment.status}
							</TableCell>
							<TableCell >
								{appointment.followUp ? "Available" : ""}
							</TableCell>
						




<TableCell>
  {appointment.status === "confirmed" || appointment.status === "requested" ? (
    <div>
      <IconButton style={{ marginLeft: "20px" }}
        onClick={() => setOpen(true)}
      >
        <CalendarTodayIcon />
      </IconButton>

	  <Dialog open={open} onClose={() => setOpen(false)}>
  <DialogTitle>Reschedule Appointment</DialogTitle>
  <DialogContent>
    <TextField
      id='to'
      name='to'
      label='To'
      variant='outlined'
      // value={toReschdule}
      onChange={handleChangee}
      size='small'
      type='datetime-local'
      InputLabelProps={{ shrink: true }}
    />
    <DialogActions style={{ justifyContent: 'center' }}>
      <Button
        variant='contained'
        size='small'
        onClick={(e) => {
          e.preventDefault();
          patientReschuleApp(appointment._id, newDateTime).then(() => {
            window.location.reload();
          }).catch((err) => setError(err.message));
          setOpen(false);
        }}
      >
        Reschedule
      </Button>
    </DialogActions>
  </DialogContent>
</Dialog>



    </div>
  ) : null}
</TableCell>

<TableCell>
  {appointment.status === "done" ? (
    <Box>
      <IconButton  style={{ marginLeft: "60px"  }}onClick={handleClickOpenFollowup}>
	  <FollowUpIcon style={{ fontSize: '30px' }} />
      </IconButton>
      <Dialog open={openFollowup} onClose={handleCloseFollowup}>
        <DialogTitle>Request Follow-Up</DialogTitle>
        <DialogContent>
          <TextField
            id='to'
            name='to'
            label='To'
            variant='outlined'
            onChange={handleChangee}
            size='small'
            type='datetime-local'
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button onClick={handleCloseFollowup} color="secondary">
            Cancel
          </Button>
          <Button
            variant='contained'
            size='small'
            onClick={(e) => {
              e.preventDefault();
              patientReqFollowup(appointment._id,newDateTime)
                .then(() => {
                  window.location.reload();
                })
                .catch((err) => setError(err.message));
              handleClose();
            }}
          >
            Follow-Up
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  ) : null}
</TableCell>


<TableCell>
  {appointment.status !== "cancelled" &&  appointment.status !== "done" ? (
    <div>
  <IconButton
  style={{ marginLeft:"10",width: '40px', height: '40px' }}
  onClick={(e) => {
    e.preventDefault();
    setOpenCancel(true);
  }}
>
  <img src={rejectIcon} alt="Cancel Icon" style={{ width: '100%', height: '100%' }} />
</IconButton>

      <Dialog
        open={openCancel}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Cancel Appointment"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel the appointment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined" >
            No
          </Button>
          <Button
            onClick={() => {
              patientCancelApp({ appointmentId: appointment._id })
                .then(() => {
                  window.location.reload();
                })
                .catch((err) => setError(err.message));
            }}
            color="secondary" variant="contained"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  ) : null}
</TableCell>




							
							</TableRow>
						// </Grid>
					))}
				</TableBody>
				</Table>
				</TableContainer>
			)}

		</ThemeProvider>
		</Paper>
		</div>
	);
};

export default ViewAppointments;
