import { Message } from "../types";
import { Database, BrainCircuit, History, HardDrive } from "lucide-react";

interface Props {
  aiLogs: Message[];
}

export default function MemoryLogsCard({ aiLogs }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-[500px]">
      
      {/* LEFT: Conversation Logs */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full">
        <div className="flex items-center justify-between mb-3 border-b border-white/30 pb-2">
          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-mono">Short-term Memory</span>
          <h3 className="font-bold text-slate-800 text-xs font-tajawal text-right flex items-center gap-1.5 justify-end">سجل المحادثات المؤرشفة <History className="w-3.5 h-3.5 text-slate-400" /></h3>
        </div>

        {/* Chat log body */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 py-2 scroll-smooth">
          {aiLogs.map((log, idx) => {
            const isModel = log.role === "model" || log.role === "assistant";
            return (
              <div 
                key={idx} 
                className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed font-sans ${
                  isModel 
                    ? "bg-blue-50/70 border border-blue-100 text-slate-800 text-right self-end dir-rtl font-tajawal shadow-sm" 
                    : "bg-white border border-slate-200 text-slate-700 text-left self-start shadow-sm"
                }`}
              >
                <span className="text-[9px] uppercase font-mono block text-gray-400 mb-1">
                  {isModel ? "Boho Assistant" : "Ahmed Salah (You)"}
                </span>
                <p className="font-medium whitespace-pre-wrap">{log.content}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Memory Core Storage */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col h-full text-right dir-rtl">
        <div className="flex items-center justify-between mb-6 border-b border-white/40 pb-3">
          <span className="text-[10px] bg-sky-100 text-sky-800 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider">Deep Brain Storage</span>
          <h3 className="font-bold text-slate-800 text-base font-tajawal flex items-center gap-2">
            محرك الذاكرة الطويلة
            <HardDrive className="w-4 h-4 text-slate-500" />
          </h3>
        </div>

        <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
          <div className="p-4 rounded-2xl border border-white/80 bg-white/40 shadow-sm flex flex-col gap-2">
            <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2 font-tajawal">
              <BrainCircuit className="w-4 h-4 text-sky-500"/> User Preferences
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-tajawal">
              يفضل أحمد النقاشات المباشرة دون قوائم (No Markdown). يُفضل استلام التحديثات المالية صباحاً وتفعيل التنبيهات إذا قل ROAS عن 2.0. لهجة المحادثة: مصري سريع وعملي.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-white/80 bg-white/40 shadow-sm flex flex-col gap-2">
            <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2 font-tajawal">
              <Database className="w-4 h-4 text-blue-500"/> Project Context (BGK)
            </h4>
            <ul className="text-xs text-slate-600 leading-relaxed font-tajawal list-disc list-inside">
              <li>حملات Sealy: تركيز على سناب شات وجوجل مابس.</li>
              <li>iFilter: متجر مبيعاته اليومية تعتمد على الحملات المستمرة.</li>
              <li>الوكالة بشكل عام (Bohemian Geeks): تهدف للنمو وتتطلب متابعة سريعة مع المطورين وفريق التصميم.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl border border-white/80 bg-white/40 shadow-sm flex flex-col gap-2">
            <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2 font-tajawal">
              <History className="w-4 h-4 text-emerald-500"/> Historical Artifacts
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-tajawal">
              تم إيقاف حملة الرياض الشهر الماضي بسبب ضعف الأداء وتم الاتفاق على عدم تكرار الخصم بنسبة 50%. يعتمد بوهو على هذه المعلومة لتجنب اقتراح نفس الاستراتيجيات.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
