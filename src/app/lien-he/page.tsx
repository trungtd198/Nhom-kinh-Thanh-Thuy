import { Mail, MapPin, Phone } from 'lucide-react';

import { ContactForm } from '@/components/sections/contact-form';
import { FAQAccordion } from '@/components/sections/faq-accordion';
import { SectionTitle } from '@/components/sections/section-title';
import { siteConfig } from '@/config/site';
import { faqs } from '@/data/faqs';
import { createMetadata } from '@/lib/seo';
import { formatPhoneHref } from '@/lib/utils';

export const metadata = createMetadata({
  title: 'Liên hệ báo giá',
  description:
    'Liên hệ NHÔM KÍNH THÀNH THUỲ để khảo sát, tư vấn và báo giá cửa nhôm, cửa cuốn, cửa thép vân gỗ, lan can kính, cửa composite và cửa kính cường lực.',
  path: '/lien-he',
});

const ContactPage = () => (
  <>
    <section className="bg-navy-950 pt-32 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase text-champagne-300">
          Liên hệ
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold sm:text-5xl">
          Gửi yêu cầu khảo sát và báo giá công trình
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-silver-200">
          Cung cấp kích thước sơ bộ, vị trí lắp đặt hoặc bản vẽ để đội kỹ thuật
          tư vấn cấu hình phù hợp.
        </p>
      </div>
    </section>
    <section className="bg-silver-100 py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <SectionTitle
            title="Thông tin doanh nghiệp"
            description="Các thông tin bên dưới có thể chỉnh trong src/config/site.ts."
          />
          <div className="mt-8 space-y-4">
            <a
              href={formatPhoneHref(siteConfig.hotline)}
              className="flex gap-4 rounded-lg bg-white p-5 shadow-sm"
            >
              <Phone className="size-6 text-champagne-500" />
              <div>
                <p className="font-bold text-navy-950">Hotline</p>
                <p className="mt-1 text-silver-500">{siteConfig.hotline}</p>
              </div>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex gap-4 rounded-lg bg-white p-5 shadow-sm"
            >
              <Mail className="size-6 text-champagne-500" />
              <div>
                <p className="font-bold text-navy-950">Email</p>
                <p className="mt-1 text-silver-500">{siteConfig.email}</p>
              </div>
            </a>
            <div className="flex gap-4 rounded-lg bg-white p-5 shadow-sm">
              <MapPin className="size-6 text-champagne-500" />
              <div>
                <p className="font-bold text-navy-950">Địa chỉ</p>
                <p className="mt-1 text-silver-500">{siteConfig.address}</p>
              </div>
            </div>
            <div className="rounded-lg bg-white p-5 shadow-sm">
              <p className="font-bold text-navy-950">
                {siteConfig.companyName}
              </p>
              <p className="mt-2 text-sm text-silver-500">
                Mã số doanh nghiệp: {siteConfig.taxCode}
              </p>
              <p className="mt-1 text-sm text-silver-500">
                Người đại diện: {siteConfig.legalRepresentative} -{' '}
                {siteConfig.legalRepresentativeTitle}
              </p>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Câu hỏi thường gặp" align="center" />
        <div className="mt-10">
          <FAQAccordion items={faqs} />
        </div>
      </div>
    </section>
  </>
);

export default ContactPage;
