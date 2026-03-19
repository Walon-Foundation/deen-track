import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { AppLayoutWrapper } from "@/components/layout/AppLayoutWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  title: "DeenTrack",
  description: "A private, analytics-first platform for tracking spiritual progress, daily reflections, and sacred wisdom discovery.",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-sky-100 selection:text-sky-900`}
        >
          <ToastContainer position="top-right" autoClose={3000} theme="light" />
          <AppLayoutWrapper>{children}</AppLayoutWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
