"use client";

import Link from "next/link";

export default function LandingHeader() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#faf8ff]/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-[#e2e7ff] flex items-center justify-center text-[#3525cd]">
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-headline-sm text-headline-sm text-[#131b2e] tracking-tight">
              ReviewPulse.ai
            </span>
            <span className="px-1 py-0.5 rounded bg-[#eaedff] text-[#3525cd] font-label-sm text-label-sm">
              v2.4
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          <a href="#how-it-works" className="transition-colors text-[#3525cd] font-label-lg">
            How it Works
          </a>
          <a href="#product-funnel" className="text-[#464555] hover:text-[#131b2e] font-label-lg text-label-lg transition-colors">
            Product Funnel
          </a>
          <Link href="/dashboard/qr-studio" className="text-[#464555] hover:text-[#131b2e] font-label-lg text-label-lg transition-colors">
            QR Studio
          </Link>
          <a href="#pricing" className="text-[#464555] hover:text-[#131b2e] font-label-lg text-label-lg transition-colors">
            Pricing
          </a>
          <a href="#faq" className="text-[#464555] hover:text-[#131b2e] font-label-lg text-label-lg transition-colors">
            Trust & FAQs
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-[#464555] hover:text-[#131b2e] font-label-lg text-label-lg transition-colors hidden sm:inline-block"
          >
            Merchant Login
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-4 py-2 bg-[#4f46e5] text-white font-label-lg text-label-lg rounded-lg hover:bg-[#3525cd] transition-colors shadow-sm"
          >
            Open Dashboard →
          </Link>
          <div className="w-8 h-8 rounded-full bg-[#3525cd] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}

