"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sparkles, Printer, Download, Dumbbell, Clock, Flame, Calendar } from "lucide-react";
import { aiService } from "@/services/aiService";
import { WorkoutPlan } from "@/types";
import { useToast } from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";

const schema = z.object({
  age: z.coerce.number().min(12).max(99),
  gender: z.string(),
  height: z.coerce.number().min(100).max(250),
  weight: z.coerce.number().min(30).max(300),
  goal: z.string(),
  location: z.string(),
  experience: z.string(),
  daysPerWeek: z.coerce.number().min(1).max(7),
  duration: z.coerce.number().min(15).max(180),
  equipment: z.string(),
  injuries: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function PlanGenerator() {
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<WorkoutPlan | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      age: 26,
      gender: "MALE",
      height: 178,
      weight: 76,
      goal: "MUSCLE_GAIN",
      location: "Gym",
      experience: "INTERMEDIATE",
      daysPerWeek: 4,
      duration: 60,
      equipment: "Barbell, Dumbbells, Cables",
      injuries: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const plan = await aiService.generateWorkoutPlan(values);
      setGeneratedPlan(plan);
      toast("AI Workout Plan Generated!", "Your personalized weekly routine is ready.", "success");
    } catch (e) {
      toast("Generation Failed", "Could not generate plan. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#FC4C02]">
            <Sparkles className="h-5 w-5" />
            Workout Routine Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input label="Age" type="number" {...register("age")} error={errors.age?.message} />

            <Select
              label="Gender"
              options={[
                { label: "Male", value: "MALE" },
                { label: "Female", value: "FEMALE" },
                { label: "Other", value: "OTHER" },
              ]}
              {...register("gender")}
            />

            <Input label="Height (cm)" type="number" {...register("height")} error={errors.height?.message} />
            <Input label="Weight (kg)" type="number" {...register("weight")} error={errors.weight?.message} />

            <Select
              label="Fitness Goal"
              options={[
                { label: "Muscle Gain / Hypertrophy", value: "MUSCLE_GAIN" },
                { label: "Fat Loss & Conditioning", value: "WEIGHT_LOSS" },
                { label: "Raw Strength", value: "STRENGTH" },
                { label: "Endurance", value: "ENDURANCE" },
                { label: "Maintain Weight", value: "MAINTAIN" },
              ]}
              {...register("goal")}
            />

            <Select
              label="Workout Location"
              options={[
                { label: "Commercial Gym", value: "Gym" },
                { label: "Home Workout", value: "Home" },
                { label: "Outdoors / Calisthenics", value: "Outdoors" },
              ]}
              {...register("location")}
            />

            <Select
              label="Experience Level"
              options={[
                { label: "Beginner", value: "BEGINNER" },
                { label: "Intermediate", value: "INTERMEDIATE" },
                { label: "Advanced", value: "ADVANCED" },
              ]}
              {...register("experience")}
            />

            <Input label="Days Per Week (1-7)" type="number" {...register("daysPerWeek")} error={errors.daysPerWeek?.message} />
            <Input label="Duration per Workout (min)" type="number" {...register("duration")} error={errors.duration?.message} />
            <Input label="Equipment Available" {...register("equipment")} error={errors.equipment?.message} />
            <Input label="Injuries / Physical Limitations" placeholder="e.g. Lower back pain, knee issues" {...register("injuries")} />

            <div className="sm:col-span-2 lg:col-span-3 pt-4">
              <Button type="submit" variant="gradient" size="lg" isLoading={loading} className="w-full gap-2">
                <Sparkles className="h-5 w-5" /> Generate Workout Routine
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Generated Output */}
      {generatedPlan && (
        <div className="space-y-6 print:m-0 print:p-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                {generatedPlan.title}
                <Badge variant="purple">AI Certified</Badge>
              </h2>
              <p className="text-xs text-slate-400 mt-1">Generated specifically for your goal and schedule.</p>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <Button variant="outline" size="sm" onClick={handlePrint} className="gap-1.5">
                <Printer className="h-4 w-4" /> Print Plan
              </Button>
              <Button variant="secondary" size="sm" onClick={handlePrint} className="gap-1.5">
                <Download className="h-4 w-4" /> Download PDF
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4 flex items-center gap-3">
              <Calendar className="h-6 w-6 text-indigo-400" />
              <div>
                <p className="text-xs text-slate-400">Days / Week</p>
                <p className="text-lg font-bold text-white">{generatedPlan.daysPerWeek} Days</p>
              </div>
            </Card>
            <Card className="p-4 flex items-center gap-3">
              <Clock className="h-6 w-6 text-purple-400" />
              <div>
                <p className="text-xs text-slate-400">Duration</p>
                <p className="text-lg font-bold text-white">{generatedPlan.durationMin} mins / session</p>
              </div>
            </Card>
            <Card className="p-4 flex items-center gap-3">
              <Flame className="h-6 w-6 text-amber-400" />
              <div>
                <p className="text-xs text-slate-400">Est. Calories Burned</p>
                <p className="text-lg font-bold text-white">~{generatedPlan.estimatedCals} kcal / day</p>
              </div>
            </Card>
          </div>

          {/* Daily Schedule List */}
          <div className="space-y-4">
            {generatedPlan.schedule.map((day, idx) => (
              <Card key={idx}>
                <CardHeader className="pb-3 border-b border-slate-800">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base text-indigo-300">{day.dayName}</CardTitle>
                    <Badge variant="info">{day.focus}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800/80">
                        <tr>
                          <th className="pb-2">Exercise Name</th>
                          <th className="pb-2">Target Muscle</th>
                          <th className="pb-2">Sets</th>
                          <th className="pb-2">Reps</th>
                          <th className="pb-2">Rest Time</th>
                          <th className="pb-2">Coach Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {day.exercises.map((ex, exIdx) => (
                          <tr key={exIdx} className="hover:bg-slate-800/30">
                            <td className="py-2.5 font-semibold text-white flex items-center gap-2">
                              <Dumbbell className="h-3.5 w-3.5 text-indigo-400" />
                              {ex.name}
                            </td>
                            <td className="py-2.5">{ex.category}</td>
                            <td className="py-2.5 font-bold text-indigo-300">{ex.sets}</td>
                            <td className="py-2.5 font-bold text-amber-300">{ex.reps}</td>
                            <td className="py-2.5">{ex.restSec}s</td>
                            <td className="py-2.5 text-slate-400 italic">{ex.notes || "Maintain steady form"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
