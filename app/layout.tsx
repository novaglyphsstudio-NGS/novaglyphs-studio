import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

// Brand typography: Inter for body (clean, modern, excellent readability), Space Grotesk for display/headings (distinctive, premium, slightly futuristic)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
});

// SEO + Brand Metadata for NovaGlyphs Studio LLC
// Domain: www.novaglyphsstudio.xyz
export const metadata: Metadata = {
  metadataBase: new URL("https://www.novaglyphsstudio.xyz"),
  title: {
    default: "NovaGlyphs Studio | Sovereign AI-Native Intelligence Systems",
    template: "%s | NovaGlyphs Studio",
  },
  description:
    "NovaGlyphs Studio LLC — A Sovereign AI-Native Intelligence Lab. We build strategic intelligence frameworks, AI orchestration systems, and narrative-driven digital products that transform ideas into scalable execution.",
  keywords: [
    "NovaGlyphs",
    "NovaGlyphs Studio",
    "AI Native",
    "Sovereign AI",
    "AI Orchestration",
    "Intelligence Systems",
    "AI Agents",
    "Strategic Intelligence",
    "AI Lab",
    "LOGOS Agents",
    "Digital Worlds",
    "Lore Building",
  ],
  authors: [{ name: "NovaGlyphs Studio LLC" }],
  creator: "NovaGlyphs Studio LLC",
  publisher: "NovaGlyphs Studio LLC",
  openGraph: {
    title: "NovaGlyphs Studio | Sovereign AI-Native Intelligence Systems",
    description:
      "NovaGlyphs Studio builds strategic intelligence frameworks, AI orchestration systems, and narrative-driven digital products.",
    images: [{ url: "/assets/images/nova-n-crystalline.jpg" }], // Update with your hero crystalline N asset
    url: "https://www.novaglyphsstudio.xyz",
    siteName: "NovaGlyphs Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NovaGlyphs Studio | Sovereign AI-Native Intelligence Systems",
    description:
      "A Sovereign AI-Native Intelligence Lab building strategic frameworks, AI orchestration, and narrative digital products.",
    images: ["/assets/images/nova-n-crystalline.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://www.novaglyphsstudio.xyz",
  },
};

export const viewport: Viewport = {
  themeColor: "#05050a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Enforce dark-only mysterious cinematic aesthetic. Never light mode.
      className={`${inter.variable} ${spaceGrotesk.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#020205] text-[#f5f5f7]">
        {children}
        {/* Sonner Toaster for premium toast notifications (contact success, etc.) */}
        <Toaster
          position="top-center"
          richColors
          closeButton
          theme="dark"
          className="toaster group"
        />
      </body>
    </html>
  );
}
