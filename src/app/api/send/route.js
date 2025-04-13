// app/api/send/route.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY); // ✅ ensure this env var is set

export async function POST(req) {
  try {
    const bodyText = await req.text(); // Get raw body to debug
    console.log("🔍 Raw body received:", bodyText);

    let json;
    try {
      json = JSON.parse(bodyText); // Parse manually
    } catch (err) {
      console.error("❌ JSON parse error:", err.message);
      return new Response(JSON.stringify({ error: "Invalid JSON", raw: bodyText }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { email, subject, message } = json;

    if (!email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await resend.emails.send({
      from: 'Xolabs Health <ronaldshawv@thewad.co>',
      to: email,
      subject,
      html: `<p>${message}</p>`, // simplified for debug
    });

    console.log("✅ Resend response:", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("❌ Server error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
