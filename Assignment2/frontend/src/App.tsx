import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Contributions from "./pages/Contributions";
import Settings from "./pages/Settings";

function App() {
  let component;

  console.log(window.location);
  switch (window.location.pathname) {
    case "/": // Change this to the content you want for the home page
      component = <Home />;
      break;
    case "/login":
      component = <Login />;
      break;
    case "/contributions":
      component = <Contributions />;
      break;
    case "/settings":
      component = <Settings />;
      break;
    default:
      component = (
        <>
          <Navbar />
          <div>Page not found</div>
        </>
      ); // Handle other routes
      break;
  }

  return <div>{component}</div>;
}

export default App;
