import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className={`Home ${location.pathname === "/" ? "home-background" : ""}`}
    >
      <Navbar />
      <h1
        className="my-4 text-center"
        style={{ fontStyle: "italic", fontWeight: "bold" }}
      >
        Find the best fuel prices for you.
      </h1>
      <img
        className="img-fluid"
        src="./images/Tint.png"
        style={{ borderRadius: 25 }}
        alt="Tint"
      />
      <div className="d-grid gap-2 col-2 mx-auto">
        <Link to="/login" className="btn btn-success my-4 home-button">
          Start Here
        </Link>
      </div>
      <Footer />
    </div>
  );
}
