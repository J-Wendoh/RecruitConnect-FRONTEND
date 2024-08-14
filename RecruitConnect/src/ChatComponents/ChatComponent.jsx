import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './ChatComponent.css';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('http://localhost:5000');
    
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
    
    socket.current.on('receive_message', (msg) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (message && selectedUser) {
      const msg = { content: message, to: selectedUser };
      socket.current.emit('send_message', msg);
      setMessages(prevMessages => [...prevMessages, msg]);
      setMessage('');
    }
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="chat-container">
      <div className="user-search">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users..."
          className="search-input"
        />
        <ul className="user-list">
          {filteredUsers.map(user => (
            <li
              key={user.id}
              onClick={() => setSelectedUser(user.username)}
              className={`user-item ${selectedUser === user.username ? 'selected' : ''}`}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
      <div className="message-container">
        {selectedUser && (
          <>
            <div className="chat-header">
              Chat with {selectedUser}
            </div>
            <div className="message-history">
              {messages
                .filter(msg => msg.to === selectedUser || msg.to === 'all')
                .map((msg, index) => (
                  <div key={index} className={`message-bubble ${msg.to === selectedUser ? 'received' : 'sent'}`}>
                    <div className="message-content">{msg.content}</div>
                  </div>
                ))}
            </div>
            <div className="message-input-container">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="message-input"
              />
              <button
                onClick={handleSendMessage}
                className="send-button"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
