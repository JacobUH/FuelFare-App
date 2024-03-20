import React from "react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back one step in history
  };

  return (
    <button
      onClick={handleBack}
      className={`btn btn-secondary my-4 setup-back-button ${className}`}
    >
      Back
    </button>
  );
};

export default BackButton;
