import React from 'react';
import ChatBot from '../Components/ChatBot';

const ChatPage = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Ask Nutrition Questions</h2>
      <ChatBot />
    </div>
  );
};

export default ChatPage;