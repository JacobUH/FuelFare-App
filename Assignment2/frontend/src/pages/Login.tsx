import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div
      className={`Login ${
        location.pathname === "/login" ? "login-background" : ""
      }`}
    >
      <Navbar />
      <div className="mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h1 className="my-4">Sign Up</h1>
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text pb-3">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3 pb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <Link to="/setup" className="btn btn-success">
                    Sign Up
                  </Link>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h1 className="my-4">Login</h1>
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text pb-3">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3 pb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <Link to="/dashboard" className="btn btn-success">
                    Login
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer color="#093d2e" />
    </div>
  );
}
