import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'
const Logout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useAuth()

  const handleLogout = async () => {
    setLoading(true);
    try {
     
      localStorage.removeItem('userAuthToken');
      localStorage.removeItem('employerAuthToken');
      sessionStorage.removeItem('userAuthToken');
      sessionStorage.removeItem('employerAuthToken');

    
      await fetch('/api/logout', { method: 'POST' });

      setIsAuthenticated(false);

      
      navigate('/');
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
