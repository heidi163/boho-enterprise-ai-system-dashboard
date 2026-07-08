import os
import sys
# Add parent dir to path so we can import brain and memory
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import wake, stt, tts, subprocess
from memory import Memory
from brain import think

def play(mp3): 
    if mp3 and os.path.exists(mp3):
        subprocess.run(["ffplay","-nodisp","-autoexit","-loglevel","quiet",mp3])

def run():
    mem = Memory()
    print("Boho is live. Say يا بوهو:")
    while True:
        if not wake.listen_and_record("/tmp/turn.wav"):
            print("Listening failed or mock activated. Waiting...")
            continue
        text = stt.transcribe("/tmp/turn.wav")
        if not text: continue
        reply = think(text, mem)
        play(tts.speak_to_file(reply))

if __name__ == "__main__": 
    run()
