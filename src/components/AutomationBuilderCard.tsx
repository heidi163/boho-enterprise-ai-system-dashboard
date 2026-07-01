import { GitCommit, Workflow, MousePointerClick, Zap, Network, BrainCircuit, Play } from "lucide-react";

export default function AutomationBuilderCard() {
  return (
    <div className="flex flex-col gap-6 w-full h-[550px] overflow-y-auto pr-1">
      {/* Top Header Section */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-right dir-rtl shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] bg-sky-100 text-sky-800 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-sky-200">Workflow Engine</span>
          <h3 className="font-bold text-slate-800 text-lg font-tajawal flex items-center gap-2">
            منشئ الأتمتة البصري (Automation Builder)
            <Workflow className="w-5 h-5 text-sky-600" />
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-tajawal max-w-2xl">
          أداة مرئية لتكوين وبناء سير العمل المؤتمت بسهولة، باستخدام الذكاء الاصطناعي وبطريقة السحب والإفلات للعمليات المركبة والمعقدة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        {/* Visual Builder & Logic */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Network className="w-4 h-4 text-emerald-500"/> بناء مسارات العمل
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">واجهة مرئية ومنطق شرطي</p>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-emerald-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <MousePointerClick className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-tajawal font-bold">بناء بصري (Visual Workflow Builder)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">تصميم العمليات عن طريق السحب والإفلات (Drag & Drop Automation) بدون برمجة.</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-emerald-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <GitCommit className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-tajawal font-bold">المنطق الشرطي (Conditional Logic)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">إنشاء تفرعات العمليات وفقاً لشروط محددة (If/Else) لتوجيه مسار الأتمتة بدقة.</p>
              </div>
            </div>
        </div>

        {/* Triggers & AI Automation */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Zap className="w-4 h-4 text-amber-500"/> المثيرات والمدخلات الذكية
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">مراقبة الأحداث وإنشاء الأتمتة</p>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-amber-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Play className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-tajawal font-bold">نظام بدء العمليات (Trigger System)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">مراقبة الأنظمة، وتلقي الـ Webhooks لتفعيل مسارات العمل متعددة الخطوات (Multi-Step).</p>
              </div>

               <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-white">
                 <div className="flex items-center gap-2 mb-1.5">
                    <BrainCircuit className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-tajawal font-bold">إنشاء بالذكاء الاصطناعي (AI Workflow Creation)</span>
                 </div>
                 <p className="text-[10px] text-slate-300 font-tajawal">بناء خطط الأتمتة بشكل كامل وتلقائي بمجرد وصف ما تريده بشكل نصي (Prompt-to-Workflow).</p>
              </div>
            </div>
        </div>

      </div>
    </div>
  );
}
