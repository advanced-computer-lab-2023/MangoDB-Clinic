import { useState } from "react";
import { Button, TableCell, TableRow } from "@mui/material";
import { doctorCancelApp } from "../../services/api";
import Reschedule from "./Reschedule";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DialogContentText from "@mui/material/DialogContentText";
import axios from "axios";

const AppRow = ({ appointment, handleReload, handleError }) => {
	const rejectIcon = `${process.env.PUBLIC_URL}/icons/reject.svg`;
	const [open, setOpen] = useState(false);
	const [openCancel, setOpenCancel] = useState(false);

	const handleClose = () => {
		setOpenCancel(false);
	};

	const handleAcceptFollowUp = async (appointmentId) => {
		try {
			const response = await axios.post(
				`http://localhost:4000/doctor/acceptFollowUpSession/${appointmentId}`,
				{}
			);

			if (response.status === 200) {
				console.log("Follow up session accepted");
				alert("Follow up session accepted");
				window.location.reload();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleRevokeFollowUp = async (appointmentId) => {
		try {
			const response = await axios.post(
				`http://localhost:4000/doctor/revokeFollowUpSession/${appointmentId}`,
				{}
			);

			if (response.status === 200) {
				console.log("Follow up session revoked");
				alert("Follow up session revoked");
				window.location.reload();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<TableRow>
			<TableCell>
				{appointment.patientFirstName
					? `${appointment.patientFirstName} ${appointment.patientLastName}`
					: `${appointment.firstName} ${appointment.lastName}`}
			</TableCell>

			<TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>

			<TableCell>
				{new Date(appointment.date).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				})}
			</TableCell>

			<TableCell>{appointment.status}</TableCell>

			<TableCell>{appointment.followUp ? "Yes" : "No"}</TableCell>

			{appointment.status !== "cancelled" && (
				<>
					<TableCell>
						{/* <Reschedule appointment={appointment} handleReload={ handleReload } handleError={ handleError } /> */}
						<IconButton
							onClick={() => setOpen(true)}
							sx={{ marginLeft: "13px" }}
						>
							<CalendarTodayIcon />
						</IconButton>

						<Dialog open={open} onClose={() => setOpen(false)}>
							<DialogTitle>Reschedule Appointment</DialogTitle>
							<DialogContent>
								<Reschedule
									appointment={appointment}
									handleReload={handleReload}
									handleError={handleError}
								/>
							</DialogContent>
						</Dialog>
					</TableCell>

					<TableCell>
						{/* <Button
                            variant='outlined'
                            size='small'
                            onClick={(e) => {
                            e.preventDefault()
                            doctorCancelApp({ appointmentId: appointment._id })
                                .then((result) => {
                                    handleReload();
                                })
                                .catch((err) => handleError(err.message));
                            }}
                            sx={{ "marginTop": "0" }}
                        >
                            Cancel Appointment
                        </Button> */}
						<IconButton
							style={{ width: "40px", height: "40px" }}
							onClick={(e) => {
								e.preventDefault();
								setOpenCancel(true);
							}}
						>
							<img
								src={rejectIcon}
								alt='Cancel Icon'
								style={{ width: "100%", height: "100%" }}
							/>
						</IconButton>

						<Dialog
							open={openCancel}
							onClose={handleClose}
							aria-labelledby='alert-dialog-title'
							aria-describedby='alert-dialog-description'
						>
							<DialogTitle id='alert-dialog-title'>
								{"Cancel Appointment"}
							</DialogTitle>
							<DialogContent>
								<DialogContentText id='alert-dialog-description'>
									Are you sure you want to cancel the appointment?
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button
									onClick={handleClose}
									color='secondary'
									variant='outlined'
								>
									No
								</Button>
								<Button
									onClick={(e) => {
										e.preventDefault();
										doctorCancelApp({ appointmentId: appointment._id })
											.then((result) => {
												handleReload();
											})
											.catch((err) => handleError(err.message));
									}}
									color='secondary'
									variant='contained'
									autoFocus
								>
									Yes
								</Button>
							</DialogActions>
						</Dialog>
					</TableCell>

					{appointment.followUp ? (
						<>
							<TableCell>
								<Button
									variant='contained'
									size='small'
									onClick={() => handleAcceptFollowUp(appointment._id)}
									sx={{ marginTop: "0" }}
								>
									Accept Follow Up
								</Button>
							</TableCell>

							<TableCell>
								<Button
									variant='contained'
									size='small'
									onClick={() => handleRevokeFollowUp(appointment._id)}
									sx={{ marginTop: "0" }}
								>
									Revoke Follow Up
								</Button>
							</TableCell>
						</>
					) : (
						<>
							<TableCell>N/A</TableCell>
							<TableCell>N/A</TableCell>
						</>
					)}
				</>
			)}

			{appointment.status === "cancelled" && (
				<>
					<TableCell>N/A</TableCell>

					<TableCell>N/A</TableCell>
				</>
			)}
		</TableRow>
	);
};

export default AppRow;
