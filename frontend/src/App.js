import "./App.css";
import Home from "./pages/Home";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorsTable from "./components/DoctorsTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientForm from "./components/PatientForm";
import PatientList from "./pages/Doctor/PatientList";
import PatientDetails from "./pages/Doctor/PatientDetails";
import ViewAppointments from "./pages/ViewAppointments";
import ViewDoctors from "./pages/ViewDoctors";
import ViewPrescriptions from "./pages/ViewPrescriptions";
import ViewProfile from "./pages/ViewProfile";
import ViewWallet from "./pages/ViewWallet";
import EditDoctor from "./pages/Doctor/EditDoctor";
import DoctorForm from "./components/DoctorForm";
import DoctorDetails from "./components/DoctorDetails";
import DoctorSearch from "./components/DoctorSearch";
import Filter from "./components/Filter";
import PrescriptionDetials from "./pages/PrescriptionDetails";
import DoctorApps from "./pages/Doctor/DoctorApps";
import Checkout from "./pages/Checkout";
import ViewFamilyMembers from "./pages/ViewFamilyMembers";
import LinkFamMember from "./pages/LinkFamMember";
import AddSlotsPage from "./pages/AddSlots";
import ViewHealthRecordsPat from "./pages/ViewHealthRecordsPat";
import ViewPackages from "./pages/ViewPackages";
import AddHealthRecordsPatient from "./pages/AddHealthRecordsPatient";
import LinkPatientAsFam from "./pages/LinkPatientAsFam";
import ViewEmploymentContract from "./pages/ViewEmploymentContract";

import LoginPage from "./pages/LoginAdminPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordAdminPage from "./pages/ForgotPasswordAdminPage";
import ForgotPasswordUserPage from "./pages/ForgotPasswordUserPage";
import AddAdminPage from "./pages/AddAdminPage";
import RequestedDoctorsPage from "./pages/RequestedDoctorsPage";
import LoginUserPage from "./pages/LoginUserPage";
import UserManagementPage from "./pages/UserManagementPage";
import HealthPackagesPage from "./pages/HealthPackagesPage";
import AddPackagePage from "./pages/AddPackagePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import DoctorDashboard from "./pages/doctorDashboard";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

function App() {
	return (
		<Router>
			{/* <div className="App"> 
        <div className='content'>
          <Switch>
            <Route exact path='/'> 
              <Home />
            </Route>
            <Route path='/patientdashboard'>
              <PatientDashboard />
            </Route>
            <Route path='/doctordashboard'>
              <Dashboard />
            </Route>
            <Route path='/patientform'>
              <PatientForm />
            </Route>
            <Route path='/addhealthrecords/:id'>
              <AddHealthRecordsPatient />
            </Route>
            <Route path='/viewfammembers/:id'>
              <ViewFamilyMembers />
            </Route>
            <Route path='/linkfammember/:id'>
              <LinkFamMember />
            </Route>
            <Route path='/linkpatasfam/:id'>
              <LinkPatientAsFam />
            </Route>
            <Route path='/addslots/:id'>
              <AddSlotsPage />
            </Route>
            <Route path='/viewhealthrecpat/:id'>
              <ViewHealthRecordsPat />
            </Route>
            <Route path='/viewemploymentcontract/:id'>
              <ViewEmploymentContract />
            </Route>
            <Route path='/doctorform'>
              <DoctorForm />
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
            <Route path='/viewappointments/:id'>
              <ViewAppointments />
            </Route>
            <Route path='/viewdoctors'>
              <ViewDoctors />
            </Route>
            <Route path='/viewprescriptions/:patientId'>
              <ViewPrescriptions />
            </Route>
            <Route path='/prescriptiondetials/:prescriptionId'>
              <PrescriptionDetials />
            </Route>
            <Route path='/viewprofile'>
              <ViewProfile />
            </Route>
            <Route path='/editDoctor/:id'>
              <EditDoctor />
            </Route>
            <Route path='/doctorAppointments/:id'>
              <DoctorApps />
            </Route>
            <Route path='/checkout/:id'>
              <Checkout />
            </Route>
            <Route path='/view_wallet/:id'>
              <ViewWallet />
            </Route>
            <Route path='/doctor-details/:id'>
              <DoctorDetails />
            </Route>
            <Route path='/search-doctors'>
              <DoctorSearch />
            </Route>
            <Route path='/filter'>
              <Filter />
            </Route>
             <Route path='/viewpackages'>
              <ViewPackages />
            </Route>
            <Route path='/success'>
              <Success />
            </Route>
            <Route path='/cancel'>
              <Cancel />
            </Route>
          </Switch>
        </div>
      </div> */}
			<Routes>
				{/* =====================Routes for the HomePage========================== */}
				<Route path='/' element={<Home />} />
				{/* <Route path="/login" element={<Login />} /> */}
				<Route path='/patientform' element={<PatientForm />} />
				<Route path='/doctorform' element={<DoctorForm />} />
				<Route path='/doctorsTable' element={<DoctorsTable />} />

				{/* =====================Routes for the Patient========================== */}
				<Route path='/patientdashboard' element={<PatientDashboard />} />
				<Route path='/viewfammembers/:id' element={<ViewFamilyMembers />} />
				<Route path='/linkfammember/:id' element={<LinkFamMember />} />
				<Route
					path='/addhealthrecords/:id'
					element={<AddHealthRecordsPatient />}
				/>
				<Route
					path='/viewprescriptions/:patientId'
					element={<ViewPrescriptions />}
				/>
				<Route
					path='/prescriptiondetials/:prescriptionId'
					element={<PrescriptionDetials />}
				/>
				<Route path='/search-doctors' element={<DoctorSearch />} />

				{/* =====================Routes for the Doctor========================== */}
				<Route path='/doctordashboard' element={<DoctorDashboard />} />
				<Route path='/viewAllPatients/:id' element={<PatientList />} />
				<Route path='/selectedPatient/:id' element={<PatientDetails />} />
				<Route path='/viewdoctors' element={<ViewDoctors />} />
				<Route path='/editDoctor/:id' element={<EditDoctor />} />

				{/* add the rest in the right place */}

				<Route path='/viewappointments/:id' element={<ViewAppointments />} />
				<Route path='/doctorAppointments/:id' element={<DoctorApps />} />

				<Route path='/viewprofile' element={<ViewProfile />} />

				<Route path='/checkout/:id' element={<Checkout />} />
				<Route path='/view_wallet/:id' element={<ViewWallet />} />
				<Route path='/doctor-details/:id' element={<DoctorDetails />} />
				<Route path='/success' element={<Success />} />
				<Route path='/cancel' element={<Cancel />} />

				<Route path='/filter' element={<Filter />} />
				<Route path='/viewpackages' element={<ViewPackages />} />
				<Route
					path='/viewhealthrecpat/:id'
					element={<ViewHealthRecordsPat />}
				/>
				<Route path='/linkpatasfam/:id' element={<LinkPatientAsFam />} />
				<Route path='/addslots/:id' element={<AddSlotsPage />} />
				<Route
					path='/viewemploymentcontract/:id'
					element={<ViewEmploymentContract />}
				/>
				<Route
					path='/addhealthrecords/:id'
					element={<AddHealthRecordsPatient />}
				/>
				<Route path='/forgot-password' element={<ForgotPasswordUserPage />} />
				<Route path='/login' element={<LoginUserPage />} />

				<Route path='/admin' element={<DashboardPage />} />
				<Route path='/admin/login' element={<LoginPage />} />
				<Route
					path='/admin/forgot-password'
					element={<ForgotPasswordAdminPage />}
				/>

				<Route path='/admin/add-admin' element={<AddAdminPage />} />
				<Route
					path='/admin/requested-doctors'
					element={<RequestedDoctorsPage />}
				/>
				<Route path='/admin/user-management' element={<UserManagementPage />} />
				<Route path='/admin/health-packs' element={<HealthPackagesPage />} />
				<Route path='/admin/add-health-pack' element={<AddPackagePage />} />
				<Route path='/admin/change-password' element={<ChangePasswordPage />} />
			</Routes>
		</Router>
	);
}

export default App;
