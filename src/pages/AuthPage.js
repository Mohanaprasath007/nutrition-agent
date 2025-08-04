// src/pages/AuthPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../Components/Login';
import Signup from '../Components/Signup';


const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError('');
    setForm({ name: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isLogin
        ? 'http://localhost:5000/api/auth/login'
        : 'http://localhost:5000/api/auth/signup';

      const payload = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || '❌ Something went wrong');

      // Store user in localStorage and notify App
      localStorage.setItem('user', JSON.stringify(data.user));
      if (onLogin) onLogin();

      alert(isLogin ? '✅ Login successful!' : '✅ Signup successful!');
      navigate('/home'); // Redirect to home
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card shadow p-4">
        <h2 className="text-center mb-3">{isLogin ? 'Login' : 'Sign Up'}</h2>

        {isLogin ? (
          <Login form={form} onChange={handleChange} onSubmit={handleSubmit} error={error} />
        ) : (
          <Signup form={form} onChange={handleChange} onSubmit={handleSubmit} error={error} />
        )}

        <p className="text-center mt-3">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={handleToggle} className="btn btn-link p-0">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
