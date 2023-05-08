import "./App.css";
import Landing from "./components/Landing";
import Navbar from './components/Navbar'
import SubmissionsTable from "./components/SubmissionsTable";

const App = () => {
  let Component 
  switch (window.location.pathname) {
    case "/":
      Component = Landing
      break;
    case "/submissions":
      Component = SubmissionsTable
      break;
    default:
      break;
  }
  return (
  <Component />
  
  )
}

export default App;
