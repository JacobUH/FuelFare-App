import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";

interface userFormData {
  fullName: string;
  companyName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

interface passwordFormData {
  newPassword: string;
}

export default function UpdateAccount() {
  // User info form
  const [formData, setFormData] = useState<userFormData>({
    fullName: "",
    companyName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zip: ""
  })

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('api/addData', formData);
      const newData = response.data;
      //const updatedData = [...data, ...newData];
      //setData(updatedData);
    } 
    catch (error) {
      console.error('Error:', error);
    }
  }

  // Password info form
  const [pwdFormData, setPwdFormData] = useState<passwordFormData>({
    newPassword: ""
  })
  
  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPwdFormData({ ...pwdFormData, [name]: value})
  }

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('api/addData', formData);
      const newData = response.data;
      //const updatedData = [...data, ...newData];
      //setData(updatedData);
    } 
    catch (error) {
      console.error('Error:', error);
    }
  }


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
      className={`UpdateAccount ${
        location.pathname === "/updateAccount" ? "update-background" : ""
      }`}
    >
      <Navbar />
      <BackButton className="ms-3" />

      <div className="mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 mb-4">
            <div className="card no-margin-top">
              <div className="card-body">
                <h1
                  className="my-4 text-center"
                  style={{ color: "rgb(17,75,95)" }}
                >
                  Update User Info
                </h1>

                <form className="row g-3" onSubmit={handleUserSubmit}>
                  <div className="col-md-6">
                    <label htmlFor="inputFullName" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputFullName"
                      placeholder="John Smith"
                      maxLength={nameMaxLength}
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleUserInputChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="inputName" className="form-label">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="John's Apple Farm"
                      maxLength={nameMaxLength}
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleUserInputChange}
                    />
                  </div>

                  <div className="col-6">
                    <label htmlFor="inputAddress" className="form-label">
                      Company Address 1
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      placeholder="1234 Main St"
                      maxLength={addressMaxLength}
                      name="address1"
                      value={formData.address1}
                      onChange={handleUserInputChange}
                    />
                  </div>

                  <div className="col-6">
                    <label htmlFor="inputAddress" className="form-label">
                      Company Address 2
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      placeholder="1234 Main St"
                      maxLength={addressMaxLength}
                      name="address2"
                      value={formData.address2}
                      onChange={handleUserInputChange}
                    />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="inputCity" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCity"
                      maxLength={cityMaxLength}
                      name="city"
                      value={formData.city}
                      onChange={handleUserInputChange}
                    />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputState" className="form-label">
                      State
                    </label>
                    <select id="inputState" className="form-select">
                      <option selected>Choose...</option>
                      {states.map((state, index) => (
                        <option key={index}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="inputState" className="form-label">
                      Country
                    </label>
                    <select id="inputState" className="form-select">
                      <option selected>Choose...</option>
                      <option>United States</option>
                      <option>Others Here...</option>
                    </select>
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputZip" className="form-label">
                      Zip
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputZip"
                      minLength={zipcodeMinLength}
                      maxLength={zipcodeMaxLength}
                      name="zip"
                      value={formData.zip}
                      onChange={handleUserInputChange}
                    />
                  </div>
                  <div className="text-center">
                    <Link to="/dashboard" className="btn btn-login-pg">
                      Confirm Changes
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card no-margin-top">
              <div className="card-body">
                <h1
                  className="my-4 text-center"
                  style={{ color: "rgb(17,75,95)" }}
                >
                  Update Password
                </h1>
                <form onSubmit={handlePasswordSubmit}>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      name="newPassword"
                      value={pwdFormData.newPassword}
                      onChange={handlePasswordInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="text-center">
                    <Link to="/dashboard" className="btn btn-login-pg">
                      Confirm Changes
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
