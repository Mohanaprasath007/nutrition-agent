// File: src/components/ProgressDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProgressDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [weeklyTips, setWeeklyTips] = useState([]);

  useEffect(() => {
    fetchUserProgress();
    fetchWeeklyTips();
  }, []);

  const fetchUserProgress = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user-progress');
      setUserData(res.data);
    } catch (err) {
      console.error('Error fetching progress:', err);
    }
  };

  const fetchWeeklyTips = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/weekly-tips');
      setWeeklyTips(res.data);
    } catch (err) {
      console.error('Error fetching tips:', err);
    }
  };

  return (
    <div className="card p-4 mt-4">
      <h3 className="mb-3">📈 Your Progress Overview</h3>
      {userData ? (
        <div>
          <p><strong>Initial Weight:</strong> {userData.initialWeight} kg</p>
          <p><strong>Current Weight:</strong> {userData.currentWeight} kg</p>
          <p><strong>Weight Change:</strong> {userData.currentWeight - userData.initialWeight} kg</p>
          <p><strong>BMI Now:</strong> {userData.currentBMI}</p>
        </div>
      ) : (
        <p>Loading your progress...</p>
      )}

      <h4 className="mt-4">🧠 AI-Generated Weekly Tips</h4>
      <ul>
        {weeklyTips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressDashboard;
