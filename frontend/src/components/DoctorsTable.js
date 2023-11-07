import useFetch from '../useFetch';
import { useHistory } from 'react-router-dom';
import ReusableTable from './ReusableTable';


const DoctorsTable = () => {

    const { data: doctors, error, isPending} = useFetch('http://localhost:4000/patient/get_all_doctors');
    // const history = useHistory();

    const columns = [
        { id: 'doctorName', label: 'Doctor Name' },
        { id: 'speciality', label: 'Speciality', align: 'right' },
        { id: 'sessionPrice', label: 'Session Price', align: 'right' },
    ];

    const modifiedDoctors = doctors.map((doctor) => ({
        ...doctor,
        doctorName: `${doctor.firstName} ${doctor.lastName}`,
    }));

    // const handleRowClick = (id) => {
    //     history.push(`/doctors/${id}`); // Adjust the link path as per your routing setup
    //   };
    
    return ( 
        <div className="doctors-table">
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { doctors && (
                // <ReusableTable data={modifiedDoctors} columns={columns} linkPath="/doctors" onRowClick={handleRowClick}/>
                <ReusableTable data={modifiedDoctors} columns={columns} />
            )}
            
        </div>
     );
}
 
export default DoctorsTable;