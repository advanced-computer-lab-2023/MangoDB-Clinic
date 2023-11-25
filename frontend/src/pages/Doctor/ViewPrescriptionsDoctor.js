import { useState, useEffect } from "react";
import {
	Grid,
	Paper,
	Typography,
} from "@mui/material";

import PrescriptionsTable from "../../components/GeneralComponents/PrescriptionsTable";

const ViewPrescriptionsDoctor = () => {

    const firstColumnName = "Patient";
    const [prescriptions, setPrescriptions] = useState([]);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
                setPrescriptions([]);
                setIsPending(true);
                setError(null);

                const token = localStorage.getItem("token");
  
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
                  setPrescriptions(data);
                  setIsPending(false);
                  setError(null);

            } catch (err) {
            setIsPending(false);
            setError(err.message);
            }
        };
      fetchData();
    }, []);

    const handleAddPrescription = () => {
        // Logic to add a new prescription
        // You can make API calls or update the state as needed
        console.log("Add Prescription clicked");
    };

    return ( 
        <Grid container justifyContent='center' style={{ padding: "2rem" }}>
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
                        onAddPrescription={handleAddPrescription}
                    />
                    {isPending && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                </Paper>
            </Grid>
        </Grid>
    );
}
 
export default ViewPrescriptionsDoctor;