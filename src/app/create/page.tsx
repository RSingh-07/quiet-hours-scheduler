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
    const res = await fetch('/api/blocks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, startTime, endTime }),
    });

    if (res.ok) {
      setMessage('Block created! Redirecting to dashboard...');
      setTimeout(() => router.push('/dashboard'), 1000); // redirect to dashboard
    } else setMessage('Error creating block.');
  };

  return (
    <div>
      <h1>Create Study Block</h1>
      <form onSubmit={handleCreate}>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} required />
        <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} required />
        <button type="submit">Create Block</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
