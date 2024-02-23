import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back one step in history
  };

  return (
    <button
      onClick={handleBack}
      className="btn btn-secondary my-4 setup-back-button ms-3"
    >
      Back
    </button>
  );
};

export default BackButton;
