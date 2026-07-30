"use client";

import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LineChart, Save } from "lucide-react";
import { useProgressStore } from "@/hooks/useProgressStore";
import { useToast } from "@/components/ui/toast";

export function MetricsForm() {
  const { addProgressLog } = useProgressStore();
  const { toast } = useToast();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      weight: 76.8,
      bodyFat: 15.0,
      sleepHours: 8.0,
      waterLiters: 3.5,
      mood: "Great",
    },
  });

  const onSubmit = (data: any) => {
    addProgressLog({
      id: `p-${Date.now()}`,
      userId: "u-1",
      weight: Number(data.weight),
      bodyFat: Number(data.bodyFat),
      sleepHours: Number(data.sleepHours),
      waterLiters: Number(data.waterLiters),
      mood: data.mood,
      createdAt: new Date().toISOString(),
    });
    toast("Metrics Logged!", "Your daily progress snapshot has been recorded.", "success");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2 text-indigo-400">
          <LineChart className="h-5 w-5" />
          Log Daily Health Snapshot
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <Input label="Weight (kg)" type="number" step="0.1" {...register("weight")} />
          <Input label="Body Fat %" type="number" step="0.1" {...register("bodyFat")} />
          <Input label="Sleep (Hours)" type="number" step="0.5" {...register("sleepHours")} />
          <Input label="Water (Liters)" type="number" step="0.1" {...register("waterLiters")} />

          <Select
            label="Daily Mood"
            options={[
              { label: "Great 😁", value: "Great" },
              { label: "Good 🙂", value: "Good" },
              { label: "Neutral 😐", value: "Neutral" },
              { label: "Tired 😴", value: "Tired" },
              { label: "Stressed 😫", value: "Stressed" },
            ]}
            {...register("mood")}
          />

          <div className="sm:col-span-2 lg:col-span-5 pt-2">
            <Button type="submit" variant="primary" size="md" className="w-full gap-2">
              <Save className="h-4 w-4" /> Save Metrics
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
