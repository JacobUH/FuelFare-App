import { Navbar } from "../components/Navbar";

export default function History() {

  return (
    <div className={`History ${
      location.pathname === "/history" ? "history-background" : ""
    }`}
    >
      <Navbar />
      <h1 className="mt-3 text-center">History Page</h1>
      <div className="mt-4">
        <div className="row justify-content-center">
          <div className="hist-card">
            <div className="table-area">
              <table className="table">
                <thead>
                  <tr>
                    <th>Quote ID</th>
                    <th style={{ textAlign: "right" }}>Date</th>
                    <th style={{ textAlign: "right" }}>Estimated Quote</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
