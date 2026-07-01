import { Server, Activity, Database, Compass, CheckCircle2, Cloud, Sparkles, Sliders } from "lucide-react";

export default function McpIntegrationsCard() {
  return (
    <div className="flex flex-col gap-6 w-full h-[550px]">
      {/* Top Header Section */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-right dir-rtl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] bg-blue-100 text-blue-800 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse border border-blue-200">Live Connector</span>
          <h3 className="font-bold text-slate-800 text-lg font-tajawal flex items-center gap-2">
            اكتشاف وتكامل أدوات MCP (Model Context Protocol)
            <Server className="w-5 h-5 text-blue-500" />
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-tajawal max-w-2xl">
          نظام بوهو متصل بشكل تفاعلي مع سيرفرات أدوات الوكالة عبر بروتوكول MCP، لتمكين الذكاء الاصطناعي من قراءة، تحليل، وتعديل البيانات في الوقت الفعلي بأمان وسرعة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-y-auto">
        
        {/* Metorik integration details */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Database className="w-4 h-4 text-emerald-500"/> خوادم Metorik (Store Sales Data)
                  </h4>
                  <p className="text-xs text-slate-500 font-tajawal">جلب المبيعات ومؤشرات أداء متاجر Sealy و iFilter</p>
               </div>
               <div className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-mono border border-emerald-200 flex flex-col items-center justify-center">
                  <span className="flex items-center gap-1 block"><CheckCircle2 className="w-3 h-3"/> Connected</span>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-emerald-100/50">
                 <div className="flex justify-between text-xs text-slate-600 font-mono mb-1">
                    <span>read_store_analytics</span>
                    <span className="text-blue-500">MCP Tool</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">تنفيذ مباشر لتحديث مبيعات اليوم والـ AOV وحالة الطلبات.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-emerald-100/50">
                 <div className="flex justify-between text-xs text-slate-600 font-mono mb-1">
                    <span>predict_revenue_trends</span>
                    <span className="text-sky-500">AI Deep Reason</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">تحليل مسار المبيعات بناءً على التاريخ المحفوظ لتوقع نهاية الشهر.</p>
              </div>
            </div>
        </div>

        {/* Windsor AI integration details */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Activity className="w-4 h-4 text-sky-500"/> منصة Windsor AI (Ads Data)
                  </h4>
                  <p className="text-xs text-slate-500 font-tajawal">تحليلات حملات التسويق، الـ ROAS، وبيانات Meta / Google</p>
               </div>
               <div className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-mono border border-emerald-200 flex flex-col items-center justify-center">
                  <span className="flex items-center gap-1 block"><CheckCircle2 className="w-3 h-3"/> Connected</span>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-sky-100/50">
                 <div className="flex justify-between text-xs text-slate-600 font-mono mb-1">
                    <span>fetch_roas_campaigns</span>
                    <span className="text-blue-500">MCP Tool</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">سحب بيانات العائد الاستثماري الحي والمصروفات الإعلانية لحظياً.</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-sky-100/50">
                 <div className="flex justify-between text-xs text-slate-600 font-mono mb-1">
                    <span>anomaly_detection_alerts</span>
                    <span className="text-sky-500">AI Deep Reason</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">المراقبة المستمرة لانخفاض الأداء (ROAS) تحت المعايير.</p>
              </div>
            </div>
        </div>

        {/* Shopify integration details */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Database className="w-4 h-4 text-emerald-500"/> Shopify (Ecommerce Data)
                  </h4>
                  <p className="text-xs text-slate-500 font-tajawal">جلب بيانات المتاجر والمبيعات (Store Analytics)</p>
               </div>
               <div className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-mono border border-emerald-200 flex flex-col items-center justify-center">
                  <span className="flex items-center gap-1 block"><CheckCircle2 className="w-3 h-3"/> Connected</span>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-emerald-100/50">
                 <div className="flex justify-between text-xs text-slate-600 font-mono mb-1">
                    <span>fetch_shopify_orders</span>
                    <span className="text-blue-500">MCP Tool</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">قراءة الطلبات المباشرة والعملاء من متجر Shopify عبر MCP.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-emerald-100/50">
                 <div className="flex justify-between text-xs text-slate-600 font-mono mb-1">
                    <span>multi_step_operations</span>
                    <span className="text-sky-500">Task Execution</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">القيام بعمليات مركبة كالاستعلام عن عدة أنظمة في وقت واحد (Query Multiple Systems).</p>
              </div>
            </div>
        </div>

        {/* WordPress integration details */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Activity className="w-4 h-4 text-blue-500"/> WordPress (Website Analytics)
                  </h4>
                  <p className="text-xs text-slate-500 font-tajawal">الوصول المباشر لبيانات المواقع وتوليد التقارير</p>
               </div>
               <div className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-mono border border-emerald-200 flex flex-col items-center justify-center">
                  <span className="flex items-center gap-1 block"><CheckCircle2 className="w-3 h-3"/> Connected</span>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-blue-100/50">
                 <div className="flex justify-between text-xs text-slate-600 font-mono mb-1">
                    <span>read_wp_analytics</span>
                    <span className="text-blue-500">MCP Tool</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">استعلام عن تفاعل المستخدمين والزوار في مواقع العملاء (Pull Live Numbers).</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-blue-100/50">
                 <div className="flex justify-between text-xs text-slate-600 font-mono mb-1">
                    <span>business_tasks</span>
                    <span className="text-sky-500">Task Execution</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">توليد تقارير الأداء المجمعة وإدارة المهام التنفيذية الحقيقية (Execute Real Tool Actions).</p>
              </div>
            </div>
        </div>

        {/* Dynamic Tool Discovery System */}
        <div className="md:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.2)] text-right dir-rtl relative overflow-hidden">
            
            <div className="absolute -left-20 -top-20 opacity-10">
              <Compass className="w-64 h-64 text-white" />
            </div>

            <div className="relative z-10 flex flex-col">
              <div className="flex justify-between items-end mb-6">
                 <div>
                    <h4 className="font-bold text-white font-tajawal flex items-center gap-2 mb-1.5 text-lg">
                       الاكتشاف التلقائي والأدوات (Dynamic Discovery)
                    </h4>
                    <p className="text-xs text-slate-300 font-tajawal leading-relaxed max-w-md">
                       عند إضافة أي خادم جديد ببروتوكول MCP، يكتشف المحرك مهارات جديدة (Toolsets) ويضيفها لترسانة العقل العميق للذكاء الاصطناعي على الفور للمساعدة في العمليات.
                    </p>
                 </div>
                 <Cloud className="w-8 h-8 text-blue-400 opacity-80" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                 <div className="bg-white/10 rounded-xl border border-white/10 p-3 flex flex-col justify-center items-center gap-2 backdrop-blur-sm">
                    <Sliders className="w-5 h-5 text-amber-400" />
                    <span className="text-[10px] text-white font-mono uppercase tracking-widest text-center leading-tight">Live Tool<br/>Execution</span>
                 </div>
                 <div className="bg-white/10 rounded-xl border border-white/10 p-3 flex flex-col justify-center items-center gap-2 backdrop-blur-sm">
                    <Server className="w-5 h-5 text-emerald-400" />
                    <span className="text-[10px] text-white font-mono uppercase tracking-widest text-center leading-tight">Multiple<br/>Servers</span>
                 </div>
                 <div className="bg-white/10 rounded-xl border border-white/10 p-3 flex flex-col justify-center items-center gap-2 backdrop-blur-sm">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <span className="text-[10px] text-white font-mono uppercase tracking-widest text-center leading-tight">Multi-Tool<br/>Orchestration</span>
                 </div>
                 <div className="bg-white/10 rounded-xl border border-white/10 p-3 flex flex-col justify-center items-center gap-2 backdrop-blur-sm">
                    <Activity className="w-5 h-5 text-sky-400" />
                    <span className="text-[10px] text-white font-mono uppercase tracking-widest text-center leading-tight">Remote Tool<br/>Access</span>
                 </div>
              </div>

            </div>
        </div>

      </div>
    </div>
  );
}
