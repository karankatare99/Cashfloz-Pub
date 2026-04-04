import type { Metadata } from "next";
// [CASHFLOZ UI] — Typography: Removed deprecated Syne and DM Sans to optimize performance
import { 
  Space_Grotesk, 
  Inter, 
  JetBrains_Mono 
} from "next/font/google";
import "./globals.css";

// [CASHFLOZ UI] — Typography: Specifically loaded weights 600 and 700 for our hero and section headings
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"], 
});

// [CASHFLOZ UI] — Typography: Loaded 400, 500, and 600 for varied body and label hierarchy
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"], 
});

// [CASHFLOZ UI] — Typography: Loaded medium weight (500) specifically for crisp tabular data and numbers
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Cashfloz | Professional Trading Platform",
  description: "Institutional-grade multi-asset trading platform with real-time charts and deep order books.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // [CASHFLOZ UI] — Colors & Typography: Applied the updated font variables, #0A0A0F base, and #F5EDD6 text
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-inter antialiased bg-[#0A0A0F] text-[#F5EDD6] min-h-screen`}
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}