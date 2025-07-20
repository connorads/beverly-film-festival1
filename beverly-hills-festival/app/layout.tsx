import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteProvider } from "@/contexts/SiteProvider";
import { SiteModeProvider } from "@/lib/context/site-mode";
import { AuthProvider } from "@/lib/context/auth";
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
  title: "Beverly Hills Film Festival",
  description: "Celebrating Independent Cinema - April 15-25, 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteProvider>
          <SiteModeProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </SiteModeProvider>
        </SiteProvider>
      </body>
    </html>
  );
}
