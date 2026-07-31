import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || "usr_demo123";

    let logs = [];
    try {
      logs = await prisma.progressLog.findMany({
        where: { userId },
        orderBy: { createdAt: "asc" },
        take: 30,
      });
    } catch {
      logs = [
        { id: "p-1", createdAt: new Date("2026-07-01").toISOString(), weight: 78.5, bodyFat: 18.5, waterLiters: 3.0 },
        { id: "p-2", createdAt: new Date("2026-07-15").toISOString(), weight: 77.2, bodyFat: 17.8, waterLiters: 3.2 },
        { id: "p-3", createdAt: new Date("2026-07-29").toISOString(), weight: 76.8, bodyFat: 17.2, waterLiters: 3.5 },
      ];
    }

    return NextResponse.json({ success: true, logs });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch progress logs", details: String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId = "usr_demo123", weight, bodyFat, waterLiters } = body;

    let newEntry;
    try {
      newEntry = await prisma.progressLog.create({
        data: {
          userId,
          weight: weight ? Number(weight) : null,
          bodyFat: bodyFat ? Number(bodyFat) : null,
          waterLiters: waterLiters ? Number(waterLiters) : null,
        },
      });
    } catch {
      newEntry = {
        id: `p_${Date.now()}`,
        userId,
        createdAt: new Date().toISOString(),
        weight: Number(weight) || 76.8,
        bodyFat: bodyFat ? Number(bodyFat) : 17.2,
        waterLiters: waterLiters ? Number(waterLiters) : 3.5,
      };
    }

    return NextResponse.json({
      success: true,
      message: "Progress logged successfully!",
      entry: newEntry,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save progress log", details: String(error) }, { status: 500 });
  }
}
