import { Suspense } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import QRStudioWorkspace from "@/components/studio/QRStudioWorkspace";
import PrintGuidelines from "@/components/studio/PrintGuidelines";
import { getBusinessBySlug } from "@/data/businessStore";
import { DEFAULT_BUSINESS_SLUG } from "@/data/mockBusinesses";
import Link from "next/link";

export default async function QRStudioPage({ searchParams }) {
  const params = await searchParams;
  const currentSlug = params?.business || DEFAULT_BUSINESS_SLUG;
  const business = getBusinessBySlug(currentSlug) || getBusinessBySlug(DEFAULT_BUSINESS_SLUG);

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col">
      <Suspense fallback={<div className="h-16 bg-white border-b" />}>
        <DashboardNavbar />
      </Suspense>

      <main className="w-full flex-1">
        {/* Top Header Banner */}
        <div className="w-full bg-[#f2f3ff] px-6 py-4 shadow-xs border-b border-slate-200/80">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-headline-lg text-headline-lg text-[#131b2e] tracking-tight">
                  QR Merchandising &amp; Print Studio
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#6cf8bb] text-[#00714d] font-label-sm text-label-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] animate-pulse" />
                  Live Google Place ID Linked
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#3525cd] font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[14px]">high_quality</span>
                  Print Ready (300 DPI CMYK)
                </span>
              </div>
              <p className="font-body-md text-body-md text-[#464555]">
                Design, customize, and export print-ready physical acrylic counter standees, table tents, and takeaway bill stickers.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl shadow-xs border border-slate-200">
                <span className="material-symbols-outlined text-[#3525cd] text-[18px]">verified</span>
                <span className="font-label-md text-label-md text-[#131b2e] font-semibold truncate max-w-[200px]">
                  {business?.googlePlaceId || "ChIJ3Vw9r3m_mTkRGz5s4J9b1YI"}
                </span>
                <span className="font-label-sm text-label-sm text-[#464555] font-medium">(Synced)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Workspace & Guidelines */}
        <div className="max-w-[1440px] w-full mx-auto px-6 py-8 flex flex-col gap-8">
          <QRStudioWorkspace business={business} />
          <PrintGuidelines />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-[#464555]">
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
