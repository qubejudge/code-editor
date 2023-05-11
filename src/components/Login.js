import React, { useEffect, useRef, useState } from "react";
import { classnames } from "../utils/general";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import TextInputField from "./TextInputField";
import axios from "axios";
const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const login = async () => {
		try {
			const res = await axios.post("http://localhost:8081/api/v1/signin/user", {
				email: username,
				password: password,
			});

			console.log(res.data);
			localStorage.setItem("authenticated", true);
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("name", res.data.name);
		} catch (error) {
			console.log(error.response.data);
		}
	};
	return (
		<>
			<Navbar />
			<section className="flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
				<div className="md:w-1/3 max-w-sm">
					<TextInputField
						type="email"
						placeholder="Email Address"
						customInput={username}
						setCustomInput={setUsername}
					/>
					<TextInputField
						customInput={password}
						setCustomInput={setPassword}
						// className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
						type="password"
						placeholder="Password"
					/>

					<div className="text-center md:text-left">
						<button
							className={classnames(
								"mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0"
							)}
							type="submit"
							onClick={login}
						>
							Login
						</button>
					</div>
					<div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
						Don't have an account?{" "}
						<a className="text-black hover:underline hover:underline-offset-4" href="">
							Register
						</a>
					</div>
				</div>
			</section>
		</>
	);
};
export default Login;
