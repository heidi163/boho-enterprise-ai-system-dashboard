import { Users, UserCircle, Briefcase, Lock, SearchIcon, LineChart } from "lucide-react";

export default function TeamManagementCard() {
  return (
    <div className="flex flex-col gap-6 w-full h-[550px] overflow-y-auto pr-1">
      {/* Top Header Section */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-right dir-rtl shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] bg-blue-100 text-blue-800 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-blue-200">Workspace Admins</span>
          <h3 className="font-bold text-slate-800 text-lg font-tajawal flex items-center gap-2">
            إدارة الفريق والموظفين (Team Management)
            <Users className="w-5 h-5 text-blue-600" />
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-tajawal max-w-2xl">
          إدارة أفراد الفريق، توزيع الأدوار والصلاحيات، متابعة دقيقة لمؤشرات أداء الموظفين وتقسيم ساحات العمل لضمان الخصوصية داخل الوكالة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        {/* Roles & Permissions */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Lock className="w-4 h-4 text-emerald-500"/> الحسابات والصلاحيات
                  </h4>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-emerald-100/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <UserCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-tajawal font-bold">الحسابات (Multi User Accounts)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">دعم إضافة مستخدمين متعددين لمساحة عمل مشتركة واحدة.</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-blue-100/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <Briefcase className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-tajawal font-bold">الأدوار (Roles & Permissions)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">تحديد صلاحيات دقيقة حسب الرتبة (مشرف مدير، كاتب محتوى، مسوق).</p>
              </div>
            </div>
        </div>

        {/* Structure & Performance */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Users className="w-4 h-4 text-blue-500"/> الهيكلة ومتابعة الأداء
                  </h4>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-blue-100/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <SearchIcon className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-tajawal font-bold">الأقسام (Teams & Department Views)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">تصنيف الفرق داخلياً في مساحات مرئية منفصلة بحسب المهام وتخصص القسم (تسويق، تصميم، دعم).</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-rose-100/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <LineChart className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-tajawal font-bold">مسار الأداء (Employee Performance)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">تتبع إجازات ومهام الموظفين، وتقييم مؤشرات أداء كل فرد، لتقديم تقارير دقيقة للإدارة.</p>
              </div>
            </div>
        </div>

      </div>
    </div>
  );
}
