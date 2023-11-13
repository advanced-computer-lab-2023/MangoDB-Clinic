import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSelectedDoctor, checkout } from '../services/api';
// import FileViewer from 'react-file-viewer';

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState('');
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [nationalID, setNationalId] = useState('');

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

  const getFileType = (fileName) => fileName.split('.').pop().toLowerCase();

  const handleNationalIdChange = (event) => {
    setNationalId(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchAvailableSlots(id, date);
  };

  const fetchAvailableSlots = async (doctorId, selectedDate) => {
    try {
      const response = await fetch(`http://localhost:4000/patient/get_available_slots/${id}?date=${selectedDate}`);
      const data = await response.json();
      const formattedSlots = data.map((slot) => ({
        key: new Date(`${selectedDate}T${slot}:00:00`),
        slot,
      }));
      setAvailableSlots(formattedSlots);
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const bookAppointment = async (key, nationalID) => {
    try {
      const app= await bookAppointmentApi(key, nationalID);
      fetchAvailableSlots(id, selectedDate);
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
    checkout(app._id);
  };

  const bookAppointmentApi = async (key, nationalID) => {
    try {
      console.log(nationalID, key, id)
      const response = await fetch(`http://localhost:4000/patient/make_appointment?nationalID=${nationalID}&date=${key}&docid=${id}&patientid=6539500c97fe2d0027faca1d`, {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(response)
    } catch (error) {
      console.error('Error booking an appointment', error);
    }

    console.log('Booking appointment for key:', key);
  };

  return (
    <div>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {doctor && (
        <div>
          <h2>First Name: {doctor.firstName}</h2>
            <h2>Last Name: {doctor.lastName} </h2>
            <p>Email: {doctor.email}</p>
            <p>Speciality: {doctor.speciality}</p>
            <p>Educational Background: {doctor.educationalBackground}</p>
            <p>Affiliation: {doctor.affiliation}</p>
            <h3>Documents:</h3>
            {/* {doctor.documents.map((document, index) => (
            <div key={index}>
              <p>File: {document.name}</p>
              {getFileType(document.name) === 'pdf' ? (
                <FileViewer fileType={document.name.split('.').pop()} filePath={document.file} />
              ) : getFileType(document.name) === 'png' || getFileType(document.name) === 'jpeg' || getFileType(document.name) === 'jpg' ? (
                <img src={document.file} alt={`Image ${index}`} />
              ) : (
                <p>Unsupported file type</p>
              )}
            </div>
))} */}

          <input type="date" onChange={(e) => handleDateChange(e.target.value)} />

          <div>
            <label>National ID:</label>
            <input type="text" value={nationalID} onChange={handleNationalIdChange} />
          </div>

          {selectedDate && (
            <div>
              <h3>Available Slots for {selectedDate}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Start Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {availableSlots.map(({ key, slot }, index) => (
                    <tr key={index}>
                      <td>{key.toLocaleTimeString()}</td>
                      <td>
                        <button onClick={() => bookAppointment(key, nationalID)}> Book Appointment</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorDetails;
