
const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

function initializeDatabase(userDataPath) {
  fs.mkdirSync(userDataPath, { recursive: true });
  const dbPath = path.join(userDataPath, "bookreader.sqlite");
  const db = new Database(dbPath);
  db.pragma("foreign_keys = ON");
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      genre TEXT,
      file_path TEXT NOT NULL UNIQUE,
      cover_path TEXT,
      status TEXT NOT NULL DEFAULT 'unread'
        CHECK (status IN ('unread', 'reading', 'completed')),
      is_favorite INTEGER NOT NULL DEFAULT 0
        CHECK (is_favorite IN (0, 1)),
      added_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS collections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS book_collections (
      book_id INTEGER NOT NULL,
      collection_id INTEGER NOT NULL,

      PRIMARY KEY (book_id, collection_id),

      FOREIGN KEY (book_id)
        REFERENCES books(id)
        ON DELETE CASCADE,

      FOREIGN KEY (collection_id)
        REFERENCES collections(id)
        ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_books_status
      ON books(status);

    CREATE INDEX IF NOT EXISTS idx_books_favorite
      ON books(is_favorite);
  `);

  console.log("SQLite database initialized:", dbPath);

  return db;
}

module.exports = { initializeDatabase };
