const Process = () => {
  const steps = [
    {
      number: '01',
      title: 'Tư Vấn Miễn Phí',
      description:
        'Gọi điện hoặc nhắn tin – chuyên viên tư vấn trao đổi nhu cầu, ngân sách và tư vấn giải pháp phù hợp nhất trong ngày.',
      icon: '📞',
      duration: 'Trong ngày',
    },
    {
      number: '02',
      title: 'Khảo Sát & Báo Giá',
      description:
        'Đội kỹ thuật đến đo đạc tại công trình (miễn phí). Gửi báo giá chi tiết từng hạng mục trong vòng 2 giờ sau đo.',
      icon: '📐',
      duration: '2 giờ sau đo',
    },
    {
      number: '03',
      title: 'Ký Hợp Đồng & Sản Xuất',
      description:
        'Ký hợp đồng rõ ràng, đặt cọc 30%. Nhà máy sản xuất theo đúng thông số, kiểm tra chất lượng trước khi xuất xưởng.',
      icon: '📋',
      duration: '3–7 ngày',
    },
    {
      number: '04',
      title: 'Thi Công & Bàn Giao',
      description:
        'Lắp đặt chuyên nghiệp, dọn dẹp sạch sẽ sau thi công. Bàn giao, hướng dẫn sử dụng và ký biên bản nghiệm thu.',
      icon: '🔨',
      duration: '1–3 ngày thi công',
    },
  ];

  return (
    <section id="process" className="bg-dark-800 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full border border-dark-600 bg-dark-700 px-4 py-1.5 text-sm font-semibold text-primary-400">
            Quy Trình Làm Việc
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            4 Bước Đơn Giản – Nhận Công Trình Đẹp
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-silver-400">
            Quy trình minh bạch, chuyên nghiệp, không rủi ro cho khách hàng.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line – desktop */}
          <div className="absolute inset-x-[12.5%] top-16 hidden h-0.5 bg-gradient-to-r from-primary-800 via-primary-500 to-primary-800 lg:block" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.number} className="relative text-center">
                {/* Step circle */}
                <div className="relative z-20 mx-auto mb-6 size-16">
                  <div className="relative z-10 flex size-16 items-center justify-center rounded-full bg-cta-gradient text-2xl shadow-lg shadow-primary-900/50">
                    {step.icon}
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full border border-primary-500 bg-dark-700 text-xs font-bold text-primary-400">
                    {index + 1}
                  </div>
                </div>

                <div className="relative z-10 rounded-2xl border border-dark-600 bg-dark-700 p-6 transition-colors hover:border-primary-700">
                  {/* Duration badge */}
                  <span className="mb-3 inline-block rounded-full bg-primary-900/50 px-2.5 py-1 text-xs text-primary-400">
                    ⏱ {step.duration}
                  </span>
                  <h3 className="mb-3 text-lg font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-silver-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Process };
