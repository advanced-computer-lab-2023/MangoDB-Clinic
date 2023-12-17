import React, { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Filter = ({ onFilterChange }) => {
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [speciality, setSpeciality] = useState("");
	const [uniqueSpecialities, setUniqueSpecialities] = useState([]);

	const port = 4000;

	useEffect(() => {
		const fetchSpecialities = async () => {
			try {
				const response = await fetch(
					`http://localhost:${port}/patient/get_specialities`
				);
				const data = await response.json();

				setUniqueSpecialities(data);
			} catch (error) {
				console.error("Error fetching specialities:", error);
			}
		};

		fetchSpecialities();
	}, []);

	const handleFilter = () => {
		const filterParams = {};
		if (speciality && speciality !== "All Specialities")
			filterParams.speciality = speciality;
		if (date) filterParams.date = date;
		if (time) filterParams.time = time;

		onFilterChange(filterParams);
	};

	useEffect(() => {
		handleFilter();
	}, [speciality, date, time]);

	return (
		<div style={{ display: "inline" }}>
			<Select
				variant='outlined'
				value={speciality}
				onChange={(e) => setSpeciality(e.target.value)}
				style={{ width: "200px" , marginRight: "5px"}}
				displayEmpty
			>
				<MenuItem value=''>All Specialities</MenuItem>
				{uniqueSpecialities &&
					uniqueSpecialities.map((item) => (
						<MenuItem key={item} value={item}>
							{item}
						</MenuItem>
					))}
			</Select>
			<TextField
				type='date'
				variant='outlined'
				value={date}
				onChange={(e) => setDate(e.target.value)}
				style={{marginRight: "5px"}}
			/>
			<TextField
				type='time'
				variant='outlined'
				value={time}
				onChange={(e) => setTime(e.target.value)}
			/>
		</div>
	);
};

export default Filter;
