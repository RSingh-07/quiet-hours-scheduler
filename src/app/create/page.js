'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function CreateBlockPage() {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get user session (assuming Supabase Auth)
        const { data: { user } } = await supabase.auth.getSession();

        const res = await fetch('/api/createTimeBlock', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: user.id,
                start_time: startTime,
                end_time: endTime
            })
        });

        const result = await res.json();
        setMessage(result.message);
    };

    return (
        <div>
            <h1>Create Study Block</h1>
            <form onSubmit={handleSubmit}>
                <label>Start Time:</label><br />
                <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required /><br /><br />

                <label>End Time:</label><br />
                <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required /><br /><br />

                <button type="submit">Create Block</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}
