"use client";

export default function FaqSection() {
  const faqs = [
    {
      icon: "verified_user",
      iconClass: "bg-[#6cf8bb]/20 text-[#006c49]",
      question: "Is this compliant with Google's Review Gating Policies?",
      answerBold: "100% Yes.",
      answer: "Every single guest has direct, unrestricted access to submit their review directly on Google Maps, regardless of the star rating selected. We provide AI drafting assistance and private feedback channels without ever blocking or filtering authentic customer submissions."
    },
    {
      icon: "smartphone",
      iconClass: "bg-[#eaedff] text-[#3525cd]",
      question: "Do customers need to install any app?",
      answerBold: "Never.",
      answer: "ReviewPulse loads instantaneously via progressive lightweight web technology from any native iOS camera, Android camera, or UPI QR app (Paytm, PhonePe, Google Pay). There are zero app downloads, account logins, or password requirements for diners."
    },
    {
      icon: "print",
      iconClass: "bg-[#e2e7ff] text-[#131b2e]",
      question: "What materials are recommended for physical stands?",
      answerBold: "",
      answer: "We recommend standard 4x6 inch acrylic T-stands, available readily on Amazon India (₹120–₹180/unit). ReviewPulse exports pre-formatted, 300 DPI high-resolution PDFs formatted specifically for print shops, designed to sit directly beside your cash register or UPI soundbox."
    }
  ];

  return (
    <section className="w-full py-16 px-6 max-w-4xl mx-auto" id="faq">
      <div className="text-center mb-12">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#3525cd] font-semibold">
          Trust &amp; Verification
        </span>
        <h2 className="font-headline-lg text-headline-lg text-[#131b2e] mt-1">
          Frequently Asked Questions
        </h2>
        <p className="font-body-md text-body-md text-[#464555] mt-2">
          Everything you need to know about Google policy compliance and physical deployment.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100">
            <div className="flex items-start gap-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${f.iconClass}`}>
                <span className="material-symbols-outlined text-[18px]">{f.icon}</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-[#131b2e]">{f.question}</h3>
                <p className="font-body-md text-body-md text-[#464555] mt-2 leading-relaxed">
                  {f.answerBold && <strong className="text-[#006c49] font-medium">{f.answerBold} </strong>}
                  {f.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

