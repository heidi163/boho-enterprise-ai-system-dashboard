import { useState } from "react";
import { api } from "../lib/api";
import { ShoppingBag, Search, Send, Activity, ArrowRight, BrainCircuit } from "lucide-react";

export default function SalesIntelligencePage() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("اسألني عن مبيعات Metorik لأي متجر (iFilter: 149659, Sealy: 143214)...");
  const [loading, setLoading] = useState(false);

  const handleAsk = async (customQuery?: string) => {
    const text = customQuery || query;
    if (!text.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const d = await api.post("/task", { request: text });
      setAnswer(d.answer || "عذراً، مافيش إجابة.");
    } catch {
      setAnswer("مشكلة في الاتصال بالباك اند.");
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full" dir="rtl">
      {/* HEADER */}
      <div className="glass-panel rounded-[24px] p-4 flex items-center justify-between">
        <span className="text-[10px] text-gray-400 font-mono">Boho v2 (Live Tool Access)</span>
        <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">ذكاء المبيعات (Live) <ShoppingBag className="w-4 h-4 text-emerald-500" /></h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Boho Query Panel */}
        <div className="glass-panel rounded-[24px] p-6 flex flex-col gap-5 bg-gradient-to-br from-white/60 to-emerald-50/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-emerald-600 uppercase font-bold px-2 py-1 bg-emerald-100 rounded-full">MCP Active</span>
            <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">اسأل بوهو عن المبيعات <Search className="w-4 h-4 text-emerald-500" /></h3>
          </div>
          
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAsk()}
              placeholder="مثال: مبيعات iFilter امبارح كانت كام؟"
              className="w-full bg-white border border-emerald-100 rounded-2xl px-5 py-4 pl-14 text-sm font-tajawal text-slate-800 outline-none shadow-sm focus:border-emerald-400 transition-colors"
            />
            <button 
              onClick={() => handleAsk()}
              disabled={loading || !query.trim()}
              className="absolute left-2 top-2 bottom-2 w-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center hover:bg-emerald-600 disabled:opacity-50 transition-colors"
            >
              {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-end">
            <button onClick={() => handleAsk("هاتلي إجمالي مبيعات iFilter (store 149659) امبارح؟")} className="text-[10px] px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-tajawal hover:bg-emerald-100 border border-emerald-100 transition-colors">مبيعات iFilter امبارح؟</button>
            <button onClick={() => handleAsk("إيه الأخبار في متجر Sealy (store 143214) النهارده؟")} className="text-[10px] px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-tajawal hover:bg-emerald-100 border border-emerald-100 transition-colors">Sealy النهارده؟</button>
          </div>
        </div>

        {/* Boho Answer Display */}
        <div className="glass-panel rounded-[24px] p-6 flex flex-col h-full min-h-[250px]">
          <div className="flex items-center gap-2 mb-4">
            <BrainCircuit className="w-5 h-5 text-emerald-500" />
            <h3 className="text-sm font-bold text-slate-800 font-tajawal">رد بوهو (Deep Brain)</h3>
          </div>
          
          <div className={`flex-1 flex flex-col justify-center p-6 rounded-2xl border ${loading ? 'bg-slate-50 border-slate-100 animate-pulse' : 'bg-emerald-50/50 border-emerald-100'}`}>
            <p className="text-lg text-emerald-900 font-tajawal leading-relaxed text-center">
              {loading ? "جاري استدعاء أدوات MCP (Metorik)..." : answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
