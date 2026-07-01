import sqlite3
import time

SCHEMA = """
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT DEFAULT 'admin',
    company_id TEXT DEFAULT 'BGK',
    role TEXT NOT NULL, 
    content TEXT NOT NULL, 
    ts REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS facts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT DEFAULT 'admin',
    company_id TEXT DEFAULT 'BGK',
    key TEXT, 
    value TEXT, 
    ts REAL NOT NULL,
    UNIQUE(user_id, company_id, key)
);

CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT DEFAULT 'admin',
    company_id TEXT DEFAULT 'BGK',
    title TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    priority TEXT DEFAULT 'medium',
    ts REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS sales_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT DEFAULT 'BGK',
    metric_name TEXT NOT NULL,
    metric_value REAL NOT NULL,
    date_recorded TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ad_campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id TEXT DEFAULT 'BGK',
    campaign_name TEXT NOT NULL,
    spend REAL NOT NULL,
    roas REAL NOT NULL,
    platform TEXT DEFAULT 'Facebook',
    date_recorded TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS api_keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_name TEXT NOT NULL,
    api_key TEXT NOT NULL,
    UNIQUE(service_name)
);
"""

class Memory:
    def __init__(self, path: str = "boho.db"):
        self.conn = sqlite3.connect(path, check_same_thread=False)
        self.conn.executescript(SCHEMA)
        self.conn.commit()

    def add(self, role: str, content: str, user_id: str = 'admin', company_id: str = 'BGK') -> None:
        self.conn.execute(
            "INSERT INTO messages (user_id, company_id, role, content, ts) VALUES (?, ?, ?, ?, ?)",
            (user_id, company_id, role, content, time.time())
        )
        self.conn.commit()

    def recent_messages(self, limit: int = 20, user_id: str = 'admin', company_id: str = 'BGK') -> list[dict]:
        rows = self.conn.execute(
            "SELECT role, content FROM messages WHERE user_id = ? AND company_id = ? ORDER BY id DESC LIMIT ?", 
            (user_id, company_id, limit)
        ).fetchall()
        return [{"role": r, "content": c} for r, c in reversed(rows)]

    def remember(self, key: str, value: str, user_id: str = 'admin', company_id: str = 'BGK') -> None:
        self.conn.execute(
            """INSERT INTO facts (user_id, company_id, key, value, ts) VALUES (?, ?, ?, ?, ?)
               ON CONFLICT(user_id, company_id, key) DO UPDATE SET value=excluded.value, ts=excluded.ts""",
            (user_id, company_id, key, value, time.time())
        )
        self.conn.commit()
        
    def get_facts(self, user_id: str = 'admin', company_id: str = 'BGK') -> list[dict]:
        rows = self.conn.execute(
            "SELECT key, value FROM facts WHERE user_id = ? AND company_id = ? ORDER BY ts DESC LIMIT 50",
            (user_id, company_id)
        ).fetchall()
        return [{"key": k, "value": v} for k, v in rows]
        
    # --- Tasks Methods ---
    def add_task(self, title: str, priority: str = 'medium', user_id: str = 'admin', company_id: str = 'BGK'):
        self.conn.execute(
            "INSERT INTO tasks (user_id, company_id, title, priority, ts) VALUES (?, ?, ?, ?, ?)",
            (user_id, company_id, title, priority, time.time())
        )
        self.conn.commit()
        
    def get_tasks(self, user_id: str = 'admin', company_id: str = 'BGK') -> list[dict]:
        rows = self.conn.execute(
            "SELECT id, title, status, priority FROM tasks WHERE user_id = ? AND company_id = ? ORDER BY ts DESC",
            (user_id, company_id)
        ).fetchall()
        return [{"id": r[0], "title": r[1], "status": r[2], "priority": r[3]} for r in rows]
        
    def update_task(self, task_id: int, status: str):
        self.conn.execute("UPDATE tasks SET status = ? WHERE id = ?", (status, task_id))
        self.conn.commit()

    # --- Sales Methods ---
    def add_sales_record(self, metric_name: str, metric_value: float, date_recorded: str, company_id: str = 'BGK'):
        self.conn.execute(
            "INSERT INTO sales_metrics (company_id, metric_name, metric_value, date_recorded) VALUES (?, ?, ?, ?)",
            (company_id, metric_name, metric_value, date_recorded)
        )
        self.conn.commit()
        
    def get_sales(self, company_id: str = 'BGK', limit: int = 7) -> list[dict]:
        rows = self.conn.execute(
            "SELECT metric_name, metric_value, date_recorded FROM sales_metrics WHERE company_id = ? ORDER BY date_recorded DESC LIMIT ?",
            (company_id, limit)
        ).fetchall()
        return [{"name": r[0], "value": r[1], "date": r[2]} for r in rows]

    # --- Ads Methods ---
    def add_ad_record(self, campaign_name: str, spend: float, roas: float, platform: str, date_recorded: str, company_id: str = 'BGK'):
        self.conn.execute(
            "INSERT INTO ad_campaigns (company_id, campaign_name, spend, roas, platform, date_recorded) VALUES (?, ?, ?, ?, ?, ?)",
            (company_id, campaign_name, spend, roas, platform, date_recorded)
        )
        self.conn.commit()
        
    def get_ads(self, company_id: str = 'BGK', limit: int = 10) -> list[dict]:
        rows = self.conn.execute(
            "SELECT campaign_name, spend, roas, platform, date_recorded FROM ad_campaigns WHERE company_id = ? ORDER BY date_recorded DESC LIMIT ?",
            (company_id, limit)
        ).fetchall()
        return [{"campaign": r[0], "spend": r[1], "roas": r[2], "platform": r[3], "date": r[4]} for r in rows]

    # --- API Keys Methods ---
    def save_api_key(self, service_name: str, api_key: str):
        self.conn.execute(
            "INSERT OR REPLACE INTO api_keys (service_name, api_key) VALUES (?, ?)",
            (service_name, api_key)
        )
        self.conn.commit()
        
    def get_api_key(self, service_name: str) -> str:
        row = self.conn.execute("SELECT api_key FROM api_keys WHERE service_name = ?", (service_name,)).fetchone()
        return row[0] if row else None
