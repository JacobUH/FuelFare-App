import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";

export default function View() {
  return (
    <div className={`View ${
      location.pathname === "/view" ? "view-background" : ""
    }`}>
      <Navbar />
      {/*<h1>View</h1>*/}
      <div className="container-xl">
        <div className="card" style={{ maxWidth: "2000px", borderRadius: "15px"  }}>
          <div className="card-body" style = {{ backgroundColor: "#88D498", borderRadius: "10px" }}>
            <p className="card-title fs-2">Quote ID: </p>

            <div className="row pb-1 mx-1">
              <div className="col-xs text-black fs-5 p-1">
                Estimated Quote:
              </div>
            </div>
            <div className="row pb-1 mx-1">
              <div className="col-xs text-black fs-5 p-1">
                Date: 
              </div>
            </div>
            <div className="row pb-1 mx-1">
              <div className="col-xs text-black fs-5 p-1">
                Gallons Requested: 
              </div>
            </div>
            <div className="row pb-1 mx-1">
              <div className="col-xs text-black fs-5 p-1">
                Fuel Type: 
              </div>
            </div>
            <div className="row pb-1 mx-1">
              <div className="col-xs text-black fs-5 p-1">
                Address: 
              </div>
            </div>
      
          </div>
        </div>
        <div style = {{ position: "absolute", right: "10px", bottom: "10px" }}>
          <Link to="/history" className="btn btn-success bottom-0 end-0">
                    Back
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
