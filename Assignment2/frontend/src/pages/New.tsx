import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function New() {
  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  /* Hooks for setting input constraints */
  const [nameMaxLength] = useState(50);
  const [addressMaxLength] = useState(100);
  const [cityMaxLength] = useState(100);
  const [zipcodeMaxLength] = useState(9);
  const [zipcodeMinLength] = useState(5);

  return (
    <div
      className={`New ${
        location.pathname === "/new" ? "setup-background" : ""
      }`}
    >
      <Navbar />
      <div className="container mt-5">
        <div className="card mx-auto" style={{ maxWidth: "1000px", borderRadius: 30 }}>
          <div className="card-body px-5" style={{ borderRadius: 30 }}>
            <h1 className="my-4 Setup">Create a New Quote</h1>

            <form className="row g-3 row-cols-3">
              <div className="col-sm-2">
                <label htmlFor="inputNum" className="form-label">
                  # of Gallons
                </label>
                <input
                  type="num"
                  className="form-control"
                  id="inputNum"
                  placeholder="100"
                />
              </div>

              <div className="col-sm-2">
                <label htmlFor="inputFuel" className="form-label">
                  Fuel Type
                </label>
                <select className="form-select" aria-label="Default select example">
                  <option selected>Fuel Type</option>
                  <option value="1">Regular</option>
                  <option value="2">Mid</option>
                  <option value="3">Premium</option>
                  <option value="4">Diesel</option>
                </select>
              </div>

              <div className="col-3">
                <label htmlFor="PricePerGallon" className="form-label">
                  Market Price per Gallon
                </label>
                <input className="form-control" type="text" value="Insert Price Here" aria-label="Disabled input example" disabled readOnly />
              </div>

              <div className="col-lg-9">
                <label htmlFor="companyAddress" className="form-label">
                  Company Address 
                </label>
                <input className="form-control" type="text" value="Insert Address Here" aria-label="Disabled input example" disabled readOnly />
              </div>

              {/*<div className="w-100"></div>*/}

              <div className="col-md-4">
                <label htmlFor="inputDate" className="form-label">
                    Delivery Date
                </label>
                <div className="input-group">
                  <select className="form-select" aria-label="Default select example">
                    <option selected>Month</option>
                    <option value="1">Jan</option>
                    <option value="2">Feb</option>
                    <option value="3">Mar</option>
                    <option value="4">Apr</option>
                    <option value="5">May</option>
                    <option value="6">Jun</option>
                    <option value="7">Jul</option>
                    <option value="8">Aug</option>
                    <option value="9">Sep</option>
                    <option value="10">Oct</option>
                    <option value="11">Nov</option>
                    <option value="12">Dec</option>
                  </select>
                  <input type="num" className="form-control" aria-label="Text input with 2 dropdown buttons"/>
                  <select className="form-select" aria-label="Default select example">
                    <option selected>Year</option>
                    <option value="1">2024</option>
                    <option value="2">2025</option>
                    <option value="3">2026</option>
                  </select>
                </div>
              </div>

              <div className="col-12 pb-2">
                <Link to="/view" type="submit" className="btn btn-login-pg">
                  Create Quote
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
