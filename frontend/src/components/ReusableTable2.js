import React, { useState } from "react";
import { Link } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import Spinner from "./GeneralComponents/Spinner";

import axios from "axios";

const ReusableTable2 = ({ data, columns, linkPath }) => {
	const [loading, setLoading] = useState(false); // Add loading state

	const handleCreateVideoChat = async (doctorId) => {
		try {
			setLoading(true); // Set loading to true when starting the request

			const response = await axios.post(
				`http://localhost:4000/patient/createVideoChat/${doctorId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 200) {
				window.open(response.data.url, "_blank");
			}
		} catch (error) {
			console.error("Error creating video chat:", error);
		} finally {
			setLoading(false); // Set loading to false after the request is complete
		}
	};

	return (
		<>
			{loading && <Spinner />}
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell key={column.id}>{column.label}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row) => (
							<React.Fragment key={row._id}>
								<TableRow
									className='trow'
									key={row._id}
									component={Link}
									to={`${linkPath}/${row._id}`}
								>
									{columns.map((column) => (
										<TableCell key={column.id}>
											{column.format
												? column.format(row[column.id])
												: row[column.id]}
										</TableCell>
									))}
								</TableRow>
								<TableCell>
									<Button
										variant='contained'
										size='small'
										onClick={() => handleCreateVideoChat(row._id)}
									>
										Create Video Chat
									</Button>
								</TableCell>
							</React.Fragment>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default ReusableTable2;
