import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noor Tech Riyadh Edition | Carry the City",
  description: "A refined NFC bracelet connecting identity, place and digital experience with one tap.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
