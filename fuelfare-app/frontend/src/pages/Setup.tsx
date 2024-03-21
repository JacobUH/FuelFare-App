import { Navbar } from "../components/Navbar";
import BackButton from "../components/BackButton";
import { Footer } from "../components/Footer";
import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react";

interface FormData {
  fullName: string;
  companyName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export default function Setup() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    companyName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zip: ""
  });

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email') || '';
    const password = searchParams.get('password') || '';
    
    // Update component state with email and password
    setFormData(prevState => ({
      email,
      password,
      ...prevState
    }));
  }, [location.search]);

  // Update state 'formData' based on user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  

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

            <form className="row g-3">
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
                  onChange={handleInputChange}
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
                />
              </div>

              <div className="col-md-2">
                <label htmlFor="inputState" className="form-label">
                  State
                </label>
                <select id="inputState" className="form-select" name="state" value={formData.state} onChange={handleInputChange}>
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
                <select id="inputState" className="form-select" name="country" value={formData.country} onChange={handleInputChange}>
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
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-login-pg"
                >
                  Setup Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
