import { Navbar } from "../components/Navbar";

export default function Contributions() {
  return (
    <div
      className={`Contributions ${
        location.pathname === "/contributions" ? "contributions-background" : ""
      }`}
    >
      <Navbar />
      <h1 className="my-4 extrabold-heading">Web Application Created By</h1>
      <div className="container mt-5">
        <div className="card mx-auto" style={{ maxWidth: "1200px" }}>
          <div className="card-body">
            <form className="row g-3">
              <h1>Jacob Rangel</h1>
              <h1>Rebecca Santos</h1>
              <h1>Anthony Delgado</h1>
              <h1>Sean Eppling</h1>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
