import "./App.css";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SubmissionsTable from "./components/SubmissionsTable";

const App = () => {
	let Component;
	switch (window.location.pathname) {
		case "/":
			Component = Landing;
			break;
		case "/submissions":
			Component = SubmissionsTable;
			break;
		case "/login":
			Component = Login;
			break;
		case "/signup":
			Component = Signup;
			break;
		default:
			break;
	}
	return <Component />;
};

export default App;
