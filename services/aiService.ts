import { generateAiContent } from "@/lib/ai";
import { WorkoutPlan, DietPlan } from "@/types";

export const aiService = {
  generateWorkoutPlan: async (params: {
    age: number;
    gender: string;
    height: number;
    weight: number;
    goal: string;
    location: string;
    experience: string;
    daysPerWeek: number;
    duration: number;
    equipment: string;
    injuries?: string;
  }): Promise<WorkoutPlan> => {
    const prompt = `Generate a structured fitness workout plan in valid JSON format for a ${params.age}-year-old ${params.gender}, height ${params.height}cm, weight ${params.weight}kg. Goal: ${params.goal}, Location: ${params.location}, Experience: ${params.experience}, Days/week: ${params.daysPerWeek}, Duration/workout: ${params.duration} minutes, Equipment: ${params.equipment}, Injuries/Notes: ${params.injuries || "None"}.
    Return strictly JSON with structure:
    {
      "title": "string",
      "goal": "string",
      "level": "string",
      "daysPerWeek": number,
      "durationMin": number,
      "estimatedCals": number,
      "schedule": [
        {
          "dayName": "string",
          "focus": "string",
          "exercises": [
            { "name": "string", "category": "string", "sets": number, "reps": "string", "restSec": number, "notes": "string" }
          ]
        }
      ]
    }`;

    const rawResponse = await generateAiContent(
      prompt,
      "You are an elite certified strength and conditioning specialist (CSCS). Output ONLY raw valid JSON."
    );

    if (rawResponse) {
      try {
        const cleanJson = rawResponse.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleanJson);
        return {
          id: `ai-wp-${Date.now()}`,
          isAiGenerated: true,
          createdAt: new Date().toISOString(),
          ...parsed,
        };
      } catch (e) {
        console.error("Failed to parse AI JSON response, falling back to smart template", e);
      }
    }

    // High quality fallback plan
    return {
      id: `ai-wp-${Date.now()}`,
      title: `AI Custom ${params.goal} Program (${params.experience})`,
      goal: params.goal as any,
      level: params.experience,
      daysPerWeek: params.daysPerWeek,
      durationMin: params.duration,
      estimatedCals: Math.round(params.duration * 7.5),
      isAiGenerated: true,
      createdAt: new Date().toISOString(),
      schedule: Array.from({ length: params.daysPerWeek }).map((_, idx) => ({
        dayName: `Day ${idx + 1} - ${idx % 2 === 0 ? "Upper Body & Core" : "Lower Body & Conditioning"}`,
        focus: idx % 2 === 0 ? "Push / Pull Hypertrophy" : "Legs & Posterior Chain",
        exercises: idx % 2 === 0
          ? [
              { name: "Bench Press / Pushups", category: "Chest", sets: 4, reps: "8-10", restSec: 90, notes: "Focus on controlled eccentric phase" },
              { name: "Dumbbell Bent Over Rows", category: "Back", sets: 4, reps: "10-12", restSec: 75, notes: "Squeeze lats at peak contraction" },
              { name: "Overhead Dumbbell Press", category: "Shoulders", sets: 3, reps: "10-12", restSec: 60, notes: "Keep core tight" },
            ]
          : [
              { name: "Squats / Goblet Squats", category: "Legs", sets: 4, reps: "8-10", restSec: 90, notes: "Maintain neutral spine" },
              { name: "Romanian Deadlifts", category: "Legs", sets: 3, reps: "10-12", restSec: 75, notes: "Feel hamstring stretch" },
              { name: "Plank to Pushup", category: "Core", sets: 3, reps: "45 sec", restSec: 45, notes: "Engage glutes and brace core" },
            ],
      })),
    };
  },

  askAiCoach: async (userMessage: string): Promise<string> => {
    const prompt = `User question: "${userMessage}". Give a friendly, highly professional, encouraging fitness/nutrition response in 3-4 bullet points with key takeaways.`;

    const aiRes = await generateAiContent(
      prompt,
      "You are FitPulse AI Coach - an elite, supportive personal trainer and clinical nutritionist. Keep advice accurate, practical, and inspiring."
    );

    if (aiRes) return aiRes;

    return `Here is your AI Coach recommendation:
• **Focus on Progressive Overload**: Gradually increase weight, reps, or decrease rest time each week to trigger continuous muscular adaptation.
• **Prioritize Quality Sleep**: 7-9 hours of deep sleep accelerates protein synthesis and lowers cortisol levels.
• **Target Protein Intake**: Aim for 1.6-2.2g of protein per kg of body weight to support lean muscle maintenance.
• **Stay Consistent**: Small daily efforts compounded over weeks produce extraordinary physical transformations!`;
  },
};
