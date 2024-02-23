import React from "react";
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
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

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Home icon on the left */}
        <Link to="/" className="navbar-brand" style={{ marginRight: "88px" }}>
          <img src="/images/Home.png" width="30" height="24" alt="Home" />
        </Link>

        {/* Logo Icon and Company Name */}
        <div
          className="navbar-brand text"
          style={logoStyle}
          onMouseOver={handleLogoHover}
          onMouseLeave={handleLogoLeave}
        >
          <img src="/fuelfare_logo.svg" width="130" height="130" alt="Logo" />
        </div>

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
  );
};
