import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

interface TimeBlockBody {
  title: string;
  startTime: string;
  endTime: string;
}

export async function POST(req: Request) {
  try {
    const { title, startTime, endTime } = (await req.json()) as TimeBlockBody;

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
