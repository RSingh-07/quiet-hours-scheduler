'use client';

import { useState, useEffect } from 'react';
import supabase from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null); // ✅ no 'any'
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push('/login');
      } else {
        setUser(data.user);
      }
    };
    getUser();
  }, [router]);

  const handleCreateBlock = async () => {
    if (!user) return;

    try {
      const res = await fetch('/api/createBlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          startTime,
          endTime,
          userId: user.id,
          userEmail: user.email,
        }),
      });

      const result = await res.json();
      if (result.success) {
        setMessage('Block created successfully!');
        setTitle('');
        setStartTime('');
        setEndTime('');
      } else {
        setMessage('Error creating block.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong.');
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}</p>

      <input
        type="text"
        placeholder="Block Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="datetime-local"
        placeholder="Start Time"
        value={startTime}
        onChange={e => setStartTime(e.target.value)}
      />
      <input
        type="datetime-local"
        placeholder="End Time"
        value={endTime}
        onChange={e => setEndTime(e.target.value)}
      />
      <button onClick={handleCreateBlock}>Create Block</button>
      <p>{message}</p>
    </div>
  );
}
