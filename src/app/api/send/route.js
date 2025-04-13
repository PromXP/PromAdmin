import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY); // This is correct

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();
    
    console.log("Using Resend API Key:", process.env.RESEND_API_KEY); // For debugging, ensure it's printing the API key
    
    if (!email || !subject || !message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'Xolabs Health <ronaldshawv@thewad.co>',
      to: email,
      subject,
      html: `<div>...Your email HTML content...</div>`,
    });

    console.log("Email sent data:", data);
    return Response.json(data);
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
