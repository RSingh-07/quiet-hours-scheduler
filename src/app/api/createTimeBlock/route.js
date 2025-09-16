import clientPromise from '../../../lib/mongodb';

export async function POST(req) {
    const { user_id, start_time, end_time } = await req.json();
    const client = await clientPromise;
    const db = client.db('your-db-name');  // Replace with your actual DB name

    await db.collection('time_blocks').insertOne({
        user_id,
        start_time: new Date(start_time),
        end_time: new Date(end_time),
        created_at: new Date(),
        reminderSent: false
    });

    return new Response(JSON.stringify({ message: 'Block created successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
