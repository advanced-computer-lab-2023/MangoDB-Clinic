import './App.css';
// import Navbar from './components/NavBar';
import Home from './pages/Home';
import PatientDashboard from './pages/PatientDashboard';
import DoctorsTable from './components/DoctorsTable';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import PatientForm from './components/PatientForm';
import PatientList from './pages/Doctor/PatientList';
import PatientDetails from './pages/Doctor/PatientDetails';
import ViewAppointments from './pages/ViewAppointments'; 
import ViewDoctors from './pages/ViewDoctors';
import ViewPrescriptions from './pages/ViewPrescriptions';
import ViewProfile from './pages/ViewProfile';
import ViewWallet from './pages/ViewWallet';
import EditDoctor from './pages/Doctor/EditDoctor';
import DoctorForm from './components/DoctorForm';
import DoctorDetails from './components/DoctorDetails';
import DoctorSearch from './components/DoctorSearch';
import Filter from './components/Filter';
import PrescriptionDetials from './pages/PrescriptionDetails';
import DoctorApps from './pages/Doctor/DoctorApps';
import Checkout from './pages/Checkout';
import ViewFamilyMembers from './pages/ViewFamilyMembers';
import LinkFamMember from './pages/LinkFamMember';
import AddSlotsPage from './pages/AddSlots';
import ViewHealthRecordsPat from './pages/ViewHealthRecordsPat';
import ViewPackages from './pages/ViewPackages';
import AddHealthRecordsPatient from './pages/AddHealthRecordsPatient';
import LinkPatientAsFam from './pages/LinkPatientAsFam';
import ViewEmploymentContract from './pages/ViewEmploymentContract';
// import LoginPage from './pages/LoginPage';
// import Login from './components/Login';
import DoctorDashboard from './pages/doctorDashboard';

function App() {
  return (
    <Router>
        <Routes>
            {/* =====================Routes for the HomePage========================== */}
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/patientform" element={<PatientForm />} />
            <Route path="/doctorform" element={<DoctorForm />} />
            <Route path="/doctorsTable" element={<DoctorsTable />} />

            {/* =====================Routes for the Patient========================== */}
            <Route path="/patientdashboard" element={<PatientDashboard />} />
            <Route path="/viewfammembers/:id" element={<ViewFamilyMembers />} />
            <Route path="/linkfammember/:id" element={<LinkFamMember />} />
            <Route path="/addhealthrecords/:id" element={<AddHealthRecordsPatient />} />
            <Route path="/viewprescriptions/:patientId" element={<ViewPrescriptions />} />
            <Route path="/prescriptiondetials/:prescriptionId" element={<PrescriptionDetials />} />
            <Route path="/search-doctors" element={<DoctorSearch />} />
            
            {/* =====================Routes for the Doctor========================== */}
            <Route path="/doctordashboard" element={<DoctorDashboard />} />
            <Route path="/viewAllPatients/:id" element={<PatientList />} />
            <Route path="/selectedPatient/:id" element={<PatientDetails />} />
            <Route path="/viewdoctors" element={<ViewDoctors />} />
            <Route path="/editDoctor/:id" element={<EditDoctor />} />
            
            
            
            {/* add the rest in the right place */}
          
            <Route path="/viewappointments/:id" element={<ViewAppointments />} />
            <Route path="/doctorAppointments/:id" element={<DoctorApps />} />
            
            <Route path="/viewprofile" element={<ViewProfile />} />
            
            
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/view_wallet/:id" element={<ViewWallet />} />
            <Route path="/doctor-details/:id" element={<DoctorDetails />} />
            
            <Route path="/filter" element={<Filter />} />
            <Route path="/viewpackages" element={<ViewPackages />} />
            <Route path="/viewhealthrecpat/:id" element={<ViewHealthRecordsPat />} />
            <Route path="/linkpatasfam/:id" element={<LinkPatientAsFam />} />
            <Route path="/addslots/:id" element={<AddSlotsPage />} />
            <Route path="/viewemploymentcontract/:id" element={<ViewEmploymentContract />} />
            <Route path="/addhealthrecords/:id" element={<AddHealthRecordsPatient />} />

          </Routes>
    </Router>
  );
}

export default App;
