import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

export default function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/admin' element={<DashboardPage />} />
					<Route path='/admin/login' element={<LoginPage />} />
					<Route path='/login' element={<LoginUserPage />} />

					<Route
						path='/admin/forgot-password'
						element={<ForgotPasswordAdminPage />}
					/>

					<Route path='/forgot-password' element={<ForgotPasswordUserPage />} />
					<Route path='/admin/add-admin' element={<AddAdminPage />} />
					<Route
						path='/admin/requested-doctors'
						element={<RequestedDoctorsPage />}
					/>
					<Route
						path='/admin/user-management'
						element={<UserManagementPage />}
					/>
					<Route path='/admin/health-packs' element={<HealthPackagesPage />} />
					<Route path='/admin/add-health-pack' element={<AddPackagePage />} />
					<Route
						path='/admin/change-password'
						element={<ChangePasswordPage />}
					/>
				</Routes>
			</Router>
		</>
	);
}
