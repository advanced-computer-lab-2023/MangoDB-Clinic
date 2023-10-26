import './App.css';
import Navbar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route,  } from 'react-router-dom';
import PatientForm from './components/PatientForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className='content'>
          <Switch>
            <Route path='/patientform'>
              <PatientForm />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
