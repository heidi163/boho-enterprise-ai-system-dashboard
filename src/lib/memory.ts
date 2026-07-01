import Database from 'better-sqlite3';
import path from 'path';

const SCHEMA = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    ts REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS facts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE,
    value TEXT,
    ts REAL NOT NULL
);
`;

export class Memory {
  private db: Database.Database;

  constructor(dbPath: string = 'boho.db') {
    this.db = new Database(path.resolve(process.cwd(), dbPath));
    this.db.exec(SCHEMA);
  }

  add(role: string, content: string): void {
    const stmt = this.db.prepare('INSERT INTO messages (role, content, ts) VALUES (?, ?, ?)');
    stmt.run(role, content, Date.now() / 1000);
  }

  recentMessages(limit: number = 20): Array<{ role: string; content: string }> {
    const stmt = this.db.prepare('SELECT role, content FROM messages ORDER BY id DESC LIMIT ?');
    const rows = stmt.all(limit) as Array<{ role: string; content: string }>;
    // Reverse to return them in chronological order
    return rows.reverse().map((r) => ({ role: r.role, content: r.content }));
  }

  remember(key: string, value: string): void {
    const stmt = this.db.prepare(`
      INSERT INTO facts (key, value, ts) VALUES (?, ?, ?)
      ON CONFLICT(key) DO UPDATE SET value=excluded.value, ts=excluded.ts
    `);
    stmt.run(key, value, Date.now() / 1000);
  }
}
