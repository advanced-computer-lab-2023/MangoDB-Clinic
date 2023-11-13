import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMyAppointments, upcomingApp, filterAppointments } from "../../services/api";
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
    const [ status, setStatus ] = useState('All');
    const [ from, setFrom ] = useState('');
    const [ to, setTo ] = useState('');
    const [ upcoming, setUpcoming ] = useState(false);

    // function convertToISOFormat(dateString) {
    //     // Split the input string into day, month, and year
    //     const [day, month, year] = dateString.split('/');
      
    //     // Create a new Date object using the components
    //     const dateObject = new Date(`${year}-${month}-${day}`);
      
    //     // Use the toISOString method to get the date in ISO format
    //     const isoDateString = dateObject.toISOString().split('T')[0];
      
    //     return isoDateString;
    // }

    function convertToISOFormat(dateString) {
        try {
            // Split the input string into day, month, and year
            const [day, month, year] = dateString.split('/');
    
            // Create a new Date object in UTC using the components
            const dateObjectUTC = new Date(Date.UTC(year, month - 1, day));
    
            // Use the toISOString method to get the date in ISO format
            const isoDateString = dateObjectUTC.toISOString().split('T')[0];
    
            return isoDateString;
        } catch (error) {
            console.error('Error converting date to ISO format:', error);
            return null;
        }
    }

    const handleUpcomingClick = () => {
        setUpcoming(!upcoming);
        setStatus('All');
        setFrom('');
        setTo('');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'status': setStatus(value); break;
            case 'from': value == '' ? setFrom('') : setFrom(value); break;
            case 'to': value == '' ? setTo('') : setTo(value); break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsPending(true);
        setAppointments([]);

        const query = { status,  date_1: from, date_2: to, doctor: id };

        if (!query['status']) {
            query['status'] = 'All';
        }

        if (!query['date_1']) {
            query['date_1'] = convertToISOFormat('01/01/1960');
        }

        if (!query['date_2']) {
            query['date_2'] = convertToISOFormat('31/12/2060');
        }
        
        console.log(query);
        filterAppointments(query)
            .then((result) => {
                setAppointments(result.data);
                setIsPending(false);
            })
            .catch((err) => {
                setError(err.message);
                setIsPending(false);
            });
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
        if (upcoming) {
            setIsPending(true);
            setAppointments([]);
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

    useEffect(() => {
        console.log(appointments);
    }, [appointments])

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

            <br />
            <form onSubmit={ handleSubmit }>
                <Grid item xs={ 12 } style={{ padding: '5px' }}>
                    <TextField id="status" name="status" label="Status" variant="outlined" value={ status } onChange={ handleChange } size="small"/>
                    <TextField 
                        id="from"
                        name="from"
                        label="From"
                        variant="outlined"
                        value={ from }
                        onChange={ handleChange }
                        size="small"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        id="to"
                        name="to"
                        label="To"
                        variant="outlined"
                        value={ to }
                        onChange={ handleChange }
                        size="small"
                        type="date"
                        InputLabelProps={{ shrink: true }} 
                    />
                    <Button variant="contained"  type="submit">Filter</Button>
                </Grid>
            </form>

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
                            <Grid item xs={ 12 } sm={ 6 } md={ 4 } key={ appointment.appointmentId ? appointment.appointmentId : appointment._id }>
                                <div>
                                    {/* <Link to={`/selectedPatient/${patient._id}`} style={{ textDecoration: 'none' }}> */}
                                        <Item>
                                            <Typography variant="h6" style={{ color: 'black' }}>
                                                Patient: { appointment.patientFirstName ? `${ appointment.patientFirstName } ${ appointment.patientLastName }` : 
                                                                                          `${ appointment.firstName} ${ appointment.lastName }` }
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