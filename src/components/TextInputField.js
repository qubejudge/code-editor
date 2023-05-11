import React from "react";
import { classnames } from "../utils/general";
const TextInputField = ({ customInput, setCustomInput, placeholder, type }) => {
	return (
		<>
			{" "}
			<input
				value={customInput}
				onChange={(e) => setCustomInput(e.target.value)}
				placeholder={placeholder}
				type={type}
				className={classnames(
					"focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 mb-5 mt-5 hover:shadow transition duration-200 bg-white mt-2"
				)}
			></input>
		</>
	);
};

export default TextInputField;
