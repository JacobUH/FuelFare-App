import React from "react";

interface FooterProps {
  color?: string;
}

export const Footer: React.FC<FooterProps> = ({ color }) => {
  const footerStyle: React.CSSProperties = {
    color: color || "#FFFFFF",
  };

  const linkStyle: React.CSSProperties = {
    textDecoration: "underline",
    color: "inherit",
  };

  return (
    <footer
      className="footer fixed-bottom d-flex justify-content-center text-center"
      style={footerStyle}
    >
      <div className="container">
        <div className="container d-flex align-items-center justify-content-center mb-2">
          <img src="/fuelfare_logo_white_cropped.svg" width="80" />
          <p className="ml-2 mb-1">
            and Copyright © {new Date().getFullYear()}
          </p>
        </div>
        <p className="ml-3">
          Built by{" "}
          <a
            href="https://github.com/JacobUH"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Jacob Rangel
          </a>
          ,{" "}
          <a
            href="https://github.com/eckybae"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Rebecca Santos
          </a>
          ,{" "}
          <a
            href="https://github.com/AnthonyD4101"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Anthony Delgado
          </a>
          , and{" "}
          <a
            href="https://github.com/SeanEppling"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Sean Eppling
          </a>
        </p>
      </div>
    </footer>
  );
};
