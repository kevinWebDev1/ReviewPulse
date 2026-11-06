"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden px-6 pt-8 pb-24 max-w-7xl mx-auto flex flex-col items-center text-center">
      {/* Ambient Backdrop Depth */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-[#4f46e5]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Top Pill Badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e2e7ff] text-[#3525cd] shadow-sm hover:shadow transition-all mb-6">
        <span className="material-symbols-outlined text-[16px] text-[#3525cd]">auto_awesome</span>
        <span className="font-label-sm text-label-sm tracking-wide">
          Next-Gen Reputation Engine for Indian Local Businesses
        </span>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#3525cd] animate-pulse" />
      </div>

      {/* Main Headline */}
      <h1 className="font-display-lg text-display-lg max-w-4xl tracking-tight text-[#131b2e] mb-4">
        Turn Every Billing Counter &amp; Table into a{" "}
        <span className="text-[#4f46e5]">5-Star Google Review Machine</span>
      </h1>

      {/* Subtitle */}
      <p className="font-body-lg text-body-lg text-[#464555] max-w-2xl mb-8">
        Customers want to review your restaurant, salon, or clinic — but typing paragraphs on mobile is tedious. ReviewPulse AI lets them scan a QR, tap 2 tags, and copy polished Gemini reviews in 15 seconds flat.
      </p>

      {/* Dual CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 w-full justify-center max-w-md">
        <Link
          href="/dashboard"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-8 py-3.5 bg-[#4f46e5] text-white font-label-lg text-label-lg rounded-xl shadow-md hover:bg-[#3525cd] transition-all duration-200"
        >
          <span>Launch Merchant Dashboard</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
        <a
          href="#interactive-preview"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-6 py-3.5 bg-white text-[#131b2e] font-label-lg text-label-lg rounded-xl shadow-sm hover:bg-[#f2f3ff] transition-all duration-200 border border-slate-200/80"
        >
          <span className="material-symbols-outlined text-[18px] text-[#3525cd]">smartphone</span>
          <span>Test Customer Scan Card</span>
        </a>
      </div>

      {/* Trust Badges Row */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6cf8bb]/20 text-[#00714d] font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[15px] text-[#006c49]">verified_user</span>
          <span>100% Google Anti-Gating Compliant</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaedff] text-[#3525cd] font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[15px] text-[#3525cd]">psychology</span>
          <span>Gemini 2.5 Flash Assistance</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2e7ff] text-[#131b2e] font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[15px] text-[#464555]">no_accounts</span>
          <span>No App or Login Needed</span>
        </div>
      </div>

      {/* Social Proof Metrics Strip */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
        <div className="flex flex-col items-center p-4 rounded-xl bg-white shadow-sm border border-slate-100">
          <span className="font-metric-stat text-metric-stat text-[#131b2e] font-bold tracking-tight">840,000+</span>
          <span className="font-label-sm text-label-sm text-[#464555] mt-0.5">Reviews Generated across India</span>
        </div>
        <div className="flex flex-col items-center p-4 rounded-xl bg-white shadow-sm border border-slate-100">
          <div className="flex items-center gap-1">
            <span className="font-metric-stat text-metric-stat text-[#131b2e] font-bold tracking-tight">4.85</span>
            <div className="flex text-amber-500">
              <span className="material-symbols-outlined text-[20px] text-amber-500">star</span>
            </div>
          </div>
          <span className="font-label-sm text-label-sm text-[#464555] mt-0.5">Average Merchant Google Rating</span>
        </div>
        <div className="flex flex-col items-center p-4 rounded-xl bg-white shadow-sm border border-slate-100">
          <span className="font-metric-stat text-metric-stat text-[#006c49] font-bold tracking-tight">&lt;1.2s</span>
          <span className="font-label-sm text-label-sm text-[#464555] mt-0.5">Scan-to-Card Load Time</span>
        </div>
      </div>
    </section>
  );
}

