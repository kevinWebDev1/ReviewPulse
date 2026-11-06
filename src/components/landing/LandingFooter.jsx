"use client";

import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="w-full bg-[#f2f3ff] shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#e2e7ff] flex items-center justify-center text-[#3525cd]">
                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
              </div>
              <span className="font-headline-sm text-headline-sm text-[#131b2e]">ReviewPulse.ai</span>
            </div>
            <p className="font-body-md text-body-md text-[#464555]">
              AI-powered Google review acceleration for Indian retail, dining, and healthcare.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <span className="font-label-md text-label-md text-[#131b2e]">Product</span>
              <Link href="/dashboard" className="font-body-sm text-body-sm text-[#464555] hover:text-[#131b2e] transition-colors">
                Merchant Suite
              </Link>
              <Link href="/dashboard/qr-studio" className="font-body-sm text-body-sm text-[#464555] hover:text-[#131b2e] transition-colors">
                QR Studio
              </Link>
              <Link href="/r/spice-symphony" className="font-body-sm text-body-sm text-[#464555] hover:text-[#131b2e] transition-colors">
                Live Customer Demo
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-label-md text-label-md text-[#131b2e]">Resources</span>
              <a href="#how-it-works" className="font-body-sm text-body-sm text-[#464555] hover:text-[#131b2e] transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="font-body-sm text-body-sm text-[#464555] hover:text-[#131b2e] transition-colors">
                Pricing Tiers
              </a>
              <a href="#faq" className="font-body-sm text-body-sm text-[#464555] hover:text-[#131b2e] transition-colors">
                FAQ & Setup
              </a>
            </div>
            <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
              <span className="font-label-md text-label-md text-[#131b2e]">Trust &amp; Policy</span>
              <a href="#faq" className="font-body-sm text-body-sm text-[#464555] hover:text-[#131b2e] transition-colors">
                Anti-Gating Compliance
              </a>
              <span className="font-body-sm text-body-sm text-[#464555]">
                Google Maps Universal Links
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body-sm text-body-sm text-[#464555]">
            © 2026 ReviewPulse.ai Technologies Inc. Crafted for Bharat.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-label-sm text-label-sm text-[#006c49] flex items-center gap-1.5 bg-[#6cf8bb]/20 px-2.5 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#006c49]" />
              100% Policy Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

