import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const blocks = await db.collection("time_blocks").find({ user_id }).toArray();
    return NextResponse.json(blocks);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
