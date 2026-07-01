import { LineChart, Users, HeartPulse, Target, Bot, GitBranch, ShieldCheck } from "lucide-react";

export default function CrmIntelligenceCard() {
  return (
    <div className="flex flex-col gap-6 w-full h-[550px] overflow-y-auto pr-1">
      {/* Top Header Section */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-right dir-rtl shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] bg-rose-100 text-rose-800 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-rose-200">AI CRM</span>
          <h3 className="font-bold text-slate-800 text-lg font-tajawal flex items-center gap-2">
            ذكاء إدارة العملاء (CRM Intelligence)
            <ShieldCheck className="w-5 h-5 text-rose-500" />
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-tajawal max-w-2xl">
          نظام ذكي متكامل لتتبع العلاقات مع العملاء، تقييم صحة المشاريع، وتحليل فرص النمو واقتراح خطوات المتابعة البيعية بصورة آلية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        {/* Lead & Opportunity Tracking */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Target className="w-4 h-4 text-emerald-500"/> إدارة وتتبع المبيعات
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">من العميل المحتمل حتى الإغلاق</p>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Users className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-tajawal font-bold">إدارة العملاء الجدد (Lead Management)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">جلب وتحليل جودة العملاء المحتملين وتصنيفهم تلقائياً.</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <LineChart className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-tajawal font-bold">تتبع الفرص (Opportunity Tracking)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">مراقبة مسار الصفقات الحالية وتحليل احتمالات النجاح والقيمة المتوقعة.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <GitBranch className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-tajawal font-bold">الخطوات التحويلية (Pipeline Tracking)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">متابعة دقيقة لكل مرحلة يمر بها العميل لضمان عدم تسرب الفرص البيعية.</p>
              </div>
            </div>
        </div>

        {/* AI Client Health & Assist */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Bot className="w-4 h-4 text-rose-500"/> الذكاء والمؤشرات للعملاء
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">الوقاية من خسارة العملاء وتعزيز الولاء</p>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <HeartPulse className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-tajawal font-bold">مؤشر صحة العميل (Client Health Score)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">قياس رضا العميل بناءً على التواصل الأخير والأداء التسويقي لسرعة التدخل.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-tajawal font-bold">شريك المتابعة (Follow-Up Suggestions)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">اقتراحات استباقية بالوقت الأمثل والمحتوى المناسب لمعاودة الاتصال بالعميل.</p>
              </div>

               <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-white">
                 <div className="flex items-center gap-2 mb-1.5">
                    <Bot className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-tajawal font-bold">مساعد البيع الذكي (AI CRM Assistant)</span>
                 </div>
                 <p className="text-[10px] text-slate-300 font-tajawal">وكيل مخصص للبحث في قاعدة البيانات، تلخيص المكالمات القديمة، وصياغة الردود التجارية.</p>
              </div>
            </div>
        </div>

      </div>
    </div>
  );
}
