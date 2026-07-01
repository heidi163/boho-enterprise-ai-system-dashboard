import { Brain, Search, Clock, Users, Handshake, MicVocal, FileCheck2, Edit3, Star, Workflow, BrainCircuit } from "lucide-react";

export default function AdvancedMemoryCard() {
  return (
    <div className="flex flex-col gap-6 w-full h-[550px] overflow-y-auto pr-1">
      {/* Top Header Section */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-right dir-rtl shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] bg-purple-100 text-purple-800 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-purple-200">Advanced Memory</span>
          <h3 className="font-bold text-slate-800 text-lg font-tajawal flex items-center gap-2">
            الذاكرة المتقدمة والسياق المعرفي
            <Brain className="w-5 h-5 text-purple-500" />
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-tajawal max-w-2xl">
          نظام ذاكرة متقدم يعتمد على البحث الدلالي ليتمكن بوهو من تذكر الأشخاص، العلاقات، وقرارات الاجتماعات السابقة مع تقييم أهمية الذاكرة وتعديلها بمرونة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        {/* Memory Search & Timeline */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <BrainCircuit className="w-4 h-4 text-emerald-500"/> محرك أرشفة الذاكرة
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">البحث الدلالي والخط الزمني</p>
               </div>
               <div className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-mono border border-emerald-200 flex flex-col items-center justify-center">
                  <span className="flex items-center gap-1"><Search className="w-3 h-3"/> Semantic OS</span>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Search className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-tajawal font-bold">البحث الدلالي (Semantic Memory Search)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">استرجاع المعلومات بالمعنى والسياق بدلاً من الكلمات المفتاحية فقط.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-tajawal font-bold">الجدول الزمني (Memory Timeline)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">تتبع تطور المحادثات والأفكار عبر الزمن لفهم سياق المشاريع بشكل كامل.</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Edit3 className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-tajawal font-bold">القدرة على التعديل وأولوية التذكر</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">إمكانية التعديل (Memory Editing) مع إعطاء تصنيف أهمية (Memory Importance Scoring) لكل جزء.</p>
              </div>
            </div>
        </div>

        {/* Relational Memory */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Handshake className="w-4 h-4 text-rose-500"/> ذاكرة العلاقات والأشخاص
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">تذكر العملاء والموارد البشرية</p>
               </div>
               <div className="text-[9px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 font-mono border border-rose-200 flex flex-col items-center justify-center">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3"/> Social Graph</span>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Users className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-tajawal font-bold">ذاكرة الأشخاص والعملاء</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">الاحتفاظ ببيانات العملاء وتفضيلاتهم وتفاصيل التواصل (People & Client Relationship Memory).</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <MicVocal className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-tajawal font-bold">سجلات الاجتماعات (Meeting Memory)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">استخلاص النقاط الأساسية من الاجتماعات والاحتفاظ بها للعودة إليها مستقبلاً.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <FileCheck2 className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-tajawal font-bold">تتبع القرارات (Decision Tracking)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">تتبع ما تم الاتفاق عليه وأسباب اتخاذ القرارات التاريخية داخل الوكالة.</p>
              </div>
            </div>
        </div>

      </div>
    </div>
  );
}
