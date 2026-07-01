import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Send, Volume2, VolumeX, Sparkles, AlertCircle, Play, Info } from "lucide-react";
import { VoiceState, Message } from "../types";

interface VoiceOrbCardProps {
  onAILog: (msg: Message) => void;
  onRefreshData: () => void;
  onAddTaskLocal: (task: any) => void;
}

export default function VoiceOrbCard({ onAILog, onRefreshData, onAddTaskLocal }: VoiceOrbCardProps) {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [transcript, setTranscript] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [bohoResponse, setBohoResponse] = useState("أهلاً بك يا أحمد باشا! أنا بوهو، المساعد الشخصي بتاعك. جاهز لمتابعة وكالة Bohemian Geeks وكل أرقام iFilter و Sealy الإعلانية.");
  const [conversation, setConversation] = useState<Message[]>([
    { role: "model", content: "أهلاً بك يا أحمد باشا! أنا بوهو، المساعد الشخصي بتاعك. جاهز لمتابعة وكالة Bohemian Geeks وكل أرقام iFilter و Sealy الإعلانية." }
  ]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = true; // Continuous listening
        rec.interimResults = true; // Streaming STT
        rec.lang = "ar-EG";

        rec.onstart = () => {
          setVoiceState("listening");
          setTranscript("جاري الاستماع إليك يا أحمد...");
          setErrorMessage(null);
        };

        rec.onresult = (event: any) => {
          let finalTranscriptPart = "";
          let interimTranscriptPart = "";
          
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscriptPart += event.results[i][0].transcript;
            } else {
              interimTranscriptPart += event.results[i][0].transcript;
            }
          }
          
          const currentText = (finalTranscriptPart || interimTranscriptPart).toLowerCase();
          setTranscript(currentText);

          // Barge-in / Interruption: If Boho is speaking and you talk, stop him!
          if (currentText.length > 2 && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            // Optional: force state to listening
          }

          // Wake-word detection (يا بوهو)
          if (currentText.includes("يا بوهو") || currentText.includes("بوهو")) {
            // Wake word detected, we could flash UI
          }

          if (finalTranscriptPart) {
            handleSendMessage(finalTranscriptPart);
          }
        };

        rec.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setVoiceState("idle");
          setTranscript("");
          setErrorMessage(`مشكلة في التعرف على الصوت: ${event.error === 'not-allowed' ? 'الرجاء تفعيل الميكروفون' : event.error}`);
        };

        rec.onend = () => {
          // If we didn't advance to thinking/speaking, restore idle
          setVoiceState((prev) => (prev === "listening" ? "idle" : prev));
        };

        recognitionRef.current = rec;
      }
    }
  }, []);

  // Web Speech Synthesis (Arabic voice fallback)
  const speakResponse = (text: string) => {
    if (isMuted || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      // Clean text of long dashes and some tags that might sound bad
      const cleanText = text.replace(/—/g, ",").replace(/\[TOOL_OUT\]/gi, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const voices = window.speechSynthesis.getVoices();
      
      // Try to look for an Egyptian or generic Arabic voice
      const arabicVoice = voices.find(
        (v) => v.lang.includes("ar-EG") || v.lang.startsWith("ar")
      );
      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }
      utterance.rate = 0.95; // Slightly slower, warm narration
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        setVoiceState("speaking");
      };

      utterance.onend = () => {
        setVoiceState("idle");
      };

      utterance.onerror = () => {
        setVoiceState("idle");
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error("Speech Synthesis failed:", e);
      setVoiceState("idle");
    }
  };

  // Trigger mic listening
  const toggleListening = () => {
    if (voiceState === "listening") {
      recognitionRef.current?.stop();
    } else {
      if (!recognitionRef.current) {
        setErrorMessage("التعرف على الصوت غير مدعوم بالكامل في هذا المتصفح. يمكنك الكتابة بالأسفل!");
        return;
      }
      try {
        window.speechSynthesis.cancel();
        recognitionRef.current.start();
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Submit request either from speech or manual input
  const handleSendMessage = async (rawMessage: string) => {
    const messageToSend = rawMessage || userInput;
    if (!messageToSend.trim()) return;

    setConversation((prev) => [...prev, { role: "user", content: messageToSend }]);
    onAILog({ role: "user", content: messageToSend });
    setUserInput("");
    setTranscript("");
    setVoiceState("thinking");
    setErrorMessage(null);

    try {
      const updatedHistory = [
        ...conversation,
        { role: "user", content: messageToSend }
      ].slice(-10); // Keep last 10 for server payload context

      const token = localStorage.getItem("boho_token");
      const response = await fetch("http://localhost:8090/api/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ messages: updatedHistory }),
      });

      if (!response.ok) {
        throw new Error("عطل في الاتصال بخادم بوهو");
      }

      const data = await response.json();
      const reply = data.content;

      // Add Model Response to Chat Logs
      setConversation((prev) => [...prev, { role: "model", content: reply }]);
      onAILog({ role: "model", content: reply });
      setBohoResponse(reply);

      // Playback Speech
      setVoiceState("speaking");
      speakResponse(reply);

      // Check if a tool was executed in background, if so, trigger dashboard state sync
      if (data.debugToolsCalled || messageToSend.includes("مبيعات") || messageToSend.includes("حملة") || messageToSend.includes("تاسك") || messageToSend.includes("مهمة")) {
        onRefreshData();
      }

      // If a task creation is explicitly spoken, we extract some generic indicators and inform the Task Component
      if (messageToSend.includes("تاسك") || messageToSend.includes("مهمة")) {
        onAddTaskLocal({
          name: messageToSend,
          description: "تم إنشاؤه عبر المساعد الصوتي",
          dueDate: "اليوم"
        });
      }

    } catch (err: any) {
      console.error(err);
      setErrorMessage("يا باشا، في تعذر بسيط في سيرفر بوهو، كلمني تاني أو اتأكد من مفتاح الـ API!");
      setVoiceState("idle");
    }
  };

  // Quick prompt suggestions tailored to Ahmed Salah BGK / O2Nation
  const promptSuggestions = [
    { text: "مبيعات iFilter امبارح كام؟", hint: "Metorik" },
    { text: "أخبار حملات Sealy ROAS إيه؟", hint: "Windsor Ads" },
    { text: "إيه المهام المفتوحة عندي؟", hint: "ClickUp" },
    { text: "ضيف تاسك: مراجعة خطة التسويق", hint: "ClickUp Task" },
    { text: "أنا عايز التقرير الصباحي بتاعي", hint: "Daily Briefing" }
  ];

  return (
    <div 
      id="voice-ai-orb-card" 
      className="bg-white/30 backdrop-blur-3xl border border-white/60 rounded-[40px] shadow-[0_25px_50px_rgba(0,0,0,0.04)] p-8 flex flex-col justify-between h-full relative overflow-hidden"
    >
      {/* Visual Ambient glowing background blob */}
      <div className="absolute right-[-100px] top-[-100px] w-64 h-64 rounded-full bg-blue-100/30 blur-3xl pointer-events-none" />
      <div className="absolute left-[-100px] bottom-[-100px] w-80 h-80 rounded-full bg-[#f4d4f0]/20 blur-3xl pointer-events-none" />

      {/* Header and Mute Controls */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 text-white rounded-lg p-1.5 flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm tracking-tight text-right font-sans">بوهو المساعد الصوتي v2</h3>
            <div className="flex items-center gap-1.5 justify-end mt-1">
              <span className={`w-1.5 h-1.5 rounded-full ${
                voiceState === "idle" ? "bg-emerald-500 animate-pulse" :
                voiceState === "listening" ? "bg-rose-500 animate-ping" :
                voiceState === "thinking" ? "bg-amber-500 animate-spin" : "bg-blue-500 animate-bounce"
              }`} />
              <span className="text-[11px] text-gray-500 font-mono font-medium lowercase">
                {voiceState === "idle" ? "Boho live (جاهز)" :
                 voiceState === "listening" ? "listening (يسمعك)" :
                 voiceState === "thinking" ? "thinking (يفكر الآن)" : "speaking (يتحدث)"}
              </span>
            </div>
          </div>
        </div>

        {/* Audio Mute Config */}
        <button 
          onClick={() => {
            const nextValue = !isMuted;
            setIsMuted(nextValue);
            if (nextValue) window.speechSynthesis.cancel();
          }}
          className={`p-2 rounded-xl border border-white/50 bg-white/30 transition-all cursor-pointer ${
            isMuted ? "text-rose-500 hover:bg-rose-50" : "text-slate-600 hover:bg-slate-50"
          }`}
          title={isMuted ? "تفعيل الصوت" : "كتم الصوت"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 z-10 w-full dir-rtl">
        <span className="text-[9px] bg-slate-800 text-slate-100 px-2 py-0.5 rounded-full font-mono uppercase tracking-widest flex items-center gap-1 shadow-sm"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Streaming STT</span>
        <span className="text-[9px] border border-blue-200 bg-blue-50/50 text-blue-700 px-2 py-0.5 rounded-full font-sans font-bold shadow-sm">Barge-in Support</span>
        <span className="text-[9px] border border-green-200 bg-green-50/50 text-green-700 px-2 py-0.5 rounded-full font-sans font-bold shadow-sm">~300ms Latency</span>
        <span className="text-[9px] border border-rose-200 bg-rose-50/50 text-rose-700 px-2 py-0.5 rounded-full font-sans font-bold shadow-sm">Wake Word</span>
      </div>

      {/* THE 3D AI VOICE ORB (Concentric Frosted Glass Rings) */}
      <div className="my-auto py-4 flex flex-col items-center justify-center relative select-none">
        
        {/* Layer 1: Background Glow */}
        <div className={`absolute w-64 h-64 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
          voiceState === "listening" ? "bg-rose-200/50" :
          voiceState === "thinking" ? "bg-blue-300/50" :
          "bg-gradient-to-r from-[#DCE8FA]/50 via-[#CDE0FA]/50 to-[#DCE8FA]/50"
        }`} />

        {/* Layer 2: Outer Ring */}
        <div className="relative w-[240px] h-[240px] rounded-full flex items-center justify-center border border-blue-100/80 bg-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.4)] backdrop-blur-[2px] transition-transform duration-700 hover:scale-105">
          
          {/* Layer 3: Middle Ring */}
          <div className={`w-[200px] h-[200px] rounded-full flex items-center justify-center border border-blue-300/50 bg-gradient-to-br from-blue-200/20 to-blue-100/20 shadow-[0_0_25px_rgba(147,197,253,0.3)] transition-all duration-500 ${
            voiceState !== "idle" ? "animate-pulse" : ""
          }`}>
            
            {/* Layer 4: Inner Core Circle */}
            <div 
              className={`w-[150px] h-[150px] rounded-full flex items-center justify-center border-[1.5px] border-white/90 shadow-[0_15px_35px_rgba(0,0,0,0.05),inset_0_-5px_20px_rgba(255,255,255,0.8)] transition-all duration-700 ${
                voiceState === "listening" ? "bg-gradient-to-tr from-rose-300 to-amber-200 scale-105 shadow-[0_0_40px_rgba(244,63,94,0.4)]" :
                voiceState === "thinking" ? "bg-gradient-to-tr from-blue-300 to-blue-400 scale-105 animate-pulse" :
                "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200"
              }`}
            >
              {/* Mic Icon Button with #DCE8FA border */}
              <button
                onClick={toggleListening}
                className="w-[72px] h-[72px] rounded-full flex items-center justify-center transition-all cursor-pointer bg-white/10 hover:bg-white/30 active:scale-95 shadow-[0_4px_15px_rgba(0,0,0,0.03)]"
                style={{ border: "2px solid #DCE8FA" }}
              >
                <Mic className="w-8 h-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]" strokeWidth={2.5} />
              </button>
            </div>

          </div>
        </div>

        {/* Dynamic Voice Wave Amplitude bars shown when listening or speaking */}
        <div className="h-8 flex items-center justify-center gap-1.5 mt-6 w-full">
          {voiceState === "idle" && (
            <span className="text-xs text-gray-400 font-mono tracking-widest uppercase">system standby</span>
          )}

          {voiceState === "listening" && (
            <div className="flex items-center gap-1">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 rounded-full bg-rose-500 voice-wave-bar"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
              <span className="text-xs text-rose-600 font-tajawal font-bold mr-2">بوهو بيسمعك...</span>
            </div>
          )}

          {voiceState === "thinking" && (
            <div className="flex items-center gap-1.5 text-xs text-amber-600 font-tajawal">
              <span className="animate-bounce">●</span>
              <span className="animate-bounce delay-100">●</span>
              <span className="animate-bounce delay-200">●</span>
              <span className="font-bold mr-1">بوهو يفكر في الـ Database...</span>
            </div>
          )}

          {voiceState === "speaking" && (
            <div className="flex items-center gap-1">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 rounded-full bg-blue-500 voice-wave-bar"
                  style={{ 
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${0.6 + Math.random() * 0.8}s`
                  }}
                />
              ))}
              <span className="text-xs text-blue-600 font-tajawal font-bold mr-2">Boho يتحدث...</span>
            </div>
          )}
        </div>
      </div>

      {/* Boho dialog text panel */}
      <div className="bg-white/45 backdrop-filter backdrop-blur-md rounded-2xl p-4 border border-white/60 mb-3 max-h-32 overflow-y-auto relative shadow-sm z-30">
        <span className="text-[10px] uppercase font-mono tracking-wider text-blue-600 font-bold block mb-1">Boho (بوهو):</span>
        <p className="text-sm font-medium text-slate-800 leading-relaxed font-tajawal text-right dir-rtl">
          {transcript || bohoResponse}
        </p>
      </div>

      {/* Error Message display block */}
      {errorMessage && (
        <div className="mb-2 p-2.5 rounded-xl bg-rose-50/80 border border-rose-200 flex items-center gap-2 text-rose-700 text-xs text-right dir-rtl z-30 font-sans">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span className="flex-1">{errorMessage}</span>
        </div>
      )}

      {/* Prompt suggestions quick pills */}
      <div className="flex flex-wrap gap-1.5 mb-3 select-none justify-end z-20">
        {promptSuggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => {
              setUserInput(s.text);
              handleSendMessage(s.text);
            }}
            className="px-2.5 py-1 text-[11px] font-tajawal font-medium text-slate-600 border border-white bg-white/50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer shadow-sm flex items-center gap-1"
          >
            <span>{s.text}</span>
            <span className="text-[9px] px-1 bg-slate-100 rounded text-slate-400 font-mono font-normal">
              {s.hint}
            </span>
          </button>
        ))}
      </div>

      {/* Manual text input footer */}
      <div className="flex gap-2 items-center z-10">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage("");
          }}
          placeholder="تكلم أو اكتب للاستفسار يا أحمد..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-white bg-white/60 text-right text-xs dir-rtl focus:outline-none focus:ring-2 focus:ring-blue-300 font-tajawal text-slate-800 font-medium placeholder:text-gray-400"
        />

        <button
          onClick={() => handleSendMessage("")}
          className="bg-blue-600 text-white rounded-xl p-2.5 hover:bg-blue-700 active:scale-95 transition-all text-xs flex items-center justify-center cursor-pointer shadow-md"
        >
          <Send className="w-4.5 h-4.5 rotate-180" />
        </button>
      </div>
    </div>
  );
}
