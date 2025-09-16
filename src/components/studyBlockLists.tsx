'use client';
import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function StudyBlockLists() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const fetchBlocks = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      if (!user) return;

      const res = await fetch(`/api/getTimeBlocks?user_id=${user.id}`);
      const result = await res.json();
      setBlocks(result.blocks || []);
    };

    fetchBlocks();
  }, []);

  return (
    <ul>
      {blocks.map((block: any) => (
        <li key={block._id}>
          {block.title} — {new Date(block.startTime).toLocaleString()}
        </li>
      ))}
    </ul>
  );
}
