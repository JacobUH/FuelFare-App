import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useState, useEffect } from "react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved preference
    const savedDarkMode = localStorage.getItem("darkMode");

    // Return the saved preference or default to false
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  useEffect(() => {
    // Update localStorage when darkMode changes
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`Settings ${
        location.pathname === "/settings" ? "settings-background" : ""
      } ${darkMode ? "dark-mode" : ""}`}
    >
      <Navbar />
      <div className="container">
        <h1 className="my-4">Settings</h1>

        <h5 className="justify-content-center pb-1">
          In development - jacob :D
        </h5>
        <button
          type="button"
          className={`btn ${darkMode ? "btn-dark" : "btn-success"}`}
          onClick={toggleDarkMode}
        >
          {darkMode ? "Dark Mode" : "Standard Mode"}
        </button>
      </div>
      <Footer />
    </div>
  );
}
