import DoctorsTable from "../components/DoctorsTable";

const ViewDoctors = () => {
    return ( 
        <div className="doctors">
        <h1>View Doctors</h1>
        {<DoctorsTable />}
        </div>
     );
}
 
export default ViewDoctors;