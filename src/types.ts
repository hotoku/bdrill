export type Position = {
  x: number;
  y: number;
};

export type Exercise = {
  id: number;
  cue: Position;
  object: Position;
};

export type Score = {
  exercise_id: number;
  cue: Position;
  object: Position;
  num_successes: number;
  num_shots: number;
};
