// src/pages/DashboardPage.js
import React from 'react';
import NutritionForm from '../Components/NutritionForm';

const DashboardPage = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📊 Nutrition Dashboard</h2>
      <NutritionForm />
    </div>
  );
};

export default DashboardPage;
