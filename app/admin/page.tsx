"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { AnalyticsWidget } from "@/components/admin/AnalyticsWidget";
import { UserManagementTable } from "@/components/admin/UserManagementTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Megaphone, Send } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function AdminPage() {
  const [announcement, setAnnouncement] = useState("");
  const { toast } = useToast();

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcement) return;
    toast("Announcement Broadcasted!", "Message sent to all registered active users.", "success");
    setAnnouncement("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <ShieldAlert className="h-6 w-6 text-rose-500" />
                Admin System Dashboard
              </h1>
              <p className="text-xs text-slate-400 mt-1">Manage platform users, examine server telemetry, and broadcast announcements.</p>
            </div>
          </div>

          <AnalyticsWidget />

          <UserManagementTable />

          <Card>
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-amber-400" />
                Broadcast Global System Announcement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePostAnnouncement} className="space-y-4">
                <Input
                  label="Announcement Message"
                  placeholder="e.g. New AI Workout Generator model v2.5 live today!"
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  required
                />
                <Button type="submit" variant="gradient" size="md" className="gap-2">
                  <Send className="h-4 w-4" /> Broadcast Announcement
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
      <Footer />
    </div>
  );
}
