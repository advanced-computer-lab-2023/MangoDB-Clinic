import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
// import useFetch from "./useFetch";

const ViewPrescriptions = () => {
    const patient_id = '6526d30a0f83f5e462288354';
    const [prescriptions, setPrescriptions] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/patient/get_prescriptions_of_patient/' + patient_id)
        .then(res => {
            if (!res.ok) {
                throw Error('Could not fetch the data for that resource');
            }
            return res.json();
        })
        .then(data => {
            setPrescriptions(data);
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            setIsPending(false);
            setError(err.message);
        })
    }, []);

    return ( 
        <Grid container  justifyContent="center" style={{ padding: '2rem' }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <h2>Prescriptions</h2>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                { isPending && <div>Loading...</div> }
                { error && <div>{ error }</div> }
                { prescriptions && (
                    <div>
                        {prescriptions.map((prescription) => (
                            <div key={prescription._id}>
                                <h3>{prescription.doctor_name}</h3>
                                <p>{prescription.prescription}</p>
                            </div>
                        ))}
                    </div>
                )}
            </Grid>
        </Grid>
     );
}
 
export default ViewPrescriptions;