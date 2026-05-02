import Image from 'next/image';

import { CTASection } from '@/components/sections/cta-section';
import { SectionTitle } from '@/components/sections/section-title';
import { brandMetrics, siteConfig } from '@/config/site';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Giới thiệu công ty',
  description:
    'Thông tin pháp lý, năng lực và cam kết thi công của CÔNG TY TNHH THƯƠNG MẠI & XÂY DỰNG THÀNH THUỲ.',
  path: '/gioi-thieu',
});

const AboutPage = () => (
  <>
    <section className="bg-navy-950 pt-32 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase text-champagne-300">
            Giới thiệu
          </p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            {siteConfig.displayName}
          </h1>
          <p className="mt-5 text-lg leading-8 text-silver-200">
            {siteConfig.companyName} chuyên tư vấn, cung cấp và thi công cửa
            nhôm, cửa cuốn, cửa thép vân gỗ, lan can - cầu thang kính, cửa nhựa
            composite và cửa kính cường lực.
          </p>
        </div>
        <div className="relative min-h-[360px] overflow-hidden rounded-lg">
          <Image
            src="/Page1.png"
            alt="Mặt dựng nhôm kính"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>

    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Năng lực"
          title="Xây dựng uy tín bằng kỹ thuật và tiêu chuẩn nghiệm thu"
          description="THÀNH THUỲ ưu tiên báo giá rõ cấu hình, thi công đúng bản vẽ và kiểm soát các chi tiết ảnh hưởng tuổi thọ như phụ kiện, ray dẫn hướng, gioăng, silicon, thoát nước và cân chỉnh vận hành."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {brandMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-silver-200 p-6"
            >
              <p className="text-3xl font-bold text-navy-950">{metric.value}</p>
              <p className="mt-2 text-sm text-silver-500">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-silver-100 py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <SectionTitle
          eyebrow="Pháp lý"
          title="Thông tin đăng ký doanh nghiệp"
          description="Thông tin được cập nhật theo giấy chứng nhận đăng ký doanh nghiệp do Phòng Doanh nghiệp - Sở Tài chính tỉnh Ninh Bình cấp."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ['Tên công ty', siteConfig.companyName],
            ['Tên tiếng Anh', siteConfig.internationalName],
            ['Mã số doanh nghiệp', siteConfig.taxCode],
            ['Ngày đăng ký lần đầu', siteConfig.registrationDate],
            ['Vốn điều lệ', siteConfig.charterCapital],
            [
              'Người đại diện',
              `${siteConfig.legalRepresentative} - ${siteConfig.legalRepresentativeTitle}`,
            ],
            ['Điện thoại', siteConfig.hotline],
            ['Email', siteConfig.email],
            ['Trụ sở chính', siteConfig.address],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg border border-silver-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-semibold text-champagne-500">
                {label}
              </p>
              <p className="mt-2 text-sm font-bold leading-6 text-navy-950">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <CTASection />
  </>
);

export default AboutPage;
