"use client";

import { useState } from "react";

export default function PrivateFeedbackForm({ business, rating, onRatingChange }) {
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: business?.slug,
          businessName: business?.name,
          rating,
          message,
          customerPhone: phone
        })
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const getWhatsAppLink = () => {
    const rawPhone = business?.managerPhone?.replace(/[^0-9]/g, "") || "919876543210";
    const text = encodeURIComponent(
      `Hello ${business?.managerName || "Manager"}, I recently visited ${business?.name} and wanted to share direct feedback regarding my experience: "${message || "Issues during visit"}"`
    );
    return `https://wa.me/${rawPhone}?text=${text}`;
  };

  if (submitted) {
    return (
      <div className="bg-[#f2f3ff] rounded-2xl p-6 text-center flex flex-col items-center gap-3 border border-slate-200">
        <div className="w-12 h-12 rounded-full bg-[#6cf8bb]/30 text-[#006c49] flex items-center justify-center">
          <span className="material-symbols-outlined text-[28px]">check_circle</span>
        </div>
        <h3 className="font-headline-sm text-headline-sm font-bold text-[#131b2e]">
          Feedback Sent Directly to Owner
        </h3>
        <p className="font-body-md text-body-md text-[#464555] max-w-sm">
          Thank you for letting us know. The management team at {business?.name || "the restaurant"} has received your notes and will take immediate action.
        </p>
        {phone && (
          <p className="font-body-sm text-body-sm text-[#006c49] font-medium">
            The manager will reach out to you shortly at {phone}.
          </p>
        )}
        <button
          type="button"
          onClick={() => { setSubmitted(false); setMessage(""); setPhone(""); onRatingChange(5); }}
          className="mt-2 text-[#3525cd] font-label-md text-label-md font-semibold hover:underline"
        >
          Rate another experience
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-[#fffbfa] rounded-2xl p-5 border border-amber-200/80 shadow-xs">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-amber-700 font-semibold font-label-lg text-label-lg">
          <span className="material-symbols-outlined text-[20px]">support_agent</span>
          <span>We&apos;re so sorry we fell short!</span>
        </div>
        <p className="font-body-sm text-body-sm text-[#464555]">
          Your feedback goes directly to the owner&apos;s private dashboard so we can fix this immediately.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-label-md text-label-md font-semibold text-[#131b2e]">
          What went wrong? <span className="text-rose-500">*</span>
        </label>
        <textarea
          required
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about the food, wait time, staff, or cleanliness..."
          className="w-full p-3 rounded-xl bg-white border border-slate-200 text-[#131b2e] font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-[#3525cd] shadow-xs"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-label-md text-label-md font-medium text-[#464555]">
          Your Phone / WhatsApp (Optional)
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="So manager can reach out &amp; make it right"
          className="w-full h-11 px-3 rounded-xl bg-white border border-slate-200 text-[#131b2e] font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-[#3525cd] shadow-xs"
        />
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <button
          type="submit"
          disabled={submitting || !message.trim()}
          className="w-full h-12 bg-[#283044] hover:bg-[#131b2e] text-white font-label-lg text-label-lg font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">send</span>
          <span>{submitting ? "Sending to Owner..." : "Submit Private Feedback to Owner"}</span>
        </button>

        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-11 bg-white hover:bg-emerald-50 text-[#006c49] font-label-md text-label-md font-semibold rounded-xl border border-emerald-200 flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">chat</span>
          <span>Or Chat Directly with Manager on WhatsApp</span>
        </a>
      </div>

      {/* Google Anti-Gating Policy Compliance */}
      <div className="pt-2 text-center border-t border-slate-200/60">
        <a
          href={business?.googleReviewUrl || "https://maps.google.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body-sm text-[12px] text-[#464555] hover:text-[#131b2e] underline transition-colors"
        >
          Prefer to post a public review on Google Maps instead? Tap here
        </a>
      </div>
    </form>
  );
}

