import Home from "./pages/Home";
import Contributions from "./pages/Contributions";
import Login from "./pages/Login";
import Setup from "./pages/Setup";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import View from "./pages/View";
import New from "./pages/New";
import UpdateAccount from "./pages/UpdateAccount";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contributions" element={<Contributions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/view" element={<View />} />
          <Route path="/new" element={<New />} />
          <Route path="/updateAccount" element={<UpdateAccount />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
