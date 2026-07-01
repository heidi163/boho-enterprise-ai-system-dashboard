import { Smartphone, BellRing, Settings, Lock, LayoutDashboard, Zap } from "lucide-react";

export default function MobileCompanionCard() {
  return (
    <div className="flex flex-col gap-6 w-full h-[550px] overflow-y-auto pr-1">
      {/* Top Header Section */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-right dir-rtl shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-emerald-200">Native Apps</span>
          <h3 className="font-bold text-slate-800 text-lg font-tajawal flex items-center gap-2">
            مرافق الموبايل (Mobile Companion)
            <Smartphone className="w-5 h-5 text-emerald-600" />
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-tajawal max-w-2xl">
          تطبيقات مخصصة للهواتف الذكية تضع مساعد بوهو التفاعلي في جيبك بشكل متواصل للحصول على التحديثات والنصائح الفورية عبر النظام.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        {/* Core Apps & Notification */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Smartphone className="w-4 h-4 text-emerald-500"/> التطبيقات والتنبيهات
                  </h4>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-white flex flex-col">
                 <div className="flex items-center gap-2 mb-1">
                    <Smartphone className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-tajawal font-bold">تطبيق الآيفون (iOS App)</span>
                 </div>
                 <p className="text-[10px] text-slate-300 font-tajawal">إصدار مخصص ونظيف يعمل بانسيابية عالية لأجهزة أبل والعمل الإداري السريع.</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-emerald-100/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <Smartphone className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-tajawal font-bold">تطبيق الأندرويد (Android App)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">دعم كامل لمنظومة هواتف أندرويد ليتسنى لكل موظفي الوكالة المتابعة الميدانية.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-rose-100/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <BellRing className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-tajawal font-bold">الإشعارات الحية (Push Notifications)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">استقبال تقارير هبوط العوائد وأخبار الحملات مباشرة كإشعار في شاشة هاتفك.</p>
              </div>
            </div>
        </div>

        {/* OS Integration */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Settings className="w-4 h-4 text-blue-500"/> تكامل أنظمة الهاتف
                  </h4>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-blue-100/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <LayoutDashboard className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-tajawal font-bold">ودجات الواجهة (Voice Widget)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">أدوات رئيسية مصغرة يمكن إضافتها للصفحة الرئيسية لبدء المحادثة أو رؤية مؤشر المبيعات اللحظي.</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-amber-100/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <Lock className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-tajawal font-bold">مساعد القفل (Lock Screen Assistant)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">القدرة على النداء والمحادثة مع بوهو لتسجيل الدخول السريع حتى والشاشة مقفلة (وفق الصلاحيات).</p>
              </div>
            </div>
        </div>

      </div>
    </div>
  );
}
