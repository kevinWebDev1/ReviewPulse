import "./globals.css";

export const metadata = {
  title: "ReviewPulse AI — 1-Tap Google Review SaaS for Indian Businesses",
  description: "Turn every billing counter & table into a 5-star Google review machine with 15-second Gemini AI assistance."
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#3525cd"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-[#faf8ff] text-[#131b2e] selection:bg-[#3525cd] selection:text-white">
        {children}
      </body>
    </html>
  );
}
