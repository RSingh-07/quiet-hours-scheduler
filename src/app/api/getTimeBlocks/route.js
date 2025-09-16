import clientPromise from '../../../lib/mongodb';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get('user_id');

    const client = await clientPromise;
    const db = client.db('studyScheduler');  // Replace with your actual DB name

    const blocks = await db.collection('time_blocks')
        .find({ user_id })
        .toArray();

    return new Response(JSON.stringify(blocks), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
