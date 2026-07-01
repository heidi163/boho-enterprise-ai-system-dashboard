import { useState } from "react";
import { Mic, Volume2, Sliders, PlayCircle, StopCircle, CheckCircle, Settings, FlaskConical, Quote, HardDrive, UploadCloud } from "lucide-react";

const TTS_PROVIDERS = [
  { id: "elevenlabs", name: "ElevenLabs", badge: "الأفضل جودة", color: "#7c3aed" },
  { id: "cartesia", name: "Cartesia", badge: "الأسرع", color: "#0ea5e9" },
  { id: "inworld", name: "Inworld", badge: "الأكثر طبيعية", color: "#10b981" },
  { id: "speechgen", name: "SpeechGen", badge: "أوسع أصوات", color: "#f59e0b" },
];

const ARCHITECTURES = [
  { id: "C", name: "Hybrid (Architecture C)", desc: "Voice Front + Claude Deep Brain - الموصى به", recommended: true },
  { id: "B", name: "Native S2S (Architecture B)", desc: "~320ms نطق إلى نطق - الأسرع", recommended: false },
  { id: "A", name: "Local Pipeline (Architecture A)", desc: "Wake Word + Whisper - الاحتياطي", recommended: false },
];

const SLANG_CATEGORIES = [
  { id: "business", label: "بزنس وتقارير", emoji: "💼" },
  { id: "comedy", label: "هزار ومقاطعة", emoji: "😂" },
  { id: "anger", label: "تحذير وانفعال", emoji: "⚠️" },
  { id: "general", label: "ترحيب عام", emoji: "👋" }
];

const SLANG_SUITE = {
  business: [
    "يا أحمد باشا، مبيعات iFilter امبارح كانت تمام ومتجاوزة الهدف بكتير.",
    "خد بالك، الـ ROAS بتاع Sealy على سناب شات وقع تحت الاتنين، محتاج تبص عليه.",
    "عملتلك التقرير اللي طلبته، الأرقام كلها مبشرة جداً الشهر ده."
  ],
  comedy: [
    "يا عم أنت جننتني! هو أنا آلة حاسبة شغال عندك؟ بهزر معاك طبعاً.",
    "استنى بس أخلص كلامي وبعدين قاطعني براحتك، إحنا فينا من كده؟",
    "يا سيدي عيني ليك، بس هاتلي قهوة الأول."
  ],
  anger: [
    "بقولك إيه، الفلوس بتتحرق في إعلانات جوجل من غير أي فايدة، وقف الحملة دي فوراً!",
    "فيه مشكلة كبيرة في سيرفر Metorik، مش عارف أسحب الداتا بقالي ساعة.",
    "الميزانية خلصت وإحنا لسه في نص اليوم، ده تهريج!"
  ],
  general: [
    "صباح الفل يا غالي، يوم جديد وشغل جديد.",
    "أهلاً بيك يا ريس، بوهو تحت أمرك في أي وقت.",
    "إيه الأخبار؟ جاهز نكسر الدنيا النهارده؟"
  ]
};

export default function VoicePersonalityLabPage() {
  const [activeProvider, setActiveProvider] = useState(TTS_PROVIDERS[0]);
  const [activeArch, setActiveArch] = useState(ARCHITECTURES[0]);
  const [bargeIn, setBargeIn] = useState(true);
  const [endpointing, setEndpointing] = useState(500);
  const [activeCategory, setActiveCategory] = useState<keyof typeof SLANG_SUITE>("business");
  const [testSentence, setTestSentence] = useState(SLANG_SUITE["business"][0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stability, setStability] = useState(0.4);
  const [similarity, setSimilarity] = useState(0.75);
  const [voiceAgentStatus, setVoiceAgentStatus] = useState<"online" | "offline" | "connecting">("offline");

  // Local Fallback Configs
  const [silenceRms, setSilenceRms] = useState(350);
  const [keywordPath, setKeywordPath] = useState("ya_boho_mac.ppn");

  // Voice Cloning State
  const [cloneName, setCloneName] = useState("");
  const [isCloning, setIsCloning] = useState(false);

  const handlePreview = () => {
    if (!("speechSynthesis" in window)) return;
    setIsPlaying(true);
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(testSentence);
    const voices = window.speechSynthesis.getVoices();
    const ar = voices.find(v => v.lang.startsWith("ar"));
    if (ar) u.voice = ar;
    u.rate = 0.92;
    u.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(u);
  };

  const stopPreview = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const connectVoiceAgent = () => {
    setVoiceAgentStatus("connecting");
    setTimeout(() => setVoiceAgentStatus("online"), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full" dir="rtl">

      {/* HEADER */}
      <div className="glass-panel rounded-[24px] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold border ${
            voiceAgentStatus === "online" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
            voiceAgentStatus === "connecting" ? "bg-amber-50 text-amber-700 border-amber-200" :
            "bg-slate-50 text-slate-500 border-slate-200"
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              voiceAgentStatus === "online" ? "bg-emerald-500 animate-pulse" :
              voiceAgentStatus === "connecting" ? "bg-amber-500 animate-spin" :
              "bg-slate-400"
            }`} />
            الوكيل الصوتي: {voiceAgentStatus === "online" ? "متصل" : voiceAgentStatus === "connecting" ? "جارٍ الاتصال..." : "غير متصل"}
          </div>
          {voiceAgentStatus !== "online" && (
            <button onClick={connectVoiceAgent} className="text-xs text-white bg-gradient-to-l from-blue-500 to-blue-600 rounded-full px-4 py-1.5 font-bold hover:opacity-90">
              تشغيل Voice Agent
            </button>
          )}
        </div>
        <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">معمل الصوت والشخصية <FlaskConical className="w-4 h-4 text-blue-500" /></h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* CONTROLS (Left side) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* TTS PROVIDER SELECTOR */}
          <div className="glass-panel rounded-[24px] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Section 7.3</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">موفر الصوت <Volume2 className="w-4 h-4 text-blue-500" /></h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {TTS_PROVIDERS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setActiveProvider(p)}
                  className={`rounded-2xl p-3 border text-right transition-all ${
                    activeProvider.id === p.id
                      ? "border-transparent shadow-lg text-white"
                      : "bg-white/50 border-white/80 text-slate-700 hover:border-blue-200"
                  }`}
                  style={activeProvider.id === p.id ? { background: `linear-gradient(135deg, ${p.color}dd, ${p.color}99)` } : {}}
                >
                  <p className="font-bold text-sm font-sans">{p.name}</p>
                  <p className={`text-[9px] mt-0.5 font-tajawal ${activeProvider.id === p.id ? "text-white/80" : "text-gray-400"}`}>{p.badge}</p>
                </button>
              ))}
            </div>
          </div>

          {/* BARGE-IN + ENDPOINTING */}
          <div className="glass-panel rounded-[24px] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">voice_agent.json</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">إعدادات المحادثة <Sliders className="w-4 h-4 text-slate-500" /></h3>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between bg-white/50 rounded-xl p-3 border border-white/80">
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-700 font-tajawal">المقاطعة (Barge-in)</p>
                  <p className="text-[9px] text-gray-500 font-tajawal">بتخليك تقاطع بوهو وهو بيتكلم</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono ${bargeIn ? "text-emerald-600 font-bold" : "text-gray-400"}`}>{bargeIn ? "ON" : "OFF"}</span>
                  <button onClick={() => setBargeIn(!bargeIn)} className={`w-10 h-5 rounded-full transition-colors relative ${bargeIn ? "bg-emerald-500" : "bg-slate-200"}`}>
                    <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all ${bargeIn ? "right-0.5" : "left-0.5"} shadow-sm`} />
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-blue-600 font-bold">{endpointing}ms</span>
                  <span className="text-xs text-slate-700 font-tajawal font-bold">وقت السكوت (Endpointing)</span>
                </div>
                <input type="range" min={200} max={1500} step={50} value={endpointing} onChange={e => setEndpointing(Number(e.target.value))} className="w-full accent-blue-500 h-1.5" />
                <div className="flex justify-between text-[8px] text-gray-400 font-mono mt-1"><span>200ms</span><span>500ms</span><span>1500ms</span></div>
              </div>
            </div>
          </div>

          {/* LOCAL FALLBACK CONFIGS */}
          <div className="glass-panel rounded-[24px] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Architecture A</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">النظام المحلي الاحتياطي <HardDrive className="w-4 h-4 text-slate-500" /></h3>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 font-tajawal mb-1.5 text-right">مسار الكلمة المفتاحية (Wake Word)</label>
                <input type="text" value={keywordPath} onChange={e => setKeywordPath(e.target.value)} className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-600 focus:outline-none focus:border-blue-400" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-blue-600 font-bold">{silenceRms}</span>
                  <span className="text-xs text-slate-700 font-tajawal font-bold">حساسية الصمت (Silence RMS)</span>
                </div>
                <input type="range" min={100} max={800} step={10} value={silenceRms} onChange={e => setSilenceRms(Number(e.target.value))} className="w-full accent-blue-500 h-1.5" />
                <div className="flex justify-between text-[8px] text-gray-400 font-mono mt-1"><span>عالية (100)</span><span>متوسطة (350)</span><span>منخفضة (800)</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* EGYPTIAN SLANG TEST SUITE (Right side) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="glass-panel rounded-[24px] p-5 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/50">
              <span className="text-[10px] font-mono text-gray-400 uppercase">مجموعة الاختبار</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">اختبار اللهجة المصرية <Mic className="w-4 h-4 text-rose-500" /></h3>
            </div>
            
            <div className="flex flex-col gap-4 flex-1">
              
              {/* Category Selector */}
              <div className="flex flex-wrap gap-2 justify-end">
                {SLANG_CATEGORIES.map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveCategory(c.id as any);
                      setTestSentence(SLANG_SUITE[c.id as keyof typeof SLANG_SUITE][0]);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-tajawal font-bold flex items-center gap-1.5 transition-all ${
                      activeCategory === c.id
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-white/60 text-slate-600 hover:bg-white/90 border border-white/80"
                    }`}
                  >
                    {c.emoji} {c.label}
                  </button>
                ))}
              </div>

              {/* Sentences List */}
              <div className="flex flex-col gap-2">
                {SLANG_SUITE[activeCategory].map((s, i) => (
                  <div 
                    key={i} 
                    onClick={() => setTestSentence(s)}
                    className={`p-3 rounded-xl cursor-pointer border text-right transition-all flex items-start gap-3 ${
                      testSentence === s 
                        ? "bg-blue-50 border-blue-200" 
                        : "bg-white/40 border-transparent hover:bg-white/60 hover:border-slate-200"
                    }`}
                  >
                    <Quote className={`w-4 h-4 mt-0.5 shrink-0 ${testSentence === s ? "text-blue-500" : "text-slate-300"}`} />
                    <p className={`text-sm font-tajawal leading-relaxed ${testSentence === s ? "text-slate-800 font-bold" : "text-slate-600"}`}>
                      {s}
                    </p>
                  </div>
                ))}
              </div>

              {/* Custom Input */}
              <div className="mt-auto pt-4">
                <textarea
                  value={testSentence}
                  onChange={e => setTestSentence(e.target.value)}
                  placeholder="أو اكتب جملة من عندك..."
                  rows={2}
                  className="w-full bg-white/70 border border-slate-200 rounded-xl px-4 py-3 text-sm font-tajawal text-slate-800 resize-none outline-none focus:border-blue-300 transition-colors text-right shadow-inner"
                />
              </div>

              {/* Play Controls */}
              <div className="flex items-center gap-3">
                <button onClick={stopPreview} className="flex items-center gap-1.5 text-xs text-rose-500 border border-rose-200 bg-rose-50 rounded-xl px-4 py-3 hover:bg-rose-100 font-bold transition-colors">
                  <StopCircle className="w-5 h-5" />
                </button>
                <button onClick={handlePreview} disabled={isPlaying} className="flex-1 flex items-center justify-center gap-2 text-sm font-bold text-white bg-gradient-to-l from-blue-500 to-blue-600 rounded-xl py-3 hover:opacity-90 disabled:opacity-50 transition-all shadow-md">
                  <PlayCircle className="w-5 h-5" />
                  {isPlaying ? "جارٍ التشغيل..." : `اختبار بصوت ${activeProvider.name}`}
                </button>
              </div>

            </div>
          </div>

          {/* VOICE CLONING PANEL */}
          <div className="glass-panel rounded-[24px] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">ElevenLabs API</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">استنساخ الصوت (Voice Cloning) <UploadCloud className="w-4 h-4 text-blue-500" /></h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 font-tajawal mb-1.5 text-right">اسم الصوت الجديد</label>
                <input type="text" value={cloneName} onChange={e => setCloneName(e.target.value)} placeholder="مثال: صوت أحمد صلاح" className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-tajawal text-slate-600 focus:outline-none focus:border-blue-400 text-right" />
              </div>
              
              <div className="flex flex-col justify-end">
                <button 
                  onClick={() => {
                    setIsCloning(true);
                    setTimeout(() => setIsCloning(false), 2000);
                  }}
                  disabled={!cloneName.trim() || isCloning}
                  className="w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-700 bg-white border border-dashed border-blue-300 rounded-xl py-2.5 hover:bg-blue-50 transition-all disabled:opacity-50"
                >
                  <UploadCloud className="w-4 h-4" />
                  {isCloning ? "جارٍ الرفع..." : "ارفع عينة صوت (WAV/MP3)"}
                </button>
              </div>
            </div>
            <p className="text-[10px] text-gray-500 font-tajawal mt-3 text-right">
              * يفضل رفع عينة صوتية صافية بدون ضوضاء لا تقل عن دقيقة لضمان جودة الاستنساخ.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
