import { Navbar } from "../components/Navbar";

export default function Login() {
  return (
    <div
      className={`Login ${
        location.pathname === "/login" ? "login-background" : ""
      }`}
    >
      <Navbar />
      <h1 className="my-4">Login</h1>;
    </div>
  );
}
