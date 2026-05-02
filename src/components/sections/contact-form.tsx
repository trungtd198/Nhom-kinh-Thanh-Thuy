'use client';

import { Send } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export const ContactForm = () => {
  const [state, setState] = useState<FormState>('idle');

  return (
    <form
      className="space-y-4 rounded-lg border border-silver-200 bg-white p-5 shadow-sm"
      onSubmit={async (event) => {
        event.preventDefault();
        setState('loading');
        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData)),
          });

          setState(response.ok ? 'success' : 'error');
          if (response.ok) {
            form.reset();
          }
        } catch {
          setState('error');
        }
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-navy-900">
          Họ và tên
          <input
            name="name"
            required
            className="h-11 w-full rounded-md border border-silver-300 px-3 text-base outline-none transition focus:border-navy-800"
            placeholder="Nguyễn Văn A"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-navy-900">
          Số điện thoại
          <input
            name="phone"
            required
            className="h-11 w-full rounded-md border border-silver-300 px-3 text-base outline-none transition focus:border-navy-800"
            placeholder="0977 129 316"
          />
        </label>
      </div>
      <label className="space-y-2 text-sm font-medium text-navy-900">
        Địa chỉ công trình
        <input
          name="address"
          className="h-11 w-full rounded-md border border-silver-300 px-3 text-base outline-none transition focus:border-navy-800"
          placeholder="Quận/huyện, tỉnh/thành"
        />
      </label>
      <label className="space-y-2 text-sm font-medium text-navy-900">
        Nhu cầu thi công
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-md border border-silver-300 p-3 text-base outline-none transition focus:border-navy-800"
          placeholder="Mô tả hạng mục, kích thước sơ bộ hoặc thời gian cần thi công"
        />
      </label>
      <Button
        type="submit"
        variant="champagne"
        size="lg"
        className="w-full"
        disabled={state === 'loading'}
      >
        <Send className="size-4" />
        {state === 'loading' ? 'Đang gửi...' : 'Nhận tư vấn và báo giá'}
      </Button>
      {state === 'success' ? (
        <p className="text-sm font-medium text-emerald-700">
          Đã gửi thông tin. Đội ngũ tư vấn sẽ liên hệ lại sớm.
        </p>
      ) : null}
      {state === 'error' ? (
        <p className="text-sm font-medium text-red-700">
          Chưa gửi được yêu cầu. Vui lòng gọi hotline để được hỗ trợ ngay.
        </p>
      ) : null}
    </form>
  );
};
