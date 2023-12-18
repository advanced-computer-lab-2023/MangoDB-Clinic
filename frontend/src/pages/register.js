import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Button,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Grid,
	Paper,
	Typography,
	Tabs,
	Tab,
	Box,
} from "@mui/material";
import PatientReg from "../components/Patient/PatientForm";
import DoctorReg from "../components/Doctor/DoctorForm";

const Register = () => {
	const navigate = useNavigate();
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Grid
			container
			justifyContent='center'
			alignItems='center'
			style={{ height: "100vh", padding: "2rem" }}
		>
			<Grid item xs={12} md={8} lg={6}>
				<Paper
					elevation={3}
					style={{ width: "1200px", minHeight: "700px", marginLeft: -250 }}
				>
					{" "}
					{}
					<Tabs
						value={value}
						onChange={handleChange}
						centered
						variant='fullWidth' // Ensure tabs take full width
					>
						<Tab label='Patient Registration' />
						<Tab label='Doctor Registration' />
					</Tabs>
					<TabPanel value={value} index={0}>
						<PatientReg />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<DoctorReg />
					</TabPanel>
				</Paper>
			</Grid>
		</Grid>
	);
};

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3} style={{ width: "100%" }}>
					{children}
				</Box>
			)}
		</div>
	);
};

export default Register;
