import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSelectedDoctor } from '../services/api';
import FileViewer from 'react-file-viewer';

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState('');
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

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
          {doctor.documents.map((document, index) => (
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
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorDetails;