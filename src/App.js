// App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import MedicalStore from './components/MedicalStore';
import Customer from './components/Customer';
import About from './components/About';
import { FirebaseProvider } from './firebase'; // Import FirebaseProvider

const App = () => {
  const [page, setPage] = useState('home');

  const handleNavbarClick = (page) => {
    setPage(page);
  };

  return (
    <FirebaseProvider> {/* Wrap your app with FirebaseProvider */}
      <div>
        <Navbar 
          setPage={handleNavbarClick} 
          projectName="Your Project Name" 
          tagline="Your Project Tagline" 
        />
        {/* Render different components based on the current page state */}
        {page === 'home' && <HomePage />}
        {page === 'medical' && <MedicalStore />}
        {page === 'customer' && <Customer />}
        {page === 'about' && <About />}
        <Footer />
      </div>
    </FirebaseProvider>
  );
}

export default App;
