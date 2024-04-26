import { Navbar } from "../components/Navbar";
import BackButton from "../components/BackButton";
import { Footer } from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

interface FormData {
  fullName: string;
  companyName: string;
  companyAddress1: string;
  companyAddress2: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export default function Setup() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    companyName: "",
    companyAddress1: "",
    companyAddress2: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Retrieve data from sessionStorage
    const storedEmail = sessionStorage.getItem("email") || "";

    // Update component state with email and password
    setFormData((prevState) => ({
      email: storedEmail,
      ...prevState,
    }));
  }, [location.search]);

  // Update state 'formData' based on user input
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Form data:", JSON.stringify(formData));
      const response = await axios.post(
        "http://localhost:8080/setup",
        formData
      );
      console.log("User created:", response.data);
      alert(
        "Account creation successful! Thank you for using fuelfare.\nDirecting to Login page for account login."
      );
      navigate("/login");
    } catch (error) {
      // Check if the error is due to email already existing
      const err = error as any;
      if (
        err.response &&
        err.response.data &&
        err.response.data.error === "Email already exists in the database"
      ) {
        setError("Email already exists in the fuelfare system.");
      } else {
        console.error("Error signing up:", error);
      }
    }
  };

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
      className={`Setup ${
        location.pathname === "/setup" ? "setup-background" : ""
      }`}
    >
      <Navbar />
      <BackButton className="ms-3" />
      <div className="container mt-5">
        <div
          className="card mx-auto no-margin-top"
          style={{ maxWidth: "1000px", borderRadius: 30 }}
        >
          <div className="card-body" style={{ borderRadius: 30 }}>
            <h1 className="Setup">Setup Account</h1>

            <form className="row g-3" onSubmit={handleSubmit}>
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
                  onChange={handleInputChange}
                  required
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
                  onChange={handleInputChange}
                  required
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
                  name="companyAddress1"
                  value={formData.companyAddress1}
                  onChange={handleInputChange}
                  required
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
                  name="companyAddress2"
                  value={formData.companyAddress2}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="col-md-2">
                <label htmlFor="inputState" className="form-label">
                  State
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                >
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
                <select
                  id="inputState"
                  className="form-select"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                >
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
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-login-pg">
                  Setup Account
                </button>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
