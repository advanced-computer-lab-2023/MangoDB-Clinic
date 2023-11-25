import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import { Paper, Button, Grid } from "@mui/material";

import { getEmploymentContract } from "../services/api";

const ViewEmploymentContract = () => {
	const [numPages, setNumPages] = useState(null);
	const [pdf, setPdf] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	//const { id } = useParams(); // Import and retrieve the 'id' from 'react-router-dom'

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
	useEffect(() => {
		const fetchContract = async () => {
			try {
				// Fetch the employment contract PDF from the server
				const contract = await getEmploymentContract(); // Call the API function

				// Assuming the response returns the PDF file or link
				//const contract = await response.blob();
				const pdfUrl = URL.createObjectURL(contract);

				setPdf(pdfUrl);
			} catch (error) {
				console.error("Error fetching employment contract:", error);
			}
		};

		fetchContract();
	}, []);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}
	const acceptContract = () => {
		// Functionality for handling contract acceptance
		// This function will be triggered by the 'Accept' button
	};
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Paper elevation={3} style={{ padding: 20 }}>
					{pdf && (
						<Document file={pdf}>
							<Page pageNumber={pageNumber} />
						</Document>
					)}
				</Paper>
			</Grid>
			{pdf && (
				<Grid item xs={12}>
					<Button variant='contained' onClick={acceptContract}>
						Accept
					</Button>
				</Grid>
			)}
		</Grid>
	);
};

export default ViewEmploymentContract;
