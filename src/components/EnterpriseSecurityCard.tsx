import { ShieldCheck, Key, Lock, FileText, Clock, FileKey, Eye } from "lucide-react";

export default function EnterpriseSecurityCard() {
  return (
    <div className="flex flex-col gap-6 w-full h-[550px] overflow-y-auto pr-1">
      {/* Top Header Section */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-right dir-rtl shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] bg-slate-800 text-slate-100 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-slate-700">Enterprise Protocol</span>
          <h3 className="font-bold text-slate-800 text-lg font-tajawal flex items-center gap-2">
            أمان المؤسسة (Enterprise Security)
            <ShieldCheck className="w-5 h-5 text-slate-800" />
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-tajawal max-w-2xl">
          أعلى معايير حماية البيانات والتحكم في الوصول لبيئة الوكالة. يتضمن تسجيل الدخول الموحد، المصادقة الثنائية، وسجلات شاملة لحركة البيانات لمنع أي تسريب.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        {/* Authentication & Access */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Lock className="w-4 h-4 text-emerald-500"/> المصادقة وإدارة الوصول
                  </h4>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <Key className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-tajawal font-bold">تسجيل الدخول الموحد (SSO)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">ربط النظام بأنظمة الهوية المعمول بها لتسهيل دخول الموظفين الموثوقين.</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-tajawal font-bold">المصادقة الثنائية (MFA)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">إضافة طبقة أمان ثانية لمنع الوصول غير المصرح به حتى في حال تسريب الكلمات السرية.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-tajawal font-bold">إدارة الجلسات (Session Management)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">مراقبة الجلسات النشطة وإنهائها تلقائياً بعد فترات الخمول للحماية من الاستغلال.</p>
              </div>
            </div>
        </div>

        {/* Audit & Encryption */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Eye className="w-4 h-4 text-amber-500"/> السجلات والتشفير
                  </h4>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-tajawal font-bold">سجلات التدقيق (Audit Logs)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">تسجيل جميع تحركات النظام والتغييرات بدقة لتوفير تقارير محاسبة (Accountability).</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <FileText className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-tajawal font-bold">سجلات الوصول (Access Logs)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">معرفة من قام بالوصول لأي ملف في أي وقت، للحفاظ على الخصوصية.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <FileKey className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-tajawal font-bold">إدارة المفاتيح والتشفير (Secrets Manager)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">مستودع آمن لإدارة مفاتيح API المعقدة ومراقبة حالة التشفير (Encryption Monitoring) لقواعد البيانات.</p>
              </div>
            </div>
        </div>

      </div>
    </div>
  );
}
