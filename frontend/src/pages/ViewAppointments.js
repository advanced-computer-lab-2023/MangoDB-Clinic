import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { viewPatientAppointments, upcomingPatientApp, filterPatientAppointments } from  "../services/api";
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

const ViewAppointments = () => {
    const { id } = useParams();
    const [ appointments, setAppointments ] = useState([]);
    const [ isPending, setIsPending ] = useState(true);
    const [ error, setError ] = useState('');
    const [ status, setStatus ] = useState('All');
    const [ from, setFrom ] = useState('');
    const [ to, setTo ] = useState('');
    const [ upcoming, setUpcoming ] = useState(false);

    function convertToISOFormat(dateString) {
        // Split the input string into day, month, and year
        const [day, month, year] = dateString.split('/');
      
        // Create a new Date object using the components
        const dateObject = new Date(`${year}-${month}-${day}`);
      
        // Use the toISOString method to get the date in ISO format
        const isoDateString = dateObject.toISOString().split('T')[0];
      
        return isoDateString;
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
            case 'from': setFrom(convertToISOFormat(value)); break;
            case 'to': setTo(convertToISOFormat(value)); break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsPending(true);
        setAppointments([]);

        const query = { status,  date_1: from, date_2: to, patient: id };

        if (!query[status]) {
            query[status] = 'All';
        }

        if (!query['date_1']) {
            query['date_1'] = convertToISOFormat('01/01/1960');
        }

        if (!query['date_2']) {
            query['date_2'] = convertToISOFormat('31/12/2060');
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
    }

    useEffect(() => {
        if (!upcoming) {
            setAppointments([]);
            setIsPending(true);
            viewPatientAppointments(id)
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
            upcomingPatientApp(id)
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
        <div >
            <h1>Appointments</h1>
            <div className="app-p">
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
                <Grid>
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
            </div>

            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { !isPending && !error && appointments.length < 1 && <div>No appointments to show...</div> }
            { appointments.length > 0 && (
                <Grid 
                    
                >

                    { appointments.map((appointment) => (
                            <Grid className="app-preview"  key={appointment.id}>
                                <div>
                                       
                                                    <h1 >
                                                         Doctor Name: {appointment.doctorId.firstName} {appointment.doctorId.lastName}
                                                    </h1>
                                                    <h2 >
                                                           { `Date: ${new Date(appointment.date).toLocaleDateString()}` }
                                                           { `         Time: ${new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` }
                                                     </h2>
                                                     
                                                    <h4 >
                                                        Status: { appointment.status }
                                                    </h4>
                                                    <h5 >
                                                        Follow up: { appointment.followUp ? 'Yes' : 'No' }
                                                    </h5>
                                          
                                </div>
                            </Grid>
                    )) }
                </Grid>
            ) }
        </div>
        
    );
};

export default ViewAppointments;
