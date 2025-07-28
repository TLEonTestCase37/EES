import nodemailer from "nodemailer";

export async function POST(req) {
  const {
    name,
    email,
    role,
    subject,
    message,
    affiliation,
    interests,
    department,
    mobile,
  } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

  try {
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission - ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile || "Not Provided"}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Department:</strong> ${department}</p>
        <p><strong>Affiliation:</strong> ${affiliation}</p>
        <p><strong>Areas of Interest:</strong> ${interests}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json({ success: false }, { status: 500 });
  }
}