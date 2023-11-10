import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getSelectedDoctor } from '../services/api';


const DoctorDetails = () => {
    const { id } = useParams();
    const [ doctor, setDoctor ] = useState('');
    const [ isPending, setIsPending ] = useState(true);
    const [ error, setError ] = useState(null);

    console.log(id)

    useEffect(() => {
        getSelectedDoctor(id)
        .then((res) => {
            setDoctor(res.data);
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
            { doctor && (
                <div>
                    <h2>First Name: { doctor.firstName }</h2>
                    <h2>Last Name: { doctor.lastName } </h2>
                    <p>Email: { doctor.email }</p>
                    <p>Speciality: { doctor.speciality }</p>
                    <p>Educational Background: { doctor.educationalBackground }</p>
                    <p>Afiilitation: { doctor.affiliation }</p>
                </div>
            ) }
        </div>
    );
}

export default DoctorDetails