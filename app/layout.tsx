import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://noor-tech-riyadh.pwusff.chatgpt.site"),
  title: "Noor Tech Islamic NFC Bracelet",
  description: "Noor Tech — a refined Islamic NFC bracelet connecting identity, place and digital experience.",
  openGraph: {
    title: "Noor Tech Islamic NFC Bracelet",
    description: "Noor Tech — a refined Islamic NFC bracelet connecting identity, place and digital experience.",
    images: [{ url: "/assets/og.png", width: 1729, height: 910 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noor Tech Islamic NFC Bracelet",
    description: "Noor Tech — a refined Islamic NFC bracelet connecting identity, place and digital experience.",
    images: ["/assets/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
