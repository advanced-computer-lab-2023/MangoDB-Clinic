// import { Button } from '@material-ui/core';
// import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();

    return ( 
        <div className="home">
            <h2>Home</h2>
            <p>Welcome to the Home Page</p>
            <button onClick={() => history.push('/')}>Home</button>
            <button onClick={() => history.push('/patientform')}>Patient Registration</button>
            <button onClick={() => history.push('/patientdashboard')}>Patient Dashboard</button>
            <button onClick={() => history.push('/viewAppointmentsDR')}>dr</button>
            {/* <Button component={Link} to="/patientform" variant="contained" color="primary">Patient Registration</Button>
            <Button component={Link} to="/doctorsTable" variant="contained" color="primary">Doctors Table</Button>
            <Button component={Link} to="/patientdashboard" variant="contained" color="primary">Patient Dashboard</Button> */}
        </div>
     );
}
 
export default Home;