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
      try {
        const res = await fetch('/api/getTimeBlocks');
        const data = await res.json();
        setBlocks(data.blocks || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlocks();
  }, []);

  const isStartingSoon = (startTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    const diff = (start.getTime() - now.getTime()) / (1000 * 60); // minutes
    return diff >= 0 && diff <= 10;
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Dashboard</h1>

      <button
        style={{
          marginBottom: '30px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
        onClick={() => router.push('/create')}
      >
        + Add New Block
      </button>

      {blocks.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>No study blocks yet.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {blocks.map(block => {
            const startingSoon = isStartingSoon(block.startTime);
            return (
              <div
                key={block._id}
                style={{
                  padding: '20px',
                  borderRadius: '10px',
                  backgroundColor: startingSoon ? '#fff3cd' : '#f8f9fa',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s',
                }}
              >
                <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>{block.title}</h2>
                <p style={{ margin: '0 0 5px 0', color: '#555' }}>
                  <strong>Start:</strong> {new Date(block.startTime).toLocaleString()}
                </p>
                <p style={{ margin: '0 0 10px 0', color: '#555' }}>
                  <strong>End:</strong> {new Date(block.endTime).toLocaleString()}
                </p>
                <p style={{ margin: 0 }}>
                  Status:{' '}
                  {block.notificationSent ? (
                    <span style={{ color: 'green', fontWeight: 'bold' }}>Reminder sent ✅</span>
                  ) : (
                    <span style={{ color: '#ff9900', fontWeight: 'bold' }}>Pending ⏳</span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
