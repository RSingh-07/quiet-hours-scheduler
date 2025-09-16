import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("quietdb"); // or any db name you want
    const collections = await db.listCollections().toArray();

    return NextResponse.json({ success: true, collections });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: (e as Error).message });
  }
}
