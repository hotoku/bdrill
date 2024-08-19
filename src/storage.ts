import { ExerciseData } from "./types";

export function load(): ExerciseData {
  const data = localStorage.getItem("records");
  if (data) {
    return JSON.parse(data);
  }
  return {};
}

export function save(data: ExerciseData): void {
  localStorage.setItem("records", JSON.stringify(data));
}
