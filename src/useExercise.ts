import { initDB, loadExercises } from "./db";
import { Exercise } from "./types";

let exs: Exercise[] | null = null;

function useExercises(): Exercise[] {
  if (exs === null) {
    const prm = initDB().then((db) => {
      exs = loadExercises(db);
    });
    throw prm;
  } else {
    return exs;
  }
}

export default useExercises;
