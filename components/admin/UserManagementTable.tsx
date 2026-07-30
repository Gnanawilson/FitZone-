"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Trash2, UserCheck, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";

export function UserManagementTable() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([
    { id: "u-1", name: "Alex Morgan", email: "alex.morgan@fitpulse.ai", role: "USER", streak: 7, level: 5 },
    { id: "u-2", name: "Sarah Vance", email: "sarah@example.com", role: "USER", streak: 9, level: 11 },
    { id: "u-3", name: "Marcus Chen", email: "marcus@example.com", role: "ADMIN", streak: 14, level: 12 },
  ]);

  const handleDelete = (id: string, name: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast("User Deleted", `${name} has been removed from system database.`, "error");
  };

  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <CardTitle className="text-base text-white flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-indigo-400" />
          Admin User Management
        </CardTitle>
        <div className="relative w-full sm:w-64">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
          <Search className="absolute left-2.5 top-3 h-3.5 w-3.5 text-slate-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="pb-3">User</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Streak</th>
                <th className="pb-3">Level</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/30">
                  <td className="py-3">
                    <p className="font-bold text-white">{u.name}</p>
                    <p className="text-[10px] text-slate-400">{u.email}</p>
                  </td>
                  <td className="py-3">
                    <Badge variant={u.role === "ADMIN" ? "purple" : "default"}>{u.role}</Badge>
                  </td>
                  <td className="py-3 font-semibold text-amber-400">{u.streak} Days</td>
                  <td className="py-3 font-semibold text-indigo-300">Lvl {u.level}</td>
                  <td className="py-3 text-right">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(u.id, u.name)}
                      className="p-1.5 h-auto text-xs gap-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
