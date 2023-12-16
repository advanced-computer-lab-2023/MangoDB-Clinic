import { Button, TableCell, TableRow } from "@mui/material";
import { doctorCancelApp } from "../../services/api";
import Reschedule from "./Reschedule";

const AppRow = ({ appointment, handleReload, handleError }) => {
    return (
        <TableRow>
            <TableCell
				align="center"
			>
                {appointment.patientFirstName ? 
                    `${appointment.patientFirstName} ${appointment.patientLastName}`
					: `${appointment.firstName} ${appointment.lastName}`}
            </TableCell>

            <TableCell
				align="center"
			>
                { new Date(appointment.date).toLocaleDateString() }
            </TableCell>

            <TableCell
				align="center"
			>
                {new Date(appointment.date).toLocaleTimeString(
					[],
					{ hour: "2-digit", minute: "2-digit" }
				)}
            </TableCell>

            <TableCell
				align="center"
			>
                { appointment.status }
            </TableCell>

            <TableCell
				align="center"
			>
                { appointment.followUp ? "Yes" : "No" }
            </TableCell>

            { appointment.status !== 'cancelled' && (
                <>
                    <TableCell
                        align="center"
                    >
                        <Reschedule appointment={appointment} handleReload={ handleReload } handleError={ handleError } />
                    </TableCell>
                    
                    <TableCell
                        align="center"
                    >
                        <Button
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
                        </Button>
                    </TableCell>
                </>
            ) }

            { appointment.status === 'cancelled' && (
                <>
                    <TableCell
                        align="center"
                    >
                        N/A
                    </TableCell>
                    
                    <TableCell
                        align="center"
                    >
                        N/A
                    </TableCell>
                </>
            )}
        </TableRow>
    );
}

export default AppRow;