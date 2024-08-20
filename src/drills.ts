import { Exercise, Position } from "./types";

export function allGrids(): Position[] {
  const positions = [];
  for (let x = 0; x <= 4; x += 0.5) {
    for (let y = 0; y <= 8; y += 0.5) {
      positions.push({ x, y });
    }
  }
  return positions;
}
export function generateAll(): Omit<Exercise, "id">[] {
  const ret = [];
  const cue = allGrids();
  const object = allGrids();
  for (const c of cue) {
    for (const o of object) {
      ret.push({ cue: c, object: o });
    }
  }
  return ret;
}
