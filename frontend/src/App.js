import './App.css';
// import Navbar from './components/NavBar';
import Home from './pages/Home';
import PatientDashboard from './pages/PatientDashboard';
import DoctorsTable from './components/DoctorsTable';
import { BrowserRouter as Router, Switch, Route,  } from 'react-router-dom';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import ViewAppointments from './pages/ViewAppointments'; 
import ViewDoctors from './pages/ViewDoctors';
import ViewPrescriptions from './pages/ViewPrescriptions';
import ViewProfile from './pages/ViewProfile';
import ViewWallet from './pages/ViewWallet';
import EditDoctor from './components/EditDoctor';
import PrescriptionDetials from './pages/PrescriptionDetails';


function App() {
  return (
    <Router>
      <div className="App"> 
        <div className='content'>
          <Switch>
            <Route exact path='/'> 
              <Home />
            </Route>
            <Route path='/patientdashboard'>
              <PatientDashboard />
            </Route>
            <Route path='/patientform'>
              <PatientForm />
            </Route>
            <Route path='/doctorsTable'>
              <DoctorsTable />
            </Route>
            <Route path='/viewAllPatients/:id'>
              <PatientList />
            </Route>
            <Route path='/selectedPatient/:id'>
              <PatientDetails />
            </Route>
            <Route path='/viewappointments'>
              <ViewAppointments />
            </Route>
            <Route path='/viewdoctors'>
              <ViewDoctors />
            </Route>
            <Route path='/viewprescriptions'>
              <ViewPrescriptions />
            </Route>
            <Route path='/prescriptiondetials/:prescriptionId'>
              <PrescriptionDetials />
            </Route>
            <Route path='/viewprofile'>
              <ViewProfile />
            </Route>
            <Route path='/viewwallet'>
              <ViewWallet />
            </Route>
            <Route path='/editDoctor/:id'>
              <EditDoctor />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
