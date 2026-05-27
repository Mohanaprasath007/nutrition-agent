// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import Navbar from './Components/Navbar';


// This wrapper handles routing and login logic
function AppWrapper() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('user'));

  // Update login status when localStorage changes
  useEffect(() => {
    const listener = () => {
      setIsLoggedIn(!!localStorage.getItem('user'));
    };
    window.addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  }, []);

  // Detect if current route is the auth page
  const isAuthPage = location.pathname === '/';

  // Protect private routes
  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
  };

  return (
    <>
      {/* Only show Navbar & Profile if user is logged in and not on the login/signup page */}
      {isLoggedIn && !isAuthPage && <Navbar />}
      <Routes>
        {/* Public route */}
        <Route path="/" element={<AuthPage onLogin={() => setIsLoggedIn(true)} />} />

        {/* Private routes */}
        <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute><HistoryPage /></PrivateRoute>} />
      </Routes>
      
    </>
  );
}

// Root component wrapping Router
export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
