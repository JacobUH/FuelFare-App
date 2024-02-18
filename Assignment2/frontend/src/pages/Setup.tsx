import { Navbar } from "../components/Navbar";

export default function Setup() {
  return (
    <div
      className={`Setup ${
        location.pathname === "/setup" ? "setup-background" : ""
      }`}
    >
      <Navbar />
      <div className="container mt-5">
        <div className="card mx-auto" style={{ maxWidth: "1000px" }}>
          <div className="card-body">
            <h1 className="my-4">Setup</h1>

            <form className="row g-3">
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">
                    Company Name
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label">
                    Company Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                  />
                </div>

                <div className="col-md-3">
                  <label htmlFor="inputCity" className="form-label">
                    City
                  </label>
                  <input type="text" className="form-control" id="inputCity" />
                </div>

                <div className="col-md-2">
                  <label htmlFor="inputState" className="form-label">
                    State
                  </label>
                  <select id="inputState" className="form-select">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="inputState" className="form-label">
                    Country
                  </label>
                  <select id="inputState" className="form-select">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>

                <div className="col-md-2">
                  <label htmlFor="inputZip" className="form-label">
                    Zip
                  </label>
                  <input type="text" className="form-control" id="inputZip" />
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-success">
                    Sign in
                  </button>
                </div>
              </form>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
