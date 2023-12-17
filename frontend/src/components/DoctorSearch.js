import React, { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import DoctorsTable from "./DoctorsTable";
import Filter from "./Filter";
import PatientHeader from "./GeneralComponents/patientHeader";

const DoctorSearch = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [speciality, setSpeciality] = useState("");
	const [filterParams, setFilterParams] = useState({});
	const [url, setUrl] = useState("");

	const port = 4000;

	useEffect(() => {
		const url = `http://localhost:${port}/patient/get_all_doctors`;
		setUrl(url);
	}, []);

	const handleSearch = () => {
		let searchUrl = `http://localhost:${port}/patient/search_doctor?`;
		if (searchTerm && !speciality) searchUrl += `name=${searchTerm}`;
		else if (speciality && !searchTerm) searchUrl += `speciality=${speciality}`;
		else if (searchTerm && speciality)
			searchUrl += `name=${searchTerm}&speciality=${speciality}`;
		setUrl(searchUrl);
	};

	const handleFilter = () => {
		let filterUrl = `http://localhost:${port}/patient/filter_doctors?`;
		console.log(filterParams.time);
		if (filterParams.speciality)
			filterUrl += `speciality=${filterParams.speciality}`;
		if (filterParams.date) {
			if (filterParams.time)
				filterUrl += `datetime=${filterParams.date}T${filterParams.time}:00`;
			else filterUrl += `datetime=${filterParams.date}T00:00:00`;
		}
		const filterQueryString = new URLSearchParams(filterParams).toString();
		console.log(filterUrl);
		setUrl(filterUrl);
	};

	return (
		<div>
			<PatientHeader />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					marginTop: "100px",
				}}
			>
				<div style={{ display: "inline" }}>
					<TextField
						label='Doctor Name'
						variant='outlined'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						style={{ marginBottom: "20px", marginRight: "10px"}}
					/>
					<TextField
						label='Speciality'
						variant='outlined'
						value={speciality}
						onChange={(e) => setSpeciality(e.target.value)}
						style={{ marginBottom: "20px"}}
					/>
					<Button
						variant='contained'
						onClick={handleSearch}
						style={{ marginTop: "10px", marginLeft: "10px" }}
					>
						Search
					</Button>
				</div>
				<div style={{ display: "inline", marginBottom: "10px" }}>
					<Filter
						onFilterChange={setFilterParams}
						style={{ marginTop: "10px"}}
					/>
					<Button
						variant='contained'
						onClick={handleFilter}
						style={{ marginLeft: "10px", }}
					>
						Apply Filters
					</Button>
				</div>
				{url && <DoctorsTable url={url} />}
			</div>
		</div>
	);
};

export default DoctorSearch;
