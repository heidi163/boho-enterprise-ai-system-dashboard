import { Mail, Calendar, CheckCircle2, Shield, Search, Cloud, RefreshCw, Send, CalendarDays, Key } from "lucide-react";

export default function WorkspaceIntegrationCard() {
  return (
    <div className="flex flex-col gap-6 w-full h-[550px] overflow-y-auto pr-1">
      {/* Top Header Section */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-right dir-rtl shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] bg-blue-100 text-blue-800 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-blue-200">Google Ecosystem</span>
          <h3 className="font-bold text-slate-800 text-lg font-tajawal flex items-center gap-2">
            تمكين نظام الايميل والتقويم
            <Cloud className="w-5 h-5 text-blue-500" />
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-tajawal max-w-2xl">
          يمكّن بوهو من قراءة، تحليل، وتلخيص بريد الوكالة (العملاء، الموردين) بالإضافة لإدارة أوقات الاجتماعات والتنبيه للمهام في الوقت الفعلي عبر Google Calendar و Gmail.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        
        {/* Email System Details */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Mail className="w-4 h-4 text-emerald-500"/> دمج بريد Gmail 
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">الوصول، القراءة، وكتابة المسودات</p>
               </div>
               <div className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-mono border border-emerald-200 flex flex-col items-center justify-center">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Active Sync</span>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-emerald-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Search className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-tajawal font-bold">قراءة وتلخيص الإيميلات</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">الاستعلام المباشر في البريد الوارد (Email Reading) لتلخيص طلبات العملاء وتكوين منظور استراتيجي.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-emerald-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Send className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-tajawal font-bold">كتابة وإرسال مسودات</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">صياغة مسودات الايميلات (Email Drafting) وإجراء مهام (Email Actions) بدقة واحترافية.</p>
              </div>
            </div>
        </div>

        {/* Calendar System Details */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Calendar className="w-4 h-4 text-sky-500"/> تقويم Google Calendar
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">إدارة المواعيد والاجتماعات</p>
               </div>
               <div className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-mono border border-emerald-200 flex flex-col items-center justify-center">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Active Sync</span>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-sky-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <RefreshCw className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-tajawal font-bold">الوصول الآني للتقويم</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">معرفة أوقات الفراغ والمواعيد المجدولة (Calendar Access) لليوم وللأسبوع القادم.</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-sky-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <CalendarDays className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-tajawal font-bold">إدارة المواعيد (Schedule Management)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">اتخاذ خطوات لجدولة اجتماعات الوكالة (Calendar Actions) وإدارتها بسلاسة.</p>
              </div>
            </div>
        </div>

        {/* Security / OAuth notice */}
        <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-[28px] p-5 shadow-sm text-right dir-rtl flex justify-between items-center shrink-0">
           <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50/50 border border-emerald-100 px-3 py-1.5 rounded-full">
              <Shield className="w-4 h-4" />
              <span className="text-[10px] font-tajawal font-bold tracking-tight">بروتوكول أمان OAuth 2.0 مفعل</span>
           </div>
           
           <div className="flex items-center gap-3">
              <div className="text-right">
                 <p className="text-xs font-bold text-slate-700 font-tajawal">Google Workspace OAuth</p>
                 <p className="text-[10px] text-slate-500 font-tajawal mt-0.5">صلاحيات آمنة للوصول لخدمات (Drive, Gmail, Calendar)</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                 <Key className="w-5 h-5 text-slate-600" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
