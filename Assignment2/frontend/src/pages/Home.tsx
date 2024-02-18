import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <div className="Home">
      <Navbar />
      <h1>Find the best fuel prices for you</h1>
      <img className="img-fluid" src="./images/Tint.png"></img>
      <div className="d-grid gap-2 col-2 mx-auto">
        <button className="btn btn-primary" type="button">
          Start Here
        </button>
      </div>
    </div>
  );
}
