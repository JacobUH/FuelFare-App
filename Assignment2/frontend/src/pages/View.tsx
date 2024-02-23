import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";

export default function View() {
  return (
    <div
      className={`View ${
        location.pathname === "/view" ? "view-background" : ""
      }`}
    >
      <Navbar />
      {/*<h1>View</h1>*/}
      <div className="container-xl">
        <div
          className="card"
          style={{
            maxWidth: "2000px",
            borderRadius: "10px",
            backgroundColor: "#88D498",
          }}
        >
          <div
            className="card-body"
            style={{ backgroundColor: "#88D498", borderRadius: "10px" }}
          >
            <p className="card-title fs-2">Quote ID: </p>

            <div className="row pb-1 mx-1">
              <div className="col-xs text-black fs-5 p-1">
                <div className="ps-1">Estimated Quote:</div>
              </div>
            </div>
            <div className="row pb-1 mx-1">
              <div className="col-xs text-black fs-5 p-1">
                <div className="ps-1">Date:</div>
              </div>
            </div>
            <div className="row pb-1 mx-1">
              <div className="col-xs text-black fs-5 p-1">
                <div className="ps-1">Gallons Requested:</div>
              </div>
            </div>
            <div className="row pb-1 mx-1">
              <div className="col-xs text-black fs-5 p-1">
                <div className="ps-1">Fuel Type:</div>
              </div>
            </div>
            <div className="row pb-1 mx-1">
              <div className="col-xs text-black fs-5 p-1">
                <div className="ps-1">Address:</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3 justify-content-center">
          <div className="col-3">
            <Link to="/dashboard" className="btn btn-success w-100">
              Dashboard
            </Link>
          </div>
          <div className="col-3">
            <Link to="/history" className="btn btn-success w-100">
              History
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
