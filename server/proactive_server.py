import os, requests
from flask import Flask, jsonify
from memory import Memory
from brain import think

app = Flask(__name__)
memory = Memory()

TG_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
TG_CHAT = os.environ.get("TELEGRAM_CHAT_ID")

def push(text):
    if TG_TOKEN:
        requests.post(f"https://api.telegram.org/bot{TG_TOKEN}/sendMessage",
                      json={"chat_id": TG_CHAT, "text": text}, timeout=30)

@app.post("/briefing")
def briefing():
    prompt = ("Morning briefing for Ahmed. From the tools: iFilter sales yesterday, "
              "Sealy ad performance yesterday, top tasks today. Summarize in 5 short "
              "spoken Egyptian Arabic sentences, lead with the number he should watch.")
    text = think(prompt, memory)
    push(text)
    return jsonify({"ok": True, "briefing": text})

@app.post("/alert/roas")
def roas():
    prompt = ("Check ROAS for every ad account via Windsor. If any account is below 2, "
              "alert Ahmed in one Egyptian Arabic sentence with the account name and "
              "number. If all fine, reply only 'tameen'.")
    text = think(prompt, memory)
    if "tameen" not in text.lower(): push(text)
    return jsonify({"ok": True})

if __name__ == "__main__": 
    app.run(host="0.0.0.0", port=8088)
