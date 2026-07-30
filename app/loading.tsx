import { BrandLogo } from "@/components/ui/brand-logo";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#101012] text-white space-y-4">
      <BrandLogo size="lg" href="" />
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-[#FC4C02] animate-ping" />
        <p className="text-xs font-bold text-[#A0A0AA] uppercase tracking-wider">Loading Fit Zone+...</p>
      </div>
    </div>
  );
}
