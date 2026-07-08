import os
import sys

# Add parent dir to path so we can import brain and memory
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from brain import think
from memory import Memory

print("Initializing Local Pipeline (Architecture A)...")
print("Loading Wake Word Engine (pvporcupine)...")
print("Loading Local STT Engine (faster-whisper)...")
print("Loading Local TTS Engine (ElevenLabs or local fallback)...")

def run_local_loop():
    memory = Memory()
    print("\nLocal Boho is listening... Say 'Ya Boho' to wake.")
    try:
        while True:
            # Mocking the wake word detection and speech-to-text
            user_input = input("\n[Microphone STT] You: ")
            if not user_input:
                continue
            if user_input.lower() in ["exit", "quit"]:
                break
                
            print("[Thinking...]")
            answer = think(user_input, memory)
            print(f"[Speaker TTS] Boho: {answer}")
    except KeyboardInterrupt:
        print("\nShutting down local pipeline.")

if __name__ == "__main__":
    run_local_loop()
