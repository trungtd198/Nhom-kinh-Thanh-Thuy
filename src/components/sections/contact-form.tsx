'use client';

import { Send } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export const ContactForm = () => {
  const [state, setState] = useState<FormState>('idle');

  const inputClassName =
    'w-full rounded-xl border border-silver-300 bg-gray-50 px-4 py-3 text-base font-medium text-navy-900 outline-none transition placeholder:text-silver-400 focus:border-navy-800 focus:ring-2 focus:ring-navy-800/10';

  const labelClassName = 'block space-y-2 text-sm font-semibold text-navy-900';

  return (
    <form
      className="
        space-y-8
        rounded-2xl
        border border-silver-200
        bg-white
        p-5
        shadow-sm
        max-lg:p-5
      "
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
      {/* SECTION: CONTACT INFO */}
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Thông tin liên hệ
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClassName}>
            Họ và tên
            <input
              name="name"
              required
              className={inputClassName}
              placeholder="Nguyễn Văn A"
            />
          </label>

          <label className={labelClassName}>
            Số điện thoại
            <input
              name="phone"
              required
              className={inputClassName}
              placeholder="0977 129 316"
            />
          </label>
        </div>
      </div>

      {/* SECTION: PROJECT INFO */}
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Thông tin công trình
        </p>

        <label className={labelClassName}>
          Địa chỉ công trình
          <input
            name="address"
            className={inputClassName}
            placeholder="Quận/huyện, tỉnh/thành"
          />
        </label>
      </div>

      {/* SECTION: REQUIREMENTS */}
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Nhu cầu thi công
        </p>

        <label className={labelClassName}>
          Mô tả chi tiết
          <textarea
            name="message"
            rows={4}
            className="
              min-h-[140px]
              w-full
              rounded-xl
              border border-silver-300
              bg-gray-50
              px-4 py-3
              text-base
              font-medium
              text-navy-900
              outline-none
              transition
              placeholder:text-silver-400
              focus:border-navy-800
              focus:ring-2
              focus:ring-navy-800/10
            "
            placeholder="Mô tả hạng mục, kích thước sơ bộ hoặc thời gian cần thi công"
          />
        </label>
      </div>

      {/* CTA */}
      <Button
        type="submit"
        variant="champagne"
        size="lg"
        className="
          h-14
          w-full
          rounded-xl
          text-lg
          font-semibold
          text-navy-950
          shadow-md
          transition
          hover:scale-[1.01]
          hover:shadow-lg
          active:scale-[0.99]
          disabled:cursor-not-allowed
          disabled:opacity-60
          [&_svg]:size-5
        "
        disabled={state === 'loading'}
      >
        <Send />
        {state === 'loading' ? 'Đang gửi...' : 'Nhận tư vấn và báo giá'}
      </Button>

      {/* SUCCESS */}
      {state === 'success' && (
        <p className="rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
          Đã gửi thông tin. Đội ngũ tư vấn sẽ liên hệ lại sớm.
        </p>
      )}

      {/* ERROR */}
      {state === 'error' && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
          Chưa gửi được yêu cầu. Vui lòng gọi hotline để được hỗ trợ ngay.
        </p>
      )}
    </form>
  );
};
