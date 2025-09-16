'use client';

import { useState } from 'react';

export default function AddStudyBlock({ onNewBlock }) {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!title || !startTime || !endTime) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/createTimeBlock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, startTime, endTime }),
      });

      if (!res.ok) throw new Error('Failed to create block');

      const newBlock = await res.json();

      // Pass the new block to parent (Dashboard) to update list
      if (onNewBlock) onNewBlock(newBlock);

      // Reset form
      setTitle('');
      setStartTime('');
      setEndTime('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-2">Add Study Block</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Block'}
        </button>
      </form>
    </div>
  );
}
