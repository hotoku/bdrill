import { Exercise, holes, Position } from "./types";

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
      const { hole, angle } = findHole(c, o);
      ret.push({
        cue: c,
        object: o,
        hole,
        angle,
        holeDistance: distance(o, holes[hole]),
        cueDistance: distance(c, o),
      });
    }
  }
  return ret;
}

function distance(p: Position, q: Position): number {
  return Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2);
}

function findHole(
  cue: Position,
  object: Position
): { hole: keyof typeof holes; angle: number } {
  let max = -1;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let hole: any = 0;
  for (const [key, value] of Object.entries(holes)) {
    const ang = angle(cue, object, value);
    if (ang > max) {
      max = ang;
      hole = Number(key);
    }
  }
  return { hole: hole, angle: max };
}

function angle(a: Position, b: Position, c: Position): number {
  const p = {
    x: a.x - b.x,
    y: a.y - b.y,
  };
  const q = {
    x: c.x - b.x,
    y: c.y - b.y,
  };
  const dot = p.x * q.x + p.y * q.y;
  const abs = Math.sqrt(p.x ** 2 + p.y ** 2) * Math.sqrt(q.x ** 2 + q.y ** 2);
  const cos = dot / abs;
  return Math.acos(cos);
}
