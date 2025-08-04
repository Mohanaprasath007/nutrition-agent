import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [message, setMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChat = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setChatResponse('');

    try {
      const res = await axios.post('http://localhost:5000/api/nutrition-chat', {
        prompt: message,
      });
      setChatResponse(res.data.output);
    } catch (err) {
      console.error('Error:', err);
      setChatResponse(
        '⚠️ Error fetching response. Check if the server is running and Watson is configured correctly.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleChat} className="card p-4" style={{ backgroundColor: '#111', color: '#0ff' }}>
      <input
        className="form-control mb-3"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask your nutrition question..."
        style={{ backgroundColor: '#222', color: '#fff', borderColor: '#0ff' }}
      />
      <button
        className="btn"
        style={{ backgroundColor: '#00ffff', color: '#000' }}
        disabled={loading || !message.trim()}
      >
        {loading ? 'Asking...' : 'Ask'}
      </button>

      {loading && (
        <div className="mt-3 text-warning">
          ⏳ Getting smart nutrition advice...
        </div>
      )}

      {chatResponse && (
        <div className="mt-4">
          <h5 style={{ color: '#00ffff' }}>AI Response:</h5>
          <pre style={{ backgroundColor: '#222', color: '#fff', padding: '10px' }}>{chatResponse}</pre>
        </div>
      )}
    </form>
  );
};

export default ChatBot;
