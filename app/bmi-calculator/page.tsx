"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, History, Activity, Sparkles } from "lucide-react";
import { calculateBMI, BmiResult } from "@/utils/bmi";
import { progressService } from "@/services/progressService";
import { BmiRecord } from "@/types";
import { Badge } from "@/components/ui/badge";

export default function BmiCalculatorPage() {
  const [height, setHeight] = useState(178);
  const [weight, setWeight] = useState(76.8);
  const [result, setResult] = useState<BmiResult | null>(null);
  const [history, setHistory] = useState<BmiRecord[]>([]);

  useEffect(() => {
    setResult(calculateBMI(height, weight));
    progressService.getBmiHistory().then(setHistory);
  }, []);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(calculateBMI(height, weight));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calculator Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base text-indigo-400 flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Body Mass Index (BMI) Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCalculate} className="space-y-4">
                  <Input
                    label="Height (cm)"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    required
                  />
                  <Input
                    label="Weight (kg)"
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    required
                  />
                  <Button type="submit" variant="gradient" className="w-full gap-2">
                    <Activity className="h-4 w-4" /> Calculate BMI Score
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results Card */}
            {result && (
              <Card className="flex flex-col justify-between" style={{ borderColor: `${result.color}50` }}>
                <CardHeader>
                  <CardTitle className="text-base text-white flex items-center justify-between">
                    <span>BMI Result Analysis</span>
                    <Badge style={{ backgroundColor: `${result.color}20`, color: result.color }}>
                      {result.category}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4 bg-slate-950/60 rounded-2xl border border-slate-800">
                    <p className="text-5xl font-black tracking-tight" style={{ color: result.color }}>
                      {result.score}
                    </p>
                    <p className="text-xs text-slate-400 mt-2">Body Mass Index Score</p>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span>Healthy Weight Range:</span>
                      <strong className="text-emerald-400">{result.healthyRangeMin} kg – {result.healthyRangeMax} kg</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <p className="font-bold text-indigo-400 flex items-center gap-1">
                        <Sparkles className="h-3.5 w-3.5" /> AI Recommendation
                      </p>
                      <p className="text-slate-300 leading-relaxed">{result.weightSuggestion}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* History Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center gap-2">
                <History className="h-4 w-4 text-purple-400" />
                BMI History Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Height</th>
                      <th className="pb-3">Weight</th>
                      <th className="pb-3">BMI</th>
                      <th className="pb-3">Category</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {history.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-800/30">
                        <td className="py-3 text-slate-400">{new Date(rec.createdAt).toLocaleDateString()}</td>
                        <td className="py-3">{rec.height} cm</td>
                        <td className="py-3 font-semibold text-white">{rec.weight} kg</td>
                        <td className="py-3 font-bold text-indigo-300">{rec.bmi}</td>
                        <td className="py-3">
                          <Badge variant="info">{rec.category}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
      <Footer />
    </div>
  );
}
