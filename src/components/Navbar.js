// Navbar.js
import React from 'react';
import './Navbar.css'; // Import the CSS file

const Navbar = ({ setPage, projectName, tagline }) => {
  return (
    <nav>
      <header>
        <div className="logo">
          <img src="/path/to/your/logo.png" alt="Logo" />
          <div>
            <h1>{projectName}</h1>
            <p>{tagline}</p>
          </div>
        </div>
      </header>
      <ul>
        <li onClick={() => setPage('home')}>Home</li>
        <li onClick={() => setPage('medical')}>Medical Store</li>
        <li onClick={() => setPage('customer')}>Customer</li>
        <li onClick={() => setPage('about')}>AboutUs</li>
      </ul>
    </nav>
  );
}

export default Navbar;
