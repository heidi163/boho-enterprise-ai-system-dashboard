import os, wave, struct, pvporcupine
from pvrecorder import PvRecorder

ACCESS_KEY = os.environ.get("PICOVOICE_ACCESS_KEY", "")
KEYWORD_PATH = os.environ.get("PICOVOICE_KEYWORD_PATH", "")  # trained "يا بوهو" .ppn
SILENCE_RMS = 350; MAX_SILENCE = 45; MAX_TURN = 700

def _rms(f): return (sum(s*s for s in f)/len(f))**0.5 if f else 0.0

def listen_and_record(out_wav: str) -> bool:
    if not ACCESS_KEY or not KEYWORD_PATH or not os.path.exists(KEYWORD_PATH):
        print("Warning: Missing Picovoice credentials or keyword path.")
        return False
        
    p = pvporcupine.create(access_key=ACCESS_KEY, keyword_paths=[KEYWORD_PATH])
    rec = PvRecorder(frame_length=p.frame_length); rec.start()
    try:
        while True:
            if p.process(rec.read()) >= 0: break
        buf, sil, total = [], 0, 0
        while total < MAX_TURN:
            fr = rec.read(); buf.extend(fr); total += 1
            if _rms(fr) < SILENCE_RMS:
                sil += 1
                if sil > MAX_SILENCE: break
            else:
                sil = 0
        with wave.open(out_wav, "wb") as wf:
            wf.setnchannels(1); wf.setsampwidth(2); wf.setframerate(p.sample_rate)
            wf.writeframes(struct.pack("h"*len(buf), *buf))
        return True
    finally:
        rec.stop(); rec.delete(); p.delete()
