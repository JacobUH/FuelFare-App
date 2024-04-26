import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

interface Quote {
  _id: string;
  numGallons: number;
  fuelType: string;
  address: string;
  deliveryDate: string;
  id: number;
}

export default function View() {
  const location = useLocation(); // I used this to get to check the url if it exist for the view background

  const [quote, setQuote] = useState<Quote>({
    _id: "",
    numGallons: 0,
    fuelType: "",
    address: "",
    deliveryDate: "",
    id: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const token = localStorage.getItem("token");
        const quoteId = location.pathname.split("/")[2];
        console.log("quoteId: ", quoteId);

        const response = await axios.get(`http://localhost:8080/viewQuote/${quoteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setQuote({
          _id: response.data._id,
          numGallons: response.data.numGallons,
          fuelType: response.data.fuelType,
          address: response.data.address,
          deliveryDate: response.data.deliveryDate,
          id: response.data.user
        });
        console.log(quote);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuote();
  }, []); 

  useEffect(() => {
    console.log("quote: ", quote);
    setLoading(false);
  }, [quote]);

  return (
    <div
      className={`View ${
        location.pathname.startsWith("/view") ? "view-background" : ""
      }`}
    >
      <Navbar />
      {/*<h1>View</h1>*/}
      <div className="container-xl">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {quote._id.length === 0 ? (
            <p>No quote data available</p>
          ) : (
          <>
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
              <p className="card-title fs-2">
                Quote ID: {quote._id.length > 0 ? quote._id : ""}
              </p>

              <div className="row pb-1 mx-1">
                <div className="col-xs text-black fs-5 p-1">
                  <div className="ps-1">
                    Estimated Quote: {"ADD THE ESTIMATED COST HERE - JACOB"}
                  </div>
                </div>
              </div>
              <div className="row pb-1 mx-1">
                <div className="col-xs text-black fs-5 p-1">
                  <div className="ps-1">
                    Delivery Date:{" "}
                    {quote.deliveryDate.length > 0
                      ? new Date(quote.deliveryDate).toLocaleDateString(
                          "en-US"
                        )
                      : ""}
                  </div>
                </div>
              </div>
              <div className="row pb-1 mx-1">
                <div className="col-xs text-black fs-5 p-1">
                  <div className="ps-1">
                    Delivery Address:{" "}
                    {quote.address.length > 0 ? quote.address.toUpperCase() : ""}
                  </div>
                </div>
              </div>
              <div className="row pb-1 mx-1">
                <div className="col-xs text-black fs-5 p-1">
                  <div className="ps-1">
                    Gallons Requested:{" "}
                    {quote.numGallons > 0 ? quote.numGallons + " Gallons" : ""}
                  </div>
                </div>
              </div>
              <div className="row pb-1 mx-1">
                <div className="col-xs text-black fs-5 p-1">
                  <div className="ps-1">
                    Fuel Type:{" "}
                    {quote.fuelType.length > 0
                      ? quote.fuelType.charAt(0).toUpperCase() +
                        quote.fuelType.slice(1)
                      : ""}
                  </div>
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
          </>
          )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
