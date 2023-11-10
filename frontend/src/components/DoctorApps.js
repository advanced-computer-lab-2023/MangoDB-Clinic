import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMyAppointments, upcomingApp } from "../services/api";
import { Grid, Paper, Typography, TextField } from "@mui/material";
import { experimentalStyled as styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const DoctorApps = () => {
    const { id } = useParams();
    const [ appointments, setAppointments ] = useState([]);
    const [ isPending, setIsPending ] = useState(true);
    const [ error, setError ] = useState('');
    const [ status, setStatus ] = useState('');
    // const [ from, setFrom ] = useState('');
    // const [ to, setTo ] = useState('');
    const [ upcoming, setUpcoming ] = useState(false);

    const handleUpcomingClick = () => {
        setUpcoming(!upcoming);
    }

    useEffect(() => {
        if (!upcoming) {
            setAppointments([]);
            setIsPending(true);
            getMyAppointments(id)
                .then((result) => {
                    setAppointments(result.data);
                    setIsPending(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setIsPending(false);
                });
        }
    }, [id, upcoming]);

    useEffect(() => {
        setIsPending(true);
        setAppointments([]);

        if (upcoming) {
            upcomingApp(id)
                .then((result) => {
                    setIsPending(false);
                    setAppointments(result.data);
                })
                .catch((err) => {
                    setIsPending(false);
                    setError(err.message);
                })
        }
    }, [upcoming])

    return (
        <div>
            <h1>Appointments</h1>
            { !upcoming &&
                <Button
                    disabled={false}
                    size="medium"
                    variant="outlined"
                    style={{ margin: '10px', color: '#1976d2' }}
                    onClick={ handleUpcomingClick }
                >
                    Upcoming Appointments
                </Button> 
            }
            { upcoming &&
                <Button
                    disabled={false}
                    size="medium"
                    variant="filled"
                    style={{ margin: '10px', color: 'white', background: '#1976d2' }}
                    onClick={ handleUpcomingClick }
                >
                    Upcoming Appointments
                </Button> 
            }
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { !isPending && !error && appointments.length < 1 && <div>No appointments to show...</div> }
            { appointments.length > 0 && (
                <Grid 
                    container 
                    direction="column" 
                    justifyContent="center"
                    alignItems="flex-start" spacing={ 3 }
                >

                    { appointments.map((appointment) => (
                            <Grid item xs={ 12 } sm={ 6 } md={ 4 } key={ appointment._id }>
                                <div>
                                    {/* <Link to={`/selectedPatient/${patient._id}`} style={{ textDecoration: 'none' }}> */}
                                        <Item>
                                            <Typography variant="h6" style={{ color: 'black' }}>
                                                Patient: { appointment.patientFirstName ? `${ appointment.patientFirstName } ${ appointment.patientLastName }` : 
                                                                                          `${ appointment.firstName} ${ appointment.lastName }`}
                                            </Typography>
                                            <Typography variant="body2" style={{ color: 'black' }}>
                                                { `Date: ${new Date(appointment.date).toLocaleDateString()}` }
                                            </Typography>
                                            <Typography variant="body2" style={{ color: 'black' }}>
                                                { `Time: ${new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` }
                                            </Typography>
                                            <Typography variant="body2" style={{ color: 'black' }}>
                                                Status: { appointment.status }
                                            </Typography>
                                            <Typography variant="body2" style={{ color: 'black' }}>
                                                Follow up: { appointment.followUp ? 'Yes' : 'No' }
                                            </Typography>
                                        </Item>
                                    {/* </Link> */}
                                </div>
                            </Grid>
                    )) }
                </Grid>
            ) }
        </div>
    );
};

export default DoctorApps;