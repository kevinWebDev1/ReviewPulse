"use client";

export default function ComparisonSection() {
  return (
    <section className="w-full py-16 px-6 max-w-7xl mx-auto" id="how-it-works">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#3525cd] font-semibold">
          The Competitive Reality
        </span>
        <h2 className="font-headline-lg text-headline-lg text-[#131b2e] mt-1">
          Traditional Paper Stickers vs. ReviewPulse AI
        </h2>
        <p className="font-body-md text-body-md text-[#464555] mt-2">
          Why 99% of Google review stickers gather dust without ever generating a review.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traditional Paper Stickers */}
        <div className="bg-white rounded-2xl p-6 shadow-xs flex flex-col justify-between border border-slate-200/80">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-[#ffdad6] text-[#93000a] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">cancel</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-[#131b2e]">Traditional Static QR Stickers</h3>
                <p className="font-body-sm text-body-sm text-[#464555]">Standard laminated paper taped on bill books</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">remove_circle_outline</span>
                <div>
                  <strong className="font-label-md text-label-md text-[#131b2e] block">Sub-1% Conversion Rate:</strong>
                  <span className="font-body-sm text-body-sm text-[#464555]">Only 0.8% of diners actually submit because staring at a blank text box feels like school homework.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">remove_circle_outline</span>
                <div>
                  <strong className="font-label-md text-label-md text-[#131b2e] block">Zero Negative Interception:</strong>
                  <span className="font-body-sm text-body-sm text-[#464555]">Upset diners vent directly onto your public Google Profile, permanently damaging your search ranking.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">remove_circle_outline</span>
                <div>
                  <strong className="font-label-md text-label-md text-[#131b2e] block">Blind Analytics:</strong>
                  <span className="font-body-sm text-body-sm text-[#464555]">You have zero visibility into which table, waiter, or shift generated which scan or review.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-[#ffdad6]/20 rounded-xl flex items-center justify-between text-[#93000a] border border-[#ffdad6]/40">
            <span className="font-label-sm text-label-sm font-semibold">Average Monthly Growth:</span>
            <span className="font-headline-sm text-headline-sm font-bold text-[#ba1a1a]">+4 to 8 Reviews</span>
          </div>
        </div>

        {/* ReviewPulse AI Smart Standee */}
        <div className="bg-[#e2e7ff]/60 rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden border border-[#c3c0ff]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#3525cd]/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-[#4f46e5] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-[#131b2e]">ReviewPulse.ai Smart Standee</h3>
                <p className="font-body-sm text-body-sm text-[#3525cd] font-medium">Dynamic AI Funnel with Private WhatsApp Triage</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#006c49] text-[18px] shrink-0 mt-0.5">check_circle</span>
                <div>
                  <strong className="font-label-md text-label-md text-[#131b2e] block">65% Scan-to-Review Conversion:</strong>
                  <span className="font-body-sm text-body-sm text-[#464555]">Instant 2-tap tags + Gemini copy generator removes all creative friction in under 15 seconds.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#006c49] text-[18px] shrink-0 mt-0.5">check_circle</span>
                <div>
                  <strong className="font-label-md text-label-md text-[#131b2e] block">Private WhatsApp Escalation Shield:</strong>
                  <span className="font-body-sm text-body-sm text-[#464555]">Dissatisfied guests are invited to message the general manager directly on WhatsApp before posting publicly.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#006c49] text-[18px] shrink-0 mt-0.5">check_circle</span>
                <div>
                  <strong className="font-label-md text-label-md text-[#131b2e] block">Table &amp; Counter Attribution:</strong>
                  <span className="font-body-sm text-body-sm text-[#464555]">Track scan velocity across individual dining tables, bar counters, or cashier shifts in real time.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white rounded-xl flex items-center justify-between shadow-xs border border-slate-100">
            <span className="font-label-sm text-label-sm font-semibold text-[#131b2e]">Average Monthly Growth:</span>
            <span className="font-headline-sm text-headline-sm font-bold text-[#3525cd]">+85 to 220 Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}

