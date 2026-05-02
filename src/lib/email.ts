import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactEmailParams {
  name: string;
  phone: string;
  address?: string;
  message?: string;
}

export async function sendContactEmail({
  name,
  phone,
  address,
  message,
}: ContactEmailParams) {
  const companyEmail = process.env.COMPANY_EMAIL;

  if (!companyEmail) {
    throw new Error('COMPANY_EMAIL is not defined in environment variables');
  }

  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    to: [companyEmail],
    subject: `[Liên Hệ Mới] - ${name}`,
    html: `
      <h2>Thông tin liên hệ mới từ website</h2>
      <p><strong>Họ và tên:</strong> ${name}</p>
      <p><strong>Số điện thoại:</strong> ${phone}</p>
      <p><strong>Địa chỉ công trình:</strong> ${address || 'Không cung cấp'}</p>
      <p><strong>Nội dung yêu cầu:</strong> ${message || 'Không có nội dung'}</p>
      <br />
      <p><em>Email này được gửi tự động từ website namthanhwindows.vn.</em></p>
    `,
  });
}
