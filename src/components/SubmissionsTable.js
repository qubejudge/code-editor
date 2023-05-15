import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const people = [
	{
		name: "Jane Cooper",
		title: "Regional Paradigm Technician",
		department: "Optimization",
		role: "Admin",
		email: "jane.cooper@example.com",
		image: "https://bit.ly/33HnjK0",
	},
	{
		name: "John Doe",
		title: "Regional Paradigm Technician",
		department: "Optimization",
		role: "Tester",
		email: "john.doe@example.com",
		image: "https://bit.ly/3I9nL2D",
	},
	{
		name: "Veronica Lodge",
		title: "Regional Paradigm Technician",
		department: "Optimization",
		role: " Software Engineer",
		email: "veronica.lodge@example.com",
		image: "https://bit.ly/3vaOTe1",
	},
	// More people...
];

const SubmissionsTable = () => {
	const [submissions, setSubmissions] = useState([]);
	const [showOutputModal, setShowOutputModal] = useState(false);
	const [showCodeModal, setShowCodeModal] = useState(false);
	const [outputModelData, setOutputModelData] = useState("");

	function handleSubmissionModal(submissionId) {
		setShowOutputModal(true);
		setShowCodeModal(true);
		axios
			.get("http://localhost:8081/api/v1/submission-code?submissionID=" + submissionId)
			.then((res) => {
				setOutputModelData(res.data.submissionData);
				console.log(submissions);
			});
	}

	useEffect(async () => {
		try {
			const res = await axios.get("http://localhost:8081/api/v1/submissions", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			});
			console.log(res);
			setSubmissions(res.data.submissions);
			console.log(submissions);
		} catch (error) {}
	}, []);

	return (
		<>
			{showOutputModal ? (
				<>
					<div className="justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-auto my-6 mx-auto max-w-3xl">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
									<h3 className="text-3xl font-semibold">
										{showCodeModal == true ? "Submission Data" : "Output"}
									</h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
										onClick={() => setShowOutputModal(false)}
									>
										<span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
											×
										</span>
									</button>
								</div>
								{/*body*/}
								<div className="relative p-6 flex-auto">
									<pre className="overflow-auto px-2 py-1 font-normal text-xs text-red-500">
										{outputModelData !== null ? `${outputModelData}` : null}
									</pre>
									{/* <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    `${outputModelData}`
                  </p> */}
								</div>
								{/*footer*/}
								<div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
									<button
										className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => {
											setShowOutputModal(false);
											setShowCodeModal(false);
											setOutputModelData("");
										}}
									>
										Close
									</button>
									{/* <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowOutputModal(false)}
                  >
                    Save Changes
                  </button> */}
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
			<Navbar />
			<div className="flex flex-col">
				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											SubmissionID
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											File-Details
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Status
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Errors
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											time
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											memory
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											output
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{submissions.map((submission) => (
										<tr key={submission.submissionId}>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="ml-4">
														{/* <div className="text-sm font-medium text-gray-900">{subimi}</div> */}
														<button onClick={() => handleSubmissionModal(submission.submissionId)}>
															{submission.submissionId}
														</button>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm text-gray-900">{submission.filename}</div>
												<div className="text-sm text-gray-500">{submission.filetype}</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span
													className="px-2 inline-flex text-xs leading-5
                          font-semibold rounded-full bg-green-100 text-green-800"
												>
													{submission.submissionStatus}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{submission.errorCode}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{submission.timeTaken}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{submission.memoryUse}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												<button
													onClick={() => {
														setShowOutputModal(true);
														setOutputModelData(submission.output);
													}}
												>
													Output
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SubmissionsTable;
