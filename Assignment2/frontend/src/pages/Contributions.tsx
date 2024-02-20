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
        <div className="card mx-auto" style={{ maxWidth: "1200px", borderRadius: 50 }}>
          <div className="card-body container" style={{ borderRadius: 50 }}>
            <div className="row">
              <div className="col-1"></div>
              <div className="col-8 text-start"><h1>Jacob Rangel</h1></div>
              <div className="col"><a href="mailto:jacobrangel0628@gmail.com"><img src="/images/Message.png" width="50" height="50"/></a></div>
            </div>
            <div className="row">
              <div className="col-1"></div>
              <div className="col-8 text-start"><h1>Rebecca Santos</h1></div>
              <div className="col"><a href="mailto:rebeccamsantos7@gmail.com"><img src="/images/Message.png" width="50" height="50"/></a></div>
            </div>
            <div className="row">
              <div className="col-1"></div>
              <div className="col-8 text-start"><h1>Anthony Delgado</h1></div>
              <div className="col"><a href="mailto:anthonyd4101@gmail.com"><img src="/images/Message.png" width="50" height="50"/></a></div>
            </div>
            <div className="row">
              <div className="col-1"></div>
              <div className="col-8 text-start"><h1>Sean Eppling</h1></div>
              <div className="col"><a href="mailto:epplingsean@gmail.com"><img src="/images/Message.png" width="50" height="50"/></a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
