import clientPromise from "@/lib/mongodb";
import nodemailer from "nodemailer";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("quiet-hours");

  const now = new Date();
  const reminderTime = new Date(now.getTime() + 10 * 60000);

  const blocks = await db.collection("blocks")
    .find({ startTime: { $lte: reminderTime }, notificationSent: false })
    .toArray();

  if (!blocks.length) {
    return new Response(JSON.stringify({ message: "No reminders to send" }), { status: 200 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  for (let block of blocks) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "user@example.com", // TODO: fetch real user email from Supabase
      subject: "Upcoming Study Block",
      text: `Your study block starts at ${block.startTime}`,
    });

    await db.collection("blocks").updateOne(
      { _id: block._id },
      { $set: { notificationSent: true } }
    );
  }

  return new Response(JSON.stringify({ message: "Reminders sent" }), { status: 200 });
}
