"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Printer, Download, Eye, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export default function QRStudioPreview({ business }) {
  const [templateType, setTemplateType] = useState("counter"); // counter, tent, sticker
  const [ctaHeadline, setCtaHeadline] = useState("Scan to Rate Us on Google");
  const [ctaSubtext, setCtaSubtext] = useState("Takes only 15 seconds with AI assistance");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const printAreaRef = useRef(null);

  const reviewUrl = typeof window !== "undefined"
    ? `${window.location.origin}/r/${business.slug}`
    : `https://reviewpulse.ai/r/${business.slug}`;

  // Generate QR Code data URL
  useEffect(() => {
    QRCode.toDataURL(reviewUrl, {
      width: 600,
      margin: 1,
      color: {
        dark: "#0f172a",
        light: "#ffffff"
      }
    }).then(setQrDataUrl).catch(console.error);
  }, [reviewUrl]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = `${business.slug}-qr-code.png`;
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left: Studio Controls (no-print) */}
      <div className="lg:col-span-5 space-y-5 no-print">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 mb-3">1. Select Physical Print Format</h2>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "counter", label: "Acrylic Stand", size: "4 x 6 in" },
              { id: "tent", label: "Table Tent", size: "A6 Foldable" },
              { id: "sticker", label: "Bill Sticker", size: "2 x 2 in" }
            ].map((tmpl) => (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => setTemplateType(tmpl.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  templateType === tmpl.id
                    ? "border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-2 ring-indigo-500/20"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="font-bold text-xs">{tmpl.label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{tmpl.size}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <h2 className="text-sm font-bold text-slate-900">2. Custom Standee Messaging</h2>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Headline</label>
            <input
              type="text"
              value={ctaHeadline}
              onChange={(e) => setCtaHeadline(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Subtext</label>
            <input
              type="text"
              value={ctaSubtext}
              onChange={(e) => setCtaSubtext(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Standee / Save PDF</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadQR}
            className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG</span>
          </button>
        </div>
      </div>

      {/* Right: Live Interactive Print Canvas */}
      <div className="lg:col-span-7 flex justify-center">
        <div
          ref={printAreaRef}
          className={`bg-white border-2 border-slate-900 rounded-2xl p-6 text-center shadow-lg transition-all ${
            templateType === "counter"
              ? "w-[340px] sm:w-[360px] min-h-[500px]"
              : templateType === "tent"
              ? "w-[360px] min-h-[440px]"
              : "w-[260px] min-h-[260px]"
          }`}
        >
          {/* Top Brand Banner */}
          <div className="border-b pb-3 mb-4 border-slate-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
              {business.category}
            </span>
            <h1 className="text-lg font-black text-slate-900 mt-2 tracking-tight">
              {business.name}
            </h1>
            <p className="text-[11px] text-slate-500 mt-0.5">{business.address}</p>
          </div>

          {/* Headline CTA */}
          <div className="my-2">
            <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
              {"★".repeat(5).split("").map((star, i) => (
                <span key={i} className="text-xl leading-none">★</span>
              ))}
            </div>
            <h2 className="text-base font-extrabold text-slate-900 leading-tight">
              {ctaHeadline}
            </h2>
            <p className="text-xs text-slate-500 mt-1">{ctaSubtext}</p>
          </div>

          {/* QR Code Container */}
          <div className="my-4 inline-block p-3 bg-white border-2 border-slate-900 rounded-2xl shadow-xs">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Scan to Review"
                className="w-44 h-44 mx-auto object-contain"
              />
            ) : (
              <div className="w-44 h-44 bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                Generating QR...
              </div>
            )}
            <div className="mt-1 flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Camera or Paytm / UPI Scanner</span>
            </div>
          </div>

          {/* Official Google Badge */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
            </svg>
            <span className="text-xs font-bold text-slate-800">Verified Google Business Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}

