/**
 * DBへの問い合わせを行う関数をまとめたモジュール。
 * 外部にexportする関数は、すべて非同期関数とする。
 * 内部でのみ使用する関数は、同期関数とし、引数にDBオブジェクトを取る。
 */

import { Database } from "@sqlite.org/sqlite-wasm";
import { z } from "zod";
import { generateAll } from "../drills";
import { Exercise, Score } from "../types";
import { getDatabase } from "./core";

function createTables(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cue_x INTEGER,
      cue_y INTEGER,
      object_x INTEGER,
      object_y INTEGER,
      hole INTEGER,
      angle REAL,
      hole_distance REAL,
      cue_distance REAL
    );
  `);
  db.exec(`
    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      exercise_id INTEGER,
      num_successes INTEGER,
      num_shots INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      foreign key (exercise_id) references exercises(id)
    );
  `);
}

function numExercises(db: Database): number {
  const ret = db.exec({
    sql: "select count(1) as num from exercises",
    rowMode: "object",
    returnValue: "resultRows",
  });
  const schema = z.array(z.object({ num: z.number() }));
  const num = schema.parse(ret)[0].num;
  return num;
}

function initExercises(db: Database): void {
  const exs = generateAll();
  console.log("inserting exercises");
  let i = 0;
  for (const ex of exs) {
    i++;
    if (i % 100 === 0) {
      console.log("inserting exercise", i);
    }
    db.exec({
      sql: `insert into exercises
            (cue_x, cue_y, object_x, object_y,
             hole, angle, hole_distance, cue_distance)
            values
            (?, ?, ?, ?, ?, ?, ?, ?)`,
      bind: [
        ex.cue.x,
        ex.cue.y,
        ex.object.x,
        ex.object.y,
        ex.hole,
        ex.angle,
        ex.holeDistance,
        ex.cueDistance,
      ],
    });
  }
}

export async function initDB(): Promise<void> {
  const db = await getDatabase();
  createTables(db);
  const num = numExercises(db);
  if (num > 0) {
    return;
  }
  await new Promise<void>((resolve) => {
    initExercises(db);
    resolve();
  });
}

export async function loadExercises(): Promise<Exercise[]> {
  const db = await getDatabase();
  const ret = db.exec({
    sql: "select * from exercises",
    rowMode: "object",
    returnValue: "resultRows",
  });
  const schema = z.array(
    z.object({
      id: z.number(),
      cue_x: z.number(),
      cue_y: z.number(),
      object_x: z.number(),
      object_y: z.number(),
      hole: z.union([
        z.literal(0),
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5),
      ]),
      angle: z.number(),
      hole_distance: z.number(),
      cue_distance: z.number(),
    })
  );
  const rows = schema.parse(ret);
  return rows.map((row) => ({
    id: row.id,
    cue: { x: row.cue_x, y: row.cue_y },
    object: { x: row.object_x, y: row.object_y },
    hole: row.hole,
    angle: row.angle,
    holeDistance: row.hole_distance,
    cueDistance: row.cue_distance,
  }));
}

export async function insertResult(
  eid: number,
  num_successes: number,
  num_shots: number
): Promise<void> {
  const db = await getDatabase();
  db.exec({
    sql: "insert into results (exercise_id, num_successes, num_shots) values (?, ?, ?)",
    bind: [eid, num_successes, num_shots],
  });
}

export async function loadScores(): Promise<Score[]> {
  const db = await getDatabase();
  db.exec({
    sql: `
select
  *
from
  results
    `,
    rowMode: "object",
    returnValue: "resultRows",
  });
  return [];
}
