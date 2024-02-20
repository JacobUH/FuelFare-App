import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Home icon on the left */}
        <Link to="/" className="navbar-brand" style={{ marginRight: "80px" }}>
          <img src="/images/Home.png" width="30" height="24" alt="Home" />
        </Link>

        {/* Centered Logo and Company Name */}
        <div className="d-flex align-items-center">
          {/* Company logo and title in the middle */}
          <Link to="/" className="navbar-brand">
            Generic Gas Company
          </Link>
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
