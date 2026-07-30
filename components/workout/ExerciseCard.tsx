"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Star, Info } from "lucide-react";
import { Exercise } from "@/types";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const [favorite, setFavorite] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Card className="hover:border-slate-700/80 transition-all flex flex-col justify-between">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-indigo-400 shrink-0" />
              {exercise.name}
            </CardTitle>
            <button
              onClick={() => setFavorite(!favorite)}
              className={`text-slate-500 hover:text-amber-400 transition-colors ${favorite ? "text-amber-400 fill-amber-400" : ""}`}
            >
              <Star className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="info">{exercise.category}</Badge>
            <Badge variant="default">{exercise.equipment}</Badge>
            <Badge
              variant={
                exercise.difficulty === "Beginner"
                  ? "success"
                  : exercise.difficulty === "Intermediate"
                  ? "warning"
                  : "danger"
              }
            >
              {exercise.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <p className="text-xs text-slate-400 line-clamp-2">{exercise.description}</p>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
          >
            <Info className="h-3.5 w-3.5" /> Instructions & Guide
          </button>
        </CardContent>
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={exercise.name}>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="info">{exercise.category}</Badge>
            <Badge variant="default">{exercise.equipment}</Badge>
            <Badge variant="purple">{exercise.difficulty}</Badge>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{exercise.description}</p>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h5 className="text-xs font-bold text-indigo-400 uppercase">Execution Steps</h5>
            <ol className="list-decimal list-inside text-xs text-slate-400 space-y-1">
              <li>Position your body securely with neutral spine posture.</li>
              <li>Inhale deeply and brace your core prior to initiating the push/pull movement.</li>
              <li>Exhale as you complete the peak concentric phase of the lift.</li>
              <li>Control the eccentric descent over 2-3 seconds for maximum fiber recruitment.</li>
            </ol>
          </div>
        </div>
      </Modal>
    </>
  );
}
