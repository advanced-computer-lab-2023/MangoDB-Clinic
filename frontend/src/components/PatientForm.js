import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const PatientForm = () => {
    const[username, setUserName] = useState('karimgabr100');
    const[name, setName] = useState('Karim Gabr');
    const[email, setEmail] = useState('karimgabr26@gmail.com');
    const[password, setPassword] = useState('ahmedmohsen');
    const[dob, setDOB] = useState('27/05/2002');
    const[gender, setGender] = useState('');
    const[mobile, setMobile] = useState('0102334455');
    const [emergencyContact, setEmergencyContact] = useState({ fullName: 'ahmed', mobileNumber: '1232132123' });
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const patient = {username, name, email, password, dob, gender, mobile, emergencyContact};

        setIsPending(true);

        fetch('http://localhost:4000/patientRegistration', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(patient)
        }).then(() => {
            setIsPending(false);
            // history.go(-1);
            history.push('/');
        })
    }
    return ( 
        <div className="patientForm">
            <h2>Register As Patient</h2>
            <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <label>Full Name: </label>
                <textarea
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></textarea>
                <label> Email: </label>
                <textarea
                    type='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></textarea>
                <label> Password: </label>
                <textarea
                    type='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></textarea>
                <label>Date Of Birth: </label>
                <textarea
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                ></textarea>
                <label>Gender: </label>
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="Male">Male</option>
                    <option value="yoshi">Female</option>
                </select>
                <label>Mobile Number: </label>
                <textarea
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                ></textarea>
                <label>Emergency Contact Full Name:</label>
                    <input 
                        type="text" 
                        required
                        value={emergencyContact.fullName}
                        onChange={(e) => setEmergencyContact({ ...emergencyContact, fullName: e.target.value })}
                    />

                    <label>Emergency Contact Mobile Number:</label>
                    <input 
                        type="tel" 
                        required
                        value={emergencyContact.mobileNumber}
                        onChange={(e) => setEmergencyContact({ ...emergencyContact, mobileNumber: e.target.value })}
                    />
                {!isPending && <button>Register</button>}
                {isPending && <button disabled>Registering</button>}
            
            </form>
        </div>
     );
}
 
export default PatientForm;