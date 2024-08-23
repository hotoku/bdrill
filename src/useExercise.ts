/**
 * ExerciseをDBから取得するためのフック。
 * レンダリング処理の途中で、Suspenseにプロミスを投げるために使われている。
 * cf: https://zenn.dev/uhyo/books/react-concurrent-handson/viewer/data-fetching-2
 */

import { initDB, loadExercises } from "./db/queries";
import { Exercise } from "./types";

let exs: Exercise[] | null = null;

function useExercises(): Exercise[] {
  if (exs === null) {
    const prm = initDB().then(() => {
      loadExercises().then((exercises) => {
        exs = exercises;
      });
    });
    throw prm;
  } else {
    return exs;
  }
}

export default useExercises;
