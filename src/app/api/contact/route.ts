import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json({ 
          success: false, 
          error: result.error.issues[0].message 
        }, { status: 400 });
    }

    const { name, email, message } = result.data;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

    if (!receiverEmail) {
      return NextResponse.json({ 
        success: false, 
        error: 'Configuration error: CONTACT_RECEIVER_EMAIL is not defined' 
      }, { status: 500 });
    }

    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: receiverEmail,
      subject: `New Contact Message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ 
      success: true, 
      data: { message: 'ข้อความของคุณถูกส่งเรียบร้อยแล้ว' } 
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง' 
    }, { status: 500 });
  }
}
