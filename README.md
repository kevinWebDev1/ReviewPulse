# ReviewPulse AI — QR-Based Google Review Management SaaS

ReviewPulse AI is a subscription-based reputation acceleration SaaS engineered specifically for local businesses in India (restaurants, cafes, salons, dental clinics, retail shops, and boutique hotels).

---

## 🚀 Key Highlights & Architecture

1. **Mobile-First Single-Screen Customer Card (`/r/[slug]`)**:
   - Zero-scroll viewport layout (`≤660px` height) optimized for mobile phones (360px–430px).
   - Interactive 5-star rating with tactile spring animations.
   - 1-tap quick highlight chips (cuisine, service, hygiene, ambience).
   - Integrated Gemini 2.5 Flash review generator with fallback heuristics.
   - 1-tap **"Copy Review & Open Google Maps"** clipboard handoff with visual feedback and celebration confetti.
   - **100% Anti-Gating Compliant**: Unconditional Google Maps link access for all ratings (1 to 5 stars), with an empathetic direct WhatsApp manager contact shortcut for ratings 1–3.

2. **Merchant Operations Dashboard (`/dashboard`)**:
   - Real-time conversion funnel: Scans $\rightarrow$ Star Ratings $\rightarrow$ AI Generations $\rightarrow$ Google Handoffs.
   - Live interactive mobile preview simulator on desktop & tablet screens.
   - Pre-loaded with 3 realistic Indian business profiles:
     - **The Spice Symphony** (Fine dining restaurant, Lucknow)
     - **Dr. Neha's Dental Care** (Dental clinic, Bengaluru)
     - **Urban Glow Unisex Salon** (Luxury salon & spa, Mumbai)

3. **Built-in Physical QR Print Studio (`/dashboard/qr-studio`)**:
   - Live vector QR generation with custom CTA copy.
   - Ready-to-print presets:
     - **Acrylic Counter Stand (4" x 6")** for cash counters & reception desks.
     - **Foldable Table Tent (A6)** for cafe and dining tables.
     - **Bill / Packaging Sticker (2" x 2")** for receipt slips and takeaway boxes.
   - 1-click browser print and high-res PNG download.

4. **Business Model & Pricing Engine**:
   - Starter: ₹199/month
   - Growth: ₹399/month
   - Business: ₹799/month

---

## 🛠️ Quick Start

```bash
# 1. Navigate to directory
cd clients/active/qr-review-saas

# 2. Start development server
npm run dev
# App will run at http://localhost:3000

# 3. Build for production
npm run build
```

### Environment Configuration (Optional)
To use live Google Gemini 2.5 Flash API calls, create a `.env.local` file:
```env
GEMINI_API_KEY=your_google_gemini_api_key
```
*(If no API key is provided, the platform automatically utilizes its high-fidelity Indian SMB heuristic generation engine with zero latency).*

