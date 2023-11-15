import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorsTable from "./components/DoctorsTable";
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
import ChangePasswordDoctorPage from "./pages/ChangePasswordDoctorPage";
import ChangePasswordPatientPage from "./pages/ChangePasswordPatientPage";
import ForgotPasswordUserPage from "./pages/General/ForgotPasswordUserPage";
import LoginUserPage from "./pages/General/LoginUserPage";
import DoctorDashboard from "./pages/doctorDashboard";

// Admin Imports
import LoginAdminPage from "./pages/Admin/LoginAdminPage";
import DashboardPage from "./pages/Admin/DashboardPage";
import ForgotPasswordAdminPage from "./pages/Admin/ForgotPasswordAdminPage";
import AddAdminPage from "./pages/Admin/AddAdminPage";
import RequestedDoctorsPage from "./pages/Admin/RequestedDoctorsPage";
import UserManagementPage from "./pages/Admin/UserManagementPage";
import HealthPackagesPage from "./pages/Admin/HealthPackagesPage";
import AddPackagePage from "./pages/Admin/AddPackagePage";
import ChangePasswordPage from "./pages/Admin/ChangePasswordPage";

import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import SuccessfulPackagePayment from "./pages/successfulPackagePayment";
import CancelHealthPackageSubscription from "./pages/cancelHealthPackageSubscription";
import ViewHealthPackageSubscription from "./pages/viewHealthPackageSubscription";

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
            <Route path='/addhealthrecords'>
              <AddHealthRecordsPatient />
            </Route>
            <Route path='/viewfammembers'>
              <ViewFamilyMembers />
            </Route>
            <Route path='/linkfammember'>
              <LinkFamMember />
            </Route>
            <Route path='/linkpatasfam'>
              <LinkPatientAsFam />
            </Route>
            <Route path='/addslots'>
              <AddSlotsPage />
            </Route>
            <Route path='/viewhealthrecpat'>
              <ViewHealthRecordsPat />
            </Route>
            <Route path='/viewemploymentcontract'>
              <ViewEmploymentContract />
            </Route>
            <Route path='/doctorform'>
              <DoctorForm />
            </Route>
            <Route path='/doctorsTable'>
              <DoctorsTable />
            </Route>
            <Route path='/viewAllPatients/'>
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
            <Route path='/editDoctor'>
              <EditDoctor />
            </Route>
            <Route path='/doctorAppointments'>
              <DoctorApps />
            </Route>
            <Route path='/checkout/:id'>
              <Checkout />
            </Route>
            <Route path='/view_wallet'>
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
				<Route path='/viewfammembers' element={<ViewFamilyMembers />} />
				<Route path='/linkfammember' element={<LinkFamMember />} />
				<Route path='/addhealthrecords' element={<AddHealthRecordsPatient />} />
				<Route path='/viewprescriptions' element={<ViewPrescriptions />} />
				<Route
					path='/prescriptiondetials/:prescriptionId'
					element={<PrescriptionDetials />}
				/>
				<Route path='/search-doctors' element={<DoctorSearch />} />
				<Route path='/viewpackages' element={<ViewPackages />} />
				<Route
					path='/successfulPackagePayment'
					element={<SuccessfulPackagePayment />}
				/>
				<Route
					path='/cancelHealthPackageSubscription'
					element={<CancelHealthPackageSubscription />}
				/>
				<Route
					path='/viewHealthPackageSubscription'
					element={<ViewHealthPackageSubscription />}
				/>
				<Route
					path='/changePasswordPatient'
					element={<ChangePasswordPatientPage />}
				/>

				{/* =====================Routes for the Doctor========================== */}
				<Route path='/doctordashboard' element={<DoctorDashboard />} />
				<Route path='/viewAllPatients' element={<PatientList />} />
				<Route path='/selectedPatient/:id' element={<PatientDetails />} />
				<Route path='/viewdoctors' element={<ViewDoctors />} />
				<Route path='/editDoctor' element={<EditDoctor />} />
				<Route
					path='/changePasswordDoctor'
					element={<ChangePasswordDoctorPage />}
				/>

				{/* add the rest in the right place */}

				<Route path='/viewappointments' element={<ViewAppointments />} />
				<Route path='/doctorAppointments' element={<DoctorApps />} />

				<Route path='/viewprofile' element={<ViewProfile />} />

				<Route path='/checkout/:id' element={<Checkout />} />
				<Route path='/view_wallet' element={<ViewWallet />} />
				<Route path='/doctor-details/:id' element={<DoctorDetails />} />

				<Route path='/filter' element={<Filter />} />
				<Route path='/viewhealthrecpat' element={<ViewHealthRecordsPat />} />
				<Route path='/linkpatasfam' element={<LinkPatientAsFam />} />
				<Route path='/addslots' element={<AddSlotsPage />} />
				<Route
					path='/viewemploymentcontract'
					element={<ViewEmploymentContract />}
				/>
				<Route path='/addhealthrecords' element={<AddHealthRecordsPatient />} />
				{/* =====================Routes for the Patient==========================
				<Route path='/patientdashboard' element={<PatientDashboard />} />
				<Route path='/viewfammembers/:id' element={<ViewFamilyMembers />} />
				<Route path='/linkfammember/:id' element={<LinkFamMember />} />
				<Route
					path='/addhealthrecords/:id'
					element={<AddHealthRecordsPatient />}
				/>
				<Route
					path='/viewprescriptions'
					element={<ViewPrescriptions />}
				/>
				<Route
					path='/prescriptiondetials/:prescriptionId'
					element={<PrescriptionDetials />}
				/>
				<Route path='/search-doctors' element={<DoctorSearch />} /> */}

				{/* =====================Routes for the Doctor========================== */}
				<Route path='/doctordashboard' element={<DoctorDashboard />} />
				<Route path='/viewAllPatients/:id' element={<PatientList />} />
				<Route path='/selectedPatient/:id' element={<PatientDetails />} />
				<Route path='/viewdoctors' element={<ViewDoctors />} />
				<Route path='/editDoctor/:id' element={<EditDoctor />} />

				{/* add the rest in the right place */}

				<Route path='/viewappointments' element={<ViewAppointments />} />
				<Route path='/doctorAppointments' element={<DoctorApps />} />

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
				<Route path='/admin/login' element={<LoginAdminPage />} />
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
