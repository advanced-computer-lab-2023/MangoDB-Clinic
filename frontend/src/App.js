import Login from "./pages/Login";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

export default function MyApp() {
	return (
		<>
			<div>
				<BrowserRouter>
					<Routes>
						<Route path='/admin' element={<Home />} />
						<Route path='/admin/login' element={<Login />} />
					</Routes>
				</BrowserRouter>
			</div>
		</>
	);
}
