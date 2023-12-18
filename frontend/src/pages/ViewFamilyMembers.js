import React, { useState, useEffect, useCallback } from "react";

import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Grid,
	Typography,
} from "@mui/material";
import { alpha } from "@mui/system";

import BackButton from "../components/GeneralComponents/BackButton";
import { viewRegFamMembers } from "../services/api";
import PatientHeader from "../components/GeneralComponents/patientHeader";

const ViewFamilyMembers = () => {
	const [familyMembers, setFamilyMembers] = useState([]); // Initialize as an empty array

	//const actualPatientId = "6526d30a0f83f5e462288354"; // Extract 'patientId' from useParams or use the default value
	// const getID = async () => {
	// 	try {
	// 		const response = await axios.post(
	// 			"http://localhost:4000/Patient/myInfo",
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
	// const id = await getID();
	const fetchData = useCallback(async () => {
		try {
			const response = await viewRegFamMembers(); // Make sure to use 'await' here
			console.log("hena");
			setFamilyMembers(response.data); // Check the response structure to set the data accordingly
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}, []);

	useEffect(() => {
		fetchData(); // No need to check patientId here since it's in the dependency array
	}, [fetchData]);

	return (
		<>
			<PatientHeader />
			<Grid container justifyContent='center' style={{ padding: "2rem" }}>
				<Paper>
					<Grid item xs={12} style={{ padding: "5px" }}>
						<Typography variant='h5' sx={{ ml: "220px", mt: "10px" }}>
							Your Family Members
						</Typography>
						<br></br>
					</Grid>
					{familyMembers.length > 0 ? (
						<>
							<Paper sx={{ ml: "10px", mr: "10px" }}>
								<TableContainer sx={{ width: "100%" }}>
									<Table sx={{ minWidth: 650 }} aria-label='simple table'>
										<TableHead sx={{ backgroundColor: alpha("#B2F0E8", 0.3) }}>
											<TableRow>
												<TableCell>
													<Typography variant='subtitle1' fontWeight='bold'>
														Name
													</Typography>
												</TableCell>
												<TableCell>
													<Typography variant='subtitle1' fontWeight='bold'>
														National ID
													</Typography>
												</TableCell>
												<TableCell>
													<Typography variant='subtitle1' fontWeight='bold'>
														Relation
													</Typography>
												</TableCell>
												<TableCell>
													<Typography variant='subtitle1' fontWeight='bold'>
														Age
													</Typography>
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{familyMembers.map((member, index) => (
												<TableRow key={index}>
													<TableCell>{member.name}</TableCell>
													<TableCell>{member.nationalID}</TableCell>
													<TableCell>{member.relation}</TableCell>
													<TableCell>{member.age}</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</Paper>
						</>
					) : (
						<Typography variant="p">No family members found.</Typography>
					)}
					<Grid sx={{ mb: "10px", ml: "10px" }}>
						<BackButton />
					</Grid>
				</Paper>
			</Grid>
		</>
	);
};

export default ViewFamilyMembers;
