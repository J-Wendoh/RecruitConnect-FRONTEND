import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      // Clear authentication tokens
      localStorage.removeItem('userAuthToken');
      localStorage.removeItem('employerAuthToken');
      sessionStorage.removeItem('userAuthToken');
      sessionStorage.removeItem('employerAuthToken');

      // Perform logout API request
      await fetch('/api/logout', { method: 'POST' });

      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Logging out...</p>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};

export default Logout;
