import { BrainCircuit, Lock, Network, Zap, Settings2, BarChart3, Database, KeySquare, MonitorPlay, TrendingDown } from "lucide-react";

export default function DeepBrainArchitectureCard() {
  return (
    <div className="flex flex-col gap-6 w-full h-[550px] overflow-y-auto pr-1">
      {/* Top Header Section */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-right dir-rtl shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] bg-indigo-100 text-indigo-800 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-indigo-200">Hybrid AI Architecture</span>
          <h3 className="font-bold text-slate-800 text-lg font-tajawal flex items-center gap-2">
            عقل النظام المتقدم (Deep Brain Task Server)
            <BrainCircuit className="w-5 h-5 text-indigo-500" />
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-tajawal max-w-2xl">
          خادم المهام المهجن لتنفيذ عمليات معقدة (Tool Execution Endpoint) عبر بروتوكول اتصال محمي (Shared Secret Security)، ويربط المحادثات السريعة (Fast Conversation) بالتفكير العميق.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        
        {/* Task Server & Security Details */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Network className="w-4 h-4 text-emerald-500"/> خادم المهام (Task Server)
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">استقبال المهام والمصادقة الأمنية</p>
               </div>
               <div className="text-[9px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-100 font-mono border border-slate-700 flex flex-col items-center justify-center">
                  <span className="flex items-center gap-1"><Lock className="w-3 h-3"/> HTTP Auth</span>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-emerald-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Settings2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-tajawal font-bold">معالجة المهام (HTTP Task Processing)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">نقطة اتصال لتنفيذ الأدوات (Tool Execution Endpoint) عن بُعد.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-emerald-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <KeySquare className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-tajawal font-bold">مصادقة آمنة (Request Authentication)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">تأمين الاتصال بمفتاح موحد (Shared Secret Security) لمنع التدخلات.</p>
              </div>
            </div>
        </div>

        {/* Realtime Agent & Deep Escalation */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Zap className="w-4 h-4 text-orange-500"/> المحرك اللحظي (Realtime Agent)
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">تكامل الردود السريعة مع التفكير العميق</p>
               </div>
               <div className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-mono border border-emerald-200 flex flex-col items-center justify-center">
                  <span className="flex items-center gap-1"><BrainCircuit className="w-3 h-3"/> Active</span>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-orange-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <MonitorPlay className="w-4 h-4 text-orange-400" />
                    <span className="text-xs font-tajawal font-bold">تحليل لغوي لحظي (Realtime LLM Processing)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">توفير ردود صوتية فورية (Realtime Voice Responses) في وضع المحادثة السريعة (Fast Conversation Mode).</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-orange-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Database className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-tajawal font-bold">تصعيد للذكاء العميق (Deep Brain Escalation)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">تحويل المهام المعقدة لتنفيذ مبني على الأدوات (Tool-Based Task Execution) دون تعطيل الحديث السريع.</p>
              </div>
            </div>
        </div>

        {/* Analytics & Performance Details */}
        <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-[28px] p-6 shadow-sm text-right dir-rtl shrink-0 relative overflow-hidden">
           
           <div className="absolute -left-10 -bottom-10 opacity-[0.03]">
             <BarChart3 className="w-64 h-64 text-blue-900" />
           </div>

           <div className="relative z-10">
              <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-4 text-base">
                 <BarChart3 className="w-5 h-5 text-blue-500" />
                 استرجاع بيانات الأداء والتحليلات (Analytics & Performance)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-start gap-3">
                    <div className="bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                       <BarChart3 className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                       <h5 className="font-bold text-xs text-slate-700 font-tajawal mb-1">المبيعات والأعمال</h5>
                       <p className="text-[10px] text-slate-500 font-tajawal leading-relaxed">استرجاع مقاييس الأداء (Business Metrics Retrieval) ومراقبة أداء المتاجر (Store Performance Monitoring).</p>
                    </div>
                 </div>

                 <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-start gap-3">
                    <div className="bg-amber-50 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                       <TrendingDown className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                       <h5 className="font-bold text-xs text-slate-700 font-tajawal mb-1">تحليل الإعلانات التسويقية</h5>
                       <p className="text-[10px] text-slate-500 font-tajawal leading-relaxed">مراقبة الأداء التسويقي (Marketing Analytics)، وتحليل المبيعات والعائد (ROAS Analysis) للإعلانات المباشرة.</p>
                    </div>
                 </div>

                 <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-start gap-3">
                    <div className="bg-emerald-50 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                       <Database className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                       <h5 className="font-bold text-xs text-slate-700 font-tajawal mb-1">تحليلات المواقع</h5>
                       <p className="text-[10px] text-slate-500 font-tajawal leading-relaxed">جمع بيانات نشاط المواقع المباشرة (Website Analytics) وإعداد تقارير رقمية للمبيعات والمعدلات.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
