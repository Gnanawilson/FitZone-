export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function formatWeight(val: number, unit: "METRIC" | "IMPERIAL" = "METRIC"): string {
  if (unit === "IMPERIAL") {
    const lbs = (val * 2.20462).toFixed(1);
    return `${lbs} lbs`;
  }
  return `${val} kg`;
}

export function formatHeight(valCm: number, unit: "METRIC" | "IMPERIAL" = "METRIC"): string {
  if (unit === "IMPERIAL") {
    const totalInches = valCm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}' ${inches}"`;
  }
  return `${valCm} cm`;
}
