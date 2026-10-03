import type { Metadata } from "next";
import { JetBrains_Mono, Unbounded } from "next/font/google";
import "swiper/css";
import "swiper/css/bundle";
import "lenis/dist/lenis.css";
import "./globals.css";

// components
import Header from "@/components/layout/Header";
import SmoothScroll from "@/components/providers/SmoothScroll";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-jetbrains-mono",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-unbounded",
});

export const metadata: Metadata = {
  title: "Jonathan Carvalho — Software Developer",
  description:
    "Portfolio of Jonathan Carvalho, a full-stack developer building responsive interfaces with Next.js, TypeScript and Python.",
  openGraph: {
    title: "Jonathan Carvalho — Software Developer",
    description:
      "Full-stack developer building responsive interfaces with Next.js, TypeScript and Python.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.className} ${jetBrainsMono.variable} ${unbounded.variable} antialiased`}>
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}