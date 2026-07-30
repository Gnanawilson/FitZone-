"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  const [selected, setSelected] = useState(activeTab || tabs[0]?.id);

  const handleSelect = (id: string) => {
    setSelected(id);
    if (onChange) onChange(id);
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5 rounded-2xl bg-slate-900/80 p-1 border border-slate-800", className)}>
      {tabs.map((tab) => {
        const isActive = (activeTab !== undefined ? activeTab : selected) === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleSelect(tab.id)}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200",
              isActive
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
