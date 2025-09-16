'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Block {
  _id: string;
  title: string;
  startTime: string;
  endTime: string;
  notificationSent: boolean;
}

export default function DashboardPage() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBlocks = async () => {
      const res = await fetch('/api/blocks');
      const data = await res.json();
      setBlocks(data.blocks || []);
    };
    fetchBlocks();
  }, []);

  const isStartingSoon = (startTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    const diff = (start.getTime() - now.getTime()) / (1000 * 60); // minutes
    return diff >= 0 && diff <= 10; // starting within next 10 minutes
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>

      <button
        style={{ marginBottom: '20px' }}
        onClick={() => router.push('/create')}
      >
        Add New Block
      </button>

      {blocks.length === 0 ? (
        <p>No study blocks yet.</p>
      ) : (
        <ul>
          {blocks.map(block => {
            const startingSoon = isStartingSoon(block.startTime);
            return (
              <li
                key={block._id}
                style={{
                  marginBottom: '10px',
                  padding: '10px',
                  borderRadius: '5px',
                  backgroundColor: startingSoon ? '#fff3cd' : '#f0f0f0', // highlight if starting soon
                }}
              >
                <strong>{block.title}</strong> —{' '}
                {new Date(block.startTime).toLocaleString()} to{' '}
                {new Date(block.endTime).toLocaleString()} <br />
                Status:{' '}
                {block.notificationSent ? (
                  <span style={{ color: 'green' }}>Reminder sent ✅</span>
                ) : (
                  <span style={{ color: 'orange' }}>Pending ⏳</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
