import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const client = await clientPromise;
    const db = client.db('quiet-hours');
    await db.collection('blocks').insertOne({
      title: data.title,
      userId: data.userId,
      userEmail: data.userEmail,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      notificationSent: false,
      createdAt: new Date()
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false });
  }
}
