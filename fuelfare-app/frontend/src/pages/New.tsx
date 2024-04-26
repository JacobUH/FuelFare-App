import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import BackButton from "../components/BackButton";
import { useState, useEffect } from "react";
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

  const [marketPrice, setMarketPrice] = useState(0.0);
  const [marketPriceString, setMarketPriceString] = useState("");
  const [quoteRequested, setQuoteRequested] = useState(false);
  const [pricePerGallon, setPricePerGallon] = useState(0.0);
  const [quotePrice, setQuotePrice] = useState(0.0);

  useEffect(() => {
    console.log("pricePerGallon:", pricePerGallon);
    const qp = pricePerGallon * formData.numGallons;
    setQuotePrice(parseFloat(qp.toFixed(2)));
  }, [pricePerGallon]);
  useEffect(() => {
    console.log("quotePrice:", quotePrice);
  }, [quotePrice]);

  const handleFuelTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFuelType = e.target.value;
    setFormData({ ...formData, fuelType: selectedFuelType });

    switch (selectedFuelType) {
      case "regular":
        setMarketPrice(1.5); // Regular
        setMarketPriceString("$1.50 USD");
        break;
      case "mid":
        setMarketPrice(1.75); // Mid
        setMarketPriceString("$1.75 USD");
        break;
      case "premium":
        setMarketPrice(2.0); // Premium
        setMarketPriceString("$2.00 USD");
        break;
      case "diesel":
        setMarketPrice(2.2); // Diesel
        setMarketPriceString("$2.20 USD");
        break;
      default:
        setMarketPrice(0); // Default price
        setMarketPriceString("");
        break;
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString();
    let day = today.getDate().toString();

    // Add leading zero if month/day is less than 10
    if (month.length === 1) month = "0" + month;
    if (day.length === 1) day = "0" + day;

    return `${year}-${month}-${day}`;
  };

  const handleRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Include userId in formData
      const userId = localStorage.getItem("userId");

      const quoteData = { user: userId, ...formData };
      console.log("Form data for new quote:", JSON.stringify(quoteData));
      setQuoteRequested(true);

      const fetchQuoteCalcData = async () => {
        try {
          const token = localStorage.getItem("token");

          const response = await axios.get(
            "http://localhost:8080/getQuotePrice",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Response data: ", response.data);
          const userState = response.data.userState;
          console.log("User State: ", userState);
          const countQuote = response.data.countQuote;
          console.log("User Quotes: ", countQuote);
          let margin = 0.1;

          console.log("Number of Gallons:", formData.numGallons);

          if (userState === "TX") {
            margin = margin + 0.02;
          } else {
            margin = margin + 0.04;
          }
          if (countQuote > 0) {
            margin = margin - 0.01;
          }
          if (formData.numGallons > 1000) {
            margin = margin + 0.02;
          } else {
            margin = margin + 0.03;
          }
          console.log("pre margin: ", margin);
          margin = margin * marketPrice;
          console.log("market price: ", marketPrice);
          console.log("margin: ", margin);
          const ppg = marketPrice + margin;
          setPricePerGallon(ppg);
          console.log(pricePerGallon);
          // const qp = pricePerGallon * formData.numGallons;
          // setQuotePrice(qp);
          console.log(quotePrice);
          // setQuoteRequested(true);
        } catch (error) {
          console.error("Error fetching calc data:", error);
        }
      };

      fetchQuoteCalcData();
    } catch (error) {
      console.error("Error creating quote:", error);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const quoteData = {
        user: userId,
        ...formData,
        pricePerGallon: pricePerGallon,
        totalPrice: quotePrice,
      };
      const response = await axios.post("http://localhost:8080/new", quoteData);
      console.log("Quote created:", response.data);
      alert("Redirecting to Estimated Quote...");
      setQuoteRequested(false);
      const id = response.data._id;
      navigate(`/view/${id}`);
    } catch (error) {
      console.error("Error signing up:", error);
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
            <form className="row g-3 row-cols-3" onSubmit={handleRequest}>
              <div className="col-sm-2">
                <label htmlFor="inputNum" className="form-label">
                  # of Gallons
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputNum"
                  placeholder="100"
                  name="numGallons"
                  value={formData.numGallons}
                  onChange={handleInputChange}
                  min={1}
                  step={1}
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
                  value={marketPriceString}
                  disabled
                  readOnly
                />
              </div>
              <div className="col-sm-3">
                <label htmlFor="deliveryDate" className="form-label">
                  Delivery Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="deliveryDate"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  min={getCurrentDate()}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-lg-10">
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
                <h4 className="m-0">Your Estimated Price: ${quotePrice}</h4>
              </div>
              <div className="text-center pb-5">
                <button
                  type="submit"
                  className="btn btn-login-pg"
                  onClick={handleSubmit}
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
