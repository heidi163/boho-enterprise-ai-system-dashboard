import { Database, FileText, Search, Library, FileSearch, Network, AlignLeft } from "lucide-react";

export default function KnowledgeManagementCard() {
  return (
    <div className="flex flex-col gap-6 w-full h-[550px] overflow-y-auto pr-1">
      {/* Top Header Section */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-right dir-rtl shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] bg-sky-100 text-sky-800 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-sky-200">Company Intelligence</span>
          <h3 className="font-bold text-slate-800 text-lg font-tajawal flex items-center gap-2">
            إدارة المعرفة (Knowledge Management)
            <Database className="w-5 h-5 text-sky-600" />
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-tajawal max-w-2xl">
          أرشفة مستندات الوكالة وتحويلها لبيانات حية يمكن لبوهو الاستعلام منها باستخدام البحث الدلالي للإجابة على استفسارات الموظفين والعملاء بلمح البصر.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        {/* Document Management */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Library className="w-4 h-4 text-blue-500"/> تنظيم الوثائق والأدلة
                  </h4>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-blue-100/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <AlignLeft className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-tajawal font-bold">أدلة التشغيل (SOP Management)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">مكتبة للإجراءات القياسية (SOPs) ترشد الموظفين الجدد لتنفيذ مهامهم بدقة.</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <FileText className="w-4 h-4 text-slate-600" />
                    <span className="text-xs font-tajawal font-bold">ويكي الشركة (Company Wiki)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">مركز معرفي يضم ثقافة الوكالة وقيمها وكل ما يخص السياسات الداخلية.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-emerald-100/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <Database className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-tajawal font-bold">قواعد بيانات العملاء (Client Knowledge Bases)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">أرشفة ملفات الماركات وأدلة الهوية البصرية (Brand Guidelines) لكل عميل.</p>
              </div>
            </div>
        </div>

        {/* AI Search & Retrieval */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Search className="w-4 h-4 text-rose-500"/> محرك البحث الذكي للوكالة
                  </h4>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-rose-100/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <Search className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-tajawal font-bold">بحث RAG المتقدم (RAG Search)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">استرجاع الإجابات من الملفات المودعة بشكل مباشر عبر المحادثات اليومية مع بوهو.</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-amber-100/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <FileSearch className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-tajawal font-bold">البحث في العقود (Contract Search)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">إيجاد بنود محددة في عقود الإعلانات أو الاتفاقيات بسرعة فائقة.</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-white flex flex-col">
                 <div className="flex items-center gap-2 mb-1">
                    <Network className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-tajawal font-bold">الرسم البياني المعرفي (Knowledge Graph)</span>
                 </div>
                 <p className="text-[10px] text-slate-300 font-tajawal">ربط المفاهيم والمستندات بطريقة هيكلية تساعد الوكالة على رؤية العلاقات المعقدة بين المشاريع.</p>
              </div>
            </div>
        </div>

      </div>
    </div>
  );
}
