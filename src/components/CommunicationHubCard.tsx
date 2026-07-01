import { MessageSquareShare, MessageCircle, MonitorPlay, Users, Hash, Phone, Cloud } from "lucide-react";

export default function CommunicationHubCard() {
  return (
    <div className="flex flex-col gap-6 w-full h-[550px] overflow-y-auto pr-1">
      {/* Top Header Section */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-right dir-rtl shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] bg-green-100 text-green-800 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-green-200">Unified Comms</span>
          <h3 className="font-bold text-slate-800 text-lg font-tajawal flex items-center gap-2">
            مركز الاتصالات الموحد (Communication Hub)
            <MessageSquareShare className="w-5 h-5 text-green-600" />
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-tajawal max-w-2xl">
          إدارة وتوحيد كافة قنوات التواصل الداخلية ومع العملاء في مكان واحد، لتسهيل وصول الذكاء الاصطناعي لسياق الحوارات وتنسيق الاجتماعات التلقائي.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        {/* Instant Messaging */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <MessageCircle className="w-4 h-4 text-emerald-500"/> المراسلات الفورية المدمجة
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">ربط منصات التواصل للفريق والعملاء</p>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-emerald-100/50 flex items-center justify-between">
                 <div className="flex flex-col text-right">
                    <span className="text-xs font-tajawal font-bold text-slate-700">دعم واتساب (WhatsApp Integration)</span>
                    <span className="text-[10px] text-slate-400 font-tajawal">متابعة رسائل العملاء وأتمتة الردود.</span>
                 </div>
                 <MessageCircle className="w-5 h-5 text-emerald-500" />
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-rose-100/50 flex items-center justify-between">
                 <div className="flex flex-col text-right">
                    <span className="text-xs font-tajawal font-bold text-slate-700">تكامل سلاك (Slack Integration)</span>
                    <span className="text-[10px] text-slate-400 font-tajawal">تحديثات داخلية وتنبيهات فريق الوكالة.</span>
                 </div>
                 <Hash className="w-5 h-5 text-rose-500" />
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-blue-100/50 flex items-center justify-between">
                 <div className="flex flex-col text-right">
                    <span className="text-xs font-tajawal font-bold text-slate-700">مايكروسوفت تيمز (Microsoft Teams)</span>
                    <span className="text-[10px] text-slate-400 font-tajawal">مشاركة الملفات ومناقشة المشاريع الكبرى.</span>
                 </div>
                 <Users className="w-5 h-5 text-blue-500" />
              </div>
            </div>
        </div>

        {/* Video Conferencing */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <MonitorPlay className="w-4 h-4 text-indigo-500"/> إدارة الاجتماعات المرئية
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">جدولة وتلخيص المكالمات تلقائياً</p>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-blue-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Phone className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-tajawal font-bold">زوم للاجتماعات (Zoom Integration)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">إنشاء الروابط تلقائيا، مع تسجيل وتلخيص حديث العملاء لاحقاً.</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-emerald-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Cloud className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-tajawal font-bold">جوجل ميت (Google Meet Integration)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">تنسيق مع تقويم جوجل المدمج لربط الدعوات وتوليد الملخصات الدقيقة.</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
