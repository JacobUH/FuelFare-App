import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogoutScreen } from "./LogoutScreen"; // Import your LogoutScreen component

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [showLogoutScreen, setShowLogoutScreen] = useState(false);

  const handleHomeClick = () => {
    const currentPath = window.location.pathname;
    const excludedPaths = [
      "/",
      "/home",
      "/contributions",
      "/login",
      "/setup",
      "/settings",
    ];

    if (!excludedPaths.includes(currentPath)) {
      setShowLogoutScreen(true);
    } else {
      navigate("/");
    }
  };

  const handleLogoutScreenClose = () => {
    setShowLogoutScreen(false);
  };

  const logoStyle: React.CSSProperties = {
    color: "#F3E9D2",
    transition: "transform 0.3s", // Added transition property
  };

  const handleLogoHover = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "scale(1.1)"; // Increase the scale on hover
  };

  const handleLogoLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "scale(1)"; // Reset the scale on leave
  };

  const nonClickablePaths = [
    "/",
    "/home",
    "/contributions",
    "/login",
    "/setup",
    "/settings",
  ];

  return (
    <>
      {showLogoutScreen && <LogoutScreen onClose={handleLogoutScreenClose} />}{" "}
      {/* Render LogoutScreen conditionally */}
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          {/* Home icon on the left */}
          <div
            className="navbar-brand"
            style={{ marginRight: "88px", cursor: "pointer" }}
            onClick={handleHomeClick}
          >
            <img src="/images/Home.png" width="30" height="24" alt="Home" />
          </div>

          {/* Logo Icon and Company Name */}
          {nonClickablePaths.includes(location.pathname) ? (
            <div
              className="navbar-brand text"
              style={logoStyle}
              onMouseOver={handleLogoHover}
              onMouseLeave={handleLogoLeave}
            >
              <img
                src="/fuelfare_logo.svg"
                width="130"
                height="130"
                alt="Logo"
              />
            </div>
          ) : (
            <Link to="/dashboard">
              <div
                className="navbar-brand text"
                style={logoStyle}
                onMouseOver={handleLogoHover}
                onMouseLeave={handleLogoLeave}
              >
                <img
                  src="/fuelfare_logo.svg"
                  width="130"
                  height="130"
                  alt="Logo"
                />
              </div>
            </Link>
          )}
          {/* Contributors and Settings icons on the right */}
          <div className="d-flex">
            <Link to="/contributions" className="navbar-brand">
              <img
                src="/images/Order.png"
                alt="Contributors"
                width="30"
                height="24"
              />
            </Link>

            <Link to="/settings" className="navbar-brand">
              {/* Add inline style for margin */}
              <img
                src="/images/Filter.png"
                alt="Settings"
                width="30"
                height="24"
              />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
