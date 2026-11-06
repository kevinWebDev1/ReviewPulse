"use client";

import { Utensils, Stethoscope, Sparkles, Store, ShieldCheck } from "lucide-react";

export default function ReviewHeader({ business }) {
  const getIcon = (name) => {
    switch (name) {
      case "Utensils":
        return <Utensils className="w-5 h-5 text-white" />;
      case "Stethoscope":
        return <Stethoscope className="w-5 h-5 text-white" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-white" />;
      default:
        return <Store className="w-5 h-5 text-white" />;
    }
  };

  return (
    <header className="flex items-center justify-between pb-3 border-b border-slate-100">
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${business.avatarBg || "from-indigo-600 to-indigo-800"} flex items-center justify-center shadow-sm shrink-0`}
        >
          {getIcon(business.logoIcon)}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="text-base font-bold text-slate-900 truncate leading-tight">
              {business.name}
            </h1>
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" title="Google Verified Merchant" />
          </div>
          <p className="text-xs text-slate-500 truncate flex items-center gap-1.5 mt-0.5">
            <span className="inline-flex items-center gap-0.5 font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded text-[11px]">
              ★ {business.rating}
            </span>
            <span>({business.totalReviews} on Google)</span>
            <span>•</span>
            <span className="truncate">{business.category}</span>
          </p>
        </div>
      </div>

      {/* Google Business Profile Mini Badge */}
      <div className="shrink-0 flex items-center gap-1 bg-white border border-slate-200/80 shadow-xs px-2 py-1 rounded-lg">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
        <span className="text-[10px] font-bold text-slate-700">Reviews</span>
      </div>
    </header>
  );
}

