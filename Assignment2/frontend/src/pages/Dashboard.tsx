import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div
      className={`Dashboard ${
        location.pathname === "/dashboard" ? "dashboard-background" : ""
      }`}
    >
      <Navbar />
      <h1
        className="mt-5 text-center"
        style={{ color: "#F3E9D2", fontStyle: "italic", fontWeight: "bold" }}
      >
        Welcome!
      </h1>

      <div className="mt-3">
        <div className="row justify-content-center">
          <Link to="/new" className="btn text-center dashboard-btns">
            Get Your Fuel Quote Now
          </Link>
          <Link to="/history" className="btn text-center dashboard-btns">
            View Previous Quotes
          </Link>
          <Link to="/updateAccount" className="btn text-center dashboard-btns">
            Update User Account
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
