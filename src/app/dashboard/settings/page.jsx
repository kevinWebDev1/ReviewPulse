import { Suspense } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import { DEMO_BUSINESSES, DEFAULT_BUSINESS_SLUG } from "@/data/mockBusinesses";
import { Settings, MapPin, Phone, Tag, ExternalLink, ShieldCheck } from "lucide-react";

export default async function SettingsPage({ searchParams }) {
  const params = await searchParams;
  const currentSlug = params?.business || DEFAULT_BUSINESS_SLUG;
  const business = DEMO_BUSINESSES[currentSlug] || DEMO_BUSINESSES[DEFAULT_BUSINESS_SLUG];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Suspense fallback={<div className="h-16 bg-white border-b" />}>
        <DashboardNavbar />
      </Suspense>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Location & Google Place ID Configuration
            </h1>
            <p className="text-xs text-slate-500">
              Manage GBP deep-links, customer tags and escalation contacts for {business.name}
            </p>
          </div>
        </div>

        {/* 1. Google Business Profile & Place ID */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900">Official Google Review Link Connection</h2>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
              Connected & Verified
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Google Place ID
            </label>
            <input
              type="text"
              readOnly
              value={business.googlePlaceId}
              className="w-full text-xs font-mono bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-slate-700 cursor-not-allowed"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Place ID uniquely identifies this location in the Google Maps directory worldwide.
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Direct Review Launch URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={business.googleReviewUrl}
                className="w-full text-xs font-mono bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-slate-700 cursor-not-allowed"
              />
              <a
                href={business.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-all"
              >
                <span>Test Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 2. Business Profile & Manager Escalation */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Business Details & Escalation Contact</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Business Name</label>
              <input
                type="text"
                defaultValue={business.name}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Category</label>
              <input
                type="text"
                defaultValue={business.category}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Address / Landmark</label>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                defaultValue={business.address}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Manager WhatsApp Number (For Direct Escalations)
            </label>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <input
                type="text"
                defaultValue={business.managerPhone}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Customers rating 1–3 stars receive an optional shortcut to message this number directly on WhatsApp to resolve grievances before posting public reviews.
            </p>
          </div>
        </div>

        {/* 3. Preset Highlight Chips */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900">Custom Seed Highlight Chips</h2>
            </div>
            <span className="text-[11px] text-slate-500">8 chips active</span>
          </div>
          <p className="text-xs text-slate-500">
            These keywords appear on the customer scan card so customers can select what they enjoyed in 1 tap:
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {business.defaultTags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

