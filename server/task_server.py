import os
import psutil
from flask import Flask, request, jsonify
from flask_cors import CORS
from memory import Memory
from brain import think

app = Flask(__name__)
CORS(app) # Allow frontend to connect
memory = Memory()
SHARED_SECRET = os.environ.get("TASK_SHARED_SECRET", "")

@app.post("/api/login")
def login():
    data = request.get_json(force=True)
    password = data.get("password", "")
    
    # In this new architecture, the password IS the shared secret
    if password == SHARED_SECRET:
        return jsonify({"token": SHARED_SECRET, "user": {"id": "admin", "name": "أحمد صلاح"}})
    
    return jsonify({"error": "كلمة المرور غير صحيحة"}), 401

@app.post("/task")
def task():
    if request.headers.get("X-Boho-Secret") != SHARED_SECRET:
        return jsonify({"error": "unauthorized"}), 401
    data = request.get_json(force=True)
    user_request = data.get("request", "").strip()
    if not user_request:
        return jsonify({"error": "empty request"}), 400
    answer = think(user_request, memory)
    return jsonify({"answer": answer})

@app.post("/api/briefing")
def briefing():
    if request.headers.get("X-Boho-Secret") != SHARED_SECRET:
        return jsonify({"error": "unauthorized"}), 401
    prompt = ("Morning briefing for Ahmed. From the tools: iFilter sales yesterday, "
              "Sealy ad performance yesterday, top tasks today. Summarize in 5 short "
              "spoken Egyptian Arabic sentences, lead with the number he should watch.")
    answer = think(prompt, memory)
    return jsonify({"briefing": answer})

@app.get("/api/health")
def health():
    if request.headers.get("X-Boho-Secret") != SHARED_SECRET:
        return jsonify({"error": "unauthorized"}), 401
    try:
        cpu = psutil.cpu_percent(interval=0.1)
        ram = psutil.virtual_memory().percent
        disk = psutil.disk_usage('/').percent
        return jsonify({
            "status": "ok",
            "cpu_usage_percent": cpu,
            "memory_usage_percent": ram,
            "disk_usage_percent": disk,
            "latency_ms": 15
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8090)
