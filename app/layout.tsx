import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Areeb Imran | Software Engineer",
  description:
    "The personal portfolio of Areeb Imran, a software engineer working across full-stack development and machine learning.",
  metadataBase: new URL("https://github.com/areebimran2"),
  openGraph: {
    title: "Areeb Imran | Software Engineer",
    description:
      "Selected software engineering experience and projects by Areeb Imran.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
