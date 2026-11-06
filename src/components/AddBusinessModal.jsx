"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBusinessModal({ isOpen, onClose }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "Restaurant & Cafe",
    googleReviewUrl: "",
    address: "",
    managerPhone: "",
    tagsInput: "Crispy Food, Quick Service, Polite Staff, Cozy Vibe"
  });

  const categoryPresets = {
    "Restaurant & Cafe": "Crispy Dosa, Fast Service, Authentic Flavors, Great Ambiance",
    "Dental Clinic": "Painless Root Canal, Gentle Doctor, Spotless Cleanliness, Caring Staff",
    "Salon & Spa": "Precision Haircut, Relaxing Massage, Expert Stylists, Hygienic Studio",
    "Retail Store": "Great Collection, Helpful Staff, Genuine Quality, Value for Money",
    "Healthcare / Clinic": "Empathetic Doctor, Minimal Waiting Time, Accurate Diagnosis, Clean Facility",
    "Hotel & Stay": "Clean Rooms, Courteous Staff, Delicious Breakfast, Prime Location",
    "Other": "Great Service, Prompt Response, Friendly Team, Highly Recommended"
  };

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setFormData((prev) => ({
      ...prev,
      category: cat,
      tagsInput: categoryPresets[cat] || prev.tagsInput
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      const tagsArray = formData.tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await fetch("/api/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          googleReviewUrl: formData.googleReviewUrl.trim() || `https://maps.google.com/?q=${encodeURIComponent(formData.name)}`,
          address: formData.address || "India",
          managerPhone: formData.managerPhone || "+919876543210",
          defaultTags: tagsArray
        })
      });

      const data = await res.json();
      if (data.success && data.business) {
        onClose();
        router.push(`/dashboard?business=${data.business.slug}`);
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to create business:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-[#131b2e] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#faf8ff]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#3525cd]">
              <span className="material-symbols-outlined text-[20px]">add_business</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-[#131b2e] font-bold">
                Register New Business
              </h2>
              <p className="font-body-sm text-body-sm text-[#464555]">
                Generate your custom QR standee and live mobile review link in 30 seconds
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#464555] hover:bg-[#e2e7ff] hover:text-[#131b2e]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
          {/* Business Name */}
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-label-md font-semibold text-[#131b2e]">
              Business Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Royal Sweets &amp; Restaurant"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-[#131b2e] font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-[#3525cd]"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-label-md font-semibold text-[#131b2e]">
              Industry Category
            </label>
            <select
              value={formData.category}
              onChange={handleCategoryChange}
              className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-[#131b2e] font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-[#3525cd]"
            >
              <option value="Restaurant &amp; Cafe">Restaurant &amp; Cafe</option>
              <option value="Dental Clinic">Dental Clinic</option>
              <option value="Salon &amp; Spa">Salon &amp; Spa</option>
              <option value="Retail Store">Retail Store</option>
              <option value="Healthcare / Clinic">Healthcare / Clinic</option>
              <option value="Hotel &amp; Stay">Hotel &amp; Stay</option>
              <option value="Other">Other Local Business</option>
            </select>
          </div>

          {/* Google Review URL */}
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-label-md font-semibold text-[#131b2e]">
              Google Review Link or Google Maps URL
            </label>
            <input
              type="url"
              placeholder="https://search.google.com/local/writereview?placeid=... or Maps link"
              value={formData.googleReviewUrl}
              onChange={(e) => setFormData({ ...formData, googleReviewUrl: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-[#131b2e] font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-[#3525cd]"
            />
            <span className="font-body-sm text-[11px] text-[#464555]">
              (Leave blank if you don&apos;t have it handy right now; we&apos;ll auto-link Google Search for your shop name)
            </span>
          </div>

          {/* Address / Location */}
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-label-md font-semibold text-[#131b2e]">
              City &amp; Area
            </label>
            <input
              type="text"
              placeholder="e.g. Hazratganj, Lucknow"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-[#131b2e] font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-[#3525cd]"
            />
          </div>

          {/* Custom Highlight Tags */}
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-label-md font-semibold text-[#131b2e]">
              Highlight Review Tags (Comma-Separated)
            </label>
            <input
              type="text"
              value={formData.tagsInput}
              onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-[#131b2e] font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-[#3525cd]"
            />
            <span className="font-body-sm text-[11px] text-[#464555]">
              These chips appear on the customer phone for 1-tap review crafting.
            </span>
          </div>

          {/* Manager WhatsApp */}
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-label-md font-semibold text-[#131b2e]">
              Manager WhatsApp Number (Optional)
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.managerPhone}
              onChange={(e) => setFormData({ ...formData, managerPhone: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-[#131b2e] font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-[#3525cd]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-[#464555] font-label-md text-label-md hover:bg-[#f2f3ff]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-lg bg-[#4f46e5] hover:bg-[#3525cd] text-white font-label-md text-label-md font-semibold shadow-sm transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
              <span>{isSubmitting ? "Creating..." : "Create Business & Generate Standee"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

