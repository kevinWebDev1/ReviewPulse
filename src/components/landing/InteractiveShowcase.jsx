"use client";

import { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";

export default function InteractiveShowcase() {
  const [btnText, setBtnText] = useState("1-Tap Copy & Open Google Maps ➔");
  const [isCopied, setIsCopied] = useState(false);

  const reviewSnippet = "Amazing food! Loved the crispy paneer starter and the butter garlic naan was fresh. Service was super quick even during Sunday rush. Total paisa vasool! ⭐⭐⭐⭐⭐";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reviewSnippet);
      setIsCopied(true);
      setBtnText("Copied! Opening Google Maps...");
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
      setTimeout(() => {
        setBtnText("1-Tap Copy & Open Google Maps ➔");
        setIsCopied(false);
      }, 3000);
    } catch {
      setBtnText("Opening Google Maps...");
      setTimeout(() => setBtnText("1-Tap Copy & Open Google Maps ➔"), 2000);
    }
  };

  return (
    <section className="w-full py-8 px-6 max-w-7xl mx-auto" id="interactive-preview">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#3525cd] font-semibold">
          Real-World Flow
        </span>
        <h2 className="font-headline-lg text-headline-lg text-[#131b2e] mt-1">
          From Countertop Acrylic Stand to Google 5-Star in Seconds
        </h2>
        <p className="font-body-md text-body-md text-[#464555] mt-2">
          See how physical QR engagement merges instantly with AI review synthesis.
        </p>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Decorative Backdrop Glow */}
        <div className="absolute inset-0 bg-[#f2f3ff] rounded-3xl -z-10 shadow-xs" />

        {/* LEFT: Physical Counter Acrylic Standee Preview */}
        <div className="lg:col-span-5 p-6 flex flex-col items-center">
          <div className="w-full max-w-xs bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center relative overflow-hidden border border-slate-100">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#4f46e5] via-[#3525cd] to-[#006c49]" />
            <div className="flex items-center gap-2 mb-2 mt-2">
              <span className="material-symbols-outlined text-[#3525cd] text-[22px]">restaurant</span>
              <span className="font-headline-sm text-headline-sm text-[#131b2e]">The Spice Symphony</span>
            </div>
            <span className="font-label-sm text-label-sm text-[#464555] mb-4">Indiranagar, Bengaluru</span>

            {/* QR Simulation */}
            <div className="relative p-3 bg-[#f2f3ff] rounded-xl mb-2 flex flex-col items-center">
              <div className="w-44 h-44 bg-white rounded-lg p-2 flex items-center justify-center shadow-inner">
                <svg className="w-full h-full text-[#131b2e] fill-current" viewBox="0 0 100 100">
                  <path d="M0,0 h30 v30 h-30 z M6,6 v18 h18 v-18 z M10,10 h10 v10 h-10 z" />
                  <path d="M70,0 h30 v30 h-30 z M76,6 v18 h18 v-18 z M80,10 h10 v10 h-10 z" />
                  <path d="M0,70 h30 v30 h-30 z M6,76 v18 h18 v-18 z M10,80 h10 v10 h-10 z" />
                  <rect height="8" width="8" x="40" y="5" />
                  <rect height="8" width="8" x="52" y="15" />
                  <rect height="8" width="8" x="40" y="25" />
                  <rect height="8" width="8" x="5" y="40" />
                  <rect height="8" width="8" x="18" y="48" />
                  <rect height="16" width="16" x="40" y="42" />
                  <rect height="6" width="10" x="70" y="40" />
                  <rect height="8" width="8" x="85" y="45" />
                  <rect height="15" width="8" x="65" y="60" />
                  <rect height="8" width="12" x="42" y="70" />
                  <rect height="14" width="14" x="80" y="75" />
                  <rect height="8" width="10" x="58" y="85" />
                </svg>
              </div>
              <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-[#006c49] text-white font-label-sm text-[10px] uppercase font-bold tracking-widest shadow-xs">
                Scan with Any UPI / Camera
              </div>
            </div>

            <p className="font-label-md text-label-md text-[#131b2e] font-medium mt-4">Loved your dining experience?</p>
            <p className="font-body-sm text-body-sm text-[#464555]">Tap review tags to craft your Google review in 15s</p>
            <div className="flex items-center gap-2 mt-4 pt-1 text-[#464555]/70 font-label-sm text-[10px]">
              <span>PhonePe</span> • <span>Paytm</span> • <span>GPay</span> • <span>iOS Camera</span>
            </div>
          </div>

          <Link
            href="/dashboard/qr-studio"
            className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2e7ff] text-[#3525cd] font-label-sm text-label-sm hover:bg-[#eaedff] transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
            <span>Includes Ready-to-Print 300 DPI PDF</span>
          </Link>
        </div>

        {/* CENTER CONNECTOR BADGE */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center py-2">
          <div className="w-10 h-10 rounded-full bg-[#4f46e5] text-white flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[20px]">bolt</span>
          </div>
          <span className="font-label-sm text-label-sm text-[#3525cd] font-semibold mt-2 hidden lg:block">Instant Handoff</span>
          <div className="hidden lg:block w-px h-12 bg-[#3525cd]/20 mt-2" />
        </div>

        {/* RIGHT: Interactive Smartphone Customer Review Flow */}
        <div className="lg:col-span-5 p-6 flex flex-col items-center">
          <div className="w-full max-w-xs bg-white rounded-3xl shadow-xl p-4 relative overflow-hidden border border-slate-100">
            {/* Status Bar */}
            <div className="flex items-center justify-between text-[#464555] text-[11px] font-label-sm px-2 mb-2">
              <span>12:45</span>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">signal_cellular_alt</span>
                <span className="material-symbols-outlined text-[13px]">wifi</span>
                <span className="material-symbols-outlined text-[13px]">battery_full</span>
              </div>
            </div>

            {/* Merchant Header */}
            <div className="bg-[#f2f3ff] rounded-xl p-2 flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-lg bg-[#4f46e5] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">dinner_dining</span>
              </div>
              <div className="text-left">
                <div className="font-headline-sm text-[13px] leading-tight text-[#131b2e]">The Spice Symphony</div>
                <div className="font-body-sm text-[11px] text-[#464555]">Verified Google Business Profile</div>
              </div>
            </div>

            {/* Star Selector */}
            <div className="bg-white rounded-xl p-2 mb-2 shadow-xs border border-slate-100 flex flex-col items-center">
              <span className="font-label-sm text-label-sm text-[#464555] mb-1">Rate your experience</span>
              <div className="flex items-center gap-1 text-amber-500">
                {"★★★★★".split("").map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[24px] text-amber-500">star</span>
                ))}
              </div>
            </div>

            {/* Highlight Tags */}
            <div className="mb-2">
              <span className="font-label-sm text-[11px] text-[#464555] block mb-1">Tap 2 quick highlights:</span>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-0.5 rounded-full bg-[#4f46e5] text-white font-label-sm text-[11px]">✓ #CrispyPaneer</span>
                <span className="px-2 py-0.5 rounded-full bg-[#4f46e5] text-white font-label-sm text-[11px]">✓ #FastService</span>
                <span className="px-2 py-0.5 rounded-full bg-[#e2e7ff] text-[#464555] font-label-sm text-[11px]">#Ambience</span>
                <span className="px-2 py-0.5 rounded-full bg-[#e2e7ff] text-[#464555] font-label-sm text-[11px]">#ValetParking</span>
              </div>
            </div>

            {/* Gemini Review Draft */}
            <div className="bg-[#f2f3ff] rounded-xl p-2 mb-2">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1 text-[#3525cd]">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  <span className="font-label-sm text-[11px] font-semibold">Gemini 2.5 Draft Ready</span>
                </div>
                <span className="font-label-sm text-[10px] text-[#006c49] font-medium">Hinglish • Selected</span>
              </div>
              <p className="font-body-sm text-[12px] text-[#131b2e] leading-snug bg-white p-2 rounded-lg shadow-inner border border-slate-100">
                &ldquo;{reviewSnippet}&rdquo;
              </p>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className={`w-full py-2.5 rounded-xl font-label-sm text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-md transition-all ${
                isCopied ? "bg-[#006c49] text-white" : "bg-[#4f46e5] hover:bg-[#3525cd] text-white"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
              <span>{btnText}</span>
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#6cf8bb]/20 text-[#00714d] font-label-sm text-label-sm font-medium">
              <span className="material-symbols-outlined text-[15px]">speed</span>
              <span>4.2x Review Velocity</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#e2e7ff] text-[#3525cd] font-label-sm text-label-sm font-medium">
              <span className="material-symbols-outlined text-[15px]">security</span>
              <span>Zero Account Bans</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

