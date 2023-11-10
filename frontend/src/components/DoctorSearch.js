import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DoctorsTable from './DoctorsTable';
import Filter from './Filter';

const DoctorSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [filterParams, setFilterParams] = useState({});
  const [url, setUrl] = useState('');

  const handleSearch = () => {
    let searchUrl = `http://localhost:5000/patient/search_doctor/65394ff997fe2d0027faca14?`;
    if (searchTerm && !speciality) searchUrl += `name=${searchTerm}`;
    else if (speciality && !searchTerm) searchUrl += `speciality=${speciality}`;
    else if (searchTerm && speciality) searchUrl += `name=${searchTerm}&speciality=${speciality}`;

    setUrl(searchUrl);
  };

  const handleFilter = () => {
    const filterQueryString = new URLSearchParams(filterParams).toString();
    const filterUrl = `http://localhost:5000/patient/filter_doctors/65394ff997fe2d0027faca14?${filterQueryString}`;
    setUrl(filterUrl);
  };

  return (
    <div>
      <TextField
        label="Doctor Name"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TextField
        label="Speciality"
        variant="outlined"
        value={speciality}
        onChange={(e) => setSpeciality(e.target.value)}
      />
      <Filter onFilterChange={setFilterParams} />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      <Button variant="contained" onClick={handleFilter}>
        Apply Filters
      </Button>
      {url && <DoctorsTable url={url} />}
    </div>
  );
};

export default DoctorSearch;



