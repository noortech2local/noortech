import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://noor-tech-riyadh.pwusff.chatgpt.site"),
  title: "Riyadh City Series | Wear the City",
  description: "A premium woven wristband inspired by Riyadh architecture, heritage and contemporary city culture.",
  openGraph: {
    title: "Riyadh City Series | Wear the City",
    description: "A premium woven wristband inspired by Riyadh architecture, heritage and contemporary city culture.",
    images: [{ url: "/assets/og-riyadh.png", width: 1672, height: 941 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Riyadh City Series | Wear the City",
    description: "A premium woven wristband inspired by Riyadh architecture, heritage and contemporary city culture.",
    images: ["/assets/og-riyadh.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
