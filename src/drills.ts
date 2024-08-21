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

function aname(x: number, y: number): boolean {
  return (
    (x === 0 && (y === 0 || y == 4 || y == 8)) ||
    (x === 4 && (y === 0 || y == 4 || y == 8))
  );
}

export function generateAll(): Omit<Exercise, "id">[] {
  const ret = [];
  const cue = allGrids();
  const object = allGrids();
  for (const c of cue) {
    for (const o of object) {
      if (c.x === o.x && c.y === o.y) {
        continue;
      }
      if (o.y < 4) {
        continue;
      }
      if (aname(o.x, o.y)) {
        continue;
      }
      ret.push({ cue: c, object: o });
    }
  }
  return ret;
}
