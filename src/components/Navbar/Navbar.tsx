import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <span
          className="navbar-brand code fw-bold"
          role="button"
          onClick={() => navigate('/')}
        >
          Static Pages
        </span>
        <div className="collapse navbar-collapse">
          <ul className="nav-pills navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link me-2">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="pages/admin" className="nav-link" style={{color: '#ff9090'}}>Admin</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;