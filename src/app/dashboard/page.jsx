import { Suspense } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import AnalyticsOverview from "@/components/AnalyticsOverview";
import CustomerReviewCard from "@/components/CustomerReviewCard";
import { getBusinessBySlug } from "@/data/businessStore";
import { DEFAULT_BUSINESS_SLUG } from "@/data/mockBusinesses";
import Link from "next/link";

export default async function DashboardPage({ searchParams }) {
  const params = await searchParams;
  const currentSlug = params?.business || DEFAULT_BUSINESS_SLUG;
  const business = getBusinessBySlug(currentSlug) || getBusinessBySlug(DEFAULT_BUSINESS_SLUG);

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col">
      <Suspense fallback={<div className="h-16 bg-white border-b" />}>
        <DashboardNavbar />
      </Suspense>

      <main className="w-full pt-16 flex-1">
        <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN (7 COLS): Operational Telemetry & Analytics */}
            <section className="lg:col-span-7 flex flex-col gap-6 min-w-0">
              <AnalyticsOverview business={business} />
            </section>

            {/* RIGHT COLUMN (5 COLS): Interactive Mobile Review Preview */}
            <section className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-20">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#3525cd] text-[20px]">smartphone</span>
                  <span className="font-label-lg text-label-lg font-bold uppercase tracking-wider text-[#131b2e]">
                    Live Customer Review Preview
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#6cf8bb] text-[#00714d] font-label-sm text-label-sm font-semibold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#006c49] animate-ping" />
                  Interactive Test
                </div>
              </div>

              {/* Clean Web Card Preview */}
              <div className="w-full flex justify-center">
                <CustomerReviewCard business={business} />
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-[1520px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-[#464555]">
          <div>© 2026 ReviewPulse.ai Technologies Inc. Hospitality Operational Systems.</div>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-[#131b2e] transition-colors">Documentation</Link>
            <Link href="#" className="hover:text-[#131b2e] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#131b2e] transition-colors">Support &amp; API Status</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
