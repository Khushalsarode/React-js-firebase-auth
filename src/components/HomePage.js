// HomePage.js
import React from 'react';
import './HomePage.css'; // Import the CSS file

const HomePage = () => {
  return (
    <div className="home-page">
      <h2>Welcome to Local Medical Store Online Service!</h2>
      <p>Welcome to our online platform where you can manage your medical store efficiently. Whether you're a medical store owner or a customer, we provide convenient services tailored to your needs.</p>
      
      <h3>For Medical Store Owners:</h3>
      <p>Manage your inventory, track sales, and analyze performance easily with our comprehensive tools and features.</p>
      
      <h3>For Customers:</h3>
      <p>Discover a wide range of medicines and healthcare products from trusted local pharmacies. Enjoy hassle-free ordering and quick delivery.</p>
      
      <div className="statistics-board">
        <h3>Medical Stats</h3>
        <div className="stats">
          <div className="stat-item">
            <h4>Total Medical</h4>
            <p>Value</p>
          </div>
          <div className="stat-item">
            <h4>Total Medicines</h4>
            <p>Value</p>
          </div>
          <div className="stat-item">
            <h4>Today's Orders</h4>
            <p>Value</p>
          </div>
        </div>
        
        <h3>Customer</h3>
        <div className="stats">
          <div className="stat-item">
            <h4>Total Customers</h4>
            <p>Value</p>
          </div>
          <div className="stat-item">
            <h4>Total Purchased</h4>
            <p>Value</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
