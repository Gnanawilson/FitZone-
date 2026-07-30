"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-[#F8F8FA] py-12 px-6 lg:px-12 text-slate-600 text-xs">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Left Column: Flame Logo & Store Badges */}
        <div className="md:col-span-1 space-y-4">
          <svg className="h-8 w-8 text-[#FC4C02] fill-current" viewBox="0 0 24 24">
            <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.428 0 5.5 9.769h4.172z" />
          </svg>
          <div className="space-y-2">
            <div className="bg-slate-900 text-white font-bold text-[10px] px-3 py-1.5 rounded-md w-fit cursor-pointer">
              Download on App Store
            </div>
            <div className="bg-slate-900 text-white font-bold text-[10px] px-3 py-1.5 rounded-md w-fit cursor-pointer">
              Get It On Google Play
            </div>
          </div>
        </div>

        {/* Column 2: Features */}
        <div className="space-y-2">
          <h5 className="font-bold text-slate-900 text-xs mb-3">Features</h5>
          <ul className="space-y-2">
            <li><Link href="/workout-planner" className="hover:underline">What&apos;s New</Link></li>
            <li><Link href="/exercise-library" className="hover:underline">Stories</Link></li>
            <li><Link href="/progress-tracker" className="hover:underline">Routes</Link></li>
          </ul>
        </div>

        {/* Column 3: Subscription */}
        <div className="space-y-2">
          <h5 className="font-bold text-slate-900 text-xs mb-3">Subscription</h5>
          <ul className="space-y-2">
            <li><Link href="/analytics" className="hover:underline">Family Plan</Link></li>
            <li><Link href="/gamification" className="hover:underline">Subscription Partnerships</Link></li>
          </ul>
        </div>

        {/* Column 4: Support */}
        <div className="space-y-2">
          <h5 className="font-bold text-slate-900 text-xs mb-3">Support</h5>
          <ul className="space-y-2">
            <li><Link href="/ai-coach" className="hover:underline">Business</Link></li>
            <li><Link href="/admin" className="hover:underline">Partner Center</Link></li>
            <li><Link href="/settings" className="hover:underline">Careers</Link></li>
          </ul>
        </div>

        {/* Column 5: Privacy */}
        <div className="space-y-2">
          <h5 className="font-bold text-slate-900 text-xs mb-3">Privacy</h5>
          <ul className="space-y-2">
            <li><Link href="/privacy" className="hover:underline">Cookie Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Do Not Share My Personal Information</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
