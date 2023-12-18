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
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { getHealthRecords } from "../services/api";
import BackButton from "../components/GeneralComponents/BackButton";
import PatientHeader from "../components/GeneralComponents/patientHeader";

const ViewHealthRecordsPat = () => {
	const [healthRecords, setHealthRecords] = useState([]);
	const [openFile, setOpenFile] = useState({ open: false, fileContent: "" });

	const fetchData = useCallback(async () => {
		try {
			const response = await getHealthRecords();
			setHealthRecords(response.data.files);
		} catch (error) {
			console.error("Error fetching health records:", error);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleOpenFile = (content) => {
		setOpenFile({ open: true, fileContent: content });
	};

	const handleCloseFile = () => {
		setOpenFile({ open: false, fileContent: "" });
	};

	return (
		<>
			<PatientHeader />
			<Grid container justifyContent='center' style={{ padding: "2rem" }}>
				<Paper sx={{ width: "62%", pb: "30px", pl: "30px", pt: "15px" }}>
					<Typography variant='h3'>My Health Records</Typography>

					<Grid container justifyContent='flex-end' paddingRight={10}>
						<Button variant='contained' onClick={fetchData}>
							Refresh
						</Button>
					</Grid>
					<BackButton />

					{healthRecords.length > 0 ? (
						<Grid container spacing={5} paddingLeft={20}>
							{healthRecords.map((file, fileIndex) => (
								<Grid item key={fileIndex} xs={12} sm={6} md={4}>
									<Button
										variant='contained'
										style={{
											width: 220,
											height: 240,
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
										onClick={() => handleOpenFile(file.file)}
									>
										{/* Display image preview */}
										<img
											src={`${file.file}`} // Update this based on the actual image URL property
											alt='Preview'
											style={{ width: 150, height: 150, borderRadius: "15%" }}
										/>
										{/* Display name and type */}
										<div style={{ marginTop: 8 }}>
											{file.name} ({file.type})
										</div>
									</Button>
								</Grid>
							))}
						</Grid>
					) : (
						<p>No health records found.</p>
					)}

					<Dialog open={openFile.open} onClose={handleCloseFile}>
						<DialogTitle>Health Record File</DialogTitle>
						<DialogContent>
							<p>
								<a
									href={openFile.fileContent}
									target='_blank'
									rel='noopener noreferrer'
								>
									{openFile.fileContent}
								</a>
							</p>
						</DialogContent>
					</Dialog>
				</Paper>
			</Grid>
		</>
	);
};

export default ViewHealthRecordsPat;
