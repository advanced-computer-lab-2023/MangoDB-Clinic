import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import Title from "./Title";
import Spinner from "../GeneralComponents/Spinner";

export default function RemovePatient() {
	const navigate = useNavigate();
	const [rows, setRows] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	const getData = async () => {
		try {
			setLoading(true);
			const response = await axios.get(
				"http://localhost:4000/admin/get-patients",
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				}
			);
			if (response.status === 200) {
				return response.data;
			}
		} catch (error) {
			alert(error.message);
			return [];
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		try {
			const data = await getData();
			setRows(data);
		} catch (error) {
			alert(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleRemove = async (id) => {
		try {
			const confirm = window.confirm(
				"Are you sure you want to remove this patient?"
			);
			if (!confirm) return;
			setLoading(true);
			const response = await axios.delete(
				`http://localhost:4000/admin/remove-patient/${id}`,
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				}
			);
			if (response.status === 200) {
				alert("Patient removed successfully");
				fetchData();
			}
		} catch (error) {
			alert(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<>
					<br />
					<Button
						variant='outlined'
						style={{ marginLeft: "10px" }}
						onClick={() => navigate(-1)}
					>
						Back
					</Button>
					<br />
					<br />
					<Title>Remove Patients</Title>
					<Table size='small'>
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Username</TableCell>
								<TableCell>Phone</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow key={row._id}>
									<TableCell>{row._id}</TableCell>
									<TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
									<TableCell>{row.username}</TableCell>
									<TableCell>{row.mobile}</TableCell>
									<TableCell>{row.email}</TableCell>
									<TableCell align='center'>
										<Stack direction='row' spacing={2}>
											<Button
												variant='contained'
												color='error'
												onClick={() => handleRemove(row._id)}
											>
												Remove
											</Button>
										</Stack>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>

					<br />
					<Button
						variant='contained'
						style={{ margin: "10px" }}
						onClick={() => navigate("/admin")}
					>
						Home
					</Button>
				</>
			)}
		</>
	);
}
