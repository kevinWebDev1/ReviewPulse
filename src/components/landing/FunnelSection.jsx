"use client";

export default function FunnelSection() {
  const steps = [
    {
      num: 1,
      badge: "<1.2s Load",
      badgeClass: "bg-[#6cf8bb]/20 text-[#00714d]",
      icon: "qr_code_scanner",
      title: "Scan Counter QR",
      desc: "Works seamlessly with standard phone cameras, Paytm, PhonePe, and Google Pay scanners. Instant progressive web app loads in under 1.2s without downloading any application or creating an account.",
      footerIcon: "verified",
      footerText: "Zero app store friction"
    },
    {
      num: 2,
      badge: "Gemini 2.5 Flash",
      badgeClass: "bg-[#eaedff] text-[#3525cd]",
      icon: "recommend",
      title: "Tap Stars & 2 Chips",
      desc: "Customer selects star rating and taps 2 standout experience tags (e.g. #CrispyPaneer, #FastService). Gemini 2.5 Flash instantly crafts 3 authentic, SEO-rich review variations (Punchy, Detailed, or Hinglish).",
      footerIcon: "psychology",
      footerText: "Natural multilingual phrasing"
    },
    {
      num: 3,
      badge: "65% Conversion",
      badgeClass: "bg-[#6cf8bb]/20 text-[#00714d]",
      icon: "send_and_archive",
      title: "1-Tap Copy & Post",
      desc: "Single click copies the generated review directly to clipboard and deep-links straight into the restaurant's official Google Maps review dialogue box with the 5-star score pre-toggled.",
      footerIcon: "pin_drop",
      footerText: "Deep-linked Google Maps handoff"
    }
  ];

  return (
    <section className="w-full py-20 px-6 max-w-7xl mx-auto" id="product-funnel">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#3525cd] font-semibold">
          The 15-Second Reputation Engine
        </span>
        <h2 className="font-headline-lg text-headline-lg text-[#131b2e] mt-1">
          How Indian Retail, Restaurants, and Clinics Turn Casual Diners into Verified 5-Star Champions
        </h2>
        <p className="font-body-md text-body-md text-[#464555] mt-2">
          Zero friction for guests, zero training required for service staff.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((s) => (
          <div
            key={s.num}
            className="bg-white rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-slate-100"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#eaedff] text-[#3525cd] flex items-center justify-center font-headline-md text-headline-md font-bold">
                  {s.num}
                </div>
                <span className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm ${s.badgeClass}`}>
                  {s.badge}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[#3525cd] text-[20px]">{s.icon}</span>
                <h3 className="font-headline-sm text-headline-sm text-[#131b2e]">{s.title}</h3>
              </div>
              <p className="font-body-md text-body-md text-[#464555] leading-relaxed">
                {s.desc}
              </p>
            </div>
            <div className="mt-6 pt-3 bg-[#f2f3ff] rounded-xl p-3 flex items-center gap-2 text-[#464555] text-body-sm">
              <span className="material-symbols-outlined text-[#006c49] text-[18px]">{s.footerIcon}</span>
              <span>{s.footerText}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

