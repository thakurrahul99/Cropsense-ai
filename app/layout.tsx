import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/context/AppContext";

export const metadata: Metadata = {
  title: "CropSense AI — Intelligent Crop Health Platform",
  description:
    "AI-powered early detection and management of crop diseases and pest infestations across India. CropSense AI brings precision agriculture intelligence to every farmer — from Punjab to Tamil Nadu.",
  keywords:
    "crop disease detection, AI agriculture, pest management, India farming, crop health, KVK, ICAR, rice blast, wheat blast, cotton bollworm",
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
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
