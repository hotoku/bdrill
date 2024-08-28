export type Position = {
  x: number;
  y: number;
};

export const holes = {
  0: { x: 0, y: 0 },
  1: { x: 0, y: 4 },
  2: { x: 0, y: 8 },
  3: { x: 4, y: 8 },
  4: { x: 4, y: 4 },
  5: { x: 4, y: 0 },
};

export type Exercise = {
  id: number;
  cue: Position;
  object: Position;
  hole: keyof typeof holes;
  angle: number;
  holeDistance: number;
  cueDistance: number;
};

export type Score = {
  exercise_id: number;
  cue: Position;
  object: Position;
  num_successes: number;
  num_shots: number;
};
