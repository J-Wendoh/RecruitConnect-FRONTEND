// components/FloatingButton.jsx
import React from 'react';
import { useHistory } from 'react-router-dom';
import './FloatingButton.css'; // Create and add styles for the button

const FloatingButton = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/chat'); // Navigate to the chat page
  };

  return (
    <button className="floating-button" onClick={handleClick}>
      Chat
    </button>
  );
};

export default FloatingButton;
