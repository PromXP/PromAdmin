// app/api/send/route.js
import { Resend } from 'resend'
const resend = new Resend("re_7M9JHY5a_PBfDiCxKRaQAaftLAg2eiJM4")

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();

    const data = await resend.emails.send({
      from: 'Xolabs <ronaldshawv@thewad.co>',
      to: email, // ✅ dynamic recipient
      subject,
      html: `<div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 40px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <tr>
          <td style="background-color: #4f46e5; padding: 20px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 24px;">🏥 Welcome to Parvathy Hospital</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px;">
            <p style="font-size: 16px; color: #333;">Dear Patient,</p>
            <p style="font-size: 16px; color: #333;">
              ${message}
            </p>
            
          </td>
        </tr>
        <tr>
          <td style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #777;">
            ©2024 <a href="https://thexolabs.in" style="color: #777; text-decoration: none;">XoLabs.in</a>. All rights reserved.
          </td>
        </tr>
      </table>
    </div>`, // ✅ dynamic message
    });
    console.log("DATA",data)

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}