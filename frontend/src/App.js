import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Blog";
//import Home from "./pages/Home";
import Register from "./pages/register";
import PatientDashboard from "./pages/Patient/PatientDashboard";
import DoctorsTable from "./components/DoctorsTable";
import PatientForm from "./components/Patient/PatientForm";
import PatientList from "./pages/Doctor/PatientList";
import PatientDetails from "./pages/Doctor/PatientDetails";
import ViewAppointments from "./pages/ViewAppointments";
import ViewDoctors from "./pages/ViewDoctors";
import ViewPrescriptionsPatient from "./pages/Patient/ViewPrescriptionsPatient";
import ViewPrescriptionsDoctor from "./pages/Doctor/ViewPrescriptionsDoctor";
import ViewProfile from "./pages/ViewProfile";
import ViewWallet from "./pages/ViewWallet";
import EditDoctor from "./pages/Doctor/EditDoctor";
import DoctorForm from "./components/Doctor/DoctorForm";
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
import ChangePasswordDoctorPage from "./pages/Doctor/ChangePasswordDoctorPage";
import ChangePasswordPatientPage from "./pages/Patient/ChangePasswordPatientPage";
import ForgotPasswordUserPage from "./pages/General/ForgotPasswordUserPage";
import LoginUserPage from "./pages/General/LoginUserPage";
import DoctorDashboard from "./pages/Doctor/doctorDashboard";
import EmploymentContractPage from "./pages/EmploymentContractPage";

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
import RemoveAdminPage from "./pages/Admin/RemoveAdminPage";
import EditHealthPackagePage from "./pages/Admin/EditHealthPackagePage";
import ProfilePage from "./pages/General/ProfilePage";

import Success from "./pages/Patient/Success";
import Cancel from "./pages/Patient/Cancel";
import SuccessfulPackagePayment from "./pages/successfulPackagePayment";
import CancelHealthPackageSubscription from "./pages/cancelHealthPackageSubscription";
import ViewHealthPackageSubscription from "./pages/viewHealthPackageSubscription";
import RemovePatientPage from "./pages/Admin/RemovePatientPage";
import RemoveDoctorPage from "./pages/Admin/RemoveDoctorPage";

//theme
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import ViewPackagesPatient from "./pages/Patient/ViewPackagesPatient";
import NotFound from "./pages/General/NotFound";

//AppBars and headers
import AdminHeader from "./components/GeneralComponents/adminHeader";
import PatientHeader from "./components/GeneralComponents/patientHeader";
import DoctorHeader from "./components/GeneralComponents/doctorHeader";

import ViewChats from "./pages/Doctor/viewChats";
import Chat from "./pages/Doctor/chat";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* =====================Routes for the HomePage========================== */}
          <Route path="/" element={<Home />} />
          <Route path="/patientform" element={<PatientForm />} />
          <Route path="/doctorform" element={<DoctorForm />} />
          <Route path="/doctorsTable" element={<DoctorsTable />} />
          <Route path="/register" element={<Register />} />
          {/* =====================Routes for the Patient========================== */}
          <Route path="/patientdashboard" element={<PatientDashboard />} />
          <Route path="/viewfammembers" element={<ViewFamilyMembers />} />
          <Route path="/linkfammember" element={<LinkFamMember />} />
          <Route
            path="/addhealthrecords"
            element={<AddHealthRecordsPatient />}
          />
          <Route
            path="/viewPrescriptionsOfPatient"
            element={<ViewPrescriptionsPatient />}
          />
          <Route
            path="/prescriptiondetails/:id"
            element={<PrescriptionDetials />}
          />
          <Route path="/search-doctors" element={<DoctorSearch />} />
          <Route path="/viewpackages" element={<ViewPackagesPatient />} />
          <Route
            path="/successfulPackagePayment"
            element={<SuccessfulPackagePayment />}
          />
          <Route
            path="/cancelHealthPackageSubscription"
            element={<CancelHealthPackageSubscription />}
          />
          <Route
            path="/viewHealthPackageSubscription"
            element={<ViewHealthPackageSubscription />}
          />
          <Route
            path="/changePasswordPatient"
            element={<ChangePasswordPatientPage />}
          />

          {/* =====================Routes for the Doctor========================== */}
          <Route path="/doctordashboard" element={<DoctorDashboard />} />
          <Route path="/viewAllPatients" element={<PatientList />} />
          <Route path="/selectedPatient/:id" element={<PatientDetails />} />
          <Route path="/viewdoctors" element={<ViewDoctors />} />
          <Route path="/editDoctor" element={<EditDoctor />} />
          <Route
            path="/changePasswordDoctor"
            element={<ChangePasswordDoctorPage />}
          />
          <Route
            path="/viewPrescriptionsByDoctor"
            element={<ViewPrescriptionsDoctor />}
          />

          {/* add the rest in the right place */}

          <Route path="/viewappointments" element={<ViewAppointments />} />
          <Route path="/doctorAppointments" element={<DoctorApps />} />

          <Route path="/viewprofile" element={<ViewProfile />} />

          <Route
            path="/employmentcontract"
            element={<EmploymentContractPage />}
          />

          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/view_wallet" element={<ViewWallet />} />
          <Route path="/doctor-details/:id" element={<DoctorDetails />} />

          <Route path="/filter" element={<Filter />} />
          <Route path="/viewhealthrecpat" element={<ViewHealthRecordsPat />} />
          <Route path="/linkpatasfam" element={<LinkPatientAsFam />} />
          <Route path="/addslots" element={<AddSlotsPage />} />
          <Route
            path="/viewemploymentcontract"
            element={<ViewEmploymentContract />}
          />

          {/* =====================Routes for the Doctor========================== */}
          <Route path="/doctordashboard" element={<DoctorDashboard />} />
          <Route path="/viewAllPatients/:id" element={<PatientList />} />
          <Route path="/selectedPatient/:id" element={<PatientDetails />} />
          <Route path="/viewdoctors" element={<ViewDoctors />} />
          <Route path="/editDoctor/:id" element={<EditDoctor />} />

          {/* add the rest in the right place */}

          <Route path="/viewappointments" element={<ViewAppointments />} />
          <Route path="/doctorAppointments" element={<DoctorApps />} />

          <Route path="/viewprofile" element={<ViewProfile />} />

          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/view_wallet/:id" element={<ViewWallet />} />
          <Route path="/doctor-details/:id" element={<DoctorDetails />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />

          <Route path="/filter" element={<Filter />} />
          <Route path="/viewpackages" element={<ViewPackages />} />
          <Route
            path="/viewhealthrecpat/:id"
            element={<ViewHealthRecordsPat />}
          />
          <Route path="/linkpatasfam/:id" element={<LinkPatientAsFam />} />
          <Route path="/addslots" element={<AddSlotsPage />} />
          <Route
            path="/viewemploymentcontract/:id"
            element={<ViewEmploymentContract />}
          />
          <Route
            path="/addhealthrecords/:id"
            element={<AddHealthRecordsPatient />}
          />
          <Route path="/forgot-password" element={<ForgotPasswordUserPage />} />
          <Route path="/login" element={<LoginUserPage />} />

          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/admin/login" element={<LoginAdminPage />} />
          <Route
            path="/admin/forgot-password"
            element={<ForgotPasswordAdminPage />}
          />

          <Route path="/admin/add-admin" element={<AddAdminPage />} />
          <Route path="/admin/remove-admin" element={<RemoveAdminPage />} />
          <Route path="/admin/remove-patient" element={<RemovePatientPage />} />
          <Route path="/admin/remove-doctor" element={<RemoveDoctorPage />} />

          <Route
            path="/admin/requested-doctors"
            element={<RequestedDoctorsPage />}
          />
          <Route
            path="/admin/user-management"
            element={<UserManagementPage />}
          />
          <Route path="/admin/health-packs" element={<HealthPackagesPage />} />
          <Route path="/admin/add-health-pack" element={<AddPackagePage />} />
          <Route
            path="/admin/edit-health-package/:id"
            element={<EditHealthPackagePage />}
          />
          <Route
            path="/admin/change-password"
            element={<ChangePasswordPage />}
          />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/viewchats" element={<ViewChats />} />
          <Route path="/chat/:id" element={<Chat />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
