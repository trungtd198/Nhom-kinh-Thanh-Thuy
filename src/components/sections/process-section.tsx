const steps = [
  [
    '01',
    'Khảo sát',
    'Đo đạc hiện trạng, ghi nhận hướng nắng gió và yêu cầu sử dụng.',
  ],
  [
    '02',
    'Tư vấn cấu hình',
    'Chọn hệ nhôm, kính, phụ kiện và phương án mở tối ưu.',
  ],
  [
    '03',
    'Sản xuất',
    'Gia công theo kích thước thực tế, kiểm tra trước khi vận chuyển.',
  ],
  [
    '04',
    'Lắp đặt',
    'Thi công, cân chỉnh, xử lý chống thấm và vệ sinh sau hoàn thiện.',
  ],
  ['05', 'Nghiệm thu', 'Bàn giao hồ sơ vật tư, hướng dẫn sử dụng và bảo hành.'],
];

export const ProcessSection = () => (
  <section className="bg-white py-16 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase text-champagne-500">
            Quy trình
          </p>
          <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
            Từ khảo sát đến bàn giao có kiểm soát rõ ràng
          </h2>
          <p className="mt-4 text-base leading-7 text-silver-500">
            Quy trình giúp khách hàng biết chính xác mình đang trả tiền cho cấu
            hình nào, tiến độ nào và tiêu chuẩn nghiệm thu nào.
          </p>
        </div>
        <div className="space-y-4">
          {steps.map(([number, title, text]) => (
            <div
              key={number}
              className="grid grid-cols-[56px_1fr] gap-4 rounded-lg border border-silver-200 bg-white p-5"
            >
              <div className="flex size-12 items-center justify-center rounded-md bg-navy-950 text-sm font-bold text-champagne-300">
                {number}
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy-950">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-silver-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
