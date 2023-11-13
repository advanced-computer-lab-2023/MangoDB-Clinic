import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginAdminPage";
import DashboardPage from "./pages/DashboardPage";

import ForgotPasswordAdminPage from "./pages/ForgotPasswordAdminPage";
import ForgotPasswordUserPage from "./pages/ForgotPasswordUserPage";

import AddAdminPage from "./pages/AddAdminPage";
import RequestedDoctorsPage from "./pages/RequestedDoctorsPage";
import LoginUser from "./components/LoginUser";

export default function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/admin' element={<DashboardPage />} />
					<Route path='/admin/login' element={<LoginPage />} />
					<Route path='/login' element={<LoginUser />} />

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
				</Routes>
			</Router>
		</>
	);
}
