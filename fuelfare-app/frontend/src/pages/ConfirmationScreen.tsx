import { Link, useNavigate } from 'react-router-dom';

interface ConfirmationScreenProps {
  onClose: () => void; // Specify the type of onClose prop
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  onClose,
}) => {
  const navigate = useNavigate();

  const handleYes = () => {
    navigate('/');
  };

  const handleNo = () => {
    onClose();
  };

  return (
    <>
      <div className="fixed-top-0 fixed-left-0 w-100 h-100 d-flex align-items-center justify-content-center z-index-50">
        <div className="position-absolute top-0 left-0 w-100 h-100 bg-black opacity-50 z-index-60"></div>{' '}
        <div className="text-white rounded-lg p-4 shadow-lg position-relative z-index-50 d-flex flex-column align-items-center" 
            style={{ backgroundColor: "#3E3C3C" }}>
          <p className="mb-4">Are you sure you want to logout?</p>
          <div className="flex">
            <Link
              to="/"
              className="text-white font-weight-bold py-2 px-4 mr-2 rounded"
              style={{ backgroundColor: "#114B5F" }}
              onClick={handleYes}
            >
              Yes
            </Link>
            <div
              className="text-white font-weight-bold py-2 px-4 mr-2 rounded"
              style={{ backgroundColor: "#683F9C"}}
              onClick={handleNo}
            >
              No
            </div>
          </div>
        </div>
      </div>
    </>
  );
};