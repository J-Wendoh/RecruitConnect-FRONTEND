// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatComponent from './Chatcomponent'; // Import the ChatComponent
import "../Navbar.css";

const Navbar = () => {
  const [showChat, setShowChat] = useState(false);
  const [dropdown, setDropdown] = useState({
    login: false
  });

  const toggleDropdown = (type) => {
    setDropdown((prev) => ({
      login: type === "login" ? !prev.login : false
    }));
  };

  const handleToggleChat = () => {
    setShowChat(!showChat);
  };

  const NavItem = ({ title, isOpen, toggle, children }) => (
    <div className="nav-item">
      <button onClick={toggle} className="nav-button">
        {title}
      </button>
      {isOpen && <div className="dropdown">{children}</div>}
    </div>
  );

  const DropdownItem = ({ to, children }) => (
    <Link to={to} className="dropdown-item">
      {children}
    </Link>
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="/logo1.png" alt="Logo" className="logo" />
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <NavItem
            title="Login"
            isOpen={dropdown.login}
            toggle={() => toggleDropdown("login")}
          >
            <DropdownItem to="/employer-login">As Employer</DropdownItem>
            <DropdownItem to="/seeker-login">As Job-Seeker</DropdownItem>
          </NavItem>
          <Link to="/register" className="nav-button">
            Register
          </Link>
          <button onClick={handleToggleChat} className="chat-button">
            Chat
          </button>
        </div>
      </div>
      {showChat && <ChatComponent />}
    </nav>
  );
};

export default Navbar;
