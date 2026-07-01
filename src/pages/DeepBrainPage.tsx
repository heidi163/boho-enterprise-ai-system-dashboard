import { useState, useEffect, useRef } from "react";
import { api } from "../lib/api";
import { BrainCircuit, Database, Zap, Send, Activity, Info, Coins, DollarSign, MessageSquare, Search, Star, History, Mic, ImagePlus, X, Settings, Link, Trash2, Plus, BellRing } from "lucide-react";

export default function DeepBrainPage() {
  const [messages, setMessages] = useState([{ role: "model", content: "معاك يا ريس. الذاكرة متحدثة. محتاج إيه؟", isStreaming: false }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mcpStatus, setMcpStatus] = useState<string | null>(null);
  
  const [memory, setMemory] = useState<any[]>([]);
  const [memoryLoading, setMemoryLoading] = useState(false);
  const [newFactKey, setNewFactKey] = useState("");
  const [newFactValue, setNewFactValue] = useState("");
  
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
  const costPerMinute = 0.12; 
  const currentVoiceCostUSD = (usedMinutes * costPerMinute).toFixed(2);
  const minutesPercentage = (usedMinutes / MAX_DAILY_MINUTES) * 100;

  const chatRef = useRef<HTMLDivElement>(null);

  const fetchMemory = async () => {
    setMemoryLoading(true);
    try {
      const data = await api.get("/api/memory");
      setMemory(data.facts || []);
    } catch (e) {
      console.error(e);
      // Fallback
      if (memory.length === 0) {
        setMemory([
          { key: "company", value: "Bohemian Geeks" },
          { key: "rule", value: "No discount > 10%" }
        ]);
      }
    }
    setMemoryLoading(false);
  };

  useEffect(() => { fetchMemory(); }, []);
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, mcpStatus]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImagePreview(result);
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

  // Simulate typewriter effect
  const typeMessage = (text: string) => {
    setMessages(prev => [...prev, { role: "model", content: "", isStreaming: true }]);
    let i = 0;
    const speed = 15; // ms per char
    
    const interval = setInterval(() => {
      setMessages(prev => {
        const newMsg = [...prev];
        const lastIdx = newMsg.length - 1;
        if (newMsg[lastIdx].role === "model") {
          newMsg[lastIdx] = { ...newMsg[lastIdx], content: text.substring(0, i + 1) };
        }
        return newMsg;
      });
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setMessages(prev => {
          const newMsg = [...prev];
          const lastIdx = newMsg.length - 1;
          newMsg[lastIdx] = { ...newMsg[lastIdx], isStreaming: false };
          return newMsg;
        });
      }
    }, speed);
  };

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() && !imageBase64) return;
    if (loading) return;
    
    setInput("");
    
    setMessages(prev => [...prev, { role: "user", content: imagePreview ? `[صورة مرفقة]\n${textToSend}` : textToSend, isStreaming: false }]);
    setLoading(true);

    setUsedTokens(prev => Math.min(prev + Math.floor(Math.random() * 500) + 200, MAX_DAILY_TOKENS));
    setUsedMinutes(prev => Math.min(prev + (Math.random() * 0.5 + 0.1), MAX_DAILY_MINUTES));

    // Simulate MCP Tool Call
    if (textToSend.includes("مبيعات") || textToSend.includes("iFilter")) {
      setTimeout(() => setMcpStatus("جاري الاستعلام من Metorik (store_id: 149659)..."), 500);
    } else if (textToSend.includes("إعلان") || textToSend.includes("ROAS") || textToSend.includes("Windsor")) {
      setTimeout(() => setMcpStatus("جاري الاستعلام من Windsor.ai..."), 500);
    } else {
      setTimeout(() => setMcpStatus("يفكر باستخدام Claude..."), 500);
    }

    try {
      const payload: any = { messages: [...messages.map(m => ({ role: m.role, content: m.content })), { role: "user", content: textToSend }] };
      if (imageBase64 && imageMediaType) {
        payload.image_base64 = imageBase64;
        payload.image_media_type = imageMediaType;
      }

      const data = await api.post("/api/chat", payload);
      setMcpStatus(null);
      typeMessage(data.content || "تم المعالجة بنجاح.");
      removeImage(); 
    } catch {
      setMcpStatus(null);
      typeMessage("عذراً، فيه مشكلة في الاتصال بالـ Deep Brain.");
    }
    setLoading(false);
    fetchMemory();
  };

  const handleAddFact = async () => {
    if (!newFactKey.trim() || !newFactValue.trim()) return;
    // Simulate adding fact
    setMemory(prev => [{ key: newFactKey, value: newFactValue }, ...prev]);
    setNewFactKey("");
    setNewFactValue("");
  };

  const handleDeleteFact = (key: string) => {
    setMemory(prev => prev.filter(f => f.key !== key));
  };

  const triggerProactive = async (endpoint: string) => {
    setMcpStatus(`جاري إرسال الطلب لـ ${endpoint}...`);
    try {
      await api.post(`/api${endpoint}`, {});
      setTimeout(() => setMcpStatus(null), 1000);
    } catch {
      setTimeout(() => setMcpStatus(null), 1000);
    }
  };

  const costPer1k = modelTier === "sonnet" ? 0.009 : 0.045;
  const currentCostUSD = ((usedTokens / 1000) * costPer1k).toFixed(3);
  const tokenPercentage = (usedTokens / MAX_DAILY_TOKENS) * 100;
  
  const getMeterColor = () => {
    if (tokenPercentage < 50) return "bg-emerald-500";
    if (tokenPercentage < 80) return "bg-amber-500";
    return "bg-rose-500 animate-pulse";
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full pb-8" dir="rtl">
      
      {/* ARCHITECTURE HEADER */}
      <div className="glass-panel rounded-[20px] p-4 flex flex-wrap gap-4 items-center justify-between border-blue-200/50 bg-gradient-to-r from-blue-50/50 to-transparent">
        <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">
          العقل العميق <BrainCircuit className="w-5 h-5 text-blue-500" />
        </h3>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-sm text-[10px] font-mono text-slate-600 font-bold">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Voice Layer: Active (~320ms)
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-sm text-[10px] font-mono text-slate-600 font-bold">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            Deep Brain: Claude {modelTier === "sonnet" ? "3.5 Sonnet" : "3 Opus"}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-sm text-[10px] font-mono text-slate-600 font-bold">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            MCP: 2/4 Connected
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1 min-h-[600px]">
        
        {/* CHAT HISTORY & QUICK PROMPTS */}
        <div className="xl:col-span-3 flex flex-col gap-5 h-[700px]">
          <div className="glass-panel rounded-[24px] p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">سجل المحادثات <History className="w-4 h-4 text-blue-500" /></h3>
            </div>
            
            <div className="relative mb-5">
              <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
              <input type="text" placeholder="ابحث في السجل..." className="w-full bg-white/60 border border-gray-200 rounded-xl py-2 pr-9 pl-3 text-xs font-tajawal outline-none focus:border-blue-400 transition-colors" />
            </div>

            <div className="flex-1 overflow-y-auto sidebar-scroll pr-1 flex flex-col gap-4">
              
              {/* Quick Prompts */}
              <div>
                <div className="text-[10px] font-bold text-blue-500 mb-2 font-tajawal uppercase tracking-wide">أوامر سريعة</div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => handleSend("إجمالي مبيعات iFilter امبارح كام؟")} className="text-right text-[11px] font-tajawal p-2 rounded-lg bg-blue-50/50 hover:bg-blue-100/50 border border-blue-100 text-blue-700 transition-colors">
                    إجمالي مبيعات iFilter امبارح؟
                  </button>
                  <button onClick={() => handleSend("أخبار إعلانات Windsor إيه؟ أي حملة بتخسر؟")} className="text-right text-[11px] font-tajawal p-2 rounded-lg bg-blue-50/50 hover:bg-blue-100/50 border border-blue-100 text-blue-700 transition-colors">
                    أخبار إعلانات Windsor إيه؟
                  </button>
                  <button onClick={() => handleSend("جهزلي بريفنج بمهام النهارده والمبيعات")} className="text-right text-[11px] font-tajawal p-2 rounded-lg bg-blue-50/50 hover:bg-blue-100/50 border border-blue-100 text-blue-700 transition-colors">
                    جهزلي بريفنج الصبح
                  </button>
                </div>
              </div>

              <hr className="border-gray-100" />

              <div>
                <div className="text-[10px] font-bold text-slate-400 mb-2 font-tajawal">مفضلة (Starred)</div>
                <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-2.5 cursor-pointer hover:bg-amber-50 transition-colors flex items-start gap-2">
                  <Star className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5 fill-amber-500" />
                  <div className="flex-1 min-w-0 text-right">
                    <p className="text-xs font-bold text-slate-700 font-tajawal truncate">تحليل مبيعات رمضان</p>
                    <p className="text-[9px] text-gray-400 font-tajawal mt-1">منذ أسبوع</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-slate-400 mb-2 font-tajawal">آخر 7 أيام</div>
                {[
                  "مراجعة إعلانات Sealy",
                  "صياغة إيميل لشركة O2Nation",
                  "تلخيص اجتماع المبيعات"
                ].map((t, i) => (
                  <div key={i} className="bg-white/50 border border-gray-100 rounded-xl p-2.5 cursor-pointer hover:bg-white hover:shadow-sm transition-all flex items-start gap-2 mb-2">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0 text-right">
                      <p className="text-xs font-bold text-slate-700 font-tajawal truncate">{t}</p>
                      <p className="text-[9px] text-gray-400 font-tajawal mt-1">منذ يومين</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CHAT INTERFACE */}
        <div className="xl:col-span-6 glass-panel rounded-[24px] p-5 flex flex-col h-[700px] relative">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-white bg-blue-500 px-2 py-0.5 rounded-full font-bold">
                {modelTier === "sonnet" ? "Fast Model" : "Deep Model"}
              </span>
              <span className="text-[10px] font-mono text-gray-400">Claude {modelTier === "sonnet" ? "3.5 Sonnet" : "3 Opus"} + MCP Tools</span>
            </div>
            <h4 className="text-xs font-bold text-slate-700 font-tajawal flex items-center gap-2">المحادثة الحية <Zap className="w-3.5 h-3.5 text-amber-500" /></h4>
          </div>
          
          <div ref={chatRef} className="flex-1 overflow-y-auto sidebar-scroll pr-2 flex flex-col gap-5 pb-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm font-tajawal leading-relaxed shadow-sm ${
                  m.role === "user" ? "bg-white/80 text-slate-800 border border-gray-100" : "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                }`}>
                  {m.content}
                  {m.isStreaming && <span className="inline-block w-1.5 h-4 ml-1 bg-white animate-pulse align-middle" />}
                </div>
              </div>
            ))}
            
            {/* Loading & MCP Status Indicators */}
            {loading && (
              <div className="flex justify-end flex-col items-end gap-2">
                {mcpStatus && (
                  <div className="text-[10px] font-mono text-blue-500 flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                    <Settings className="w-3 h-3 animate-spin" />
                    {mcpStatus}
                  </div>
                )}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl px-5 py-3.5 text-white flex gap-1.5 shadow-sm w-fit">
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
                <img src={imagePreview} alt="Upload preview" className="h-20 w-auto rounded-xl border-2 border-blue-200 shadow-sm" />
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
                className="w-full bg-white/60 border border-gray-200 rounded-2xl px-5 py-4 pr-14 pl-14 text-sm font-tajawal text-slate-800 outline-none shadow-sm placeholder-gray-400 focus:bg-white focus:border-blue-400 transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={(!input.trim() && !imageBase64) || loading}
                className="absolute right-2 top-2 bottom-2 w-10 bg-blue-500 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 disabled:opacity-50 transition-colors"
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

        {/* SIDE PANEL (Controls, Servers, Memory) */}
        <div className="xl:col-span-3 flex flex-col gap-5 h-[700px] overflow-y-auto sidebar-scroll pr-1">
          
          {/* TOKEN METER */}
          <div className="glass-panel rounded-[24px] p-5 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Usage & Cost</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">حاسبة التكلفة <Coins className="w-4 h-4 text-amber-500" /></h3>
            </div>
            
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between items-end mb-1.5">
                  <span className="text-xs font-mono font-bold text-slate-700">{usedTokens.toLocaleString()} <span className="text-[9px] text-gray-400">/ {MAX_DAILY_TOKENS.toLocaleString()}</span></span>
                  <span className="text-[10px] text-gray-500 font-tajawal">الاستهلاك اليومي</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-500 ${getMeterColor()}`} style={{ width: `${Math.min(tokenPercentage, 100)}%` }} />
                </div>
                {tokenPercentage >= 80 && <p className="text-[9px] text-rose-500 mt-1 font-bold">تحذير: اقتربت من الحد الأقصى للميزانية</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/50 border border-white/80 rounded-xl p-3 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-500/10 rounded-bl-full flex items-start justify-end p-1.5"><DollarSign className="w-3 h-3 text-emerald-600" /></div>
                  <span className="text-lg font-black font-mono text-slate-800">${currentCostUSD}</span>
                  <span className="text-[9px] text-gray-500 font-tajawal mt-0.5">تكلفة Claude اليوم</span>
                </div>
                
                <div className="bg-white/50 border border-white/80 rounded-xl p-2 flex flex-col gap-1 justify-center">
                  <button onClick={() => setModelTier("sonnet")} className={`text-[10px] font-mono py-1 rounded-lg transition-colors ${modelTier === "sonnet" ? "bg-blue-100 text-blue-700 font-bold" : "text-gray-500 hover:bg-slate-100"}`} title="للسرعة والمحادثة اليومية">Claude Sonnet</button>
                  <button onClick={() => setModelTier("opus")} className={`text-[10px] font-mono py-1 rounded-lg transition-colors ${modelTier === "opus" ? "bg-sky-100 text-sky-700 font-bold" : "text-gray-500 hover:bg-slate-100"}`} title="للتحليل المعقد والعميق">Claude Opus</button>
                </div>
              </div>
            </div>
          </div>

          {/* PROACTIVITY CONTROLS */}
          <div className="glass-panel rounded-[24px] p-5 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">n8n Cron</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">أوامر استباقية <BellRing className="w-4 h-4 text-emerald-500" /></h3>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => triggerProactive("/briefing")} className="text-right flex items-center justify-between p-3 rounded-xl bg-white/50 border border-gray-100 hover:border-emerald-200 transition-colors group">
                <span className="text-[10px] font-mono text-gray-400 group-hover:text-emerald-500">POST /briefing</span>
                <span className="text-xs font-bold text-slate-700 font-tajawal">أرسل بريفنج الصباح</span>
              </button>
              <button onClick={() => triggerProactive("/alert/roas")} className="text-right flex items-center justify-between p-3 rounded-xl bg-white/50 border border-gray-100 hover:border-emerald-200 transition-colors group">
                <span className="text-[10px] font-mono text-gray-400 group-hover:text-emerald-500">POST /alert/roas</span>
                <span className="text-xs font-bold text-slate-700 font-tajawal">Check ROAS</span>
              </button>
            </div>
          </div>

          {/* MCP SERVERS STATUS */}
          <div className="glass-panel rounded-[24px] p-5 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Live Tools</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">خوادم MCP <Link className="w-4 h-4 text-blue-500" /></h3>
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { name: "Metorik MCP", sub: "iFilter, Sealy", status: "online", color: "bg-emerald-500" },
                { name: "Windsor MCP", sub: "Meta, Google", status: "online", color: "bg-emerald-500" },
                { name: "WordPress MCP", sub: "Not Configured", status: "warning", color: "bg-amber-500" },
                { name: "Shopify MCP", sub: "Not Configured", status: "offline", color: "bg-gray-300" },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${s.color} ${s.status === 'online' ? 'animate-pulse' : ''}`} />
                    <span className="text-xs font-mono font-bold text-slate-700">{s.name}</span>
                  </div>
                  <span className="text-[9px] text-gray-400 font-tajawal">{s.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MEMORY */}
          <div className="glass-panel rounded-[24px] p-5 flex flex-col min-h-[250px]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">SQLite</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">حقائق الذاكرة <Database className="w-4 h-4 text-blue-500" /></h3>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <input type="text" value={newFactValue} onChange={(e) => setNewFactValue(e.target.value)} placeholder="القيمة..." className="w-1/2 bg-white/60 border border-gray-200 rounded-lg px-2 py-1 text-[10px] font-mono outline-none" />
              <input type="text" value={newFactKey} onChange={(e) => setNewFactKey(e.target.value)} placeholder="المفتاح..." className="w-1/2 bg-white/60 border border-gray-200 rounded-lg px-2 py-1 text-[10px] font-mono outline-none" />
              <button onClick={handleAddFact} className="p-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><Plus className="w-3 h-3" /></button>
            </div>

            <div className="flex-1 overflow-y-auto sidebar-scroll pr-1 flex flex-col gap-2">
              {memoryLoading ? (
                <div className="flex justify-center py-4"><div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>
              ) : memory.length > 0 ? (
                memory.map((f, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/60 border border-gray-100 rounded-xl px-3 py-2 group">
                    <button onClick={() => handleDeleteFact(f.key)} className="text-gray-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <div className="flex items-center justify-between flex-1 pr-2">
                      <span className="text-[10px] font-mono text-blue-600 font-bold text-left truncate w-[80px]">{f.value}</span>
                      <span className="text-[10px] font-mono text-slate-600 truncate flex-1 text-right mr-3" title={f.key}>{f.key}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 flex flex-col items-center gap-2">
                  <Info className="w-5 h-5 text-slate-300" />
                  <p className="text-[10px] text-gray-400 font-tajawal">الذاكرة فاضية حالياً</p>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
