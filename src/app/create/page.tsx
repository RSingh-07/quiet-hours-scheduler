'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateBlockPage() {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/createTimeBlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, startTime, endTime }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Block created successfully!');
        router.push('/dashboard');
      } else {
        setMessage('Error creating block.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error creating block.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto' }}>
      <h1>Create Study Block</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <label>
          Start Time:
          <input
            type="datetime-local"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            required
          />
        </label>
        <label>
          End Time:
          <input
            type="datetime-local"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Block</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
