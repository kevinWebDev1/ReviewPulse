"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function CustomerReviewCard({ business, isFullPage = false }) {
  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState([]);
  const [activeTone, setActiveTone] = useState("PUNCHY"); // PUNCHY | DETAILED | CASUAL
  const [copied, setCopied] = useState(false);
  const [btnText, setBtnText] = useState("Copy Review & Open Google Maps");
  const [suggestions, setSuggestions] = useState({
    PUNCHY: "Incredible butter chicken and crispy paneer tikka! Fast service and warm hospitality. Hands down our favorite neighborhood curry spot!",
    DETAILED: "Had a delightful family dinner at The Spice Symphony. Staff was extremely courteous and attentive. The flavors were authentic Awadhi, especially the paneer tikka and dal makhani. Highly recommend!",
    CASUAL: "Khana bohot lajawab tha, especially crispy paneer tikka aur dal makhani! Service ekdum fast thi. Total paisa vasool! ⭐⭐⭐⭐⭐"
  });

  const availableTags = business?.defaultTags?.slice(0, 4) || [
    "Crispy Paneer Tikka",
    "Dal Makhani",
    "Fast Service",
    "Courteous Staff"
  ];

  useEffect(() => {
    setSelectedTags(availableTags.slice(0, 2));
  }, [business?.slug]);

  const toggleTag = (tag) => {
    const updated = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updated);
    fetchSuggestions(rating, updated);
  };

  const handleRating = (r) => {
    setRating(r);
    fetchSuggestions(r, selectedTags);
  };

  const fetchSuggestions = async (rateVal, tags) => {
    try {
      const res = await fetch("/api/ai/generate-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: business?.name || "The Spice Symphony",
          category: business?.category || "Restaurant",
          rating: rateVal,
          selectedTags: tags
        })
      });
      const data = await res.json();
      if (data.success && data.suggestions?.length >= 3) {
        setSuggestions({
          PUNCHY: data.suggestions[0].text,
          DETAILED: data.suggestions[1].text,
          CASUAL: data.suggestions[2].text
        });
      }
    } catch {
      // Keep existing
    }
  };

  const handleCopyAndOpenGoogle = async () => {
    const currentReview = suggestions[activeTone] || suggestions.PUNCHY;
    try {
      await navigator.clipboard.writeText(currentReview);
      setCopied(true);
      setBtnText("Copied! Opening Google Maps...");
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.85 }
      });

      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: business?.slug,
          eventType: "copy_google_click",
          rating,
          tagCount: selectedTags.length
        })
      }).catch(() => {});

      setTimeout(() => {
        window.open(business?.googleReviewUrl || "https://maps.google.com", "_blank", "noopener,noreferrer");
      }, 700);

      setTimeout(() => {
        setCopied(false);
        setBtnText("Copy Review & Open Google Maps");
      }, 3500);
    } catch {
      window.open(business?.googleReviewUrl || "https://maps.google.com", "_blank", "noopener,noreferrer");
    }
  };

  const getWhatsAppLink = () => {
    const phone = business?.managerPhone?.replace(/[^0-9]/g, "") || "919876543210";
    const text = encodeURIComponent(
      `Hello ${business?.managerName || "Manager"}, I recently visited ${business?.name} and wanted to share direct feedback regarding my experience.`
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  const currentText = suggestions[activeTone] || suggestions.PUNCHY;
  const wordCount = currentText.trim().split(/\s+/).length;

  return (
    <div
      className={
        isFullPage
          ? "w-full max-w-md mx-auto min-h-screen px-4 py-5 flex flex-col justify-between text-[#131b2e] bg-white"
          : "w-full max-w-md mx-auto bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col gap-3.5 text-[#131b2e]"
      }
    >
      <div className="flex flex-col gap-3.5">
        {/* 1. Restaurant Header */}
        <div className="flex items-center justify-between bg-[#f2f3ff] p-3 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#684000] flex items-center justify-center text-white shadow-xs shrink-0">
              <span className="material-symbols-outlined text-[24px]">local_fire_department</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-headline-sm text-[#131b2e] font-bold tracking-tight truncate">
                  {business?.name || "The Spice Symphony"}
                </span>
                <span className="material-symbols-outlined text-[18px] text-[#3525cd] shrink-0">verified</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#464555] font-label-sm text-label-sm mt-0.5">
                <span className="flex items-center text-[#684000] font-semibold">
                  ★ {business?.rating || 4.8}
                </span>
                <span>•</span>
                <span>{business?.totalReviews || 846}+ Google Reviews</span>
              </div>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs shrink-0 border border-slate-100">
            <span className="material-symbols-outlined text-[18px] text-[#3525cd]">storefront</span>
          </div>
        </div>

        {/* 2. Star Rating Prompt */}
        <div className="flex flex-col items-center justify-center py-1 gap-1 text-center">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#464555] font-bold">
            How was your experience today?
          </span>

          {/* 5 Stars */}
          <div className="flex items-center gap-1.5 my-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRating(star)}
                className="text-[#885500] hover:scale-115 active:scale-95 transition-transform focus:outline-none p-1"
                title={`${star} Star`}
              >
                <span
                  className="material-symbols-outlined text-[36px] text-[#885500]"
                  style={{ fontVariationSettings: rating >= star ? "'FILL' 1" : "'FILL' 0" }}
                >
                  star
                </span>
              </button>
            ))}
          </div>

          <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-[#ffddb8] text-[#2a1700] font-label-md text-label-md font-semibold">
            {rating === 5 && "⭐ Outstanding! We're thrilled you loved it!"}
            {rating === 4 && "👍 Very Good! Thanks for your visit!"}
            {rating === 3 && "👌 Good! Tell us how we can improve."}
            {rating <= 2 && "🙏 We apologize! Let our manager help."}
          </span>
        </div>

        {/* 3. Highlight Tags */}
        <div className="flex flex-col gap-1.5">
          <span className="font-label-sm text-label-sm text-[#464555] font-medium">
            What stood out most?
          </span>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#3525cd] text-white shadow-xs"
                      : "bg-[#e2e7ff] text-[#464555] hover:bg-[#dae2fd]"
                  }`}
                >
                  {isSelected && <span className="material-symbols-outlined text-[14px]">check</span>}
                  <span>{tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Gemini AI Box */}
        <div className="bg-[#f2f3ff] p-3.5 rounded-2xl flex flex-col gap-2.5 border border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#3525cd] font-label-sm text-label-sm font-bold">
              <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
              <span>AI Review Generator</span>
            </div>
            <span className="font-label-sm text-label-sm text-[#464555]">Tap to pick</span>
          </div>

          {/* Tone Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-[#dae2fd] p-1 rounded-lg">
            {["PUNCHY", "DETAILED", "CASUAL"].map((tone) => (
              <button
                key={tone}
                type="button"
                onClick={() => setActiveTone(tone)}
                className={`py-1.5 px-2 rounded-md font-label-sm text-label-sm font-semibold transition-all text-center truncate ${
                  activeTone === tone
                    ? "bg-white text-[#3525cd] shadow-xs"
                    : "text-[#464555] hover:text-[#131b2e]"
                }`}
              >
                {tone}
              </button>
            ))}
          </div>

          {/* AI Review Draft */}
          <div className="bg-white p-3.5 rounded-xl shadow-xs flex flex-col gap-2 border border-slate-100">
            <p className="font-body-md text-body-sm text-[#131b2e] italic leading-relaxed">
              &ldquo;{currentText}&rdquo;
            </p>
            <div className="flex items-center justify-between font-label-sm text-label-sm text-[#464555] pt-1">
              <span className="flex items-center gap-1 text-[#006c49] font-medium">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span>Optimized for SEO</span>
              </span>
              <span>{wordCount} words</span>
            </div>
          </div>
        </div>

        {/* 5. 1-Tap CTA Button */}
        <button
          type="button"
          onClick={handleCopyAndOpenGoogle}
          className={`w-full py-3.5 px-4 rounded-xl text-white font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-md ${
            copied
              ? "bg-[#006c49] shadow-emerald-500/20"
              : "bg-[#3525cd] hover:bg-[#4f46e5] shadow-indigo-500/20"
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {copied ? "check" : "content_copy"}
          </span>
          <span>{btnText}</span>
        </button>

        {/* 6. Microcopy & WhatsApp */}
        <div className="flex flex-col items-center gap-1 text-center pt-0.5">
          <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-[#464555]">
            <span className="material-symbols-outlined text-[14px] text-[#006c49]">verified_user</span>
            <span>100% Official Google Review • Takes only 15 seconds</span>
          </div>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#464555] font-label-sm text-label-sm hover:underline hover:text-[#131b2e] mt-1"
          >
            <span>Had an issue? Talk directly with Manager on WhatsApp</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </a>
        </div>
      </div>

      {/* Discrete Powered-by footer on full page */}
      {isFullPage && (
        <div className="text-center pt-4 pb-2 text-[11px] text-[#464555]">
          Powered by <strong className="text-[#131b2e]">ReviewPulse.ai</strong> • 100% Policy Compliant Review Acceleration
        </div>
      )}
    </div>
  );
}
