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
  const [quoteRequested, setQuoteRequested] = useState(false);

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
      const userId = localStorage.getItem("userId");

      const quoteData = { user: userId, ...formData };
      console.log("Form data for new quote:", JSON.stringify(quoteData));

      //const response = await axios.post("http://localhost:8080/new", quoteData);
      //console.log("Quote created:", response.data);
      //alert("Redirecting to Estimated Quote...");
      //navigate("/view");
      setQuoteRequested(true);
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
      <div
        className="container mt-5"
        style={{ overflowY: "auto", maxHeight: "calc(100vh - 280px)" }}
      >
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
                  required
                />
              </div>
              <div className="col-12 pb-2">
                <button type="submit" className="btn btn-login-pg">
                  Request Quote
                </button>
              </div>
            </form>
          </div>
        </div>
        {quoteRequested && (
          <div className="card text-center">
            <div className="card-body-quote">
              <h1 className="card-title p-2 mt-5">Estimated Fuel Quote</h1>
              <h5 className="card-text">
                Here is what we calculated based on your information inputted
                above.
              </h5>
              <div
                className="bg-success text-white d-flex align-items-center justify-content-center py-3 mb-4 mx-auto"
                style={{ width: "650px", height: "150px" }}
              >
                {/* this is where we are going to place the estimated quote */}
                <h4 className="m-0">Your Estimated Price: $100</h4>
              </div>
              <div className="text-center pb-5">
                <button
                  type="submit"
                  className="btn btn-login-pg"
                  //onClick={handleSubmit}
                  style={{ width: "650px" }}
                >
                  Create Quote!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
