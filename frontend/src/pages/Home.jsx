import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
	const user = localStorage.getItem("user");
	const navigate = useNavigate();

	if (!user) {
		navigate("/admin/login");
	}

	return (
		<>
			<Header />
			<div className='container'>
				<h1>Hello {JSON.parse(user).name}!</h1>
			</div>
		</>
	);
}
