import  { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { authenticate, isAuthenticated } from "../utils/auth";
import { UserContext } from "../context/UserContext.jsx";
import { Link } from "react-router-dom";


const Login = () => {
	const navigate = useNavigate();
	const { changeUsername, handleLogin, handleUserId } = useContext(UserContext);

	useEffect(() => {
		if (isAuthenticated()) {
			navigate("/dashboard");
		}
	}, [navigate, isAuthenticated]);

	const [values, setValues] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const formSubmit = async (event) => {
		event.preventDefault();
		const { email, password } = values;
		if (!email) {
			alert("email required");
			return;
		}
		if (!password) {
			alert("password required");
			return;
		}

		try {
			const { data } = await axios.post(
				"/login",
				{ email, password },
				{
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json",
					},
				}
			);

			console.log(data);
			if (data.success) {
				authenticate(data);
				handleLogin(true);
				navigate("/dashboard");
			}
		} catch (error) {
			if (error.response) {
				if (error.response.status == 400) {
					alert("invalid username or password")
					setValues({
						...values,
						email: "",
						password: "",
					});
				}
			}
		}
	};
	return (
		<>
			<div className="flex flex-col  justify-center items-center font-Outfit">
				<h3 className="text-3xl">Welcome back</h3>
				<p className="text-gray-400 pt-5 text-center mx-5">
					We've missed you! Please sign in to catch up on what you've missed
				</p>

				<form className="mt-5 ">
					<div className="flex flex-col">
						<label htmlFor="email">Email</label>
						<input
							className="border mt-1 px-6 w-[350px] py-2 rounded-xl"
							type="text"
							name="email"
							onChange={handleChange}
							value={values.email}
							placeholder="Enter your email"
						/>
					</div>

					<div className="flex flex-col mt-5">
						<label htmlFor="password">password</label>
						<input
							className="border mt-1 px-6 w-[350px] py-2 rounded-xl"
							type="password"
							name="password"
							onChange={handleChange}
							value={values.password}
							placeholder="Enter your password"
						/>
					</div>

					<button
						className="bg-black text-white mt-8 px-40 py-3 rounded-xl hover:shadow-sm hover:shadow-slate-400"
						onClick={formSubmit}
					>
						Login
					</button>
				</form>
				<div className="mt-4 ">
					<Link className="text-purple-400" to="/signup">
						New here? Signup
					</Link>
				</div>
			</div>
		</>
	);
};

export default Login;
