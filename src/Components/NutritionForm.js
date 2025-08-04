import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';


ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const NutritionForm = () => {
  const [form, setForm] = useState({
    age: '',
    weight: '',
    height: '',
    gender: '',
    goal: '',
    dietType: '',
  });

  const [bmi, setBmi] = useState(null);
  const [calories, setCalories] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateBMI = (weight, height) => {
    const hInMeters = height / 100;
    return (weight / (hInMeters * hInMeters)).toFixed(2);
  };

  const calculateCalories = (age, weight, height, gender) => {
    if (gender === 'male') {
      return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
    } else {
      return Math.round(10 * weight + 6.25 * height - 5 * age - 161);
    }
  };

  const getBmiStatus = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    else if (bmi < 24.9) return "Normal";
    else if (bmi < 29.9) return "Overweight";
    else return "Obese";
  };

  const getAdvice = (bmi) => {
    if (bmi < 18.5) return "You need to gain weight.";
    else if (bmi < 24.9) return "You're fit! Maintain your routine.";
    else if (bmi < 29.9) return "Try to lose weight for optimal health.";
    else return "Consider lifestyle changes immediately.";
  };

  const getBmiColor = (bmi) => {
    if (bmi < 18.5) return "bg-info";
    else if (bmi < 24.9) return "bg-success";
    else if (bmi < 29.9) return "bg-warning";
    else return "bg-danger";
  };

  const getStatusColor = (bmi) => {
    if (bmi < 18.5) return "alert-info";
    else if (bmi < 24.9) return "alert-success";
    else if (bmi < 29.9) return "alert-warning";
    else return "alert-danger";
  };

  const getBmiPercentage = (bmi) => {
    const clamped = Math.min(40, Math.max(10, bmi));
    return ((clamped - 10) / 30) * 100;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const bmiVal = calculateBMI(form.weight, form.height);
    const calVal = calculateCalories(form.age, form.weight, form.height, form.gender);

    setBmi(bmiVal);
    setCalories(calVal);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const email = user?.email;

      if (!email) throw new Error('User not found in localStorage. Please login.');

      // Save progress
      await axios.post('http://localhost:5000/api/nutrition/track', {
        email,
        bmi: bmiVal,
        calories: calVal,
        ...form,
      });

      setMessage('✅ Progress saved!');
      fetchHistory(email);
    } catch (err) {
      console.error(err);
      setMessage('❌ ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/nutrition/history/${email}`);
      setHistory(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch history:', err);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.email) {
      fetchHistory(user.email);
    }
  }, []);

  // Prepare chart data
  const chartData = {
    labels: history.map(h => new Date(h.date).toLocaleDateString()),
    datasets: [
      {
        label: 'BMI Trend',
        data: history.map(h => h.bmi),
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
      },
    ],
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 mt-3 shadow-lg">
      <h4 className="mb-3">📊 Track Your Progress</h4>

      <div className="row">
        <div className="col-md-4">
          <input className="form-control mb-2" name="age" type="number" placeholder="Age" onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input className="form-control mb-2" name="weight" type="number" placeholder="Weight (kg)" onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input className="form-control mb-2" name="height" type="number" placeholder="Height (cm)" onChange={handleChange} required />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <select className="form-select mb-2" name="gender" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="col-md-6">
          <input className="form-control mb-2" name="goal" placeholder="Goal (e.g., lose weight)" onChange={handleChange} required />
        </div>
      </div>

      <div>
        <input className="form-control mb-3" name="dietType" placeholder="Diet Type (e.g., Vegetarian)" onChange={handleChange} required />
      </div>

      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? '⏳ Saving...' : 'Track Your Progress'}
      </button>

      {message && <div className="alert alert-info mt-3 animate__animated animate__fadeIn">{message}</div>}

      {bmi && (
        <div className="mt-4">
          <h5>📏 Your Body Metrics</h5>

          <div className="progress mb-2" style={{ height: '25px' }}>
            <div
              className={`progress-bar progress-bar-striped progress-bar-animated ${getBmiColor(bmi)}`}
              role="progressbar"
              style={{ width: `${getBmiPercentage(bmi)}%` }}
              aria-valuenow={bmi}
              aria-valuemin="10"
              aria-valuemax="50"
            >
              BMI: {bmi}
            </div>
          </div>

          <div className={`alert ${getStatusColor(bmi)} animate__animated animate__fadeIn`}>
            <strong>Status:</strong> {getBmiStatus(bmi)} – {getAdvice(bmi)}
          </div>

          <p><strong>🔥 Calories Needed:</strong> {calories} kcal/day</p>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-5">
          <h5 className="mb-3">📈 BMI Progress Chart</h5>
          <Line data={chartData} height={100} />
        </div>
      )}
    </form>
  );
};

export default NutritionForm;
