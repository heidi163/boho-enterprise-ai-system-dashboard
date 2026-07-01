import eventlet
eventlet.monkey_patch()

import os
import time
import psutil
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from memory import Memory
from brain import think
from auth import require_auth, generate_token, ADMIN_PASSWORD

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get("JWT_SECRET", "super-secret-boho-key-123")
CORS(app) # Allow React frontend to connect
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')

memory = Memory()
SHARED_SECRET = os.environ.get("TASK_SHARED_SECRET", "change-me")

@app.post("/api/login")
def login():
    data = request.get_json(force=True)
    password = data.get("password", "")
    
    if password == ADMIN_PASSWORD:
        token = generate_token()
        return jsonify({"token": token, "user": {"id": "admin", "name": "أحمد صلاح"}})
    
    return jsonify({"error": "Invalid password"}), 401

@app.post("/task")
@require_auth
def task():
    data = request.get_json(force=True)
    user_request = data.get("request", "").strip()
    user_id = data.get("user_id", "admin")
    company_id = data.get("company_id", "BGK")
    
    if not user_request:
        return jsonify({"error": "empty request"}), 400

    # Handle Vision AI images if present
    image_base64 = data.get("image_base64")
    image_media_type = data.get("image_media_type")

    # Run the deep brain (Claude + live MCP tools)
    answer = think(
        user_request, 
        memory, 
        user_id=user_id, 
        company_id=company_id,
        image_base64=image_base64,
        image_media_type=image_media_type
    )
    
    # Keep it short and speakable; the voice layer will read it aloud
    return jsonify({"answer": answer})

@app.get("/api/memory")
@require_auth
def get_memory():
    # Public endpoint for the React Dashboard to view memory facts
    user_id = request.args.get("user_id", "admin")
    company_id = request.args.get("company_id", "BGK")
    facts = memory.get_facts(user_id=user_id, company_id=company_id)
    return jsonify({"facts": facts})

@app.post("/api/chat")
@require_auth
def api_chat():
    # Public endpoint for the React Dashboard Deep Brain chat
    data = request.get_json(force=True)
    messages = data.get("messages", [])
    if not messages:
        return jsonify({"error": "No messages"}), 400
        
    user_id = data.get("user_id", "admin")
    company_id = data.get("company_id", "BGK")
    user_request = messages[-1].get("content", "")
    
    image_base64 = data.get("image_base64")
    image_media_type = data.get("image_media_type")
    
    answer = think(
        user_request, 
        memory, 
        user_id=user_id, 
        company_id=company_id,
        image_base64=image_base64,
        image_media_type=image_media_type
    )
    return jsonify({"role": "model", "content": answer})

@app.get("/api/tasks")
@require_auth
def get_tasks():
    user_id = request.args.get("user_id", "admin")
    company_id = request.args.get("company_id", "BGK")
    tasks = memory.get_tasks(user_id=user_id, company_id=company_id)
    return jsonify({"tasks": tasks})

@app.post("/api/tasks")
@require_auth
def create_task():
    data = request.get_json(force=True)
    title = data.get("title", "New Task")
    priority = data.get("priority", "medium")
    user_id = data.get("user_id", "admin")
    company_id = data.get("company_id", "BGK")
    memory.add_task(title, priority, user_id, company_id)
    return jsonify({"status": "success"})

@app.put("/api/tasks/<int:task_id>")
@require_auth
def update_task_status(task_id):
    data = request.get_json(force=True)
    status = data.get("status", "pending")
    memory.update_task(task_id, status)
    return jsonify({"status": "success"})

@app.delete("/api/tasks/<int:task_id>")
@require_auth
def delete_task(task_id):
    memory.delete_task(task_id)
    return jsonify({"status": "success"})

@app.post("/api/briefing")
@require_auth
def generate_briefing():
    # Fetch some tasks, sales, etc to generate briefing
    user_id = request.args.get("user_id", "admin")
    company_id = request.args.get("company_id", "BGK")
    tasks = memory.get_tasks(user_id=user_id, company_id=company_id)
    
    prompt = f"قم بإنشاء تقرير صباحي (Briefing) صوتي لمدير الشركة اسمه أحمد صلاح. إجمالي المهام المفتوحة: {len(tasks)}. اجعله مشجعاً واحترافياً. تكلم باللهجة المصرية الخفيفة في حدود 4 سطور."
    answer = think(prompt, memory, user_id=user_id, company_id=company_id)
    return jsonify({"briefing": answer})

@app.get("/api/sales")
@require_auth
def get_sales():
    company_id = request.args.get("company_id", "BGK")
    sales = memory.get_sales(company_id=company_id)
    return jsonify({"sales": sales})

@app.get("/api/ads")
@require_auth
def get_ads():
    company_id = request.args.get("company_id", "BGK")
    ads = memory.get_ads(company_id=company_id)
    return jsonify({"ads": ads})

@app.post("/api/settings/keys")
@require_auth
def save_keys():
    data = request.get_json(force=True)
    service_name = data.get("service")
    api_key = data.get("key")
    if not service_name or not api_key:
        return jsonify({"error": "Missing service or key"}), 400
        
    memory.save_api_key(service_name, api_key)
    return jsonify({"status": "success"})

@app.get("/api/health")
def health():
    try:
        cpu = psutil.cpu_percent(interval=0.1)
        ram = psutil.virtual_memory().percent
        disk = psutil.disk_usage('/').percent
        return jsonify({
            "status": "ok",
            "cpu_usage_percent": cpu,
            "memory_usage_percent": ram,
            "disk_usage_percent": disk,
            "latency_ms": 12 # simulated ping
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# --- WebSockets: Real-time Voice Streaming ---
@socketio.on('connect')
def handle_connect():
    print("Voice client connected")
    emit('server_status', {'message': 'Boho Voice Server Connected. Ready for streaming (Latency ~300ms)'})

@socketio.on('audio_chunk')
def handle_audio_chunk(data):
    # In a real system, we'd pipe this binary chunk directly to ElevenLabs / Speech-to-Text via WebSockets.
    # For now, we simulate receiving and processing.
    # We can emit back a transcription partial or a voice partial.
    emit('audio_ack', {'bytes_received': len(data.get('audio', [])), 'status': 'processing'})

@socketio.on('disconnect')
def handle_disconnect():
    print("Voice client disconnected")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8090))
    print(f"Starting Boho Advanced Task Server (with WebSockets) on port {port}...")
    socketio.run(app, host="0.0.0.0", port=port)
