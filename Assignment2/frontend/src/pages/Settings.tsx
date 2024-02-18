import { Navbar } from "../components/Navbar";

export default function Settings() {
  return (
    <div
      className={`Settings ${
        location.pathname === "/settings" ? "settings-background" : ""
      }`}
    >
      <Navbar />
      <h1 className="my-4">Settings</h1>
    </div>
  );
}
