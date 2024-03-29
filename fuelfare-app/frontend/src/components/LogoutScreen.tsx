import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface LogoutScreenProps {
  onClose: () => void; // Specify the type of onClose prop
}

export const LogoutScreen: React.FC<LogoutScreenProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleYes = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleNo = () => {
    onClose();
  };

  return (
    <div
      className="position-fixed top-0 left-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ zIndex: 50 }}
    >
      <div
        className="position-absolute top-0 left-0 w-100 h-100 bg-dark"
        style={{ opacity: 0.8, zIndex: 40 }}
      ></div>
      <div
        className="bg-dark text-white rounded p-5 shadow"
        style={{ zIndex: 50 }}
      >
        <p className="mb-4">Are you sure you want to logout?</p>
        <div className="d-flex justify-content-between">
          <Link to="/" className="btn btn-secondary px-5 " onClick={handleYes}>
            Yes
          </Link>
          <button className="btn btn-success px-5" onClick={handleNo}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};
