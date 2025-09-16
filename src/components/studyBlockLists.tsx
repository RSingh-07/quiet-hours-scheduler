'use client';
import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

interface Block {
  _id: string;
  title: string;
  startTime: string;
  endTime: string;
  notificationSent: boolean;
  createdAt: string;
}

export default function StudyBlockLists() {
  const [blocks, setBlocks] = useState<Block[]>([]);

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
      {blocks.map((block) => (
        <li key={block._id}>
          {block.title} — {new Date(block.startTime).toLocaleString()}
        </li>
      ))}
    </ul>
  );
}
