import { useState, useEffect, useRef } from "react";
import { BrainCircuit, Database, Zap, Send, Activity, Info, Coins, DollarSign, MessageSquare, Search, Star, History, Mic, ImagePlus, X } from "lucide-react";

export default function DeepBrainPage() {
  const [messages, setMessages] = useState([{ role: "model", content: "معاك يا ريس. الذاكرة متحدثة. محتاج إيه؟" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [memory, setMemory] = useState<any[]>([]);
  const [memoryLoading, setMemoryLoading] = useState(false);
  
  // Vision AI State
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMediaType, setImageMediaType] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Token Meter State
  const MAX_DAILY_TOKENS = 50000;
  const [usedTokens, setUsedTokens] = useState(24810);
  const [modelTier, setModelTier] = useState<"sonnet" | "opus">("sonnet");

  // Voice Minutes Meter State
  const MAX_DAILY_MINUTES = 120;
  const [usedMinutes, setUsedMinutes] = useState(14.5);
  const costPerMinute = 0.12; // $0.12/min (Vapi + ElevenLabs avg)
  const currentVoiceCostUSD = (usedMinutes * costPerMinute).toFixed(2);
  const minutesPercentage = (usedMinutes / MAX_DAILY_MINUTES) * 100;

  const chatRef = useRef<HTMLDivElement>(null);

  const fetchMemory = async () => {
    setMemoryLoading(true);
    try {
      const token = localStorage.getItem("boho_token");
      const res = await fetch("http://localhost:8090/api/memory", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const d = await res.json();
        setMemory(d.facts || []);
      }
    } catch (e) {
      console.error(e);
    }
    setMemoryLoading(false);
  };

  useEffect(() => { fetchMemory(); }, []);
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImagePreview(result);
      // Extract base64 and media type
      const [prefix, base64] = result.split(",");
      setImageBase64(base64);
      const mimeMatch = prefix.match(/data:(.*?);/);
      setImageMediaType(mimeMatch ? mimeMatch[1] : "image/jpeg");
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    setImageMediaType(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = async () => {
    if (!input.trim() && !imageBase64) return;
    if (loading) return;
    
    const userMsg = input.trim();
    setInput("");
    
    // Add visually to chat
    setMessages(prev => [...prev, { role: "user", content: imagePreview ? `[صورة مرفقة]\n${userMsg}` : userMsg }]);
    setLoading(true);

    // Simulate Token & Minutes Usage increase
    setUsedTokens(prev => Math.min(prev + Math.floor(Math.random() * 500) + 200, MAX_DAILY_TOKENS));
    setUsedMinutes(prev => Math.min(prev + (Math.random() * 0.5 + 0.1), MAX_DAILY_MINUTES));

    try {
      const payload: any = { messages: [...messages, { role: "user", content: userMsg }] };
      if (imageBase64 && imageMediaType) {
        payload.image_base64 = imageBase64;
        payload.image_media_type = imageMediaType;
      }

      const token = localStorage.getItem("boho_token");
      const res = await fetch("http://localhost:8090/api/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "model", content: data.content }]);
      removeImage(); // clear image after sending
    } catch {
      setMessages(prev => [...prev, { role: "model", content: "عذراً، فيه مشكلة في الاتصال بالـ Deep Brain." }]);
    }
    setLoading(false);
    fetchMemory();
  };

  // Cost Calculation
  // Sonnet 3.5: $3 / 1M input, $15 / 1M output (Avg $9/1M)
  // Opus 3: $15 / 1M input, $75 / 1M output (Avg $45/1M)
  const costPer1k = modelTier === "sonnet" ? 0.009 : 0.045;
  const currentCostUSD = ((usedTokens / 1000) * costPer1k).toFixed(3);
  const tokenPercentage = (usedTokens / MAX_DAILY_TOKENS) * 100;
  
  const getMeterColor = () => {
    if (tokenPercentage < 50) return "bg-emerald-500";
    if (tokenPercentage < 80) return "bg-amber-500";
    return "bg-rose-500 animate-pulse";
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full" dir="rtl">
      
      {/* HEADER */}
      <div className="glass-panel rounded-[24px] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-mono text-indigo-700 font-bold">
            <Activity className="w-3 h-3 text-indigo-500" /> MCP متصل
          </div>
          <button onClick={fetchMemory} className="text-[10px] text-gray-500 hover:text-indigo-600 font-tajawal transition-colors">تحديث الذاكرة</button>
        </div>
        <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">العقل العميق + الذاكرة <BrainCircuit className="w-4 h-4 text-indigo-500" /></h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-[500px]">
        
        {/* CHAT HISTORY SIDEBAR */}
        <div className="lg:col-span-3 flex flex-col gap-5 h-[600px]">
          <div className="glass-panel rounded-[24px] p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">سجل المحادثات <History className="w-4 h-4 text-indigo-500" /></h3>
            </div>
            
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
              <input type="text" placeholder="ابحث في السجل..." className="w-full bg-white/60 border border-gray-200 rounded-xl py-2 pr-9 pl-3 text-xs font-tajawal outline-none focus:border-indigo-400" />
            </div>

            <div className="flex-1 overflow-y-auto sidebar-scroll pr-1 flex flex-col gap-2">
              <div className="text-[10px] font-bold text-slate-400 mb-1 font-tajawal">مفضلة (Starred)</div>
              <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-2.5 cursor-pointer hover:bg-amber-50 transition-colors flex items-start gap-2">
                <Star className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5 fill-amber-500" />
                <div className="flex-1 min-w-0 text-right">
                  <p className="text-xs font-bold text-slate-700 font-tajawal truncate">تحليل مبيعات رمضان</p>
                  <p className="text-[9px] text-gray-400 font-tajawal mt-1">منذ أسبوع</p>
                </div>
              </div>

              <div className="text-[10px] font-bold text-slate-400 mb-1 mt-3 font-tajawal">آخر 7 أيام</div>
              {[
                "مراجعة إعلانات Windsor",
                "صياغة إيميل لشركة O2Nation",
                "تلخيص اجتماع المبيعات"
              ].map((t, i) => (
                <div key={i} className="bg-white/50 border border-gray-100 rounded-xl p-2.5 cursor-pointer hover:bg-white hover:shadow-sm transition-all flex items-start gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0 text-right">
                    <p className="text-xs font-bold text-slate-700 font-tajawal truncate">{t}</p>
                    <p className="text-[9px] text-gray-400 font-tajawal mt-1">منذ يومين</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CHAT INTERFACE */}
        <div className="lg:col-span-6 glass-panel rounded-[24px] p-5 flex flex-col h-[600px]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/50">
            <span className="text-[10px] font-mono text-gray-400">Claude 3.5 Sonnet + أدوات MCP</span>
            <h4 className="text-xs font-bold text-slate-700 font-tajawal flex items-center gap-2">محادثة حية <Zap className="w-3.5 h-3.5 text-amber-500" /></h4>
          </div>
          
          <div ref={chatRef} className="flex-1 overflow-y-auto sidebar-scroll pr-2 flex flex-col gap-4 pb-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm font-tajawal leading-relaxed shadow-sm ${
                  m.role === "user" ? "bg-white/80 text-slate-800 border border-white" : "bg-gradient-to-br from-indigo-500 to-blue-600 text-white"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-end">
                <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl px-5 py-3.5 text-white flex gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          <div className="relative mt-2 flex flex-col gap-2">
            {imagePreview && (
              <div className="relative inline-block self-end">
                <img src={imagePreview} alt="Upload preview" className="h-20 w-auto rounded-xl border-2 border-indigo-200 shadow-sm" />
                <button onClick={removeImage} className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 hover:bg-rose-600 shadow-md">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="اسأل بوهو أو ارفع صورة للتحليل..."
                className="w-full bg-white/60 border border-white/80 rounded-2xl px-5 py-4 pr-14 pl-14 text-sm font-tajawal text-slate-800 outline-none shadow-sm placeholder-gray-400 focus:bg-white transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={(!input.trim() && !imageBase64) || loading}
                className="absolute right-2 top-2 bottom-2 w-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center hover:bg-indigo-600 disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute left-2 top-2 bottom-2 w-10 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors"
                title="إرفاق صورة"
              >
                <ImagePlus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* SIDE PANEL (Memory + Token Meter) */}
        <div className="lg:col-span-3 flex flex-col gap-5 h-[600px]">
          
          {/* TOKEN METER */}
          <div className="glass-panel rounded-[24px] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">حاسبة التكلفة</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">استهلاك Tokens <Coins className="w-4 h-4 text-amber-500" /></h3>
            </div>
            
            <div className="flex flex-col gap-4">
              {/* Token Bar */}
              <div>
                <div className="flex justify-between items-end mb-1.5">
                  <span className="text-xs font-mono font-bold text-slate-700">{usedTokens.toLocaleString()} <span className="text-[9px] text-gray-400">/ {MAX_DAILY_TOKENS.toLocaleString()}</span></span>
                  <span className="text-[10px] text-gray-500 font-tajawal">الاستهلاك اليومي</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-500 ${getMeterColor()}`} style={{ width: `${Math.min(tokenPercentage, 100)}%` }} />
                </div>
              </div>

              {/* Cost & Tier */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/50 border border-white/80 rounded-xl p-3 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-500/10 rounded-bl-full flex items-start justify-end p-1.5"><DollarSign className="w-3 h-3 text-emerald-600" /></div>
                  <span className="text-lg font-black font-mono text-slate-800">${currentCostUSD}</span>
                  <span className="text-[9px] text-gray-500 font-tajawal mt-0.5">تكلفة اليوم تقريباً</span>
                </div>
                
                <div className="bg-white/50 border border-white/80 rounded-xl p-2 flex flex-col gap-1 justify-center">
                  <button onClick={() => setModelTier("sonnet")} className={`text-[10px] font-mono py-1 rounded-lg transition-colors ${modelTier === "sonnet" ? "bg-indigo-100 text-indigo-700 font-bold" : "text-gray-500 hover:bg-slate-100"}`}>Claude Sonnet</button>
                  <button onClick={() => setModelTier("opus")} className={`text-[10px] font-mono py-1 rounded-lg transition-colors ${modelTier === "opus" ? "bg-violet-100 text-violet-700 font-bold" : "text-gray-500 hover:bg-slate-100"}`}>Claude Opus</button>
                </div>
              </div>

              {/* Voice Minutes Tracker */}
              <div className="mt-2 pt-4 border-t border-white/50">
                <div className="flex justify-between items-end mb-1.5">
                  <span className="text-xs font-mono font-bold text-slate-700">{usedMinutes.toFixed(1)} <span className="text-[9px] text-gray-400">/ {MAX_DAILY_MINUTES}</span></span>
                  <span className="text-[10px] text-gray-500 font-tajawal flex items-center gap-1">دقائق الصوت <Mic className="w-3 h-3 text-indigo-400" /></span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-2">
                  <div className={`h-full transition-all duration-500 ${minutesPercentage > 80 ? "bg-rose-500" : "bg-indigo-500"}`} style={{ width: `${Math.min(minutesPercentage, 100)}%` }} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-gray-400 font-mono">ElevenLabs + Realtime</span>
                  <span className="text-[10px] font-bold font-mono text-slate-700">${currentVoiceCostUSD}</span>
                </div>
              </div>
            </div>
          </div>

          {/* MEMORY */}
          <div className="glass-panel rounded-[24px] p-5 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">SQLite</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">حقائق الذاكرة <Database className="w-4 h-4 text-indigo-500" /></h3>
            </div>
            
            <div className="flex-1 overflow-y-auto sidebar-scroll pr-1 flex flex-col gap-2">
              {memoryLoading ? (
                <div className="flex justify-center py-8"><div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
              ) : memory.length > 0 ? (
                memory.map((f, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/60 border border-white/80 rounded-xl px-3 py-2.5">
                    <span className="text-[10px] font-mono text-indigo-600 font-bold shrink-0 text-left w-[40px] truncate">{f.value}</span>
                    <span className="text-[10px] font-mono text-slate-600 truncate flex-1 text-right mr-3" title={f.key}>{f.key}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 flex flex-col items-center gap-2">
                  <Info className="w-6 h-6 text-slate-300" />
                  <p className="text-xs text-gray-400 font-tajawal">الذاكرة فاضية حالياً</p>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
