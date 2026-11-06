"use client";

import Link from "next/link";

export default function AnalyticsOverview({ business }) {
  const m = business?.metrics || {
    totalScans: 1248,
    ratingSubmissions: 812,
    aiGenerations: 694,
    googleClicks: 528,
    conversionRate: 65.0,
    avgRating: 4.85,
    ratingBreakdown: { 5: 690, 4: 98, 3: 16, 2: 5, 1: 4 }
  };

  const currentSlug = business?.slug || "spice-symphony";

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-xs border border-slate-200/80">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display-lg text-headline-lg text-[#131b2e] tracking-tight truncate">
              {business?.name || "The Spice Symphony"}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#e2e7ff] text-[#464555] font-label-md text-label-md">
              {business?.category || "Restaurant & Cafe"}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#6cf8bb] text-[#00714d] font-label-sm text-label-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse" />
              Active Campaign
            </span>
          </div>
          <p className="font-body-md text-body-md text-[#464555]">
            Live Google Review Acceleration &amp; Physical QR Touchpoint Performance
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/dashboard/qr-studio?business=${currentSlug}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#eaedff] text-[#3525cd] font-label-md text-label-md hover:bg-[#e2e7ff] transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>QR Print Studio</span>
          </Link>
          <Link
            href={`/r/${currentSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#f2f3ff] text-[#131b2e] font-label-md text-label-md hover:bg-[#eaedff] transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">north_east</span>
            <span>Open Customer Card</span>
          </Link>
        </div>
      </div>

      {/* 2. Metric KPI Cards (2x2 Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Total Scans */}
        <div className="bg-white p-6 rounded-xl shadow-xs flex flex-col justify-between hover:shadow-md transition-all border border-slate-200/80">
          <div className="flex items-start justify-between gap-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#464555]">Total QR Scans</span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#6cf8bb] text-[#00714d] font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +18% vs last week
            </span>
          </div>
          <div className="my-2">
            <span className="font-metric-stat text-metric-stat text-[#131b2e] tracking-tight">
              {m.totalScans.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-[#464555]">
            <span className="material-symbols-outlined text-[16px] text-[#3525cd]">qr_code_scanner</span>
            <span>From counters, tables &amp; bills</span>
          </div>
        </div>

        {/* Ratings Given */}
        <div className="bg-white p-6 rounded-xl shadow-xs flex flex-col justify-between hover:shadow-md transition-all border border-slate-200/80">
          <div className="flex items-start justify-between gap-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#464555]">Ratings Given</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffddb8] text-[#2a1700] font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[14px] text-[#684000]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              {m.avgRating} avg rating
            </span>
          </div>
          <div className="my-2">
            <span className="font-metric-stat text-metric-stat text-[#131b2e] tracking-tight">
              {m.ratingSubmissions.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-[#464555]">
            <span className="material-symbols-outlined text-[16px] text-[#006c49]">insights</span>
            <span>65.1% scan-to-rate rate</span>
          </div>
        </div>

        {/* AI Reviews */}
        <div className="bg-white p-6 rounded-xl shadow-xs flex flex-col justify-between hover:shadow-md transition-all border border-slate-200/80">
          <div className="flex items-start justify-between gap-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#464555]">AI Assisted Reviews</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e2dfff] text-[#3323cc] font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              Gemini 2.5 Flash
            </span>
          </div>
          <div className="my-2">
            <span className="font-metric-stat text-metric-stat text-[#131b2e] tracking-tight">
              {m.aiGenerations.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-[#464555]">
            <span className="material-symbols-outlined text-[16px] text-[#3525cd]">psychology</span>
            <span>85.4% of raters picked AI text</span>
          </div>
        </div>

        {/* Google Handoffs */}
        <div className="bg-white p-6 rounded-xl shadow-xs flex flex-col justify-between hover:shadow-md transition-all border border-slate-200/80">
          <div className="flex items-start justify-between gap-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#464555]">Google Handoffs</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#6cf8bb] text-[#00714d] font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              {m.conversionRate}% completion
            </span>
          </div>
          <div className="my-2">
            <span className="font-metric-stat text-metric-stat text-[#131b2e] tracking-tight">
              {m.googleClicks.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-[#464555]">
            <span className="material-symbols-outlined text-[16px] text-[#006c49]">explore</span>
            <span>42.3% of all scans reached Google Maps</span>
          </div>
        </div>
      </div>

      {/* 3. Scan-to-Review Conversion Funnel */}
      <div className="bg-white p-6 rounded-xl shadow-xs flex flex-col gap-4 border border-slate-200/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3525cd] text-[22px]">filter_alt</span>
            <h2 className="font-headline-md text-headline-sm text-[#131b2e] font-semibold">
              Scan-to-Review Conversion Funnel
            </h2>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#6cf8bb] text-[#00714d] font-label-md text-label-md font-semibold">
            65% Completion Rate
          </span>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          {/* Step 1 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center font-label-md text-label-md">
              <span className="text-[#131b2e] font-medium flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#e2e7ff] flex items-center justify-center text-[#464555] text-label-sm font-label-sm">1</span>
                QR Physical Scans
              </span>
              <span className="text-[#131b2e] font-semibold">1,248 <span className="text-[#464555] font-normal">(100%)</span></span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#e2e7ff] overflow-hidden">
              <div className="h-full bg-[#dae2fd] rounded-full w-full" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center font-label-md text-label-md">
              <span className="text-[#131b2e] font-medium flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#ffddb8] flex items-center justify-center text-[#2a1700] text-label-sm font-label-sm">2</span>
                Star Rated (4★ - 5★)
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[#93000a] font-label-sm text-label-sm bg-[#ffdad6] px-1.5 py-0.5 rounded">-35% drop</span>
                <span className="text-[#131b2e] font-semibold">812 <span className="text-[#464555] font-normal">(65.1%)</span></span>
              </div>
            </div>
            <div className="w-full h-3 rounded-full bg-[#e2e7ff] overflow-hidden">
              <div className="h-full bg-[#ffb95f] rounded-full w-[65%]" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center font-label-md text-label-md">
              <span className="text-[#131b2e] font-medium flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#e2dfff] flex items-center justify-center text-[#3525cd] text-label-sm font-label-sm">3</span>
                AI Generated Suggestion Copied
              </span>
              <span className="text-[#131b2e] font-semibold">694 <span className="text-[#464555] font-normal">(55.6%)</span></span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#e2e7ff] overflow-hidden">
              <div className="h-full bg-[#4f46e5] rounded-full w-[55%]" />
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center font-label-md text-label-md">
              <span className="text-[#131b2e] font-medium flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#6cf8bb] flex items-center justify-center text-[#00714d] text-label-sm font-label-sm">4</span>
                Google Maps Verified Handoff
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[#006c49] font-label-sm text-label-sm bg-[#6cf8bb] px-1.5 py-0.5 rounded font-semibold">Verified Tap</span>
                <span className="text-[#131b2e] font-semibold">528 <span className="text-[#464555] font-normal">(42.3%)</span></span>
              </div>
            </div>
            <div className="w-full h-3 rounded-full bg-[#e2e7ff] overflow-hidden">
              <div className="h-full bg-[#006c49] rounded-full w-[42%]" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Customer Sentiment Breakdown */}
      <div className="bg-white p-6 rounded-xl shadow-xs flex flex-col gap-4 border border-slate-200/80">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-md text-headline-sm text-[#131b2e] font-semibold">Customer Sentiment Breakdown</h2>
            <p className="font-body-sm text-body-sm text-[#464555]">Aggregate rating based on 812 live feedback sessions</p>
          </div>
          <div className="flex items-center gap-1.5 bg-[#eaedff] px-3 py-1.5 rounded-lg">
            <span className="material-symbols-outlined text-[#885500] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="font-headline-sm text-headline-sm text-[#131b2e]">{m.avgRating}</span>
            <span className="font-body-sm text-body-sm text-[#464555]">/ 5.0</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          {/* 5-Star */}
          <div className="flex items-center gap-3 font-label-md text-label-md">
            <span className="w-12 text-[#131b2e] font-medium shrink-0 flex items-center gap-1">
              5 <span className="material-symbols-outlined text-[14px] text-[#885500]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </span>
            <div className="w-full h-2.5 rounded-full bg-[#e2e7ff] overflow-hidden">
              <div className="h-full bg-[#006c49] rounded-full w-[85%]" />
            </div>
            <span className="w-24 text-right text-[#464555] font-body-sm text-body-sm shrink-0">85% (690)</span>
          </div>

          {/* 4-Star */}
          <div className="flex items-center gap-3 font-label-md text-label-md">
            <span className="w-12 text-[#131b2e] font-medium shrink-0 flex items-center gap-1">
              4 <span className="material-symbols-outlined text-[14px] text-[#885500]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </span>
            <div className="w-full h-2.5 rounded-full bg-[#e2e7ff] overflow-hidden">
              <div className="h-full bg-[#ffb95f] rounded-full w-[12%]" />
            </div>
            <span className="w-24 text-right text-[#464555] font-body-sm text-body-sm shrink-0">12% (97)</span>
          </div>

          {/* 3-Star */}
          <div className="flex items-center gap-3 font-label-md text-label-md">
            <span className="w-12 text-[#131b2e] font-medium shrink-0 flex items-center gap-1">
              3 <span className="material-symbols-outlined text-[14px] text-[#885500]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </span>
            <div className="w-full h-2.5 rounded-full bg-[#e2e7ff] overflow-hidden">
              <div className="h-full bg-[#dae2fd] rounded-full w-[2%]" />
            </div>
            <span className="w-24 text-right text-[#464555] font-body-sm text-body-sm shrink-0">2% (16)</span>
          </div>

          {/* 2-Star */}
          <div className="flex items-center gap-3 font-label-md text-label-md">
            <span className="w-12 text-[#131b2e] font-medium shrink-0 flex items-center gap-1">
              2 <span className="material-symbols-outlined text-[14px] text-[#777587]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </span>
            <div className="w-full h-2.5 rounded-full bg-[#e2e7ff] overflow-hidden">
              <div className="h-full bg-[#c7c4d8] rounded-full w-[1%]" />
            </div>
            <span className="w-24 text-right text-[#464555] font-body-sm text-body-sm shrink-0">0.6% (5)</span>
          </div>

          {/* 1-Star */}
          <div className="flex items-center gap-3 font-label-md text-label-md">
            <span className="w-12 text-[#131b2e] font-medium shrink-0 flex items-center gap-1">
              1 <span className="material-symbols-outlined text-[14px] text-[#777587]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </span>
            <div className="w-full h-2.5 rounded-full bg-[#e2e7ff] overflow-hidden">
              <div className="h-full bg-[#ba1a1a] rounded-full w-[1%]" />
            </div>
            <div className="w-auto flex items-center justify-end gap-1.5 shrink-0">
              <span className="text-right text-[#464555] font-body-sm text-body-sm">0.4% (4)</span>
              <span className="text-[#ba1a1a] font-label-sm text-label-sm bg-[#ffdad6] px-1.5 py-0.5 rounded flex items-center gap-0.5 font-semibold">
                <span className="material-symbols-outlined text-[12px]">chat</span>
                Manager Alerted
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Growth Pro Tip Banner */}
      <div className="bg-gradient-to-br from-[#283044] via-[#131b2e] to-[#283044] text-[#eef0ff] p-6 rounded-xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-700">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#885500] flex items-center justify-center shrink-0 shadow-md">
            <span className="material-symbols-outlined text-[#ffddb8] text-[24px]">workspace_premium</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-headline-sm text-headline-sm text-white font-semibold flex items-center gap-2">
              Pro Tip: Place Acrylic Stands at Billing Counter
            </h3>
            <p className="font-body-md text-body-sm text-[#eef0ff]/80 max-w-xl">
              Customers are 4x more likely to leave a verified 5-star review while waiting for payment receipt or bill settlement than at dining tables.
            </p>
          </div>
        </div>
        <Link
          href={`/dashboard/qr-studio?business=${currentSlug}`}
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-[#3525cd] font-label-md text-label-md font-semibold hover:bg-[#eaedff] transition-colors shadow-sm"
        >
          <span>Download tent cards</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
