// import { Button } from '@material-ui/core';
// import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return ( 
        <div className="home">
            <h2>Home</h2>
            <p>Welcome to the Home Page</p>
            <button onClick={() => navigate('/')}>Home</button>
            <button onClick={() => navigate('/patientform')}>Patient Registration</button>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/doctorform')}>Doctor Registration</button>
            <button onClick={() => navigate('/doctordashboard')}>Doctor Dashboard</button>

            {/* <Button component={Link} to="/patientform" variant="contained" color="primary">Patient Registration</Button>
            <Button component={Link} to="/doctorsTable" variant="contained" color="primary">Doctors Table</Button>
            <Button component={Link} to="/patientdashboard" variant="contained" color="primary">Patient Dashboard</Button> */}
        </div>
     );
}
 
export default Home;