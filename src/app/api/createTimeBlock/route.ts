import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { user_id, start_time, end_time } = await req.json();
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const result = await db.collection("time_blocks").insertOne({
      user_id,
      start_time: new Date(start_time),
      end_time: new Date(end_time),
      created_at: new Date(),
      reminderSent: false
    });
    return NextResponse.json({ success: true, message: "Block created", id: result.insertedId });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
