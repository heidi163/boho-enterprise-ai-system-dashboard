import { Network, Bot, Megaphone, TrendingUp, Briefcase, FileCode2, Users2, ShieldQuestion, HeartHandshake, Zap, ArrowLeftRight } from "lucide-react";

export default function AiAgentsCard() {
  return (
    <div className="flex flex-col gap-6 w-full h-[550px] overflow-y-auto pr-1">
      {/* Top Header Section */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-right dir-rtl shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] bg-blue-100 text-blue-800 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-blue-200">Multi-Agent System</span>
          <h3 className="font-bold text-slate-800 text-lg font-tajawal flex items-center gap-2">
            فريق الوكلاء الذكي (AI Agents)
            <Network className="w-5 h-5 text-blue-500" />
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-tajawal max-w-2xl">
          أوركسترا من الوكلاء الذكاء الاصطناعي (Agent-to-Agent Communication) متعددي التخصصات، يعملون والتواصل مع بعضهم البعض لإدارة العمليات، التسويق، الأبحاث، وتحليل البيانات كفريق عمل واحد.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        
        {/* Communication Example */}
        <div className="md:col-span-2 bg-slate-800 border border-slate-700 rounded-[32px] p-6 shadow-md text-right dir-rtl shrink-0 relative overflow-hidden">
           <div className="absolute opacity-10 left-0 bottom-0">
             <ArrowLeftRight className="w-48 h-48 text-white" />
           </div>
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 justify-between">
              <div className="max-w-lg">
                <h4 className="font-bold text-white font-tajawal flex items-center gap-2 mb-2 text-base">
                  <ArrowLeftRight className="w-5 h-5 text-amber-400" />
                  تواصل الوكلاء (Agent-to-Agent Example)
                </h4>
                <p className="text-[11px] text-slate-300 font-tajawal leading-relaxed">
                  يقوم وكيل التسويق <strong className="text-white bg-slate-700 px-1 rounded">(Marketing Agent)</strong> بالطلب التلقائي للبيانات من وكيل المبيعات <strong className="text-white bg-slate-700 px-1 rounded">(Sales Agent)</strong>، ليقوم بالتحليل وتوليد توصيات تسويقية <strong className="text-amber-300">(Recommendation)</strong> واقتراح ميزانية بناءً على أرقام المبيعات المباشرة.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                 <div className="flexflex-col items-center justify-center p-3 rounded-full bg-blue-500/20 border border-blue-400/30">
                    <Megaphone className="w-6 h-6 text-blue-300 mb-1" />
                 </div>
                 <div className="h-0.5 w-12 bg-gradient-to-l from-blue-400 to-emerald-400 relative">
                    <div className="absolute right-0 -top-1 w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping"></div>
                 </div>
                 <div className="flex flex-col items-center justify-center p-3 rounded-full bg-emerald-500/20 border border-emerald-400/30">
                    <TrendingUp className="w-6 h-6 text-emerald-300 mb-1" />
                 </div>
              </div>
           </div>
        </div>

        {/* Business Agents */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Briefcase className="w-4 h-4 text-blue-500"/> وكلاء الأقسام الأساسية
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">التسويق والمبيعات والإدارة المالية</p>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-2 mt-2">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/50 border border-slate-200">
                 <div className="flex flex-col text-right">
                    <span className="font-bold text-xs text-slate-700 font-tajawal">وكيل التسويق (Marketing)</span>
                    <span className="text-[9px] text-slate-400 font-tajawal">تحليل وإدارة الإعلانات والمحتوى</span>
                 </div>
                 <Megaphone className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/50 border border-slate-200">
                 <div className="flex flex-col text-right">
                    <span className="font-bold text-xs text-slate-700 font-tajawal">وكيل المبيعات (Sales)</span>
                    <span className="text-[9px] text-slate-400 font-tajawal">جلب بيانات המتاجر وإغلاق الصفقات</span>
                 </div>
                 <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/50 border border-slate-200">
                 <div className="flex flex-col text-right">
                    <span className="font-bold text-xs text-slate-700 font-tajawal">الوكيل المالي (Finance)</span>
                    <span className="text-[9px] text-slate-400 font-tajawal">تحليل النفقات والميزانية والعوائد</span>
                 </div>
                 <FileCode2 className="w-4 h-4 text-amber-500" />
              </div>
            </div>
        </div>

        {/* Operational & Support Agents */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Users2 className="w-4 h-4 text-rose-500"/> الوكلاء التشغيليون والمساعدون
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">الموارد البشرية والبحث والدعم الدعم الفني</p>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-2 mt-2">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/50 border border-slate-200">
                 <div className="flex flex-col text-right">
                    <span className="font-bold text-xs text-slate-700 font-tajawal">وكيل العمليات (Operations)</span>
                    <span className="text-[9px] text-slate-400 font-tajawal">إدارة مشاريع ClickUp ومهام الوكالة</span>
                 </div>
                 <Zap className="w-4 h-4 text-sky-500" />
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/50 border border-slate-200">
                 <div className="flex flex-col text-right">
                    <span className="font-bold text-xs text-slate-700 font-tajawal">وكيل الدعم والبحث (Support & Research)</span>
                    <span className="text-[9px] text-slate-400 font-tajawal">البحوث ودعم العملاء المباشر</span>
                 </div>
                 <HeartHandshake className="w-4 h-4 text-pink-500" />
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/50 border border-slate-200">
                 <div className="flex flex-col text-right">
                    <span className="font-bold text-xs text-slate-700 font-tajawal">وكيل الموارد البشرية (HR)</span>
                    <span className="text-[9px] text-slate-400 font-tajawal">تتبع إجازات الموظفين وتقييمهم</span>
                 </div>
                 <Users2 className="w-4 h-4 text-orange-500" />
              </div>
            </div>
        </div>

      </div>
    </div>
  );
}
