const { Link } = require("react-router-dom");

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>Virtual Clinic</h1>
            <div className="links">
                {/* <Link to="/">Home</Link> */}
                <Link to="/patientForm" >Register</Link>
                <Link to="/doctorsTable" >Doctors</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;