// ChatComponent.jsx
import React from 'react';
import { ChatEngine } from 'react-chat-engine';
import { useAuth } from './useAuth'; // Assuming you have an authentication hook

const ChatComponent = () => {
  const { user } = useAuth(); // Hook to get user info

  if (!user) {
    return <div>Please log in to access the chat.</div>;
  }

  return (
    <ChatEngine
      height="calc(100vh - 60px)" // Adjust based on your layout
      projectID="YOUR_PROJECT_ID" // Replace with your project ID
      userName={user.username}
      userSecret={user.password} // Use token or password depending on your setup
    />
  );
};

export default ChatComponent;
