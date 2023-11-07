import './App.css';
import Navbar from './components/NavBar';
// import Home from './components/Home';
import DoctorsTable from './components/DoctorsTable';
import { BrowserRouter as Router, Switch, Route,  } from 'react-router-dom';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className='content'>
          <Switch>
            {/* <Route exact path='/'> 
              <Home />
            </Route> */}
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
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
