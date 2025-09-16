'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateBlockPage() {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/createTimeBlock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, startTime, endTime }),
    });

    const data = await res.json();
    if (data.error) setMessage(`Error creating block: ${data.error}`);
    else {
      setMessage('Block created successfully!');
      router.push('/dashboard'); // redirect after creation
    }
  };

  return (
    <div>
      <h1>Create Study Block</h1>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <button type="submit">Create Block</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
