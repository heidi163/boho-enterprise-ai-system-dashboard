import { Activity, ShieldAlert, Monitor, ServerCrash, TrendingDown, AlertCircle, Network } from "lucide-react";

export default function EnterpriseMonitoringCard() {
  return (
    <div className="flex flex-col gap-6 w-full h-[550px] overflow-y-auto pr-1">
      {/* Top Header Section */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-right dir-rtl shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] bg-rose-100 text-rose-800 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-rose-200">Global Monitoring</span>
          <h3 className="font-bold text-slate-800 text-lg font-tajawal flex items-center gap-2">
            مراقبة أعمال المؤسسة (Enterprise Monitoring)
            <Activity className="w-5 h-5 text-rose-600" />
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-tajawal max-w-2xl">
          نظام متقدم لمراقبة استقرار المواقع والأخطاء التقنية، بالإضافة إلى التتبع الحي للمبيعات لاكتشاف أي شذوذ أو انخفاض سريع في العوائد المادية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        {/* Technical Monitoring */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Network className="w-4 h-4 text-emerald-500"/> المراقبة التقنية
                  </h4>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-emerald-100/50 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Monitor className="w-4 h-4 text-emerald-600" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-tajawal font-bold text-slate-700">مراقبة حالة المواقع (Website Uptime)</span>
                    <span className="text-[10px] text-slate-400 font-tajawal">التأكد الدائم من عمل المتاجر ومواقع العملاء.</span>
                 </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-blue-100/50 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-blue-600" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-tajawal font-bold text-slate-700">مراقبة الشبكات (API Monitoring)</span>
                    <span className="text-[10px] text-slate-400 font-tajawal">تتبع كفاءة اتصال الأدوات والروابط البرمجية للوكالة.</span>
                 </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-rose-100/50 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                    <ServerCrash className="w-4 h-4 text-rose-600" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-tajawal font-bold text-slate-700">متابعة الأخطاء (Error Monitoring)</span>
                    <span className="text-[10px] text-slate-400 font-tajawal">اكتشاف وتسجيل الأعطال والتجارب السيئة للمستخدم بمتجره.</span>
                 </div>
              </div>
            </div>
        </div>

        {/* Business Monitoring */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <TrendingDown className="w-4 h-4 text-amber-500"/> مراقبة الأعمال والأموال
                  </h4>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-amber-100/50 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-tajawal font-bold text-slate-700">اكتشاف الشذوذ (Sales Anomaly Detection)</span>
                    <span className="text-[10px] text-slate-400 font-tajawal">مراقبة التغيرات المفاجئة وغير المألوفة في أرقام المبيعات.</span>
                 </div>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-rose-100/50 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-tajawal font-bold text-slate-700">هبوط العوائد (Revenue Drop Detection)</span>
                    <span className="text-[10px] text-slate-400 font-tajawal">تفعيل تنبيهات لحظية عند هبوط المبيعات المستهدفة للمتجر.</span>
                 </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-orange-100/50 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <TrendingDown className="w-4 h-4 text-orange-600" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-tajawal font-bold text-slate-700">هبوط معدلات التحويل (Conversion Drop)</span>
                    <span className="text-[10px] text-slate-400 font-tajawal">مراقبة مسار العميل داخل المتاجر والتعرف على الانسحاب السريع.</span>
                 </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
