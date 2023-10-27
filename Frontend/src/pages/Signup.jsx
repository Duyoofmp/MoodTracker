import React, { useEffect, useState } from "react";
import googleLogo from "../assets/google.svg";
import axios from "../api/axios";
import { signup } from "../utils/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		error: "",
		success: false,
	});

	const handleFormChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		const { name, email, password, confirmPassword } = form;
		e.preventDefault();

		if (!name) {
			alert("Enter your name");
			return;
		}

		if (!email) {
			alert("Enter your email");
			return;
		}

		if (password != confirmPassword) {
			alert("passwords do not match");
			return;
		}

		signup({ name, email, password })
			.then((data) => {
				if (data.error) {
					setForm({ ...form, error: data.error, success: false });
				} else {
					setForm({
						...form,
						name: "",
						email: "",
						password: "",
						confirmPassword: "",
						error: "",
						success: true,
					});
					alert("account created successfully");
					navigate("/login")
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<div className="flex flex-col  justify-center items-center font-Outfit">
				<h3 className="text-3xl">Sign Up</h3>
				{/* <button className="flex mt-5 rounded-xl items-center px-20 py-2 border border-gray-300">
          <img src={googleLogo} />
          Signup with Google
        </button>

        <p className="text-gray-400 mt-5">or</p> */}

				<form onSubmit={handleSubmit} className="ml-2">
					<div className="flex mr-4 ml-2 sm:mr-0 sm:ml-0 flex-col">
						<label htmlFor="name">Name</label>
						<input
							className="border mt-1 px-6  sm:w-[350px] py-2 rounded-xl"
							type="text"
							name="name"
							value={form.name}
							onChange={handleFormChange}
							placeholder="Enter your name"
						/>
					</div>

					<div className="flex flex-col mr-4 ml-2 sm:mr-0 sm:ml-0 mt-5 ">
						<label htmlFor="email">Email</label>
						<input
							className="border mt-1 px-6 sm:w-[350px] py-2 rounded-xl"
							type="text"
							name="email"
							value={form.email}
							onChange={handleFormChange}
							placeholder="Enter your email"
						/>
					</div>

					<div className="flex flex-col mr-4 ml-2 sm:mr-0 sm:ml-0 mt-5">
						<label htmlFor="password">password</label>
						<input
							className="border mt-1 px-6 sm:w-[350px] py-2 rounded-xl"
							type="password"
							name="password"
							value={form.password}
							onChange={handleFormChange}
							placeholder="Enter your password"
						/>
					</div>

					<div className="flex flex-col mr-4 ml-2 sm:mr-0 sm:ml-0 mt-5">
						<label htmlFor="confirmPassword">Confirm Password</label>
						<input
							className="border mt-1 px-6 sm:w-[350px] py-2 rounded-xl"
							type="password"
							name="confirmPassword"
							value={form.confirmPassword}
							onChange={handleFormChange}
							placeholder="Enter your password"
						/>
					</div>

					<button
						type="submit"
						className="bg-black  text-white mt-5 px-10 ml-20 sm:ml-0 sm:px-40 py-3 rounded-xl hover:shadow-sm hover:shadow-slate-400"
					>
						Signup
					</button>
				</form>
				<div className="mt-4 ">
					<Link className="text-purple-400" to="/login">
						Already have an account? Login
					</Link>
				</div>
			</div>
		</>
	);
};

export default Signup;
