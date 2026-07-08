import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { 
  Activity, BrainCircuit, Server, Plug, CheckCircle, ArrowRight
} from "lucide-react";

export default function MissionControlPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isAsking, setIsAsking] = useState(false);

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
    <div className="flex flex-col gap-5 w-full pb-8" dir="rtl">
      <div className="flex items-center justify-between mb-[-5px]">
        <h2 className="text-xl font-black text-slate-800 font-tajawal flex items-center gap-2">
          مركز القيادة التنفيذي <Activity className="w-5 h-5 text-blue-500" />
        </h2>
        <span className="text-[10px] text-gray-400 font-mono">
          Boho v2 Hybrid Architecture
        </span>
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
              <ArrowRight className="w-4 h-4" />
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
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-indigo-500" />
            <h3 className="text-sm font-bold text-slate-800 font-tajawal">نظرة عامة على النظام (v2)</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="p-3 bg-white rounded-xl border border-gray-100 flex items-start gap-2">
              <Plug className="w-4 h-4 text-emerald-500 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-700">MCP Servers</p>
                <p className="text-[10px] text-gray-500 mt-1 leading-tight">Metorik, Windsor, Shopify, WordPress جاهزة عبر الـ Deep Brain.</p>
              </div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-gray-100 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-700">Architecture C</p>
                <p className="text-[10px] text-gray-500 mt-1 leading-tight">جاهز للربط مع منصات الـ Realtime Voice.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
