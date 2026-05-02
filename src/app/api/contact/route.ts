import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { sendContactEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, address, message } = body;

    // 1. Basic Validation
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: 'Họ tên và Số điện thoại là bắt buộc.' },
        { status: 400 },
      );
    }

    // 2. Simple Sanity Checks & Anti-spam
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { success: false, message: 'Họ tên không hợp lệ.' },
        { status: 400 },
      );
    }

    if (phone.length < 9 || phone.length > 15) {
      return NextResponse.json(
        { success: false, message: 'Số điện thoại không hợp lệ.' },
        { status: 400 },
      );
    }

    // Sanitize message and address (basic approach)
    const sanitizedAddress = address?.trim() || '';
    const sanitizedMessage = message?.trim() || '';

    // 3. Send Email
    const { error } = await sendContactEmail({
      name: name.trim(),
      phone: phone.trim(),
      address: sanitizedAddress,
      message: sanitizedMessage,
    });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: 'Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ lại sớm nhất.',
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Lỗi hệ thống. Vui lòng thử lại sau.' },
      { status: 500 },
    );
  }
}
