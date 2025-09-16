// src/app/api/blocks/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const blocks = await db.collection('blocks').find({}).toArray();

    return NextResponse.json({ blocks });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ blocks: [], error: 'Failed to fetch blocks' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, startTime, endTime } = await req.json();

    if (!title || !startTime || !endTime) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection('blocks').insertOne({
      title,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      notificationSent: false,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, block: result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: 'Failed to create block' }, { status: 500 });
  }
}
