// Notification.jsx
import React, { useEffect, useState } from 'react';
import useSocket from './socketio';

const Notification = () => {
  const socket = useSocket('http://localhost:5000');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on('job_update', (data) => {
        setNotifications((prev) => [...prev, data]);
      });

      socket.on('application_update', (data) => {
        setNotifications((prev) => [...prev, data]);
      });
    }
  }, [socket]);

  return (
    <div>
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
