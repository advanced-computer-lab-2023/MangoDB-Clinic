import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function Login() {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const { username, password } = formData;

	const navigate = useNavigate();

	const [isSuccess, setIsSuccess] = useState(false);
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	const loginAdmin = async (userData) => {
		try {
			setIsLoggingIn(true);
			const response = await axios.post(
				`http://localhost:4000/admin/login`,
				userData
			);

			if (response.status === 200) {
				setIsSuccess(true);
				localStorage.setItem("user", JSON.stringify(response.data));
			}
		} catch (error) {
			alert("Invalid Credentials");
		} finally {
			setIsLoggingIn(false);
		}
	};

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		const userData = {
			username,
			password,
		};

		await loginAdmin(userData);
	};

	useEffect(() => {
		if (isSuccess) {
			navigate("/admin");
			console.log("Login Successful");
		}
	}, [isSuccess]);

	return (
		<>
			<div className='gradient'>
				<div className='containerOmar'>
					<div className='form-container'>
						<p className='title'>Welcome Back Admin!</p>

						<form className='form'>
							<div className='input-group'>
								<label htmlFor='username'>Username</label>
								<input
									type='text'
									name='username'
									id='username'
									value={username}
									onChange={onChange}
									placeholder=''
								/>
							</div>

							<div className='input-group'>
								<label htmlFor='password'>Password</label>
								<input
									type='password'
									name='password'
									id='password'
									value={password}
									onChange={onChange}
									placeholder=''
								/>
							</div>

							<br />

							<button
								className='sign'
								onClick={onSubmit}
								disabled={isLoggingIn}
							>
								Login
								{isLoggingIn ? <Spinner /> : ""}
							</button>

							<div className='forgot'>
								<a rel='noopener noreferrer' href='#'>
									Forgot Password ?
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
