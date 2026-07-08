import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { Server, GitBranch, Activity, CheckCircle, AlertCircle, Clock, DollarSign, Cpu, Database, Globe, Lock, Layers, PlayCircle, TerminalSquare, Mic } from "lucide-react";

type PhaseStatus = "done" | "in_progress" | "planned" | "deploying" | "error";

const INITIAL_PHASES = [
  { phase: 1, title: "الربط الأساسي (Deep Brain)", desc: "العقل العميق + الذاكرة + السيرفر الأساسي + خوادم MCP", effort: "نصف يوم", status: "done" as PhaseStatus },
  { phase: 2, title: "التشغيل المحلي (Arch A)", desc: "التعرف على الصوت (يا بوهو) + الترجمة النصية", effort: "يوم واحد", status: "done" as PhaseStatus },
  { phase: 3, title: "الصوت الهجين (Arch C)", desc: "ربط واجهة الصوت مع Claude", effort: "يومين", status: "in_progress" as PhaseStatus },
  { phase: 4, title: "المركز الاستباقي", desc: "سيرفر التنبيهات + n8n + تيليجرام", effort: "يوم واحد", status: "planned" as PhaseStatus },
  { phase: 5, title: "الأمان واللمسات الأخيرة", desc: "تسجيل الدخول + ضبط المقاطعة الصوتية + التراخيص", effort: "مستمر", status: "planned" as PhaseStatus },
];

const SECURITY_CHECKS = [
  { label: "مفتاح X-Boho-Secret مفعّل على /task", status: true },
  { label: "مفاتيح الـ API في ملف .env فقط", status: true },
  { label: "استخدام HTTPS لخوادم MCP", status: false, note: "بعض السيرفرات لسه HTTP" },
  { label: "ملف .env محمي من الـ Git", status: true },
  { label: "الـ Tokens غير مكتوبة مباشرة بالكود", status: true },
];

export default function SystemHealthPage({ activeCompany }: { activeCompany: string }) {
  const mcpServers = activeCompany === "bgk" ? [
    { name: "Metorik", url: "https://app.metorik.com/mcp", status: "online", latency: "142ms" },
    { name: "Windsor.ai", url: "https://mcp.windsor.ai/sse", status: "online", latency: "218ms" },
    { name: "Shopify", url: "https://mcp.yourdomain.com/shopify/sse", status: "online", latency: "196ms" },
    { name: "WordPress", url: "http://mcp.yourdomain.com/wordpress/sse", status: "warning", latency: "timeout" },
  ] : [
    { name: "AWS Cloud", url: "https://mcp.aws.com/sse", status: "online", latency: "85ms" },
    { name: "HubSpot", url: "https://mcp.hubspot.com/sse", status: "online", latency: "120ms" },
    { name: "Windsor.ai", url: "https://mcp.windsor.ai/sse", status: "online", latency: "220ms" },
    { name: "Jira", url: "http://mcp.jira.com/sse", status: "warning", latency: "timeout" },
  ];

  const [health, setHealth] = useState<any>(null);
  const [uptime, setUptime] = useState(0);
  const [phases, setPhases] = useState(INITIAL_PHASES);

  useEffect(() => {
    api.get(`/api/health?company_id=${activeCompany}`, false).then(setHealth).catch(() => {});
    const start = Date.now();
    const id = setInterval(() => setUptime(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => clearInterval(id);
  }, [activeCompany]);

  const getStatusIcon = (status: PhaseStatus) => {
    if (status === "done") return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    if (status === "in_progress") return <Clock className="w-4 h-4 text-amber-500" />;
    if (status === "deploying") return <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />;
    if (status === "error") return <AlertCircle className="w-4 h-4 text-rose-500" />;
    return <div className="w-4 h-4 rounded-full border-2 border-slate-300" />;
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-8" dir="rtl">

      {/* HEADER */}
      <div className="glass-panel rounded-[24px] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold border ${health ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-500 border-slate-200"}`}>
            <div className={`w-2 h-2 rounded-full ${health ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
            حالة السيرفر: {health ? "متصل" : "جارٍ التحقق..."}
          </div>
          <span className="text-[10px] font-mono text-gray-400" dir="ltr">Uptime: {uptime}s</span>
        </div>
        <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">صحة النظام والمعمارية <Server className="w-4 h-4 text-blue-500" /></h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* PROGRESS (Right Side in RTL) */}
        <div className="flex flex-col gap-5">
          <div className="glass-panel rounded-[24px] p-5 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4 flex-row-reverse">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Roadmap</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2 text-right w-full justify-end">خريطة تطوير النظام <Layers className="w-4 h-4 text-blue-500" /></h3>
            </div>
            
            <div className="flex flex-col gap-3">
              {phases.map(p => (
                <div key={p.phase} className={`rounded-2xl px-4 py-3 border flex items-center justify-between transition-all relative overflow-hidden group flex-row-reverse ${
                  p.status === "done" ? "bg-emerald-50/50 border-emerald-200" :
                  p.status === "in_progress" ? "bg-blue-50/50 border-blue-200" :
                  "bg-slate-50 border-slate-200 opacity-80"
                }`}>
                  {/* Status Indicator Bar */}
                  <div className={`absolute top-0 right-0 bottom-0 w-1 ${
                    p.status === "done" ? "bg-emerald-500" :
                    p.status === "in_progress" ? "bg-blue-500" :
                    "bg-slate-300"
                  }`} />

                  <div className="flex flex-col text-right pl-2 w-full">
                    <p className="text-sm font-bold text-slate-800 font-tajawal">مرحلة {p.phase}: {p.title}</p>
                    <p className="text-[10px] text-gray-500 font-tajawal mt-0.5">{p.desc}</p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-[10px] font-tajawal font-bold text-gray-400 bg-white/50 px-2 py-0.5 rounded">{p.effort}</span>
                    
                    {/* Status Badge */}
                    <div className={`flex items-center justify-end gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm w-[90px] ${
                        p.status === "done" ? "bg-emerald-100 text-emerald-700" :
                        p.status === "in_progress" ? "bg-blue-100 text-blue-700" :
                        "bg-white border border-slate-300 text-slate-500"
                      }`}
                    >
                      {p.status === "done" ? "مكتمل" : p.status === "in_progress" ? "جاري العمل" : "مخطط"}
                      {getStatusIcon(p.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* HEALTH & DIAGRAM (Left Side in RTL) */}
        <div className="flex flex-col gap-5">
          
          {/* SECURITY & MCP */}
          <div className="glass-panel rounded-[24px] p-5">
            <div className="flex items-center justify-between mb-4 flex-row-reverse">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Config</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2 w-full justify-end">الروابط والأمان <Lock className="w-4 h-4 text-blue-500" /></h3>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white/40 rounded-xl p-3 border border-white/60">
                <p className="text-[10px] font-mono text-slate-500 mb-2 border-b border-slate-200 pb-1 text-right w-full block">حالة خوادم MCP</p>
                <div className="flex flex-col gap-2 text-right">
                  {mcpServers.map(s => (
                    <div key={s.name} className="flex items-center justify-between bg-white/60 p-2 rounded-lg border border-white flex-row-reverse">
                      <div className="flex flex-col text-right pr-1">
                        <span className="text-[11px] font-bold text-slate-800 font-sans">{s.name}</span>
                        <span className="text-[8px] font-mono text-gray-400 truncate max-w-[150px] block" dir="ltr">{s.url}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col items-start gap-0.5">
                          <div className="flex items-center gap-1 flex-row-reverse">
                            <span className="text-[8px] font-mono text-gray-400" dir="ltr">{s.latency}</span>
                            <div className={`w-1.5 h-1.5 rounded-full ${s.status === "online" ? "bg-emerald-500" : "bg-rose-500"}`} />
                          </div>
                          {s.status === "online" ? (
                            <button className="text-[9px] font-tajawal text-rose-500 hover:bg-rose-50 px-1.5 py-0.5 rounded transition-colors">إلغاء الربط</button>
                          ) : (
                            <button className="text-[9px] font-tajawal text-blue-600 font-bold bg-blue-50 hover:bg-blue-100 px-1.5 py-0.5 rounded transition-colors">تفعيل الاتصال</button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/40 rounded-xl p-3 border border-white/60">
                <p className="text-[10px] font-mono text-slate-500 mb-2 border-b border-slate-200 pb-1 text-right w-full block">اختبارات الأمان</p>
                <div className="flex flex-col gap-1.5 text-right">
                  {SECURITY_CHECKS.map((s, i) => (
                    <div key={i} className="flex items-center justify-between flex-row-reverse">
                      <div className="text-right">
                        <p className="text-[10px] font-tajawal text-slate-700 font-bold">{s.label}</p>
                        {s.note && <p className="text-[8px] text-rose-500 font-tajawal">{s.note}</p>}
                      </div>
                      {s.status ? <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" /> : <AlertCircle className="w-3 h-3 text-rose-500 shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* MINI DIAGRAM */}
          <div className="glass-panel rounded-[24px] p-5">
            <div className="flex items-center justify-between mb-3 flex-row-reverse">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Arch C</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2 w-full justify-end">الهيكل الحالي <GitBranch className="w-4 h-4 text-slate-500" /></h3>
            </div>
            <div className="bg-gradient-to-bl from-blue-50 to-white border border-blue-100 rounded-xl p-4 flex flex-col items-center gap-1 font-mono text-[9px]">
              <div className="bg-slate-800 text-white rounded px-3 py-1 flex items-center gap-1 flex-row-reverse"><Mic className="w-3 h-3" /> User Audio</div>
              <div className="w-0.5 h-3 bg-slate-300" />
              <div className="bg-blue-500 text-white rounded px-4 py-1.5 flex items-center gap-1 flex-row-reverse"><Cpu className="w-3 h-3" /> Realtime Voice Layer</div>
              <div className="w-0.5 h-3 bg-slate-300" />
              <div className="bg-sky-600 text-white rounded px-5 py-2 flex items-center gap-1 font-bold shadow-sm flex-row-reverse"><Database className="w-3 h-3" /> Deep Brain (Claude)</div>
              <div className="w-0.5 h-3 bg-slate-300" />
              <div className="bg-slate-200 text-slate-700 rounded px-2 py-1 flex items-center gap-1 flex-row-reverse"><Globe className="w-3 h-3" /> {mcpServers.length} MCP Servers</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
