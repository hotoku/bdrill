export type Position = {
  x: number;
  y: number;
};

export type Excercise = {
  cue: Position;
  object: Position;
};

export type ExerciseReord = {
  success: number;
  trial: number;
};

export type ExerciseData = {
  [key: number]: ExerciseReord;
};
