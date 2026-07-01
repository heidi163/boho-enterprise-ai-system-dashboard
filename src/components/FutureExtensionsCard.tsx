import { Rocket, Compass, CheckCircle2, Sliders, Database, Link2, Key, Ear, Radio, CloudRain } from "lucide-react";

export default function FutureExtensionsCard() {
  return (
    <div className="flex flex-col gap-6 w-full h-[550px] overflow-y-auto pr-1">
      {/* Top Header Section */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-right dir-rtl shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] bg-slate-800 text-slate-100 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-slate-700">Roadmap</span>
          <h3 className="font-bold text-slate-800 text-lg font-tajawal flex items-center gap-2">
            خارطة الطريق والتوسعات المستقبلية
            <Rocket className="w-5 h-5 text-slate-800" />
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-tajawal max-w-2xl">
          التطورات التقنية والمهام القادمة المجدولة للدمج في نظام بوهو لزيادة الفاعلية واتساع دائرة التأثير في وكالة إعلانات O2Nation و BGK.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        {/* Workspace & Integrations Extensions */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Link2 className="w-4 h-4 text-emerald-500"/> الارتباطات وأدوات العمل
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">التكامل المتقدم مع الأنظمة السحابية</p>
               </div>
               <div className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono border border-slate-200 flex flex-col items-center justify-center">
                  <span className="flex items-center gap-1"><CloudRain className="w-3 h-3"/> Planning</span>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-tajawal font-bold">دعم مهام ClickUp المتقدم (ClickUp Integration)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">أتمتة صناعة التذاكر وتحديث المهام تلقائيًا.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Key className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-tajawal font-bold">توسع تسجيل الدخول (Google OAuth Expansion)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">إضافة صلاحيات Drive ومستندات Google وغيرها.</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Database className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-tajawal font-bold">خوادم إضافية (Additional MCP Servers)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">اكتشاف ودمج أنظمة خارجية أخرى للوكالة.</p>
              </div>
            </div>
        </div>

        {/* Action Executions & Voice Tuning Extensions */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Ear className="w-4 h-4 text-rose-500"/> التطوير الصوتي والتنفيذي
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">ترقيات الأداء والوظائف</p>
               </div>
               <div className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono border border-slate-200 flex flex-col items-center justify-center">
                  <span className="flex items-center gap-1"><Sliders className="w-3 h-3"/> Active R&D</span>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-rose-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Radio className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-tajawal font-bold">نظام توليد صوت مستقبلي (Better Egyptian TTS)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">تحسين مرونة ونطق اللهجة المصرية بطلاقة أكبر، ودعم الضبط المتقدم (Advanced Voice Tuning).</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-rose-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Compass className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-tajawal font-bold">مهام الإيميل والتقويم (Email & Calendar Actions)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">السماح لبوهو بإرسال الإيميلات الفعلي وجدولة المواعيد بمفرده دون تدخل بشري.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-rose-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Rocket className="w-4 h-4 text-violet-500" />
                    <span className="text-xs font-tajawal font-bold">تطوير المحادثة المباشرة (Enhanced Realtime Voice)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">استجابة فائقة السرعة مع قدرة أكبر على تفسير المعاني المعقدة من خلال الصوت.</p>
              </div>
            </div>
        </div>

      </div>
    </div>
  );
}
