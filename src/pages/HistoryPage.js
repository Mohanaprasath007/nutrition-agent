import React, { useEffect, useState } from 'react';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('chatHistory')) || [];
    setHistory(stored);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Prompt History</h2>
      <ul className="list-group">
        {history.map((item, index) => (
          <li key={index} className="list-group-item bg-dark text-light">
            <strong>Prompt:</strong> {item.prompt}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;