"use client";

import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="w-full px-6 pb-24 max-w-7xl mx-auto">
      <div className="bg-[#283044] rounded-3xl p-8 sm:p-16 text-center text-[#eef0ff] shadow-2xl relative overflow-hidden flex flex-col items-center border border-slate-700">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#4f46e5]/20 blur-3xl rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4f46e5] text-white font-label-sm text-label-sm mb-4">
          <span className="material-symbols-outlined text-[16px]">trending_up</span>
          <span>Instant 14-Day Free Access</span>
        </div>

        <h2 className="font-display-lg text-display-lg font-bold max-w-2xl text-white tracking-tight mb-2">
          Ready to double your Google 5-star reviews this week?
        </h2>

        <p className="font-body-lg text-body-lg text-[#eef0ff]/80 max-w-xl mb-8">
          Join over 1,200 Indian restaurants, salons, and dental clinics generating authentic Google reviews effortlessly on countertop autopilot.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#4f46e5] text-white font-label-lg text-label-lg rounded-xl shadow-lg hover:bg-[#3525cd] transition-all"
          >
            <span>Launch Merchant Dashboard</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
          <Link
            href="/dashboard/qr-studio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 text-white font-label-lg text-label-lg rounded-xl hover:bg-white/20 transition-all border border-white/10"
          >
            <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
            <span>Explore Print Studio</span>
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[#eef0ff]/70 font-label-sm text-label-sm">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[#6ffbbe] text-[16px]">check_circle</span>
            No credit card required
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[#6ffbbe] text-[16px]">check_circle</span>
            Ready in 3 minutes
          </span>
        </div>
      </div>
    </section>
  );
}

