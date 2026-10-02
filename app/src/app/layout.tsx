import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Urbanist } from "next/font/google";

import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { tagline } from "@/content/site";

import "./globals.css";

// Urbanist stands in for the portfolio's Century Gothic (headings, UI);
// Source Serif 4 for its Cambria body copy.
const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://afronovation.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Afronovation",
    default: "Afronovation, Inc.",
  },
  description: tagline,
  openGraph: {
    type: "website",
    siteName: "Afronovation, Inc.",
    title: "Afronovation, Inc.",
    description: tagline,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Afronovation, Inc.",
    description: tagline,
  },
};

export const viewport: Viewport = {
  themeColor: "#02132c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${sourceSerif.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          {children}
          <Toaster richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
