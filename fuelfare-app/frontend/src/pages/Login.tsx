import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useState } from "react";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData> ({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formData;
  
    // Store the email and password in sessionStorage
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('password', password);
  
    // DEBUGGING
    console.log("Stored Email:", email);
    console.log("Stored Password:", password);
    
    // Redirecting to the signup page
    navigate('/setup');
  };

  return (
    <div
      className={`Login ${
        location.pathname === "/login" ? "login-background" : ""
      }`}
    >
      <Navbar />
      <BackButton className="ms-3" />
      <div>
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h1
                  className="my-4 text-center"
                  style={{ color: "rgb(17,75,95)" }}
                >
                  Sign Up
                </h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
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
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-login-pg">
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h1
                  className="my-4 text-center"
                  style={{ color: "rgb(17,75,95)" }}
                >
                  Login
                </h1>
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
                  <div className="text-center">
                    <Link to="/dashboard" className="btn btn-login-pg">
                      Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
