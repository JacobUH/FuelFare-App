import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

interface Quote {
  _id: string;
  numGallons: number;
  fuelType: string;
  address: string;
  deliveryDate: string;
  id: number;
}

export default function History() {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get("http://localhost:8080/quotes", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const quotesWithIds: Quote[] = response.data.map((quote: Quote, index: number) => ({
          ...quote,
          id: index + 1
        }));

        setQuotes(quotesWithIds);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div
      className={`History ${
        location.pathname === "/history" ? "history-background" : ""
      }`}
    >
      <Navbar />
      <Link
        to="/dashboard"
        className="btn btn-secondary my-4 setup-back-button ms-3"
      >
        Back
      </Link>
      <div className="mt-4">
        <div className="row justify-content-center">
          <div className="hist-card">
            <div className="btn btn-primary">All Quotes</div>
            <div className="table-area">
              <table className="table">
                <thead>
                  <tr>
                    <th>Quote ID</th>
                    <th style={{ textAlign: "right" }}>Number of Gallons</th>
                    <th style={{ textAlign: "right" }}>Fuel Type</th>
                    <th style={{ textAlign: "right" }}>Address</th>
                    <th style={{ textAlign: "right" }}>Delivery Date</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((quote) => (
                    <tr key={quote._id}>
                      <td>{quote.id}</td>
                      <td style={{ textAlign: "right" }}>{quote.numGallons}</td>
                      <td style={{ textAlign: "right" }}>{quote.fuelType}</td>
                      <td style={{ textAlign: "right" }}>{quote.address}</td>
                      <td style={{ textAlign: "right" }}>{quote.deliveryDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
