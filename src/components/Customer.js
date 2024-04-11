import React, { useState, useEffect } from 'react';
import { useFirebase } from '../firebase'; // Import the Firebase hook
import './Customer.css'; // Import the CSS file for styling
import { FcGoogle } from "react-icons/fc";

const Customer = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State variable to track login status
  const [showLogin, setShowLogin] = useState(true); // State variable to toggle between login and register
  const [userData, setUserData] = useState(null); // State variable to store user data

  const { 
    signinUserWithEmailAndPassword, 
    signinWithGoogle, 
    signupUserWithEmailAndPassword, 
    signOut,
    user // user object from Firebase context
  } = useFirebase();

  useEffect(() => {
    if (user) {
      setUserData(user); // Set user data when user is logged in
      setIsLoggedIn(true);
    } else {
      setUserData(null); // Clear user data when user is logged out
      setIsLoggedIn(false);
    }
  }, [user]);

  const handleToggleSection = () => {
    setShowLogin(!showLogin);
    setError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }
      await signinUserWithEmailAndPassword(email, password);
      console.log('Logged in successfully');
    } catch (error) {
      console.error('Error signing in:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut();
    setIsLoggedIn(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }
      await signupUserWithEmailAndPassword(email, password);
      console.log('Registered and logged in successfully');
    } catch (error) {
      console.error('Error registering:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    setLoading(true);
    try {
      await signinWithGoogle();
      console.log('Logged in with Google successfully');
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-container">
      {isLoggedIn ? (
        <div>
          <h2 className="title">Welcome, {userData.displayName || userData.email || 'User'}!</h2>
          <button className="button" onClick={handleLogout}>Logout</button>
          {/* Add your logged-in content here */}
        </div>
      ) : (
        <div>
          <h2 className="title">Customer Login / Signup</h2>
          <form className="form-container">
            <h3>{showLogin ? 'Login' : 'Register'}</h3>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              disabled={loading}
            />
            {showLogin ? (
              <>
                <button className="button" onClick={handleLogin} disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                <button className="button" onClick={handleLoginWithGoogle} disabled={loading}>
                  {loading ? 'Logging in with Google...' : (
                    <>
                      <FcGoogle style={{ marginRight: '8px', color: '#DB4437' }} /> Login with Google
                    </>
                  )}
                </button>
              </>
            ) : (
              <button className="button" onClick={handleRegister} disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
            )}
            {!showLogin && (
              <p className="toggle-section" onClick={handleToggleSection}>Already have an account? Login</p>
            )}
            {error && <p className="error-message">{error}</p>}
          </form>
          <button className="toggle-section" onClick={handleToggleSection}>
            {showLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Customer;
