import useFetch from "../useFetch";
import ReusableTable2 from "./ReusableTable2";

const DoctorsTable = ({ url }) => {
	const { data: doctors, error, isPending } = useFetch(url);

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
