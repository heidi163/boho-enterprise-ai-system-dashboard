import os, requests, tempfile
KEY = os.environ.get("ELEVENLABS_API_KEY", "")
VOICE = os.environ.get("ELEVENLABS_VOICE_ID", "")

def speak_to_file(text: str) -> str:
    if not KEY or not VOICE:
        print("Warning: Missing ElevenLabs credentials.")
        return ""
        
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE}"
    r = requests.post(url, headers={"xi-api-key": KEY, "Content-Type": "application/json"},
                      json={"text": text, "model_id": "eleven_multilingual_v2",
                            "voice_settings": {"stability": 0.4, "similarity_boost": 0.75}},
                      timeout=60)
    r.raise_for_status()
    tmp = tempfile.NamedTemporaryFile(suffix=".mp3", delete=False)
    tmp.write(r.content); tmp.close()
    return tmp.name
