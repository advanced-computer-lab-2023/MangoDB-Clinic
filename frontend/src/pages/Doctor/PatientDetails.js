import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { selectPatient } from '../../services/api';

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
                    <h2>Patient Name: { patient.firstName + " " + patient.lastName } </h2>
                    <h3>Email: { patient.email }</h3>
                    <p>Emergency Contact: { patient.emergencyContact.name } - Number: { patient.emergencyContact.mobile }</p>
                    <p>Health Records: { patient.healthRecord.files.length == 0 ? "No records to display" : "Working on it..." } </p>
                </div>
            ) }
        </div>
    );
}

export default PatientDetails