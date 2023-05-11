import React, { useEffect, useState } from "react";
import { TbBrandCodesandbox } from "react-icons/tb";
import { getRandomOptions } from "../utils/RandomAvatar";

import { BigHead } from "@bigheads/core";

import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator";

const shortName = uniqueNamesGenerator({
	dictionaries: [colors, adjectives, animals],
	separator: " ",
	length: 2,
}); // red_big_donkey

const LoggedInOptions = ({ nameProp, logout, authenticated }) => {
	return (
		<>
			{console.log(authenticated)}
			<button>
				<a
					href="#"
					className="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-600 mr-4 disabled "
				>
					Login
				</a>
			</button>
			<button>
				<a
					href="#"
					className="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-600 mr-4 active"
				>
					Signup
				</a>
			</button>
			<button onClick={logout}>
				<text className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-black mr-4 active">
					Logout
				</text>
			</button>
			<text className="block mt-4 lg:inline-block lg:mt-0 text-black mu-4 active text-md">
				{nameProp}
			</text>
		</>
	);
};

const LoggedOutOptions = () => {
	return (
		<>
			{/* {console.log("NPPPPPPP")} */}
			<button>
				<a
					href="/login"
					className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-black mr-4 active "
				>
					Login
				</a>
			</button>
			<button>
				<a
					href="/signup"
					className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-black mr-4 active"
				>
					Signup
				</a>
			</button>
			<button>
				<a
					href="#"
					className="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-600 mr-4 active"
				>
					Logout
				</a>
			</button>
			<text className="block mt-4 lg:inline-block lg:mt-0 text-black mu-4 active text-md">
				{shortName}
			</text>
		</>
	);
};

const Navbar = () => {
	const [authenticated, setAuthenticated] = useState(false);
	const [name, setName] = useState("");
	const [modal, setModal] = useState(false);

	useEffect(() => {
		console.log(localStorage.getItem("authenticated"));
		setAuthenticated(localStorage.getItem("authenticated"));
		setName(localStorage.getItem("name"));
		console.log(authenticated);
		// console.log(name);
	}, []);

	const logout = () => {
		// localStorage.removeItem("name");
		localStorage.removeItem("name");
		localStorage.setItem("authenticated", false);
		localStorage.removeItem("token");
		window.location.reload();
		setAuthenticated(false);
		// localStorage.removeItem("token");
	};

	// useEffect(() => {}, [authenticated]);

	return (
		<nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-6">
			<div className="flex items-center flex-shrink-0 text-white mr-6">
				<TbBrandCodesandbox size={40} />
				<span className="font-semibold text-xl tracking-tight ml-3">QubeJudge</span>
			</div>
			<div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
				<div className="text-sm lg:flex-grow">
					<a
						href="/"
						className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4 active "
					>
						Submit File
					</a>
					<a
						href="/submissions"
						className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-black mr-4"
					>
						Submissions
					</a>
				</div>
			</div>
			<div className="flex items-center justify-between ">
				{console.log(authenticated)}
				{!authenticated ? (
					<LoggedOutOptions />
				) : (
					<LoggedInOptions nameProp={name} logout={logout} authenticated={authenticated} />
				)}
				<svg className="w-20 h-10">
					<BigHead {...getRandomOptions()} />
				</svg>
			</div>
		</nav>
	);
};

export default Navbar;
