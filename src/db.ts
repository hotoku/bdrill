import sqlite3InitModule, {
  Database,
  Sqlite3Static,
} from "@sqlite.org/sqlite-wasm";
import { z } from "zod";
import { generateAll } from "./drills";

const log = (...args: any[]) => console.log(...args); // eslint-disable-line
const error = (...args: any[]) => console.error(...args); // eslint-disable-line

let db: Database | null = null;

function connectDB(sqlite3: Sqlite3Static): Database {
  log("Running SQLite3 version", sqlite3.version.libVersion);
  log(`DB size: ${sqlite3.capi.sqlite3_js_kvvfs_size()}`);
  return new sqlite3.oo1.DB("file:local?vfs=kvvfs", "ct");
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

function createTable(db: Database): void {
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
      foreign key (exercise_id) references exercises(id)
    );
  `);
}

export async function initDB(): Promise<void> {
  const db = await getDatabase();
  createTable(db);
  const ret = db.exec({
    sql: "select count(1) as num from exercises",
    rowMode: "object",
    returnValue: "resultRows",
  });
  const schema = z.object({ num: z.number() });
  const num = schema.parse(ret).num;
  if (num > 0) {
    return;
  }
  const exs = generateAll();
  for (const ex of exs) {
    db.exec({
      sql: "insert into exercises (cue_x, cue_y, object_x, object_y) values (?, ?, ?, ?)",
      bind: [ex.cue.x, ex.cue.y, ex.object.x, ex.object.y],
    });
  }
}
