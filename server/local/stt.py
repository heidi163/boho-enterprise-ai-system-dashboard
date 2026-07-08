from faster_whisper import WhisperModel
_model = WhisperModel("large-v3", device="auto", compute_type="auto")

def transcribe(wav_path: str) -> str:
    segments, _ = _model.transcribe(wav_path, language="ar", beam_size=5, vad_filter=True)
    return " ".join(s.text for s in segments).strip()
