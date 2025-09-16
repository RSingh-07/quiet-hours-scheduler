'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function StudyBlockList() {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        async function fetchBlocks() {
            const { data: { user } } = await supabase.auth.getSession();

            const res = await fetch(`/api/getTimeBlock?user_id=${user.id}`);
            const data = await res.json();

            setBlocks(data);
        }

        fetchBlocks();
    }, []);

    return (
        <div>
            <h2>Your Study Blocks</h2>

            {blocks.length === 0 ? (
                <p>No blocks found. Create one!</p>
            ) : (
                <ul>
                    {blocks.map((block) => (
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
