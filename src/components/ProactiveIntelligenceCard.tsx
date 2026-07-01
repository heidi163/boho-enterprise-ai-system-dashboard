import { BellRing, Zap, TrendingDown, Clock, MessageSquareWarning, ArrowUpRight, CheckCircle2, ShieldAlert, Sunrise } from "lucide-react";

export default function ProactiveIntelligenceCard() {
  return (
    <div className="flex flex-col gap-6 w-full h-[550px] overflow-y-auto pr-1">
      {/* Top Header Section */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-right dir-rtl shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] bg-amber-100 text-amber-800 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-amber-200">Proactive Intelligence</span>
          <h3 className="font-bold text-slate-800 text-lg font-tajawal flex items-center gap-2">
            نظام المبادرة والتنبيهات (Boho Proactive)
            <Zap className="w-5 h-5 text-amber-500" />
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-tajawal max-w-2xl">
          لا ينتظر بوهو الأوامر، بل يعمل كنظام مراقبة ذكي (Smart Monitoring) يوفر ملخصات تنفيذية يومية (Morning Briefings) ويرسل تنبيهات حية فور اكتشاف أي شذوذ في الأداء.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        
        {/* Morning Briefings Details */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Sunrise className="w-4 h-4 text-orange-500"/> صباحية بوهو (Morning Briefing)
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">تقارير الذكاء المجدولة (Scheduled Reports)</p>
               </div>
               <div className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-mono border border-emerald-200 flex flex-col items-center justify-center">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> Every 9:00 AM</span>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-orange-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-orange-400" />
                    <span className="text-xs font-tajawal font-bold">الملخصات التنفيذية (Executive Summaries)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">نظرة عامة على مبيعات الأمس، حالة الإعلانات، وأهم المهام اليومية في رسالة قصيرة صباحية (Automated Briefings).</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-orange-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <ArrowUpRight className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-tajawal font-bold">توصيات مبادرة (Proactive Recommendations)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">اقتراحات تلقائية لتحسين الميزانيات واتخاذ خطوات احترازية بناءً على المراقبة (Business Monitoring).</p>
              </div>
            </div>
        </div>

        {/* Alert System Details */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <ShieldAlert className="w-4 h-4 text-rose-500"/> تنبيهات الأداء (Alert System)
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">المراقبة اللحظية للحملات الإعلانية</p>
               </div>
               <div className="text-[9px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 font-mono border border-rose-200 flex flex-col items-center justify-center">
                  <span className="flex items-center gap-1"><BellRing className="w-3 h-3 animate-pulse"/> Live Alerts</span>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-rose-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <TrendingDown className="w-4 h-4 text-rose-400" />
                    <span className="text-xs font-tajawal font-bold">مراقبة الـ ROAS وضعف الأداء</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">مراقبة مستمرة للحسابات الإعلانية (Ad Account Monitoring). توليد تنبيهات تلقائية (Low Performance Alerts) فور نزول قيمة ROAS عن الحد الطبيعي.</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-rose-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <MessageSquareWarning className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-tajawal font-bold">تنبيهات فورية عبر Telegram</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">توليد تنبيهات الأعمال في الوقت الفعلي (Real-Time Business Alerts) وإرسالها لاشعار الهاتف مباشرة.</p>
              </div>
            </div>
        </div>

      </div>
    </div>
  );
}
