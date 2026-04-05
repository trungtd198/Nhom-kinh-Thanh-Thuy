const FloatingCTA = () => (
  <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2 md:bottom-6 md:right-6 md:space-y-3">
    {/* Zalo/Chat bubble */}
    <a
      href="https://zalo.me/0987654321"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat Zalo"
      className="flex size-10 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 md:size-12"
    >
      <img
        src="/assets/images/icon-zalo.png"
        alt="Zalo"
        className="size-full rounded-full object-cover"
      />
    </a>

    {/* Call button */}
    <a
      href="tel:0987654321"
      id="floating-cta-call"
      aria-label="Gọi ngay 0987654321"
      className="flex size-10 animate-pulse-slow items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition-all hover:scale-105 hover:bg-red-500 hover:shadow-red-500/50 active:scale-95 md:size-auto md:space-x-2 md:py-3 md:pl-4 md:pr-5"
    >
      <svg className="size-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
      <span className="hidden text-sm font-bold md:inline">Gọi Ngay</span>
    </a>
  </div>
);

export { FloatingCTA };
