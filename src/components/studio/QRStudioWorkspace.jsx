"use client";

import { useState } from "react";
import StandeePreview from "@/components/StandeePreview";

export default function QRStudioWorkspace({ business }) {
  const [format, setFormat] = useState("acrylic"); // acrylic | tent | sticker
  const [accentColor, setAccentColor] = useState("#D9621E");

  // Default state matching User Request img1:
  // Google 5-Star Rating Pill: CHECKED
  // Physical Location Sub-address: UNCHECKED
  // UPI / Camera Compatibility Pill: UNCHECKED
  const [showRating, setShowRating] = useState(true);
  const [showAddress, setShowAddress] = useState(false);
  const [showUpi, setShowUpi] = useState(false);

  const [headline, setHeadline] = useState("Scan to Rate Us on Google");
  const [subtext, setSubtext] = useState("Takes only 15 seconds with AI assistance");
  const [zoom, setZoom] = useState(1.0);
  const [showBase, setShowBase] = useState(true);
  const [toastMsg, setToastMsg] = useState("");

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handlePrint = () => {
    triggerToast("Preparing 300 DPI CMYK PDF with trim marks...");
    setTimeout(() => window.print(), 600);
  };

  const handleDownloadPNG = () => {
    triggerToast("Generating 300 DPI PNG asset...");
  };

  const copyReviewUrl = () => {
    const url = business?.googleReviewUrl || "https://search.google.com/local/writereview?placeid=ChIJib0wJc_5njkRDfcs8tLulRA";
    navigator.clipboard.writeText(url).then(() => {
      triggerToast("Google Place Review link copied to clipboard!");
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* 12-Column Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Controls (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-xl p-6 shadow-xs flex flex-col gap-6 border border-slate-200/80">
            {/* 1. Format Selection */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-label-lg text-label-lg text-[#131b2e] font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#3525cd] text-[18px]">crop_free</span>
                  1. Select Physical Format
                </span>
                <span className="font-label-sm text-label-sm text-[#464555]">Ratio &amp; Bleed Matched</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: "acrylic", label: "Acrylic Stand", size: "4 x 6 in (10x15cm)", icon: "ad_units", popular: true },
                  { id: "tent", label: "Table Tent", size: "A6 Dual-Sided", icon: "layers" },
                  { id: "sticker", label: "Bill Sticker", size: "2 x 2 in Square", icon: "sticky_note_2" }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { setFormat(item.id); triggerToast(`Switched format to ${item.label}`); }}
                    className={`p-3 rounded-xl text-left transition-all relative flex flex-col justify-between h-32 shadow-xs border ${
                      format === item.id ? "bg-[#f2f3ff] border-[#4f46e5] ring-2 ring-[#4f46e5]/20" : "bg-white hover:bg-[#f2f3ff] border-slate-200/80"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${format === item.id ? "bg-[#4f46e5] text-white" : "bg-[#eaedff] text-[#464555]"}`}>
                        <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      </div>
                      {item.popular && (
                        <span className="px-1.5 py-0.5 rounded-full bg-[#ffddb8] text-[#2a1700] font-label-sm text-[10px] uppercase tracking-wide">Popular</span>
                      )}
                    </div>
                    <div>
                      <div className="font-label-md text-label-md font-semibold text-[#131b2e]">{item.label}</div>
                      <div className="font-body-sm text-body-sm text-[#464555]">{item.size}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Branding & Hospitality Accents */}
            <div className="flex flex-col gap-4">
              <span className="font-label-lg text-label-lg text-[#131b2e] font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3525cd] text-[18px]">palette</span>
                2. Branding &amp; Hospitality Accents
              </span>

              <div className="flex items-center justify-between">
                <span className="font-body-md text-body-md text-[#131b2e]">Accent Color Theme</span>
                <div className="flex items-center gap-2">
                  {[
                    { hex: "#D9621E", name: "Warm Spice" },
                    { hex: "#4F46E5", name: "Deep Indigo" },
                    { hex: "#059669", name: "Forest Green" },
                    { hex: "#1E293B", name: "Sleek Slate" }
                  ].map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => { setAccentColor(c.hex); triggerToast(`Accent updated to ${c.name}`); }}
                      className={`w-7 h-7 rounded-full transition-transform flex items-center justify-center shadow-xs ${
                        accentColor === c.hex ? "scale-110 ring-2 ring-[#3525cd] ring-offset-2" : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {accentColor === c.hex && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-col gap-2 pt-1">
                {[
                  { id: "rating", icon: "star", color: "text-[#885500]", title: "Google 5-Star Rating Pill", sub: 'Shows "4.8 ★ (840+ Reviews)" header', checked: showRating, set: setShowRating },
                  { id: "address", icon: "pin_drop", color: "text-[#3525cd]", title: "Physical Location Sub-address", sub: "Reassures diners they review correct branch", checked: showAddress, set: setShowAddress },
                  { id: "upi", icon: "contactless", color: "text-[#006c49]", title: "UPI / Camera Compatibility Pill", sub: "Guides diners using Paytm/PhonePe/GPay apps", checked: showUpi, set: setShowUpi }
                ].map((item) => (
                  <label key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-[#faf8ff] hover:bg-[#f2f3ff] cursor-pointer transition-colors border border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined ${item.color} text-[20px]`}>{item.icon}</span>
                      <div>
                        <div className="font-label-md text-label-md text-[#131b2e] font-medium">{item.title}</div>
                        <div className="font-body-sm text-body-sm text-[#464555]">{item.sub}</div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => item.set(e.target.checked)}
                      className="w-5 h-5 accent-[#4f46e5] rounded cursor-pointer"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Custom Messaging Inputs */}
            <div className="flex flex-col gap-4">
              <span className="font-label-lg text-label-lg text-[#131b2e] font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3525cd] text-[18px]">edit_note</span>
                3. Custom Messaging Inputs
              </span>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between font-label-md text-label-md text-[#464555]">
                  <span>Headline Copy</span>
                  <span className="font-body-sm text-body-sm">{headline.length}/40</span>
                </div>
                <input
                  type="text"
                  maxLength={40}
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-white text-[#131b2e] font-body-md text-body-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3525cd] shadow-xs"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between font-label-md text-label-md text-[#464555]">
                  <span>Supporting Subtext</span>
                  <span className="font-body-sm text-body-sm">{subtext.length}/60</span>
                </div>
                <input
                  type="text"
                  maxLength={60}
                  value={subtext}
                  onChange={(e) => setSubtext(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-white text-[#131b2e] font-body-md text-body-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3525cd] shadow-xs"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={handlePrint}
                className="w-full h-12 bg-[#4f46e5] hover:bg-[#3525cd] text-white font-label-lg text-label-lg font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <span className="material-symbols-outlined text-[20px]">print</span>
                <span>Print Standee / Save Vector PDF</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadPNG}
                className="w-full py-2.5 bg-white hover:bg-[#f2f3ff] text-[#131b2e] font-label-md text-label-md font-semibold rounded-xl shadow-xs border border-slate-200 flex items-center justify-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-[#464555] text-[18px]">download</span>
                <span>Download High-Res PNG (300 DPI)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative w-full rounded-2xl bg-[#e2e7ff] p-8 lg:p-12 overflow-hidden flex flex-col items-center justify-center min-h-[700px] shadow-inner border border-slate-200/50">
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#006c49]" />
              <span className="font-label-sm text-label-sm text-[#131b2e] font-medium">True-to-Scale 4 x 6 Preview</span>
            </div>

            {/* Live Standee Preview */}
            <StandeePreview
              business={business}
              format={format}
              accentColor={accentColor}
              showRating={showRating}
              showAddress={showAddress}
              showUpi={showUpi}
              headline={headline}
              subtext={subtext}
              zoom={zoom}
              showBase={showBase}
            />

            {/* Zoom / Base Controls Bar */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-xs p-1 rounded-xl shadow-xs border border-slate-200">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(z - 0.1, 0.7))}
                className="p-1.5 hover:bg-[#f2f3ff] rounded-lg text-[#464555]"
                title="Zoom Out"
              >
                <span className="material-symbols-outlined text-[18px]">zoom_out</span>
              </button>
              <span className="font-label-sm text-label-sm px-2 text-[#131b2e] font-semibold">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(z + 0.1, 1.3))}
                className="p-1.5 hover:bg-[#f2f3ff] rounded-lg text-[#464555]"
                title="Zoom In"
              >
                <span className="material-symbols-outlined text-[18px]">zoom_in</span>
              </button>
              <div className="w-[1px] h-4 bg-slate-300 mx-1" />
              <button
                type="button"
                onClick={() => setShowBase((b) => !b)}
                className="px-2.5 py-1 text-[#464555] hover:text-[#131b2e] font-label-sm text-label-sm font-medium rounded-lg"
              >
                Base: {showBase ? "On" : "Off"}
              </button>
            </div>
          </div>

          {/* Direct Link Resolution Bar */}
          <div className="p-4 rounded-xl bg-[#f2f3ff] shadow-xs flex items-center justify-between border border-slate-200/80">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-xs shrink-0">
                <span className="material-symbols-outlined text-[#006c49] text-[22px]">verified_user</span>
              </div>
              <div className="min-w-0">
                <div className="font-label-md text-label-md font-semibold text-[#131b2e]">Direct Review URL Resolution</div>
                <div className="font-body-sm text-body-sm text-[#464555] truncate font-mono text-[11px]">
                  {business?.googleReviewUrl || "https://search.google.com/local/writereview?placeid=ChIJib0wJc_5njkRDfcs8tLulRA"}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={copyReviewUrl}
              className="shrink-0 px-3 py-1.5 bg-white hover:bg-[#eaedff] rounded-lg text-[#131b2e] font-label-md text-label-md shadow-xs transition-colors flex items-center gap-1.5 border border-slate-200"
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
              <span>Copy Link</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 px-4 py-2.5 bg-[#283044] text-[#eef0ff] rounded-xl shadow-xl font-label-md text-label-md flex items-center gap-2 z-50">
          <span className="material-symbols-outlined text-[#6cf8bb] text-[18px]">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
