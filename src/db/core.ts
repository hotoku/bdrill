import sqlite3InitModule, {
  Database,
  Sqlite3Static,
} from "@sqlite.org/sqlite-wasm";
import { z } from "zod";
import { generateAll } from "../drills";
import { Exercise, Score } from "../types";

const log = (...args: any[]) => console.log(...args); // eslint-disable-line
const error = (...args: any[]) => console.error(...args); // eslint-disable-line

let _sqlite3: Sqlite3Static | null = null;
let _db: Database | null = null;

/**
 * sqliteモジュールとDatabaseオブジェクトを管理する関数。
 * 毎回、オブジェクトを初期化するコストを省くために、グローバル変数にキャッシュするが、
 * これらを直接操作するのは、ensureDBだけ。
 * 他の関数は、ensureDBを使って、sqliteモジュールとDatabaseオブジェクトを取得する。
 */
async function ensureDB(): Promise<[Database, Sqlite3Static]> {
  if (_db === null || _sqlite3 === null) {
    _sqlite3 = await sqlite3InitModule({
      print: log,
      printErr: error,
    });
    _db = new _sqlite3.oo1.DB("file:local?vfs=kvvfs", "c");
  }
  return [_db, _sqlite3];
}

export async function getBytes(): Promise<Uint8Array> {
  const [db, sqlite3] = await ensureDB();
  const ret = sqlite3.capi.sqlite3_js_db_export(db);
  return ret;
}

export async function dbSize(): Promise<number> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, sqlite3] = await ensureDB();
  return sqlite3.capi.sqlite3_js_kvvfs_size();
}

export function closeDB(): void {
  _db?.close();
  _db = null;
}

export async function getDatabase(): Promise<Database> {
  const [db] = await ensureDB();
  return db;
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
      sql: "insert into exercises (cue_x, cue_y, object_x, object_y) values (?, ?, ?, ?)",
      bind: [ex.cue.x, ex.cue.y, ex.object.x, ex.object.y],
    });
  }
}

export async function initDB(): Promise<Database> {
  const db = await getDatabase();
  createTables(db);
  const num = numExercises(db);
  if (num > 0) {
    return db;
  }
  await new Promise<void>((resolve) => {
    initExercises(db);
    resolve();
  });
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
