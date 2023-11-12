import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AddAdminPage from "./pages/AddAdminPage";

export default function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/admin' element={<DashboardPage />} />
					<Route path='/admin/login' element={<LoginPage />} />
					<Route
						path='/admin/forgot-password'
						element={<ForgotPasswordPage />}
					/>
					<Route path='/admin/add-admin' element={<AddAdminPage />} />
				</Routes>
			</Router>
		</>
	);
}
