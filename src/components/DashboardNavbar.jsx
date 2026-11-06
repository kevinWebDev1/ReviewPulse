"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DEMO_BUSINESSES, DEFAULT_BUSINESS_SLUG } from "@/data/mockBusinesses";
import AddBusinessModal from "./AddBusinessModal";

export default function DashboardNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSlug = searchParams.get("business") || DEFAULT_BUSINESS_SLUG;

  const [businesses, setBusinesses] = useState(DEMO_BUSINESSES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load registered businesses dynamically
  useEffect(() => {
    fetch("/api/business")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.businesses) {
          setBusinesses(data.businesses);
        }
      })
      .catch(() => {});
  }, [currentSlug]);

  const handleBusinessChange = (e) => {
    const newSlug = e.target.value;
    const params = new URLSearchParams(searchParams);
    params.set("business", newSlug);
    router.push(`${pathname}?${params.toString()}`);
  };

  const navLinks = [
    { href: `/dashboard?business=${currentSlug}`, label: "Analytics & Funnel", exact: true },
    { href: `/dashboard/qr-studio?business=${currentSlug}`, label: "QR Print Studio" },
    { href: `/dashboard/settings?business=${currentSlug}`, label: "Location & Place ID" }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#eaedff]">
        <div className="h-16 w-full px-6 flex items-center justify-between gap-4 max-w-[1520px] mx-auto">
          {/* Brand & Business Selector */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1.5">
              <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#3525cd] text-[20px]">auto_awesome</span>
              </div>
              <span className="font-headline-sm text-headline-sm text-[#131b2e] tracking-tight">
                ReviewPulse<span className="text-[#3525cd]">.ai</span>
              </span>
            </Link>

            <div className="h-5 w-[1px] bg-slate-300 hidden sm:block" />

            {/* Business Dropdown & Add Business Button */}
            <div className="flex items-center gap-1.5">
              <div className="relative">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] text-[#464555] font-label-md text-label-md transition-colors border border-slate-200/60">
                  <span className="material-symbols-outlined text-[16px] text-[#464555]">storefront</span>
                  <select
                    value={currentSlug}
                    onChange={handleBusinessChange}
                    className="bg-transparent text-[#131b2e] font-semibold text-xs focus:outline-none cursor-pointer pr-4 appearance-none max-w-[160px] sm:max-w-[220px] truncate"
                  >
                    {Object.values(businesses).map((biz) => (
                      <option key={biz.slug} value={biz.slug}>
                        {biz.name} ({biz.category})
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined text-[16px] text-[#464555] pointer-events-none">arrow_drop_down</span>
                </div>
              </div>

              {/* + Add Business Action */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#eaedff] hover:bg-[#e2e7ff] text-[#3525cd] font-label-md text-label-md font-semibold transition-all shadow-xs"
                title="Register New Business"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span className="hidden sm:inline">Add Business</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-[#f2f3ff] p-1 rounded-xl">
            {navLinks.map((link) => {
              const isActive = link.exact
                ? pathname === "/dashboard"
                : pathname.startsWith(link.href.split("?")[0]);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-label-lg text-label-lg px-3 py-1.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#eaedff] text-[#3525cd] font-semibold shadow-xs"
                      : "text-[#464555] hover:text-[#131b2e] hover:bg-[#e2e7ff]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA & Profile */}
          <div className="flex items-center gap-3">
            <Link
              href={`/r/${currentSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-[#131b2e] font-label-md text-label-md hover:bg-[#f2f3ff] transition-colors shadow-xs"
            >
              <span>Test Live QR Page</span>
              <span className="material-symbols-outlined text-[16px] text-[#464555]">open_in_new</span>
            </Link>

            <div className="relative flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#3525cd] flex items-center justify-center cursor-pointer shadow-xs">
                <span className="material-symbols-outlined text-white text-[18px]">person</span>
              </div>
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Self-Serve Add Business Modal */}
      <AddBusinessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
