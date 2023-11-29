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

export default function RemoveDoctor() {
	const navigate = useNavigate();
	const [rows, setRows] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	const getData = async () => {
		try {
			setLoading(true);
			const response = await axios.get(
				"http://localhost:4000/admin/get-doctors",
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
				"Are you sure you want to remove this doctor?"
			);

			if (confirm) {
				setLoading(true);
				const response = await axios.delete(
					`http://localhost:4000/admin/remove-doctor/${id}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);
				if (response.status === 200) {
					alert("Doctor removed successfully!");
					fetchData();
				}
			} else {
				return;
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
					<Title>Remove Doctor</Title>
					<Table size='small'>
						<TableHead>
							<TableRow>
								<TableCell>Doctor ID</TableCell>
								<TableCell>Doctor Username</TableCell>
								<TableCell>Doctor Name</TableCell>
								<TableCell>Doctor Email</TableCell>
								<TableCell>Doctor Affiliation</TableCell>
								<TableCell>Doctor Speciality</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow key={row._id}>
									<TableCell>{row._id}</TableCell>
									<TableCell>{row.username}</TableCell>
									<TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
									<TableCell>{row.email}</TableCell>
									<TableCell>{row.affiliation}</TableCell>
									<TableCell>{row.speciality}</TableCell>
									<TableCell>
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
