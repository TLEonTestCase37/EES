import nodemailer from "nodemailer";

export async function POST(req) {
  const { emails, threadId, threadTitle, postedBy } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    bcc: emails, // Send to all without exposing recipients
    subject: `New thread posted about your interest: ${threadTitle}`,
    text: `${postedBy} posted a thread: "${threadTitle}"\n\nCheck it out: https://yourapp.com/thread/${threadId}`,
    html: `<p><strong>${postedBy}</strong> posted a new thread: <b>${threadTitle}</b></p>
           <p><a href="http://localhost:3000/dashboard/}">Click here to view it</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
