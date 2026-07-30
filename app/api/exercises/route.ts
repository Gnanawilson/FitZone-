import { NextResponse } from "next/server";

const EXERCISE_DATABASE = [
  { id: "e-1", name: "Barbell Bench Press", category: "Chest", equipment: "Barbell", difficulty: "INTERMEDIATE" },
  { id: "e-2", name: "Incline Dumbbell Press", category: "Chest", equipment: "Dumbbells", difficulty: "BEGINNER" },
  { id: "e-3", name: "Barbell Back Squat", category: "Legs", equipment: "Barbell", difficulty: "ADVANCED" },
  { id: "e-4", name: "Romanian Deadlift", category: "Hamstrings", equipment: "Barbell", difficulty: "INTERMEDIATE" },
  { id: "e-5", name: "Lat Pulldown", category: "Back", equipment: "Cable", difficulty: "BEGINNER" },
  { id: "e-6", name: "Seated Cable Row", category: "Back", equipment: "Cable", difficulty: "BEGINNER" },
  { id: "e-[#7]", name: "Overhead Barbell Press", category: "Shoulders", equipment: "Barbell", difficulty: "INTERMEDIATE" },
  { id: "e-8", name: "Dumbbell Lateral Raise", category: "Shoulders", equipment: "Dumbbells", difficulty: "BEGINNER" },
  { id: "e-9", name: "Tricep Rope Pushdown", category: "Arms", equipment: "Cable", difficulty: "BEGINNER" },
  { id: "e-10", name: "Incline Dumbbell Bicep Curl", category: "Arms", equipment: "Dumbbells", difficulty: "BEGINNER" },
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.toLowerCase();
    const category = searchParams.get("category");

    let results = EXERCISE_DATABASE;

    if (search) {
      results = results.filter((ex) => ex.name.toLowerCase().includes(search) || ex.category.toLowerCase().includes(search));
    }

    if (category && category !== "ALL") {
      results = results.filter((ex) => ex.category.toUpperCase() === category.toUpperCase());
    }

    return NextResponse.json({
      success: true,
      total: results.length,
      exercises: results,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch exercise library", details: String(error) }, { status: 500 });
  }
}
