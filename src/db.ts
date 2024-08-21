import sqlite3InitModule, {
  Database,
  Sqlite3Static,
} from "@sqlite.org/sqlite-wasm";
import { z } from "zod";
import { generateAll } from "./drills";
import { Exercise } from "./types";

const log = (...args: any[]) => console.log(...args); // eslint-disable-line
const error = (...args: any[]) => console.error(...args); // eslint-disable-line

let db: Database | null = null;

function connectDB(sqlite3: Sqlite3Static): Database {
  log("Running SQLite3 version", sqlite3.version.libVersion);
  log(`DB size: ${sqlite3.capi.sqlite3_js_kvvfs_size()}`);
  return new sqlite3.oo1.DB("file:local?vfs=kvvfs", "c");
}

export async function dbSize(): Promise<number> {
  const sqlite3 = await sqlite3InitModule({
    print: log,
    printErr: error,
  });
  return sqlite3.capi.sqlite3_js_kvvfs_size();
}

export function closeDB(): void {
  db?.close();
  db = null;
}

export async function getDatabase(): Promise<Database> {
  if (db) {
    return db;
  }

  try {
    const sqlite3 = await sqlite3InitModule({
      print: log,
      printErr: error,
    });
    db = connectDB(sqlite3);

    return db;
  } catch (err: unknown) {
    if (err instanceof Error) {
      error(err.name, err.message);
      throw err;
    }
  }

  throw new Error("unknown error");
}

function createTables(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cue_x INTEGER,
      cue_y INTEGER,
      object_x INTEGER,
      object_y INTEGER
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

function initExercises(db: Database): Promise<void> {
  const exs = generateAll();
  return new Promise<void>((resolve) => {
    console.log("inserting exercises");
    let i = 0;
    for (const ex of exs) {
      i++;
      if (i % 100 === 0) {
        console.log("inserting exercise", i);
      }
      db.exec({
        sql: "insert into exercises (cue_x, cue_y, object_x, object_y) values (?, ?, ?, ?)",
        bind: [ex.cue.x, ex.cue.y, ex.object.x, ex.object.y],
      });
    }
    resolve();
  });
}

export async function initDB(): Promise<Database> {
  const db = await getDatabase();
  createTables(db);
  const num = numExercises(db);
  if (num > 0) {
    return db;
  }
  await initExercises(db);
  return db;
}

export function loadExercises(db: Database): Exercise[] {
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
    })
  );
  const rows = schema.parse(ret);
  return rows.map((row) => ({
    id: row.id,
    cue: { x: row.cue_x, y: row.cue_y },
    object: { x: row.object_x, y: row.object_y },
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
