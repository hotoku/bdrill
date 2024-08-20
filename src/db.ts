import sqlite3InitModule, {
  Database,
  Sqlite3Static,
} from "@sqlite.org/sqlite-wasm";

const log = (...args: any[]) => console.log(...args); // eslint-disable-line
const error = (...args: any[]) => console.error(...args); // eslint-disable-line

let db: Database | null = null;

const connectDB = (sqlite3: Sqlite3Static) => {
  log("Running SQLite3 version", sqlite3.version.libVersion);
  log(`DB size: ${sqlite3.capi.sqlite3_js_kvvfs_size()}`);
  return new sqlite3.oo1.DB("file:local?vfs=kvvfs", "ct");
};

export const dbSize = async (): Promise<number> => {
  const sqlite3 = await sqlite3InitModule({
    print: log,
    printErr: error,
  });
  return sqlite3.capi.sqlite3_js_kvvfs_size();
};

export const closeDB = () => {
  db?.close();
  db = null;
};

export const getDatabase = async (): Promise<Database> => {
  if (db) {
    return db;
  }

  log("Loading and initializing SQLite3 module...");

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
};
