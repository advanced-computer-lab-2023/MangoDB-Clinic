import { useState, useEffect } from "react";
import ReusableTable2 from "./ReusableTable2";

const DoctorsTable = ({ url }) => {
	// const { data: doctors, error, isPending } = useFetch(url);

	const [doctors, setDoctors] = useState([]);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
		  try {
			  setDoctors([]);
			  setIsPending(true);
			  setError(null);

			const token = localStorage.getItem("token");

			const response = await fetch(url,
			{
				method: "GET",
				headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
				},
			}
			);

			if (!response.ok) {
				throw new Error("Could not fetch the data for that resource");
			}

			const data = await response.json();
			setDoctors(data);
			setIsPending(false);
			setError(null);
			  
		  } catch (err) {
		  setIsPending(false);
		  setError(err.message);
		  }
	  };
  
	  fetchData();
	  }, [url]);

	const columns = [
		{ id: "doctorName", label: "Doctor Name" },
		{ id: "speciality", label: "Speciality", align: "right" },
		{ id: "sessionPrice", label: "Session Price", align: "right" },
	];

	const modifiedDoctors =
		doctors &&
		doctors.map((doctor) => ({
			...doctor,
			doctorName: `${doctor.firstName} ${doctor.lastName}`,
		}));

	return (
		<div className='doctors-table'>
			{isPending && <div>Loading...</div>}
			{error && <div>{error}</div>}
			{doctors && (
				<ReusableTable2
					data={modifiedDoctors}
					columns={columns}
					linkPath='/doctor-details'
				/>
			)}
		</div>
	);
};

export default DoctorsTable;
