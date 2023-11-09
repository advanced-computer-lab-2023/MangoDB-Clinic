import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPatientsDoctor, searchPatients, upcomingApp } from "../services/api";
import { Grid, Paper, Typography, TextField } from "@mui/material";
import { experimentalStyled as styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles((theme) => ({
//     patientPreview: {
//         padding: theme.spacing(2),
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//     },
// }));
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const PatientList = () => {
    const { id } = useParams();
    const [ patients, setPatients ] = useState([]);
    const [ isPending, setIsPending ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ search, setSearch ] = useState('');
    const [ upcoming, setUpcoming ] = useState(false);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (search) {
            setIsPending(true);
            setPatients([]);
    
            searchPatients(id, search)
                .then((result) => {
                    setPatients(result.data);
                    setIsPending(false);
                })
                .catch(err => {
                    setError(err.message);
                    setIsPending(false);
                });
        }
    }

    const handleUpcomingClick = () => {
        setUpcoming(!upcoming);
    }

    useEffect(() => {
        if (search == '' && !upcoming) {
            setIsPending(true);
            setPatients([]);

            getPatientsDoctor(id)
                .then((res) => {
                    setPatients(res.data);
                    setIsPending(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setIsPending(false);
                });
        }
    }, [id, search, upcoming]);

    useEffect(() => {
        setIsPending(true);
        setPatients([]);

        if (upcoming) {
            upcomingApp(id)
                .then((result) => {
                    setIsPending(false);
                    setPatients(result.data);
                })
                .catch((err) => {
                    setIsPending(false);
                    setError(err.message);
                })
        }
    }, [upcoming])

    return (
        <div className='patient-list'>
            {
                <>
                    <Grid item xs={ 12 } style={{ padding: '5px' }}>
                        <Typography variant="h5">Patient List</Typography>
                    </Grid>

                    <form onSubmit={ handleSubmit }>
                        <Grid item xs={ 12 } style={{ padding: '5px' }}>
                            <TextField 
                                label="Search"
                                type="text"
                                size="small"
                                value={ search }
                                onChange={ handleChange }
                            />
                            <Button variant="contained"  type="submit">Search</Button>
                        </Grid>
                    </form>
                </>
            }
            { !upcoming &&
                <Button
                    disabled={false}
                    size="medium"
                    variant="outlined"
                    style={{ margin: '10px', color: '#1976d2' }}
                    onClick={ handleUpcomingClick }
                >
                    Upcoming
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
                    Upcoming
                </Button> 
            }
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { !isPending && !error && patients.length < 1 && <div>No patients to display...</div> }
            { patients.length > 0 && (
                // <>
                //     <label>Search: </label>
                //     <input 
                //         type="text" 
                //         value={ search }
                //         onChange={ handleChange }
                //     />

                //     { patients.map((patient) => (
                //         <div className='patient-preview' key={ patient._id }>
                //             <Link to={ `/selectedPatient/${ patient._id }` }>
                //                 <h2>{ patient.firstName + " " + patient.lastName }</h2>
                //                 <p>{ patient.email }</p>
                //             </Link>
                //         </div>
                //     )) }
                // </>

                <Grid 
                    container 
                    direction="column" 
                    justifyContent="center"
                    alignItems="flex-start" spacing={ 3 }
                >

                    { patients.map((patient, index) => (
                        <Grid item xs={ 12 } sm={ 6 } md={ 4 } key={ patients.length > 2 ? `${patient.appointmentId}-${patient._id}` : patient._id  }>
                            <div>
                                <Link to={`/selectedPatient/${patient._id}`} style={{ textDecoration: 'none' }}>
                                    <Item>
                                        <Typography variant="h6" style={{ color: 'black' }}>
                                            { patient.firstName + " " + patient.lastName }
                                        </Typography>
                                        <Typography variant="body2">
                                            { patient.email }
                                        </Typography>
                                        { upcoming &&
                                            <>
                                                <Typography variant="body2">
                                                    { `Date: ${new Date(patient.date).toLocaleDateString()}` }
                                                </Typography>
                                                <Typography variant="body2">
                                                    { `Time: ${new Date(patient.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` }
                                                </Typography>
                                                <Typography variant="body2">
                                                    { `Status: ${ patient.status }` }
                                                </Typography>
                                            </>
                                        }
                                    </Item>
                                </Link>
                            </div>
                        </Grid>
                        // <Grid item xs={2} sm={4} md={4} key={index}>
                        //     <Item>xs=2</Item>
                        // </Grid>
                    )) }
                </Grid>
            ) }   
        </div>
    );
}

export default PatientList;