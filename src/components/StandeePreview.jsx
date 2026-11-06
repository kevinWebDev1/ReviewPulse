"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function StandeePreview({
  business,
  format = "acrylic", // acrylic | tent | sticker
  accentColor = "#D9621E",
  showRating = true,
  showAddress = true,
  showUpi = true,
  headline = "Scan to Rate Us on Google",
  subtext = "Takes only 15 seconds with AI assistance",
  zoom = 1.0,
  showBase = true
}) {
  const [qrSvg, setQrSvg] = useState("");

  const reviewUrl = typeof window !== "undefined"
    ? `${window.location.origin}/r/${business?.slug || "spice-symphony"}`
    : `https://reviewpulse.ai/r/${business?.slug || "spice-symphony"}`;

  // Generate crisp vector QR code
  useEffect(() => {
    QRCode.toString(reviewUrl, {
      type: "svg",
      margin: 1,
      color: {
        dark: "#131b2e",
        light: "#ffffff"
      }
    }).then(setQrSvg).catch(console.error);
  }, [reviewUrl]);

  const frameWidth = format === "acrylic" ? "310px" : format === "tent" ? "340px" : "240px";
  const frameRadius = format === "acrylic" ? "12px" : "8px";

  return (
    <div
      className="relative flex flex-col items-center justify-center my-4 transition-transform duration-300"
      style={{ transform: `scale(${zoom})` }}
    >
      {/* Acrylic Frame */}
      <div
        className="relative z-10 rounded-xl bg-white/95 p-2 shadow-2xl backdrop-blur-xs transition-all duration-300 border border-slate-200/60"
        style={{ width: frameWidth, borderRadius: frameRadius }}
      >
        <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-tr from-white/30 via-transparent to-white/60" />

        {/* Card Content matching Image 3 */}
        <div className="relative rounded-lg bg-white p-6 flex flex-col items-center text-center shadow-xs overflow-hidden min-h-[460px]">
          {/* Top Accent Color Bar */}
          <div
            className="absolute top-0 left-0 right-0 h-2 transition-colors"
            style={{ backgroundColor: accentColor }}
          />

          {/* Business Info Header */}
          <div className="w-full flex flex-col items-center gap-1 mt-2">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f2f3ff] font-label-sm text-[10px] text-[#885500] tracking-wider font-semibold uppercase">
              {business?.category || "RESTAURANT & CAFE"}
            </div>
            <h2 className="font-headline-md text-headline-md text-[#131b2e] font-bold tracking-tight mt-1">
              {business?.name || "The Spice Symphony"}
            </h2>

            {showAddress && (
              <div className="font-body-sm text-body-sm text-[#464555] flex items-center gap-1 transition-all">
                <span className="material-symbols-outlined text-[14px] text-[#3525cd]">location_on</span>
                <span>{business?.address || "Vipin Khand, Gomti Nagar, Lucknow"}</span>
              </div>
            )}
          </div>

          {/* Google 5-Star Rating Pill */}
          {showRating && (
            <div className="my-3 px-3 py-1 rounded-full bg-[#f2f3ff] shadow-xs flex items-center gap-2 transition-all">
              <div className="flex items-center text-amber-500">
                {"★★★★★".split("").map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[16px] text-amber-500"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <span className="font-label-md text-label-md font-bold text-[#131b2e]">
                {business?.rating || 4.8} ★
              </span>
              <span className="font-body-sm text-body-sm text-[#464555]">
                ({business?.totalReviews || 840}+ Reviews)
              </span>
            </div>
          )}

          {/* Headline & Subtext */}
          <div className="flex flex-col items-center gap-0.5 my-2">
            <h3 className="font-headline-sm text-headline-sm text-[#131b2e] font-bold tracking-tight">
              {headline}
            </h3>
            <p className="font-body-sm text-body-sm text-[#464555] max-w-[240px]">
              {subtext}
            </p>
          </div>

          {/* High-Contrast Vector QR Container */}
          <div className="relative my-3 p-3 bg-white rounded-xl shadow-md flex flex-col items-center border border-slate-100">
            <div className="w-40 h-40 bg-white p-1 flex items-center justify-center relative">
              {qrSvg ? (
                <div
                  className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: qrSvg }}
                />
              ) : (
                <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center text-xs text-slate-400">
                  Generating QR...
                </div>
              )}
              {/* Center Decorative Badge */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center border-2 border-white">
                  <div className="w-5 h-5 rounded-full bg-[#4f46e5] flex items-center justify-center text-white text-[10px] font-bold">
                    ★
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* UPI Scanner Pill */}
          {showUpi && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2f3ff] font-label-sm text-[11px] text-[#464555] font-medium transition-all mb-3">
              <span className="material-symbols-outlined text-[#006c49] text-[14px]">qr_code_scanner</span>
              <span>Camera or Paytm / PhonePe / UPI Scanner</span>
            </div>
          )}

          {/* Google Official Verification Badge */}
          <div className="w-full pt-3 mt-auto flex items-center justify-center gap-2 border-t border-slate-100">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
            </svg>
            <span className="font-body-sm text-[11px] text-[#464555] font-medium">
              Verified Google Business Profile
            </span>
          </div>
        </div>
      </div>

      {/* 3D Acrylic Base */}
      {showBase && format === "acrylic" && (
        <div className="relative z-0 w-[350px] h-8 -mt-2 bg-gradient-to-b from-white/70 to-[#e2e7ff]/90 rounded-md shadow-2xl backdrop-blur-md flex items-center justify-center transition-all border border-slate-200/50">
          <div className="w-full h-1 bg-white/60" />
          <div className="absolute bottom-0 w-3/4 h-2 bg-[#131b2e]/10 blur-xs rounded-full" />
        </div>
      )}
    </div>
  );
}

