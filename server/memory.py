import sqlite3, time

SCHEMA = """
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT NOT NULL, content TEXT NOT NULL, ts REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS facts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE, value TEXT, ts REAL NOT NULL
);"""

class Memory:
    def __init__(self, path: str = "boho.db"):
        self.conn = sqlite3.connect(path, check_same_thread=False)
        self.conn.executescript(SCHEMA)
        self.conn.commit()

    def add(self, role: str, content: str) -> None:
        self.conn.execute(
            "INSERT INTO messages (role, content, ts) VALUES (?, ?, ?)",
            (role, content, time.time()))
        self.conn.commit()

    def recent_messages(self, limit: int = 20) -> list[dict]:
        rows = self.conn.execute(
            "SELECT role, content FROM messages ORDER BY id DESC LIMIT ?", (limit,)
        ).fetchall()
        return [{"role": r, "content": c} for r, c in reversed(rows)]

    def remember(self, key: str, value: str) -> None:
        self.conn.execute(
            "INSERT INTO facts (key, value, ts) VALUES (?, ?, ?) "
            "ON CONFLICT(key) DO UPDATE SET value=excluded.value, ts=excluded.ts",
            (key, value, time.time()))
        self.conn.commit()
