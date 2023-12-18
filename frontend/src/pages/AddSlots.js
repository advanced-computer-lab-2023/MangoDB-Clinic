import React, { useState } from "react";
import axios from "axios";

import { Button, TextField, Typography, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";

import { addSlots } from "../services/api";
import DoctorHeader from "../components/GeneralComponents/doctorHeader";

const AddSlotsPage = () => {
	//const id = "6526d4fc602e6bd55799cda8";
	const [weekday, setWeekday] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");

	// const getID = async () => {
	// 	try {
	// 		const response = await axios.post(
	// 			"http://localhost:4000/doctor/myInfo",
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${localStorage.getItem("token")}`,
	// 				},
	// 			}
	// 		);

	// 		if (response.status === 200) {
	// 			return response.data._id;
	// 		}
	// 	} catch (error) {}
	// };

	const handleChange = (field, value) => {
		switch (field) {
			case "weekday":
				setWeekday(value);
				break;
			case "startTime":
				setStartTime(value);
				break;
			case "endTime":
				setEndTime(value);
				break;
			default:
				break;
		}
	};

	const handleAddSlot = async () => {
		try {
			await addSlots(weekday, startTime, endTime); // Sending the whole 'newSlot' object to the 'addSlots' function

			// Clear fields after successful slot addition
			setWeekday("");
			setStartTime("");
			setEndTime("");
		} catch (error) {
			console.error("Error adding time slot:", error);
		}
	};

	return (
		<div>
			<DoctorHeader />
			<Paper
				elevation={3}
				style={{ padding: "20px 20px", margin: "20px 20px" }}
			>
				<Grid item xs={12} style={{ padding: "5px" }}>
					<Typography variant='h5'>Add Slots</Typography>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							label='Weekday'
							value={weekday}
							onChange={(e) => handleChange("weekday", e.target.value)}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label='Start Time'
							type='datetime' // Adjust the type based on the input you expect
							value={startTime}
							onChange={(e) => handleChange("startTime", e.target.value)}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label='End Time'
							type='datetime' // Adjust the type based on the input you expect
							value={endTime}
							onChange={(e) => handleChange("endTime", e.target.value)}
						/>
					</Grid>
				</Grid>
				<Button variant='contained' onClick={handleAddSlot}>
					Add Slot
				</Button>
			</Paper>
		</div>
	);
};

export default AddSlotsPage;
