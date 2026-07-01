import { Zap, Brain, ArrowDownCircle, Target, FileSearch, Send, ShieldCheck, Cpu } from "lucide-react";

export default function AutonomousModeCard() {
  return (
    <div className="flex flex-col gap-6 w-full h-[550px] overflow-y-auto pr-1">
      {/* Top Header Section */}
      <div className="bg-slate-800 border border-slate-700 rounded-[32px] p-6 shadow-xl text-right dir-rtl shrink-0 relative overflow-hidden">
        <div className="absolute opacity-10 left-0 bottom-0 pointer-events-none">
             <Cpu className="w-64 h-64 text-amber-500" />
        </div>
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] bg-amber-500/20 text-amber-300 font-mono font-bold px-3 py-1 rounded uppercase tracking-wider border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">AI Chief of Staff</span>
            <h3 className="font-bold text-white text-xl font-tajawal flex items-center gap-2 shadow-sm drop-shadow-md">
                الوضع المستقل والتفكير الاستباقي
                <Zap className="w-6 h-6 text-amber-400 drop-shadow-md" />
            </h3>
            </div>
            <p className="text-sm text-slate-300 font-tajawal max-w-2xl leading-relaxed mt-4 drop-shadow-sm">
            النقلة الحقيقية من كونه <strong>مساعد (Assistant)</strong> يتلقى الأوامر، إلى <strong>مدير مكتب للوكالة (AI Chief of Staff)</strong>؛ يلاحظ الخلل بمفرده، يبدأ بالبحث عن الأسباب، ويهيئ الحلول لإقرارك.
            </p>
        </div>
      </div>

      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col h-full text-right dir-rtl shrink-0">
          <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-6 text-base">
            <Brain className="w-5 h-5 text-indigo-500"/> مسار العملية المستقلة (Autonomous Workflow)
          </h4>

          <div className="flex flex-col gap-0 relative">
             {/* Timeline line */}
             <div className="absolute right-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-rose-400 via-amber-400 to-emerald-400 rounded-full opacity-30"></div>
             
             {/* Step 1 */}
             <div className="flex gap-4 relative z-10 mb-4 group">
                <div className="w-12 h-12 shrink-0 rounded-full bg-white border-2 border-rose-100 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                   <ArrowDownCircle className="w-5 h-5 text-rose-500" />
                </div>
                <div className="bg-white/60 border border-slate-100 rounded-2xl p-4 flex-1 shadow-sm">
                   <h5 className="font-bold text-slate-700 text-sm font-tajawal mb-1">١. الملاحظة الذاتية (Observation)</h5>
                   <p className="text-xs text-slate-500 font-tajawal">بوهو يلاحظ بنفسه إن مؤشر <strong className="text-rose-500 bg-rose-50 px-1 rounded">ROAS قد انخفض</strong> بشكل مُفاجئ لأحد المتاجر بدون انتظار أمر من أحد.</p>
                </div>
             </div>

             {/* Step 2 */}
             <div className="flex gap-4 relative z-10 mb-4 group">
                <div className="w-12 h-12 shrink-0 rounded-full bg-white border-2 border-amber-100 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                   <Target className="w-5 h-5 text-amber-500" />
                </div>
                <div className="bg-white/60 border border-slate-100 rounded-2xl p-4 flex-1 shadow-sm">
                   <h5 className="font-bold text-slate-700 text-sm font-tajawal mb-1">٢. التحري والتحليل (Investigation)</h5>
                   <p className="text-xs text-slate-500 font-tajawal">يدخل تلقائياً ليراجع شبكات الإعلانات، يحلل الحملات لمعرفة المتسبب في الانخفاض ويدرس سلوك المشتري.</p>
                </div>
             </div>

             {/* Step 3 */}
             <div className="flex gap-4 relative z-10 mb-4 group">
                <div className="w-12 h-12 shrink-0 rounded-full bg-white border-2 border-blue-100 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                   <FileSearch className="w-5 h-5 text-blue-500" />
                </div>
                <div className="bg-white/60 border border-slate-100 rounded-2xl p-4 flex-1 shadow-sm">
                   <h5 className="font-bold text-slate-700 text-sm font-tajawal mb-1">٣. بناء التقرير (Strategy Formulation)</h5>
                   <p className="text-xs text-slate-500 font-tajawal">يجهز تقرير مبيعات مفصل وموجز في نفس الوقت، ويتضمن التوصيات الفورية المقترحة لإيقاف النزيف والميزانية المطلوبة.</p>
                </div>
             </div>

             {/* Step 4 */}
             <div className="flex gap-4 relative z-10 group">
                <div className="w-12 h-12 shrink-0 rounded-full bg-white border-2 border-emerald-100 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                   <Send className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="bg-white/60 border border-emerald-50/50 rounded-2xl p-4 flex-1 shadow-sm border-l-4 border-l-emerald-400">
                   <h5 className="font-bold text-slate-700 text-sm font-tajawal mb-1">٤. طلب الاعتماد (Prompt for Approval)</h5>
                   <p className="text-xs text-slate-500 font-tajawal">يقوم بإرسال رسالة مباشرة للمدير (مثال: أستاذ أحمد) عبر تليجرام أو الوجهة المفضلة للموافقة بنقرة واحدة (Approve) لتنفيذه فوراً.</p>
                </div>
             </div>

          </div>
      </div>
    </div>
  );
}
