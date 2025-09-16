// src/components/StudyBlockLists.tsx
'use client';
import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient'; // ✅ CORRECT


interface Block {
  _id: string;
  start_time: string;
  end_time: string;
}

export default function StudyBlockLists() {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const fetchBlocks = async () => {
      const { data: { user } } = await supabase.auth.getSession();
      if (!user) return;

      const res = await fetch(`/api/gettimeblock?user_id=${user.id}`);
      const data = await res.json();
      setBlocks(data);
    };
    fetchBlocks();
  }, []);

  return (
    <div>
      <h2>Your Study Blocks</h2>
      {blocks.length === 0 ? (
        <p>No blocks found. Create one!</p>
      ) : (
        <ul>
          {blocks.map(block => (
            <li key={block._id}>
              Start: {new Date(block.start_time).toLocaleString()} <br />
              End: {new Date(block.end_time).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
