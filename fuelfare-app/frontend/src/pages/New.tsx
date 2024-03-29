import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import BackButton from "../components/BackButton";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface FormData {
  numGallons: number;
  fuelType: string;
  address: string;
  deliveryDate: string;
}

export default function New() {
  const [formData, setFormData] = useState<FormData>({
    numGallons: 0,
    fuelType: "",
    address: "",
    deliveryDate: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "month" || name === "day" || name === "year") {
      const [month, day, year] = formData.deliveryDate.split("/"); // Extract month, day, year from date
      setFormData({
        ...formData,
        deliveryDate:
          name === "month"
            ? `${value}/${day}/${year}`
            : name === "day"
            ? `${month}/${value}/${year}`
            : `${month}/${day}/${value}`, // Update the corresponding part of the date
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const [marketPrice, setMarketPrice] = useState("");

  const handleFuelTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFuelType = e.target.value;
    setFormData({ ...formData, fuelType: selectedFuelType });

    switch (selectedFuelType) {
      case "regular":
        setMarketPrice("$1.50 USD"); // Regular
        break;
      case "mid":
        setMarketPrice("$1.75 USD"); // Mid
        break;
      case "premium":
        setMarketPrice("$2.00 USD"); // Premium
        break;
      case "diesel":
        setMarketPrice("$2.20 USD"); // Diesel
        break;
      default:
        setMarketPrice(""); // Default price
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Include userId in formData
      const userId = localStorage.getItem('userId');

      const quoteData = { user: userId, ...formData}
      console.log("Form data for new quote:", JSON.stringify(quoteData));

      const response = await axios.post("http://localhost:8080/new", quoteData);
      console.log("Quote created:", response.data);
      alert("Redirecting to Estimated Quote...");
      navigate("/view");
    } catch (error) {
      console.error("Error creating quote:", error);
    }
  };

  return (
    <div
      className={`New ${
        location.pathname === "/new" ? "setup-background" : ""
      }`}
    >
      <Navbar />
      <BackButton className="ms-3" />
      <div className="container mt-5">
        <div
          className="card mx-auto no-margin-top"
          style={{ maxWidth: "1000px", borderRadius: 30 }}
        >
          <div className="card-body px-5" style={{ borderRadius: 30 }}>
            <h1 className="my-4 Setup">Create a New Quote</h1>

            <form className="row g-3 row-cols-3" onSubmit={handleSubmit}>
              <div className="col-sm-2">
                <label htmlFor="inputNum" className="form-label">
                  # of Gallons
                </label>
                <input
                  type="num"
                  className="form-control"
                  id="inputNum"
                  placeholder="100"
                  name="numGallons"
                  value={formData.numGallons}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="col-sm-2">
                <label htmlFor="inputFuel" className="form-label">
                  Fuel Type
                </label>
                <select
                  className="form-select"
                  id="inputFuel"
                  aria-label="Default select example"
                  required
                  onChange={handleFuelTypeChange}
                  name="fuelType"
                  value={formData.fuelType}
                >
                  <option value="">Fuel Type</option>
                  <option value="regular">Regular</option>
                  <option value="mid">Mid</option>
                  <option value="premium">Premium</option>
                  <option value="diesel">Diesel</option>
                </select>
              </div>

              <div className="col-3">
                <label htmlFor="PricePerGallon" className="form-label">
                  Market Price per Gallon
                </label>
                <input
                  className="form-control"
                  id="PricePerGallon"
                  name="pricePerGal"
                  aria-label="Disabled input example"
                  value={marketPrice}
                  disabled
                  readOnly
                />
              </div>

              <div className="col-lg-9">
                <label htmlFor="companyAddress" className="form-label">
                  Company Address
                </label>
                <input
                  className="form-control"
                  id="companyAddress"
                  aria-label="Default control example"
                  name="address"
                  value={formData.address}
                  placeholder="Insert Address Here"
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="inputDate" className="form-label">
                  Delivery Date
                </label>
                <div className="input-group">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="month"
                    value={formData.deliveryDate.split("/")[0]}
                    onChange={handleInputChange}
                  >
                    <option value="">Month</option>
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
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="day"
                    value={formData.deliveryDate.split("/")[1]}
                    onChange={handleInputChange}
                  >
                    <option value="">Day</option>
                    {Array.from({ length: 31 }, (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="year"
                    value={formData.deliveryDate.split("/")[2]}
                    onChange={handleInputChange}
                  >
                    <option value="">Year</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                </div>
              </div>

              <div className="col-12 pb-2">
                <button type="submit" className="btn btn-login-pg">
                  Create Quote
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
