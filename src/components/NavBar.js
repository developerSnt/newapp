import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';

const NavBar = ({ user, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
 
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const navigate=useNavigate()
  const handleLogout = () => {
    onLogout(); 
    setDropdownOpen(false); 
    navigate('/login');
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">NewsHub</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${dropdownOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link " style={{ color: 'white' }} to="/">Home</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/about" style={{ color: 'white' }}>About Us</Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/business" style={{ color: 'white' }}>Business</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/entertainment" style={{ color: 'white' }}>Entertainment</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: 'white' }}>General</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/health" style={{ color: 'white' }}>Health</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/science" style={{ color: 'white' }}>Science</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sports" style={{ color: 'white' }}>Sports</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/technology" style={{ color: 'white' }}>Technology</Link>
            </li>
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
                <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} >
                  <li>
                    <button className="dropdown-item" onClick={handleLogout} >Logout</button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login" style={{ color: 'white' }}>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
