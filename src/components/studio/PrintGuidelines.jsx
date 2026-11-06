"use client";

export default function PrintGuidelines() {
  const guidelines = [
    {
      title: "Acrylic Counter Stand (4 x 6 in)",
      tag: "Best Conversion",
      tagClass: "bg-[#6cf8bb] text-[#00714d]",
      icon: "ad_units",
      desc: "Order clear T-shape or L-shape acrylic holders on Amazon India or local print shops. Place directly next to the billing counter and UPI soundbox for 4x review velocity.",
      material: "Material: 2mm Clear Cast Acrylic",
      price: "₹120 – ₹180 / unit"
    },
    {
      title: "Table Tent (A6 Foldable)",
      tag: "Tabletop Dining",
      tagClass: "bg-[#eaedff] text-[#3525cd]",
      icon: "table_restaurant",
      desc: "Print on 300 GSM matte or velvet cardstock for dining tables. Features identical dual-sided layout so guests on either side of table 4 or booth can scan seamlessly.",
      material: "Material: 300 GSM Art Card Matte",
      price: "₹15 – ₹25 / sheet"
    },
    {
      title: "Bill Sticker (2 x 2 in)",
      tag: "Takeaway & Delivery",
      tagClass: "bg-[#eaedff] text-[#464555]",
      icon: "receipt_long",
      desc: "Glossy adhesive roll stickers for takeaway boxes, delivery bags, and bill check folders. Includes mini high-contrast QR code for instant post-meal feedback.",
      material: "Material: Waterproof Vinyl Roll",
      price: "₹2 – ₹4 / sticker"
    }
  ];

  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-headline-md text-headline-md text-[#131b2e] tracking-tight">
          Print &amp; Sourcing Guidelines for Restaurants
        </h2>
        <p className="font-body-md text-body-md text-[#464555]">
          Recommended material stocks, placement strategies, and procurement options across India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guidelines.map((g) => (
          <div
            key={g.title}
            className="p-6 rounded-2xl bg-white shadow-xs flex flex-col justify-between gap-4 hover:shadow-md transition-all border border-slate-200/80"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#3525cd] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">{g.icon}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${g.tagClass}`}>
                  {g.tag}
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-[#131b2e] font-bold mt-1">
                {g.title}
              </h3>
              <p className="font-body-sm text-body-sm text-[#464555] leading-relaxed">
                {g.desc}
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between font-label-sm text-label-sm text-[#464555] border-t border-slate-100">
              <span>{g.material}</span>
              <span className="text-[#3525cd] font-semibold">{g.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

