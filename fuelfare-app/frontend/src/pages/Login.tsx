import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useState } from "react";
import axios from "axios";

interface FormData {
  email: string;
  password: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formData;

    // Store the email and password in sessionStorage
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("password", password);

    // DEBUGGING
    console.log("Stored Email:", email);
    console.log("Stored Password:", password);

    // Redirecting to the signup page
    navigate("/setup");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // DEBUGGING
    console.log(loginFormData)

    try {
      const response = await axios.post("http://localhost:8080/login", loginFormData);
      console.log('Login response:', response.data);
      // Handle successful login, e.g., store token in localStorage and redirect
      localStorage.setItem('token', response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error, e.g., display error message
      alert('Login failed. Please check your credentials.');
    }
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
                      required
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
                      required
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
                <form onSubmit={handleLogin}>
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
                      value={loginFormData.email}
                      onChange={handleLoginInputChange}
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
                      value={loginFormData.password}
                      onChange={handleLoginInputChange}
                    />
                  </div>
                  <div className="text-center">
                  <button type="submit" className="btn btn-login-pg">Login</button>
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
