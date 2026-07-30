export interface ProgressLog {
  id: string;
  userId: string;
  weight?: number;
  bodyFat?: number;
  sleepHours?: number;
  waterLiters?: number;
  mood?: string;
  createdAt: string;
}

export interface BmiRecord {
  id: string;
  userId: string;
  height: number;
  weight: number;
  bmi: number;
  category: string;
  createdAt: string;
}
