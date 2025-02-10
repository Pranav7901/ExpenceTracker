import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Replace with your email provider (e.g., "Outlook", "Yahoo")
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    // Define the email options
    const mailOptions = {
      from: email, // The user's email
      to: process.env.EMAIL_TO, // Your receiving email
      subject: `New Contact Form Submission from ${name}`,
      text: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}