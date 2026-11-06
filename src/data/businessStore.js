import fs from "fs";
import path from "path";
import { DEMO_BUSINESSES } from "./mockBusinesses";

const DATA_FILE = path.join(process.cwd(), "src", "data", "businesses.json");

// Initialize store file if not present
function initStore() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(DEMO_BUSINESSES, null, 2), "utf-8");
  }
}

export function getAllBusinesses() {
  try {
    initStore();
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading businesses.json:", err);
    return DEMO_BUSINESSES;
  }
}

export function getBusinessBySlug(slug) {
  const all = getAllBusinesses();
  return all[slug] || null;
}

export function saveBusiness(biz) {
  initStore();
  const all = getAllBusinesses();
  const slug = biz.slug || biz.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const newEntry = {
    id: `loc_${Date.now()}`,
    slug,
    name: biz.name,
    tagline: biz.tagline || `Top Rated ${biz.category}`,
    category: biz.category || "Local Business",
    address: biz.address || "India",
    googlePlaceId: biz.googlePlaceId || "ChIJcustomplaceid",
    googleReviewUrl: biz.googleReviewUrl || "https://maps.google.com",
    rating: Number(biz.rating) || 5.0,
    totalReviews: Number(biz.totalReviews) || 1,
    managerPhone: biz.managerPhone || "+919876543210",
    managerName: biz.managerName || "Store Manager",
    brandColor: biz.brandColor || "#4f46e5",
    accentColor: biz.accentColor || "#D9621E",
    logoIcon: "Store",
    avatarBg: "from-indigo-600 to-indigo-800",
    defaultTags: biz.defaultTags?.length > 0
      ? biz.defaultTags
      : ["Great Service", "Friendly Staff", "Clean & Hygienic", "Worth the Price"],
    metrics: {
      totalScans: 0,
      ratingSubmissions: 0,
      aiGenerations: 0,
      googleClicks: 0,
      conversionRate: 0,
      avgRating: 5.0,
      ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    }
  };

  all[slug] = newEntry;
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), "utf-8");
  return newEntry;
}

