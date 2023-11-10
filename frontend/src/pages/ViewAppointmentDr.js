import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { viewDoctorAppointments } from "../services/api";
import "../index.css";

const ViewAppointmentsDr = () => {
    const dr_id = '6526de95033c945b74c32d7d';
    const [apps, setApp] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        viewDoctorAppointments(patient_id)
            .then((response) => {
                // Filter out duplicate appointments based on their unique ID
                const uniqueAppointments = response.data.filter((app, index, self) => self.findIndex(a => a.id === app.id) === index);
                setApp(uniqueAppointments);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                setIsPending(false);
                setError(err.message);
            });
    }, []);
    return (   
        <div >  
        <Grid container justifyContent="center" style={{ padding: "2rem" }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <h1>View Appointments</h1>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {isPending && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {apps && (
                    <div>
                        {apps.map((app) => (
                          <div className="app-preview" key={app.id}>
                                <h3>Patient Name: {app.patientId.firstName} {app.patientId.lastName}</h3>
                                <h4>Date: {app.date} </h4>
                                <h5>status: {app.status}</h5>
                            </div>
                        ))}
                    </div>
                )}
            </Grid>
        </Grid>
    </div>
     );
}
 
export default ViewAppointmentsDr;