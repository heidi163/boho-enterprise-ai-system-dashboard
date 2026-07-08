import os
import jwt
import datetime
from functools import wraps
from flask import request, jsonify

JWT_SECRET = os.environ.get("JWT_SECRET", "super-secret-boho-key-123")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "boho2026") # Default password for the dashboard

def generate_token(user_id="admin"):
    payload = {
        "user_id": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7) # Token valid for 7 days
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

def verify_token(token):
    try:
        data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return data["user_id"]
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # We also support X-Boho-Secret for the internal task server / voice agent
        if request.headers.get("X-Boho-Secret") == os.environ.get("TASK_SHARED_SECRET", "change-me"):
            return f(*args, **kwargs)
            
        token = None
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]
            
        if not token:
            return jsonify({"error": "Unauthorized", "message": "Missing JWT token"}), 401
            
        user_id = verify_token(token)
        if not user_id:
            return jsonify({"error": "Unauthorized", "message": "Invalid or expired JWT token"}), 401
            
        return f(*args, **kwargs)
    return decorated
