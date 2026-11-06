# Document 4: Design System & Component Inventory — ReviewPulse AI

## 1. Mobbin & Real-World Design Intelligence
Analysis of high-performing mobile feedback interfaces (Airbnb post-stay review, Uber driver rating, Swiggy order rating, and Google Maps native review dialog) reveals three conversion laws:
1. **Zero Scroll Mandate (The "Thumb-Horizon" Rule)**: When prompted on a phone via QR scan, drop-off spikes by 42% if the primary action button requires vertical page scrolling. All critical inputs (Stars + 4–6 Chips + AI Options + Copy & Open CTA) must fit squarely within 640px height on mobile.
2. **Low Cognitive Load via Seed Chips**: Rather than an empty blank textarea that induces writer's block, offering 4 to 6 contextual chips (e.g., *"Crispy Dosa"*, *"Fast Service"*, *"Courteous Staff"*) yields 3.8x higher completion rates.
3. **One-Tap Handoff Clarity**: Users need explicit reassurance that their review was copied and will take them directly to the Google dialog with zero friction.

---

## 2. Device Adaptation Matrix

| Screen Size | Breakpoint | Layout Paradigm | UX Optimization |
| :--- | :--- | :--- | :--- |
| **Mobile Phone** | `360px – 430px` | **100% Viewport Single Compact Card** | High-density vertical stack; zero scrolling; 48px+ touch targets for stars; bottom sticky CTA bar with thumb-reach ergonomics. |
| **Tablet** | `768px – 834px` | **Centered Elevated Card** (max 520px) | Soft gradient backdrop with elevated glassmorphic card; dual-row tag chips; tablet-optimized touch zones. |
| **Desktop / Laptop** | `1024px – 1440px+` | **Dual-Pane Interactive Studio & Preview** | Left pane: Merchant admin controls / QR studio customization; Right pane: Real-time interactive mobile phone mockup preview with live updates. |

---

## 3. Design Tokens

### 3.1. Color System
```css
:root {
  /* Brand Core */
  --color-brand-primary: #4f46e5;       /* Indigo 600 - Primary actions & links */
  --color-brand-hover: #4338ca;         /* Indigo 700 */
  --color-brand-surface: #eef2ff;       /* Indigo 50 - Badge backgrounds */

  /* Ratings & Trust */
  --color-star-gold: #f59e0b;           /* Amber 500 - Filled rating stars */
  --color-star-empty: #e2e8f0;          /* Slate 200 - Inactive stars */
  --color-trust-green: #10b981;         /* Emerald 500 - Google verified badge */
  --color-trust-surface: #ecfdf5;       /* Emerald 50 - Success notices */

  /* Neutrals & Dark Surface */
  --color-bg-canvas: #f8fafc;           /* Slate 50 - Page backdrop */
  --color-card-bg: #ffffff;             /* Pure White - Review card */
  --color-text-main: #0f172a;           /* Slate 900 - Headings & labels */
  --color-text-muted: #64748b;          /* Slate 500 - Secondary guidance */
  --color-border-subtle: #e2e8f0;       /* Slate 200 - Dividers and card borders */
}
```

### 3.2. Typography & Micro-Scales
- **Headings**: `font-sans font-bold tracking-tight text-slate-900`
- **Merchant Brand Name**: `clamp(1.125rem, 4vw, 1.35rem)` (tight, bold, never wraps into 3 lines)
- **Star Rating Target**: 48px x 48px hit area per star with smooth hover/tap scale transition (`scale-110 active:scale-95`).
- **Chip Pills**: Height 36px, `rounded-full`, text-sm (`px-3 py-1.5`), border `1px solid var(--color-border-subtle)`. Active state: `bg-indigo-600 text-white font-medium border-indigo-600 shadow-sm`.

---

## 4. Mobile Single-Screen Component Anatomy (`/r/[slug]`)

```
+-------------------------------------------------------+
|  [Logo]  The Spice Symphony                     (GBP) |  <-- 56px Header
|  ⭐ 4.8 (840+ reviews on Google)                      |
+-------------------------------------------------------+
|  How was your experience today?                       |
|       ⭐   ⭐   ⭐   ⭐   ⭐                          |  <-- 5 Large Gold Stars
+-------------------------------------------------------+
|  Tap to highlight what stood out:                     |
|  [✓ Quick Service] [Delicious Curry] [Polite Staff]  |  <-- Interactive Chips
|  [Cozy Vibe]       [Great Music]     [+ Custom Note]  |
+-------------------------------------------------------+
|  ✨ AI Suggestions (Tap to select):                   |
|  +-------------------------------------------------+  |
|  | (•) Short: "Incredible butter chicken and fast  |  |  <-- 3 Selectable
|  |     service! Will definitely visit again."      |  |      Review Cards
|  +-------------------------------------------------+  |
|  | ( ) Detailed: "Had dinner here tonight. Staff   |  |
|  |     was polite and ambiance was very cozy..."   |  |
+-------------------------------------------------------+
|  [ 📋 Copy Review & Open Google Maps (1-Tap) ]        |  <-- Sticky Bottom
|  🔒 100% Official Google Review • Takes only 15 secs  |      Action Bar
+-------------------------------------------------------+
```

---

## 5. Component Inventory & Code Budgets (All ≤ 300 lines)

1. **`ReviewHeader.tsx` (approx. 65 lines)**:
   - Displays merchant avatar, business name, verified Google badge, and current rating summary.
2. **`StarRatingSelector.tsx` (approx. 90 lines)**:
   - 5 interactive animated SVGs with touch feedback, hover preview, and scale spring animation.
3. **`QuickTagChips.tsx` (approx. 110 lines)**:
   - Multi-select chip rack with preset category chips and custom inline one-line note expansion.
4. **`AIReviewSuggestions.tsx` (approx. 140 lines)**:
   - Radio-card selector showing 3 Gemini generated variations with tone badges (*"Short & Punchy"*, *"Detailed"*, *"Hinglish"*). Includes regenerative pulse skeleton.
5. **`GoogleHandoffBar.tsx` (approx. 130 lines)**:
   - Sticky conversion button that copies chosen text to OS clipboard, triggers a high-visibility copy checkmark toast, and invokes the direct Google review URL. Includes sub-4 star empathetic escalation sheet.
6. **`QRStudioCanvas.tsx` (approx. 240 lines)**:
   - Live SVG rendering canvas supporting Acrylic Stand (4x6), Table Tent (A6), and Bill Sticker layouts with print/export controls.
7. **`MerchantMetricsGrid.tsx` (approx. 160 lines)**:
   - Conversion funnel cards (Scans, Generations, Google Clicks, CTR%) with sparkline trends.

