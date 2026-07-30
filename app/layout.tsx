import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "Fit Zone+ - Production AI Fitness Tracker & Coach",
  description: "Transform your physique with AI workout planning, custom nutrition calculators, live exercise tracking, and real-time AI fitness coaching.",
  keywords: ["AI Fitness", "Workout Planner", "Diet Calculator", "BMI Calculator", "Fitness Tracker", "Next.js 15"],
  openGraph: {
    title: "Fit Zone+ - Premium AI Fitness SaaS",
    description: "AI Workout Planning & Diet Tracking Platform",
    url: "https://fitzoneplus.ai",
    siteName: "Fit Zone+",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
