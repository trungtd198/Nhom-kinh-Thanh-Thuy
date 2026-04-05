const CTABottom = () => (
  <section className="relative overflow-hidden bg-hero-gradient px-4 py-20 sm:px-6 lg:px-8">
    {/* Decorative blobs */}
    <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary-700 opacity-10 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-primary-600 opacity-10 blur-3xl" />

    <div className="relative z-10 mx-auto max-w-4xl text-center">
      <div className="mb-6 text-5xl">🏆</div>
      <h2 className="mb-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
        Bắt Đầu Ngay Hôm Nay
        <br />
        <span className="bg-cta-gradient bg-clip-text text-transparent">
          Tư Vấn Miễn Phí – Báo Giá Trong 2 Giờ
        </span>
      </h2>
      <p className="mx-auto mb-10 max-w-2xl text-lg text-silver-300 sm:text-xl">
        Đừng để chần chừ làm chậm tiến độ công trình của bạn. Liên hệ ngay để
        nhận ưu đãi tháng này:{' '}
        <strong className="text-white">
          Miễn phí khảo sát + Chiết khấu 5% đơn hàng đầu tiên.
        </strong>
      </p>

      <div className="mb-10 flex flex-col justify-center gap-4 sm:flex-row">
        <a
          href="tel:0987654321"
          id="bottom-cta-call"
          className="flex items-center justify-center space-x-2 rounded-xl bg-red-600 px-10 py-5 text-xl font-bold text-white shadow-xl transition-all hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-red-500/40 active:translate-y-0"
        >
          <svg className="size-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span>Gọi: 0987.654.321</span>
        </a>
        <a
          href="#contact"
          id="bottom-cta-form"
          className="flex items-center justify-center rounded-xl border-2 border-white/30 bg-white/10 px-10 py-5 text-xl font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white/20"
        >
          📋 Gửi Yêu Cầu Báo Giá
        </a>
      </div>

      {/* Trust micro-copy */}
      <div className="flex flex-wrap justify-center gap-6 text-sm text-silver-400">
        <span>✅ Miễn phí tư vấn & khảo sát</span>
        <span>✅ Không mất phí ẩn</span>
        <span>✅ Bảo hành 5 năm</span>
        <span>✅ Có hợp đồng rõ ràng</span>
      </div>
    </div>
  </section>
);

export { CTABottom };
