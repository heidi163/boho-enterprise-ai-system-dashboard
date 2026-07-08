import { useState } from "react";
import { Mic, Volume2, Sliders, BrainCircuit, CheckCircle, FlaskConical, Quote } from "lucide-react";

const TTS_PROVIDERS = [
  { id: "elevenlabs", name: "ElevenLabs", badge: "الأفضل جودة", color: "#7c3aed" },
  { id: "cartesia", name: "Cartesia", badge: "الأسرع", color: "#0ea5e9" },
  { id: "inworld", name: "Inworld", badge: "الأكثر طبيعية", color: "#10b981" },
  { id: "speechgen", name: "SpeechGen", badge: "أوسع أصوات", color: "#f59e0b" },
];

const SLANG_CATEGORIES = [
  { id: "business", label: "بزنس وتقارير", emoji: "💼" },
  { id: "comedy", label: "هزار ومقاطعة", emoji: "😂" },
];

const SLANG_SUITE = {
  business: [
    "يا أحمد باشا، مبيعات iFilter امبارح كانت تمام ومتجاوزة الهدف بكتير.",
    "خد بالك، الـ ROAS بتاع Sealy على سناب شات وقع تحت الاتنين، محتاج تبص عليه.",
  ],
  comedy: [
    "يا عم أنت جننتني! هو أنا آلة حاسبة شغال عندك؟ بهزر معاك طبعاً.",
    "استنى بس أخلص كلامي وبعدين قاطعني براحتك، إحنا فينا من كده؟",
  ]
};

export default function VoicePersonalityLabPage() {
  const [activeProvider, setActiveProvider] = useState(TTS_PROVIDERS[0]);
  const [bargeIn, setBargeIn] = useState(true);
  const [endpointing, setEndpointing] = useState(500);
  const [systemPrompt, setSystemPrompt] = useState("أنت بوهو، المساعد الذكي لشركة Bohemian Geeks. تتحدث بلهجة مصرية خفيفة وساخرة أحياناً، لكنك محترف في تحليل البيانات وإدارة المهام.");
  const [activeCategory, setActiveCategory] = useState<keyof typeof SLANG_SUITE>("business");
  const [testSentence, setTestSentence] = useState(SLANG_SUITE["business"][0]);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("تم إنشاء وتحديث voice_agent.json الخاص بـ Boho v2");
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-8" dir="rtl">
      {/* HEADER */}
      <div className="glass-panel rounded-[24px] p-4 flex items-center justify-between">
        <span className="text-[10px] text-gray-400 font-mono">Boho v2 Voice Config</span>
        <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">معمل الصوت والشخصية <FlaskConical className="w-4 h-4 text-blue-500" /></h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-5">
          {/* SYSTEM PROMPT EDITOR */}
          <div className="glass-panel rounded-[24px] p-5 border-t-4 border-t-purple-500">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Persona (boho_system_prompt.txt)</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">هندسة الشخصية <BrainCircuit className="w-4 h-4 text-purple-500" /></h3>
            </div>
            <textarea
              value={systemPrompt}
              onChange={e => setSystemPrompt(e.target.value)}
              rows={4}
              className="w-full bg-white/60 border border-purple-100 rounded-xl px-4 py-3 text-xs font-tajawal text-slate-700 resize-none outline-none focus:border-purple-300 transition-colors text-right shadow-inner leading-relaxed"
            />
          </div>

          {/* TTS PROVIDER SELECTOR */}
          <div className="glass-panel rounded-[24px] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Section 7.3</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">محرك النطق (TTS) <Volume2 className="w-4 h-4 text-blue-500" /></h3>
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
        </div>

        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-5">
          {/* BARGE-IN + ENDPOINTING */}
          <div className="glass-panel rounded-[24px] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">voice_agent.json</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">ديناميكية الحوار <Sliders className="w-4 h-4 text-slate-500" /></h3>
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
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[24px] p-5 flex flex-col">
            <h3 className="text-sm font-bold text-slate-800 font-tajawal mb-4">إنشاء ملف الإعدادات</h3>
            <p className="text-xs text-gray-500 font-tajawal mb-4 leading-relaxed text-right">
              هذه الإعدادات ستُستخدم لإنشاء ملف <code>voice_agent.json</code> المطلوب لمعمارية الـ Hybrid (Architecture C).
            </p>
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              className="mt-auto bg-blue-500 text-white font-tajawal font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              {isSaving ? "جاري الإنشاء..." : "Generate voice_agent.json"}
              {!isSaving && <CheckCircle className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}