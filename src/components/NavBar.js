import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; //

const NavBar = ({ user, userRole, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    console.log("Toggling user dropdown");
    setDropdownOpen(!dropdownOpen);
  };

  const toggleDropdown1 = () => {
    console.log("Toggling navigation dropdown");
    setDropdownOpen1(!dropdownOpen1);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    onLogout();
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-color fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand bg-color" to="/">NewsHub</Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleDropdown1}
          aria-expanded={dropdownOpen1 ? 'true' : 'false'}
          aria-label="Toggle navigation"
          style={{ backgroundColor: 'rgb(130, 106, 251)', color: 'white', paddingTop: '10px' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${dropdownOpen1 ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" style={{ color: 'white' }} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: 'white' }} to="/business">Business</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: 'white' }} to="/entertainment">Entertainment</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: 'white' }} to="/">General</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: 'white' }} to="/health">Health</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: 'white' }} to="/science">Science</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: 'white' }} to="/sports">Sports</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: 'white' }} to="/technology">Technology</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: 'white' }} to="/demo">demo</Link>
            </li>

            {userRole === "Admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" style={{ color: 'white' }} to="/NewsList">NewsList</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" style={{ color: 'white' }} to="/NewsData">NewsDetails</Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ml-auto">
            {user ? (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-danger dropdown-toggle"
                  onClick={toggleDropdown}
                  aria-expanded={dropdownOpen ? 'true' : 'false'}
                >
                  Welcome, {user}
                </button>
                <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" style={{ color: 'white' }} to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
