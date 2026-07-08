import os
from flask import Flask, request, jsonify
from memory import Memory
from brain import think

app = Flask(__name__)
memory = Memory()
SHARED_SECRET = os.environ.get("TASK_SHARED_SECRET", "")

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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8090)
