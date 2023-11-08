import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPatientsDoctor, searchPatients } from "../services/api";
import { Grid, Paper, Typography, TextField } from "@mui/material";
import { experimentalStyled as styled } from '@mui/material/styles';
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

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        getPatientsDoctor(id)
            .then((res) => {
                setPatients(res.data);
                setIsPending(false);
            })
            .catch((err) => {
                setError(err.message);
                setIsPending(false);
            })
    }, [id]);

    useEffect(() => {
        setIsPending(true);

        searchPatients(id)
            .then((res) => {
                setPatients(res.data);
                setIsPending(false);
            })
            .catch((err) => {
                setError(err.message);
                setIsPending(false);
            })
    }, [search]);

    return (
        <div className='patient-list'>
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
                    <Grid item xs={ 12 }>
                        <Typography variant="h5">Patient List</Typography>
                    </Grid>

                    <Grid item xs={ 12 }>
                        <TextField 
                            label="Search"
                            type="text"
                            size="small"
                            value={ search }
                            onChange={ handleChange }
                        />
                    </Grid>

                    { patients.map((patient) => (
                        <Grid item xs={ 12 } sm={ 6 } md={ 4 } key={ patient._id }>
                            <div>
                                <Link to={`/selectedPatient/${patient._id}`} style={{ textDecoration: 'none' }}>
                                    <Item>
                                        <Typography variant="h6" style={{ color: 'black' }}>
                                            { patient.firstName + " " + patient.lastName }
                                        </Typography>
                                        <Typography variant="body2">
                                            { patient.email }
                                        </Typography>
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