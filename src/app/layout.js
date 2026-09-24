import { Inter, Oswald } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

// next/font downloads these at build time and hands us css variables
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
});

export const metadata = {
  title: "FitLog — Workout Library",
  description:
    "pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="bg-night text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}