import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPatientsDoctor } from "../services/api";

const PatientList = () => {
    const { id } = useParams();
    const [ patients, setPatients ] = useState([]);
    const [ isPending, setIsPending ] = useState(true);
    const [ error, setError ] = useState(null);

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

    return (
        <div className='patient-list'>
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { !isPending && !error && patients.length < 1 && <div>No patients to display...</div> }
            { patients.length > 0 && (
                patients.map((patient) => (
                    <div className='patient-preview' key={ patient._id }>
                        <Link to={ `/selectedPatient/${ patient._id }` }>
                            <h2>{ patient.firstName + " " + patient.lastName }</h2>
                            <p>{ patient.email }</p>
                        </Link>
                    </div>
                ))
            ) }   
        </div>
    );
}

export default PatientList;