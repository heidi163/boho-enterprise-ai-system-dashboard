import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { 
  Activity, BrainCircuit, Server, Plug, CheckCircle, ArrowRight, TrendingUp, CheckSquare, Megaphone, Loader2
} from "lucide-react";

export default function MissionControlPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isAsking, setIsAsking] = useState(false);

  // Auto-fetch data
  const [briefing, setBriefing] = useState("");
  const [isLoadingBriefing, setIsLoadingBriefing] = useState(true);

  useEffect(() => {
    const fetchBriefing = async () => {
      try {
        const d = await api.post("/task", { 
          request: "أعطني ملخص سريع جداً في 3 نقاط: 1. مبيعات iFilter و Sealy اليوم. 2. أداء الإعلانات (ROAS). 3. المهام المفتوحة. بدون مقدمات." 
        });
        setBriefing(d.answer || "عذراً، لم أتمكن من جلب الملخص.");
      } catch {
        setBriefing("حدث خطأ أثناء جلب البيانات التلقائية.");
      } finally {
        setIsLoadingBriefing(false);
      }
    };
    fetchBriefing();
  }, []);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setIsAsking(true);
    setAnswer("");
    try {
      const d = await api.post("/task", { request: question });
      setAnswer(d.answer || "عذراً، مافيش إجابة من بوهو حالياً.");
    } catch {
      setAnswer("حصل خطأ في الاتصال. راجع الباك اند.");
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-8" dir="rtl">
      <div className="flex items-center justify-between mb-[-5px]">
        <h2 className="text-xl font-black text-slate-800 font-tajawal flex items-center gap-2">
          مركز القيادة التنفيذي <Activity className="w-5 h-5 text-blue-500" />
        </h2>
        <span className="text-[10px] text-gray-400 font-mono">
          Boho v2 Hybrid Architecture
        </span>
      </div>

      {/* Auto-Loaded Briefing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-panel rounded-[24px] p-5 flex flex-col gap-3 relative overflow-hidden group hover:border-emerald-200 transition-colors">
          <div className="absolute top-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-br-full blur-2xl" />
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 font-tajawal">المبيعات (Metorik)</h3>
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center min-h-[60px]">
            {isLoadingBriefing ? (
              <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
            ) : (
              <p className="text-sm font-bold text-emerald-700 font-tajawal text-center leading-relaxed">
                {briefing.split('\\n').find(l => l.includes('مبيع') || l.includes('iFilter') || l.includes('Sealy')) || "بوهو يحلل المبيعات..."}
              </p>
            )}
          </div>
        </div>

        <div className="glass-panel rounded-[24px] p-5 flex flex-col gap-3 relative overflow-hidden group hover:border-rose-200 transition-colors">
          <div className="absolute top-0 left-0 w-24 h-24 bg-rose-500/10 rounded-br-full blur-2xl" />
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 font-tajawal">الإعلانات (Windsor)</h3>
            <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center">
              <Megaphone className="w-4 h-4 text-rose-500" />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center min-h-[60px]">
            {isLoadingBriefing ? (
              <Loader2 className="w-5 h-5 text-rose-400 animate-spin" />
            ) : (
              <p className="text-sm font-bold text-rose-700 font-tajawal text-center leading-relaxed">
                {briefing.split('\\n').find(l => l.includes('إعلان') || l.includes('ROAS') || l.includes('حمل')) || "بوهو يراجع أداء الحملات..."}
              </p>
            )}
          </div>
        </div>

        <div className="glass-panel rounded-[24px] p-5 flex flex-col gap-3 relative overflow-hidden group hover:border-sky-200 transition-colors">
          <div className="absolute top-0 left-0 w-24 h-24 bg-sky-500/10 rounded-br-full blur-2xl" />
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 font-tajawal">المهام (ClickUp)</h3>
            <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center">
              <CheckSquare className="w-4 h-4 text-sky-500" />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center min-h-[60px]">
            {isLoadingBriefing ? (
              <Loader2 className="w-5 h-5 text-sky-400 animate-spin" />
            ) : (
              <p className="text-sm font-bold text-sky-700 font-tajawal text-center leading-relaxed">
                {briefing.split('\\n').find(l => l.includes('مهم') || l.includes('مهام')) || "بوهو يراجع جدولك..."}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Ask Boho Card */}
        <div className="glass-panel rounded-[24px] p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm font-bold text-slate-800 font-tajawal">اسأل بوهو (Live Task)</h3>
          </div>
          <p className="text-xs text-slate-500 font-tajawal">
            تحدث مباشرة مع الـ Deep Brain. سيقوم باستخدام أدوات (MCP) لجلب أرقام حقيقية.
          </p>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="مثال: هاتلي مبيعات iFilter امبارح..."
              className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-tajawal focus:outline-none focus:border-blue-400 transition-colors"
              onKeyDown={e => e.key === "Enter" && handleAsk()}
            />
            <button 
              onClick={handleAsk}
              disabled={isAsking || !question.trim()}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-2 flex items-center justify-center transition-colors disabled:opacity-50"
            >
              {isAsking ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
          {answer && (
            <div className="mt-2 p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <p className="text-sm text-blue-800 font-tajawal leading-relaxed">{answer}</p>
            </div>
          )}
        </div>

        {/* System Overview */}
        <div className="glass-panel rounded-[24px] p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-500" />
              <h3 className="text-sm font-bold text-slate-800 font-tajawal">الملخص الصوتي (AI Briefing)</h3>
            </div>
          </div>
          <div className="flex-1 bg-indigo-50/50 rounded-xl border border-indigo-100 p-4 relative">
             {isLoadingBriefing ? (
               <div className="absolute inset-0 flex items-center justify-center">
                 <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
               </div>
             ) : (
               <p className="text-sm font-bold text-indigo-800 font-tajawal leading-relaxed">
                 {briefing}
               </p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
