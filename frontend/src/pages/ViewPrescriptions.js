import { Dialog, Grid, DialogContent, Paper, Card, CardContent, TextField, FormControlLabel, Checkbox, Tooltip, Typography, Button  } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FilterListIcon from '@mui/icons-material/FilterList';
import PrescriptionsTable from "../components/PrescriptionsTable";
import axios from 'axios';


const ViewPrescriptions = () => {
    // const { patientId } = useParams();
    const [prescriptions, setPrescriptions] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [open, setOpen] = useState(false);
    const [filterByDate, setFilterByDate] = useState('');
    const [filterByDoctor, setFilterByDoctor] = useState('');
    const [filterByFilled, setFilterByFilled] = useState(null);
    const filterParams = [];
    const getID = async () => {
		try {
			const response = await axios.post(
				"http://localhost:4000/Patient/myInfo",
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 200) {
				return response.data._id;
			}
		} catch (error) {}
	};
    useEffect(async () => {
        setPrescriptions([]);
        setIsPending(true);
        setError(null);

         idd = await getID();
        console.log(isFilterApplied);

        if(!isFilterApplied){

            fetch(`http://localhost:4000/patient/get_prescriptions_of_patient/6526d30a0f83f5e462288354`)
            .then((res) => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then((data) => {
                setPrescriptions(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                setIsPending(false);
                setError(err.message);
            });
        }
    },  [ idd, isFilterApplied ]);

    const handleFilter = () => {
        setOpen(false);
        setIsFilterApplied(true);
        setIsPending(true);
        setPrescriptions([]);
        setError(null);
    
        if (filterByDoctor) {
            filterParams.push(`doctor=${encodeURIComponent(filterByDoctor)}`);
        }

        if (filterByDate) {
            const formattedDate = formatDateForBackend(filterByDate);
            filterParams.push(`date=${encodeURIComponent(formattedDate)}`);
        }

        if (filterByFilled !== null) {
            filterParams.push(`filled=${encodeURIComponent(filterByFilled)}`);
        }

        console.log(filterParams);

        const url = `http://localhost:4000/patient/filter_prescription/6526d30a0f83f5e462288354?${filterParams.join('&')}`;

        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then((data) => {
                setPrescriptions(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                setIsPending(false);
                setError(err.message);
            });
        
        
        
    }

    const handleCheckboxChange = (event) => {
        setFilterByFilled(event.target.checked);
    };

    const formatDateForBackend = (dateString) => {
        const dateObject = new Date(dateString);
        return dateObject.toISOString(); // Converts the date to the ISO format
    };

    const handleClearFilter = () => {
        setFilterByDate('');
        setFilterByDoctor('');
        setFilterByFilled(null);
        setIsFilterApplied(false);
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
                    <PrescriptionsTable data={prescriptions}/>
                    { isPending && <div>Loading...</div> }
                    { error && <div>{ error }</div> }
                </Paper>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogContent>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    Filter Options 
                                    <Typography variant="body2" component="div">
                                        Select only one option
                                    </Typography>
                                </Typography>
                                <TextField
                                    id="doctor-filter"
                                    label="Doctor Name"
                                    variant="outlined"
                                    value={filterByDoctor}
                                    onChange={(e) => setFilterByDoctor(e.target.value)}
                                    style={{ margin: '1rem' }}
                                />
                                <TextField
                                    id="date-filter"
                                    label="Date"
                                    type="date"
                                    variant="outlined"
                                    value={filterByDate}
                                    onChange={(e) => setFilterByDate(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                }}
                                style={{ margin: '1rem' }}
                                />
                                <FormControlLabel
                                    control={<Checkbox  
                                        checked={filterByFilled} 
                                        onChange={handleCheckboxChange} 
                                        />}
                                    label="Filled"
                                    style={{ margin: '1rem' }}
                                />
                                {!isFilterApplied ? (
                                    <Button  disabled>
                                        Clear Filters
                                    </Button>
                                ) : (
                                    <Button variant="text" onClick={handleClearFilter} >
                                        Clear Filters
                                    </Button>
                                )}
                                <Button variant="contained" onClick={handleFilter}>
                                    Apply Filter
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