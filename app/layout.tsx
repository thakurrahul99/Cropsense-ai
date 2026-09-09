import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CropSense AI — Intelligent Crop Health Platform",
  description:
    "AI-powered early detection and management of crop diseases and pest infestations across Maharashtra. CropSense AI brings precision agriculture intelligence to every farmer.",
  keywords:
    "crop disease detection, AI agriculture, pest management, Maharashtra farming, crop health",
  openGraph: {
    title: "CropSense AI",
    description: "Detect Earlier. Act Smarter. Protect Every Crop.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
