// src/Components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.name) setUserName(user.name);
  }, []);

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Nutrition Agent</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto d-flex align-items-center">
          <li className="nav-item">
            <Link className="nav-link" to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/chat">Ask AI</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/history">History</Link>
          </li>
          <li className="nav-item position-relative">
            <button className="profile-button ms-3" onClick={togglePopup}>Profile</button>
            {showPopup && (
              <div className="profile-dropdown">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="profile"
                  width="60"
                  height="60"
                  className="mb-2"
                />
                <div><strong>{userName || 'User'}</strong></div>
                <button className="btn btn-info mt-2" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
