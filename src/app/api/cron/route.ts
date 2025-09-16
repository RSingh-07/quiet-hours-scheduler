import { NextResponse } from "next/server";
import { Resend } from "resend";
import clientPromise from '../../../lib/mongodb';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const now = new Date();
    const tenMin = new Date(now.getTime() + 10 * 60 * 1000);

    const upcoming = await db.collection('blocks').find({
      startTime: { $gte: now, $lte: tenMin },
      notificationSent: { $ne: true },
    }).toArray();

    for (const block of upcoming) {
      await db.collection('blocks').findOneAndUpdate(
        { _id: block._id, notificationSent: { $ne: true } },
        { $set: { notificationSent: true } }
      );

      // ✅ Correct usage of await inside async loop
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "537riya@gmail.com", // your registered sandbox email
        subject: `Reminder: "${block.title}" starts in 10 minutes`,
        html: `<p>Your study block "<strong>${block.title}</strong>" starts at ${new Date(block.startTime).toLocaleString()}.</p>`
      });
    }

    return NextResponse.json({ success: true, sent: upcoming.length });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
