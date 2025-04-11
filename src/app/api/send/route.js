// app/api/send/route.js
import { Resend } from 'resend'
const resend = new Resend("re_7M9JHY5a_PBfDiCxKRaQAaftLAg2eiJM4")

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();

    const data = await resend.emails.send({
      from: 'Xolabs <onboarding@resend.dev>',
      to: 'ronaldshawv@thewad.co', // ✅ dynamic recipient
      subject,
      html: `<p>${message}</p>`, // ✅ dynamic message
    });
    console.log("DATA",data)

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}