import os
import requests
from flask import Flask, request, jsonify
from brain import think
from memory import Memory
import config

app = Flask(__name__)
memory = Memory()

TELEGRAM_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID")

def send_telegram_message(text: str):
    if not TELEGRAM_TOKEN or not CHAT_ID:
        print(f"Would send to Telegram: {text}")
        return
    
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {"chat_id": CHAT_ID, "text": text}
    try:
        requests.post(url, json=payload)
    except Exception as e:
        print(f"Telegram error: {e}")

@app.post("/webhook/n8n/daily-briefing")
def daily_briefing():
    # Triggered every morning at 8 AM by n8n
    prompt = "أكتبلي الـ Daily Briefing بتاع النهاردة. راجع المبيعات وإعلانات الفيسبوك وقولي أهم الأرقام."
    answer = think(prompt, memory, model=config.BRAIN_MODEL)
    send_telegram_message(f" Daily Briefing:\n\n{answer}")
    return jsonify({"status": "sent"})

@app.post("/webhook/n8n/alert")
def alert():
    # Triggered when n8n detects ROAS drops or failed payments
    data = request.get_json(force=True)
    issue = data.get("issue", "Unknown alert")
    
    prompt = f"جالي تنبيه من السيستم: {issue}. اكتبلي رسالة قصيرة جداً (سطرين) تحذيرية لأحمد."
    answer = think(prompt, memory, model=config.FAST_MODEL)
    send_telegram_message(f" تنبيه عاجل:\n\n{answer}")
    return jsonify({"status": "sent"})

if __name__ == "__main__":
    port = int(os.environ.get("PROACTIVE_PORT", 8091))
    print(f"Starting Proactive Server on port {port}...")
    app.run(host="0.0.0.0", port=port)
