import { Compass, Clock, MapPin, CalendarClock, Building2, PersonStanding } from "lucide-react";

export default function ContextAwarenessCard() {
  return (
    <div className="flex flex-col gap-6 w-full h-[550px] overflow-y-auto pr-1">
      {/* Top Header Section */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-right dir-rtl shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] bg-sky-100 text-sky-800 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-sky-200">Environmental Context</span>
          <h3 className="font-bold text-slate-800 text-lg font-tajawal flex items-center gap-2">
            الوعي السياقي (Context Awareness)
            <Compass className="w-5 h-5 text-sky-600" />
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-tajawal max-w-2xl">
          إدراك بوهو التام للمتغيرات المحيطة به، مما يجرد الحوار من الجمود ويجعله يتفاعل وكأنه جالس معك في مكتبك يعرف الوقت، المكان، ومن حولك.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        {/* Physical & Temporal Context */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Clock className="w-4 h-4 text-emerald-500"/> الوعي الزماني والمكاني
                  </h4>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-emerald-100/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-tajawal font-bold">الوعي بالوقت (Time Awareness)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">التأكيد بصيغة الصباح أو المساء، وإدراك المواعيد القريبة للتنبيه عليها بشكل عفوي.</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-blue-100/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-tajawal font-bold">الوعي بالمكان (Location Awareness)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">إدراك التوقيت المحلي لمدينة العميل قبل إرسال الرسائل وبناء جدول زمني للاتصالات.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-amber-100/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <CalendarClock className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-tajawal font-bold">ساعات العمل (Workday Awareness)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">تخصيص ردود تختلف خارج أو أثناء الدوام، وعدم إرسال التنبيهات غير الطارئة وقت الراحة.</p>
              </div>
            </div>
        </div>

        {/* Relational & Social Context */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Building2 className="w-4 h-4 text-blue-500"/> الوعي المؤسسي والاجتماعي
                  </h4>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <Building2 className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-tajawal font-bold">سياق الشركة (Company Context)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">استيعاب توجه وطريقة تعامل O2Nation أو BGK واستخدام لغتهم وأسلوبهم الفريد.</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <PersonStanding className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-tajawal font-bold">سياق العميل (Client Context)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">إدراك موقف العميل الحالي (سعيد، غاضب، متسرع) وضبط درجة الحوار بشكل مثالي.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <Compass className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-tajawal font-bold">وعي الاجتماعات (Meeting Awareness)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">معرفة من هم الأطراف الحاضرين حالياً وما هو الهدف الأساسي من المكالمة.</p>
              </div>
            </div>
        </div>

      </div>
    </div>
  );
}
