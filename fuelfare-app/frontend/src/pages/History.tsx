import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";

export default function History() {
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
                    <th style={{ textAlign: "right" }}>Date</th>
                    <th style={{ textAlign: "right" }}>Estimated Quote</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
