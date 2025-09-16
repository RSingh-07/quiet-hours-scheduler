import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

interface Block {
  _id: ObjectId;
  title: string;
  startTime: string;
  endTime: string;
  notificationSent: boolean;
  createdAt: string;
}

export async function GET() {
  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB;
    if (!dbName) throw new Error('MONGODB_DB not defined');

    const db = client.db(dbName);
    const blocks = (await db.collection('blocks').find({}).toArray()) as Block[];

    return NextResponse.json({ blocks });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ blocks: [], error: 'Failed to fetch blocks' }, { status: 500 });
  }
}
