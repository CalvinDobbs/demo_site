import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Meridian Goods",
    template: "%s | Meridian Goods",
  },
  description: "Useful things, made well. Small-batch goods for everyday use.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${newsreader.variable} antialiased`}>
      <body className="flex min-h-screen flex-col overflow-x-hidden font-sans">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
