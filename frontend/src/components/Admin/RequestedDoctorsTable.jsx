import * as React from "react";
import axios from "axios";

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

export default function RequestedDoctors({ maxRows, seeMore }) {
	const [rows, setRows] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	const getData = async () => {
		try {
			setLoading(true);
			const response = await axios.get(
				"http://localhost:4000/admin/view-requested-doctors",
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			return response.data;
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

	const handleAccept = async (id) => {
		try {
			setLoading(true);
			const response = await axios.put(
				`http://localhost:4000/admin/doctor-approval/${id}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 200) {
				alert(response.data.message);
				fetchData();
			}
		} catch (error) {
			alert(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleDecline = async (id) => {
		try {
			setLoading(true);
			const response = await axios.put(
				`http://localhost:4000/admin/doctor-rejection/${id}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (response.status === 200) {
				alert(response.data.message);
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
				<React.Fragment>
					<Title>Requested Doctors</Title>
					<Table size='small'>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Speciality</TableCell>
								<TableCell>Affiliation</TableCell>
								<TableCell>Educational Background</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.slice(0, maxRows).map((row) => (
								<TableRow key={row._id}>
									<TableCell>{row.firstName + " " + row.lastName}</TableCell>
									<TableCell>{row.email}</TableCell>
									<TableCell>{row.speciality}</TableCell>
									<TableCell>{row.affiliation}</TableCell>
									<TableCell>{row.educationalBackground}</TableCell>
									<TableCell align='right'>
										<Stack spacing={2} direction='row'>
											<Button
												variant='contained'
												onClick={() => handleAccept(row._id)}
												color='success'
											>
												Accept
											</Button>
											<Button onClick={() => handleDecline(row._id)}>
												Decline
											</Button>
										</Stack>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>

					{seeMore ? (
						<Link
							color='primary'
							href='/admin/requested-doctors'
							sx={{ mt: 3 }}
						>
							See More
						</Link>
					) : (
						<></>
					)}
				</React.Fragment>
			)}
		</>
	);
}

RequestedDoctors.defaultProps = {
	maxRows: 5,
	seeMore: true,
};
