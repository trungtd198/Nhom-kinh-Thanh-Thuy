import { FileCheck2, ShieldCheck, Timer, Wrench } from 'lucide-react';

const stats = [
  {
    icon: ShieldCheck,
    title: 'Vật tư rõ nguồn gốc',
    text: 'Cấu hình nhôm, kính và phụ kiện được ghi rõ trong báo giá.',
  },
  {
    icon: FileCheck2,
    title: 'Hồ sơ kỹ thuật minh bạch',
    text: 'Đo đạc, bản vẽ và nghiệm thu theo từng giai đoạn thi công.',
  },
  {
    icon: Timer,
    title: 'Tiến độ có cam kết',
    text: 'Lịch sản xuất, vận chuyển và lắp đặt được chốt trước khi triển khai.',
  },
  {
    icon: Wrench,
    title: 'Bảo hành tận nơi',
    text: 'Đội kỹ thuật hỗ trợ bảo trì, cân chỉnh và xử lý sau bàn giao.',
  },
];

export const StatsSection = () => (
  <section className="bg-white py-16 sm:py-20">
    <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-lg border border-silver-200 p-5"
          >
            <Icon className="size-7 text-champagne-500" />
            <h3 className="mt-4 text-lg font-bold text-navy-950">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-silver-500">
              {item.text}
            </p>
          </div>
        );
      })}
    </div>
  </section>
);
