// src/pages/HomePage.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Make sure your styles are defined here

const HomePage = () => {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "ceaab0de-a3f6-48c2-b9c0-2e55e7ce5f13", // Your IBM Watson integration ID
      region: "au-syd", // Your IBM region
      serviceInstanceID: "cc9647e4-30f9-463a-9a0a-8c928061a3e8", // Your Watson service instance ID
      onLoad: async (instance) => { await instance.render(); }
    };

    setTimeout(() => {
      const t = document.createElement('script');
      t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
              (window.watsonAssistantChatOptions.clientVersion || 'latest') +
              "/WatsonAssistantChatEntry.js";
      document.head.appendChild(t);
    }, 0);
  }, []);

  return (
    <div className="home-container">
      {/* Hero banner */}
      <div className="home-banner">
        <img
          src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1600&q=80"
          alt="Healthy Lifestyle Banner"
          className="home-image"
        />
      </div>

      {/* Main content */}
      <div className="home-content text-center">
        <h1 className="home-title">🍎 Welcome to Smart Nutrition Assistant</h1>
        <p className="home-subtitle">
          Get personalized AI-powered diet plans, calorie insights, and real-time progress tracking —
          designed for your unique fitness goals!
        </p>

        <ul className="home-features">
          <li>✅ Dynamic meal planning tailored to your age, BMI & goals</li>
          <li>📊 Real-time dashboard for weight & calorie tracking</li>
          <li>💬 Chat live with Watson AI Nutrition Assistant</li>
          <li>🥗 Supports vegetarian & customized diet types</li>
          <li>🔐 Secure user data stored with MongoDB</li>
        </ul>

        <Link to="/dashboard" className="btn btn-success mt-4">
          🚀 Get Started – Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default HomePage; 