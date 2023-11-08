import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { selectPatient } from '../services/api';

/**
 * TODO: 1-Get the patient using the id param (Done)
 *       2-View basic information (Done)
 *       3-View health records
 */

const PatientDetails = () => {
    const { id } = useParams();
    const [ patient, setPatient ] = useState('');
    const [ isPending, setIsPending ] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        selectPatient(id)
        .then((res) => {
            setPatient(res.data);
            setIsPending(false);
        })
        .catch((err) => {
            setError(err.message);
            setIsPending(false);
        });
    }, [id]);

    return (
        <div>
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { patient && (
                <div>
                    <h2>First Name: { patient.firstName }</h2>
                    <h2>Last Name: { patient.lastName } </h2>
                    <p>Email: { patient.email }</p>
                </div>
            ) }
        </div>
    );
}

export default PatientDetails