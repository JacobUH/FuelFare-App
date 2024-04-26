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

  const [quote, setQuote] = useState<Quote[]>([]);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:8080/viewQuote", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setQuote(response.data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div
      className={`View ${
        location.pathname.startsWith("/view") ? "view-background" : ""
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
            <p className="card-title fs-2">
              Quote ID: {quote.length > 0 ? quote[0]._id : ""}
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
                  {quote.length > 0
                    ? new Date(quote[0].deliveryDate).toLocaleDateString(
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
                  {quote.length > 0 ? quote[0].address.toUpperCase() : ""}
                </div>
              </div>
            </div>
            <div className="row pb-1 mx-1">
              <div className="col-xs text-black fs-5 p-1">
                <div className="ps-1">
                  Gallons Requested:{" "}
                  {quote.length > 0 ? quote[0].numGallons + " Gallons" : ""}
                </div>
              </div>
            </div>
            <div className="row pb-1 mx-1">
              <div className="col-xs text-black fs-5 p-1">
                <div className="ps-1">
                  Fuel Type:{" "}
                  {quote.length > 0
                    ? quote[0].fuelType.charAt(0).toUpperCase() +
                      quote[0].fuelType.slice(1)
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
      </div>
      <Footer />
    </div>
  );
}
