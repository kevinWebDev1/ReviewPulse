"use client";

import Link from "next/link";

export default function PricingSection() {
  return (
    <section className="w-full py-16 px-6 max-w-7xl mx-auto" id="pricing">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#3525cd] font-semibold">
          Pricing Made for Bharat
        </span>
        <h2 className="font-headline-lg text-headline-lg text-[#131b2e] mt-1">
          Transparent, Pocket-Friendly Pricing for Indian Merchants
        </h2>
        <p className="font-body-md text-body-md text-[#464555] mt-2">
          No hidden setup fees. Cancel anytime. 14-day free trial on all plans.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Starter Plan */}
        <div className="bg-white rounded-2xl p-6 shadow-xs flex flex-col justify-between border border-slate-200/80">
          <div>
            <span className="font-label-sm text-label-sm uppercase text-[#464555] tracking-wider font-semibold">Starter</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-metric-stat text-metric-stat font-bold text-[#131b2e]">₹199</span>
              <span className="font-body-sm text-body-sm text-[#464555]">/ month</span>
            </div>
            <p className="font-body-sm text-body-sm text-[#464555] mt-2 mb-6">
              Perfect for single counter cafes, food trucks &amp; boutique salons.
            </p>
            <div className="space-y-2 pt-2">
              {[
                "1 Active Physical Location",
                "High-Res 300 DPI Standee PDF Export",
                "200 Gemini AI Reviews / month",
                "Standard Scan Analytics",
                "Camera & UPI QR Scanner Support"
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-body-sm text-[#131b2e]">
                  <span className="material-symbols-outlined text-[#006c49] text-[16px]">check</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-2">
            <Link
              href="/dashboard"
              className="w-full inline-flex items-center justify-center py-3 px-4 rounded-xl bg-[#eaedff] text-[#3525cd] font-label-md text-label-md hover:bg-[#e2e7ff] transition-colors"
            >
              Start 14-Day Free Trial
            </Link>
          </div>
        </div>

        {/* Growth Plan (FEATURED) */}
        <div className="bg-[#283044] text-[#eef0ff] rounded-2xl p-6 shadow-xl flex flex-col justify-between relative transform md:-translate-y-2 border border-slate-700">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#4f46e5] text-white font-label-sm text-label-sm uppercase tracking-wider font-bold shadow-md">
            Most Popular • Best ROI
          </div>
          <div>
            <span className="font-label-sm text-label-sm uppercase text-[#e2dfff] tracking-wider font-semibold">Growth</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-metric-stat text-metric-stat font-bold text-white">₹399</span>
              <span className="font-body-sm text-body-sm text-[#eef0ff]/70">/ month</span>
            </div>
            <p className="font-body-sm text-body-sm text-[#eef0ff]/80 mt-2 mb-6">
              The gold standard for busy restaurants, multi-table bars &amp; dental clinics.
            </p>
            <div className="space-y-2 pt-2">
              {[
                "Up to 3 Counters or Dining Tables",
                "Full QR Print Studio (Acrylic & Tents)",
                "Unlimited Gemini 2.5 AI Reviews",
                "Direct WhatsApp Manager Escalation",
                "Google Place ID Auto-sync & Shield",
                "Priority Email & WhatsApp Support"
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-body-sm text-[#eef0ff]">
                  <span className="material-symbols-outlined text-[#6ffbbe] text-[16px]">check</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-2">
            <Link
              href="/dashboard"
              className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl bg-[#4f46e5] text-white font-label-md text-label-md font-semibold shadow-lg hover:bg-[#3525cd] transition-all"
            >
              Get Started with Growth →
            </Link>
          </div>
        </div>

        {/* Business Plan */}
        <div className="bg-white rounded-2xl p-6 shadow-xs flex flex-col justify-between border border-slate-200/80">
          <div>
            <span className="font-label-sm text-label-sm uppercase text-[#464555] tracking-wider font-semibold">Business</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-metric-stat text-metric-stat font-bold text-[#131b2e]">₹799</span>
              <span className="font-body-sm text-body-sm text-[#464555]">/ month</span>
            </div>
            <p className="font-body-sm text-body-sm text-[#464555] mt-2 mb-6">
              For restaurant chains, franchise outlets &amp; multi-speciality clinics.
            </p>
            <div className="space-y-2 pt-2">
              {[
                "Up to 10 Physical Locations / Branches",
                "Multi-staff & Manager Logins",
                "Dynamic Table-level QR Routing",
                "Custom Brand Colors & Logo Badging",
                "Weekly WhatsApp Analytics Digest",
                "Dedicated Account Manager & Phone Support"
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-body-sm text-[#131b2e]">
                  <span className="material-symbols-outlined text-[#006c49] text-[16px]">check</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-2">
            <Link
              href="/dashboard"
              className="w-full inline-flex items-center justify-center py-3 px-4 rounded-xl bg-[#eaedff] text-[#3525cd] font-label-md text-label-md hover:bg-[#e2e7ff] transition-colors"
            >
              Scale with Business
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

