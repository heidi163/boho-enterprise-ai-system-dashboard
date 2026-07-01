import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { Server, GitBranch, Activity, CheckCircle, AlertCircle, Clock, DollarSign, Cpu, Database, Globe, Lock, Layers, PlayCircle, TerminalSquare, Mic } from "lucide-react";

type PhaseStatus = "done" | "in_progress" | "planned" | "deploying" | "error";

const INITIAL_PHASES = [
  { phase: 1, title: "Deep Brain Only", desc: "brain.py + memory.py + task_server.py + MCP", effort: "0.5 يوم", status: "done" as PhaseStatus },
  { phase: 2, title: "Architecture A - Local", desc: "local/* + Wake Word يا بوهو", effort: "1-2 يوم", status: "done" as PhaseStatus },
  { phase: 3, title: "Hybrid Voice (Arch C)", desc: "voice_agent.json + Claude LLM", effort: "1-2 يوم", status: "in_progress" as PhaseStatus },
  { phase: 4, title: "Proactivity Center", desc: "proactive_server.py + n8n + Telegram", effort: "1 يوم", status: "planned" as PhaseStatus },
  { phase: 5, title: "Polish & Security", desc: "Google OAuth + Barge-in tuning + Auth", effort: "مستمر", status: "planned" as PhaseStatus },
];

const MCP_SERVERS = [
  { name: "Metorik", url: "https://app.metorik.com/mcp", status: "online", latency: "142ms" },
  { name: "Windsor.ai", url: "https://mcp.windsor.ai/sse", status: "online", latency: "218ms" },
  { name: "WordPress", url: "https://mcp.yourdomain.com/wordpress/sse", status: "warning", latency: "timeout" },
  { name: "Shopify", url: "https://mcp.yourdomain.com/shopify/sse", status: "online", latency: "196ms" },
];

const SECURITY_CHECKS = [
  { label: "X-Boho-Secret مفعّل على /task", status: true },
  { label: "API Keys في .env فقط (مش في Git)", status: true },
  { label: "HTTPS على MCP Servers", status: false, note: "WordPress MCP لسه HTTP" },
  { label: ".env في .gitignore", status: true },
  { label: "MCP Tokens مش hard-coded", status: true },
];

export default function SystemHealthPage() {
  const [health, setHealth] = useState<any>(null);
  const [uptime, setUptime] = useState(0);
  const [phases, setPhases] = useState(INITIAL_PHASES);
  const [deployLogs, setDeployLogs] = useState<string[]>(["[SYSTEM] جاهز لأوامر النشر..."]);

  useEffect(() => {
    api.get("/api/health", false).then(setHealth).catch(() => {});
    const start = Date.now();
    const id = setInterval(() => setUptime(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const addLog = (msg: string) => setDeployLogs(prev => [...prev.slice(-4), msg]);

  const handleDeploy = (phaseId: number) => {
    // Prevent multiple deploys at once
    if (phases.some(p => p.status === "deploying")) return;

    setPhases(prev => prev.map(p => p.phase === phaseId ? { ...p, status: "deploying" } : p));
    addLog(`[مرحلة ${phaseId}] بدء تسلسل النشر...`);

    // Simulate Deployment Process
    setTimeout(() => addLog(`[مرحلة ${phaseId}] فحص الاعتماديات... تم`), 800);
    setTimeout(() => addLog(`[مرحلة ${phaseId}] التحقق من متغيرات البيئة... تم`), 1600);
    setTimeout(() => {
      // Simulate success for some, error for others to show dynamic UI
      const success = Math.random() > 0.2; 
      if (success) {
        addLog(`[مرحلة ${phaseId}] ✅ تم النشر بنجاح. تحديث الحالة.`);
        setPhases(prev => prev.map(p => p.phase === phaseId ? { ...p, status: "done" } : p));
      } else {
        addLog(`[مرحلة ${phaseId}] ❌ خطأ: انتهت مهلة الاتصال على المنفذ 8080.`);
        setPhases(prev => prev.map(p => p.phase === phaseId ? { ...p, status: "error" } : p));
      }
    }, 3000);
  };

  const getStatusIcon = (status: PhaseStatus) => {
    if (status === "done") return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    if (status === "in_progress") return <Clock className="w-4 h-4 text-amber-500" />;
    if (status === "deploying") return <div className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />;
    if (status === "error") return <AlertCircle className="w-4 h-4 text-rose-500" />;
    return <div className="w-4 h-4 rounded-full border-2 border-slate-300" />;
  };

  return (
    <div className="flex flex-col gap-6 w-full" dir="rtl">

      {/* HEADER */}
      <div className="glass-panel rounded-[24px] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold border ${health ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-500 border-slate-200"}`}>
            <div className={`w-2 h-2 rounded-full ${health ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`} />
            السيرفر: {health ? "متصل" : "جارٍ التحقق..."}
          </div>
          <span className="text-[10px] font-mono text-gray-400">وقت التشغيل: {uptime} ثانية</span>
        </div>
        <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">صحة النظام والمعمارية <Server className="w-4 h-4 text-indigo-500" /></h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* ONE-CLICK DEPLOY (Left Side) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="glass-panel rounded-[24px] p-5 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Section 13</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">مركز النشر (One-Click Deploy) <Layers className="w-4 h-4 text-indigo-500" /></h3>
            </div>
            
            <div className="flex flex-col gap-3">
              {phases.map(p => (
                <div key={p.phase} className={`rounded-2xl px-4 py-3 border flex items-center justify-between transition-all relative overflow-hidden group ${
                  p.status === "done" ? "bg-emerald-50/50 border-emerald-200" :
                  p.status === "in_progress" ? "bg-blue-50/50 border-blue-200" :
                  p.status === "deploying" ? "bg-indigo-50 border-indigo-300 ring-2 ring-indigo-500/20" :
                  p.status === "error" ? "bg-rose-50 border-rose-300 ring-1 ring-rose-500/50" :
                  "bg-slate-50 border-slate-200 opacity-80 hover:opacity-100"
                }`}>
                  {/* Status Indicator Bar */}
                  <div className={`absolute top-0 right-0 bottom-0 w-1 ${
                    p.status === "done" ? "bg-emerald-500" :
                    p.status === "in_progress" ? "bg-blue-500" :
                    p.status === "deploying" ? "bg-indigo-500" :
                    p.status === "error" ? "bg-rose-500" :
                    "bg-slate-300"
                  }`} />

                  <div className="flex flex-col text-right pr-2">
                    <p className="text-sm font-bold text-slate-800 font-mono">مرحلة {p.phase}: {p.title}</p>
                    <p className="text-[10px] text-gray-500 font-tajawal mt-0.5">{p.desc}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono text-gray-400 bg-white/50 px-2 py-0.5 rounded">{p.effort}</span>
                    
                    {/* Action Button */}
                    <button 
                      onClick={() => handleDeploy(p.phase)}
                      disabled={p.status === "deploying" || p.status === "done"}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                        p.status === "done" ? "bg-emerald-100 text-emerald-700 cursor-default opacity-60" :
                        p.status === "deploying" ? "bg-indigo-500 text-white" :
                        p.status === "error" ? "bg-rose-500 text-white hover:bg-rose-600" :
                        "bg-white border border-slate-300 text-slate-700 hover:border-indigo-500 hover:text-indigo-600"
                      }`}
                    >
                      {getStatusIcon(p.status)}
                      {p.status === "done" ? "تم التوثيق" : 
                       p.status === "deploying" ? "جارٍ النشر..." : 
                       p.status === "error" ? "إعادة المحاولة" : "انشر"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal Output */}
            <div className="mt-4 bg-slate-900 rounded-xl p-3 border border-slate-700 font-mono text-[9px] text-emerald-400 flex flex-col gap-1 min-h-[90px] shadow-inner relative overflow-hidden">
              <div className="absolute top-1 right-2"><TerminalSquare className="w-3 h-3 text-slate-600" /></div>
              {deployLogs.map((log, i) => (
                <div key={i} className={log.includes("Error") || log.includes("❌") ? "text-rose-400" : log.includes("✅") ? "text-emerald-300" : ""}>
                  {log}
                </div>
              ))}
              <div className="animate-pulse w-1.5 h-3 bg-emerald-400 mt-1" />
            </div>

          </div>
        </div>

        {/* HEALTH & DIAGRAM (Right Side) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          
          {/* SECURITY & MCP */}
          <div className="glass-panel rounded-[24px] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Config</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">الروابط والأمان <Lock className="w-4 h-4 text-indigo-500" /></h3>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white/40 rounded-xl p-3 border border-white/60">
                <p className="text-[10px] font-mono text-slate-500 mb-2 border-b border-slate-200 pb-1">MCP Status</p>
                <div className="flex flex-col gap-2">
                  {MCP_SERVERS.map(s => (
                    <div key={s.name} className="flex items-center justify-between bg-white/60 p-2 rounded-lg border border-white">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-slate-800 font-sans">{s.name}</span>
                        <span className="text-[8px] font-mono text-gray-400 truncate max-w-[120px]">{s.url}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col items-end gap-0.5">
                          <div className="flex items-center gap-1">
                            <span className="text-[8px] font-mono text-gray-400">{s.latency}</span>
                            <div className={`w-1.5 h-1.5 rounded-full ${s.status === "online" ? "bg-emerald-500" : "bg-rose-500"}`} />
                          </div>
                          {s.status === "online" ? (
                            <button className="text-[9px] font-tajawal text-rose-500 hover:bg-rose-50 px-1.5 py-0.5 rounded transition-colors">إلغاء الربط</button>
                          ) : (
                            <button className="text-[9px] font-tajawal text-indigo-600 font-bold bg-indigo-50 hover:bg-indigo-100 px-1.5 py-0.5 rounded transition-colors">تفعيل (Connect)</button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/40 rounded-xl p-3 border border-white/60">
                <p className="text-[10px] font-mono text-slate-500 mb-2 border-b border-slate-200 pb-1">Security Checks</p>
                <div className="flex flex-col gap-1.5">
                  {SECURITY_CHECKS.map((s, i) => (
                    <div key={i} className="flex items-center justify-between">
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
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Arch C</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">الهيكل الحالي <GitBranch className="w-4 h-4 text-slate-500" /></h3>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-xl p-4 flex flex-col items-center gap-1 font-mono text-[9px]">
              <div className="bg-slate-800 text-white rounded px-3 py-1 flex items-center gap-1"><Mic className="w-3 h-3" /> User Audio</div>
              <div className="w-0.5 h-3 bg-slate-300" />
              <div className="bg-blue-500 text-white rounded px-4 py-1.5 flex items-center gap-1"><Cpu className="w-3 h-3" /> Realtime Voice Layer</div>
              <div className="w-0.5 h-3 bg-slate-300" />
              <div className="bg-violet-600 text-white rounded px-5 py-2 flex items-center gap-1 font-bold shadow-sm"><Database className="w-3 h-3" /> Deep Brain (Claude)</div>
              <div className="w-0.5 h-3 bg-slate-300" />
              <div className="bg-slate-200 text-slate-700 rounded px-2 py-1 flex items-center gap-1"><Globe className="w-3 h-3" /> 5 MCP Servers</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
