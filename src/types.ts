export type Position = {
  x: number;
  y: number;
};

export type Exercise = {
  id: number;
  cue: Position;
  object: Position;
};

export type ExerciseReord = {
  success: number;
  trial: number;
};
