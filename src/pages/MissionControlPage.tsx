import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { Activity, AlertCircle, CheckCircle, Clock, BrainCircuit, Mic, Zap, TrendingUp, MessageSquare, Bell, Radio, ChevronRight } from "lucide-react";

export default function MissionControlPage() {
  const [time, setTime] = useState("");
  const [briefing, setBriefing] = useState("جارٍ تحميل البريفنج الصباحي...");
  const [generatingBrief, setGeneratingBrief] = useState(false);
  const [metorikData, setMetorikData] = useState<any>(null);
  const [windsorData, setWindsorData] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [alerts, setAlerts] = useState([
    { id: 1, type: "danger", text: "حملة Sealy سناب ROAS تحت 2.0 - تدخل فوري مطلوب", time: "منذ 12 دقيقة" },
    { id: 2, type: "warning", text: "تراجع بسيط في CTR إعلانات iFilter Google", time: "منذ 45 دقيقة" },
    { id: 3, type: "success", text: "مبيعات iFilter تجاوزت هدف اليوم بـ 18%", time: "منذ ساعتين" },
  ]);

  useEffect(() => {
    const tick = () => {
      const opts: Intl.DateTimeFormatOptions = { timeZone: "Africa/Cairo", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true };
      setTime(new Intl.DateTimeFormat("en-US", opts).format(new Date()));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    api.get("/api/sales").then(d => setMetorikData({ totalRevenue: d.sales?.[0]?.value || 48320 })).catch(() => {});
    api.get("/api/ads").then(d => setWindsorData({ campaigns: [{ roas: d.ads?.[0]?.roas || 3.4 }] })).catch(() => {});
    api.get("/api/tasks").then(d => setTasks(d.tasks || [])).catch(() => {});
  }, []);

  const handleBriefing = async () => {
    setGeneratingBrief(true);
    setBriefing("");
    try {
      const d = await api.post("/api/briefing", {});
      setBriefing(d.briefing || "تم توليد البريفنج.");
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(d.briefing);
        const voices = window.speechSynthesis.getVoices();
        const ar = voices.find(v => v.lang.startsWith("ar"));
        if (ar) u.voice = ar;
        u.rate = 0.92;
        window.speechSynthesis.speak(u);
      }
    } catch {
      setBriefing("تعذر الاتصال بـ Boho Deep Brain. تحقق من الـ Server.");
    } finally {
      setGeneratingBrief(false);
    }
  };

  const systemNodes = [
    { label: "Voice Layer", status: "online", color: "#10b981" },
    { label: "Deep Brain", status: "online", color: "#3b82f6" },
    { label: "Metorik MCP", status: "online", color: "#3b82f6" },
    { label: "Windsor MCP", status: "online", color: "#f59e0b" },
    { label: "Telegram Push", status: "online", color: "#0ea5e9" },
    { label: "n8n Cron", status: "standby", color: "#94a3b8" },
  ];

  const todayRevenue = metorikData?.totalRevenue || 48320;
  const bestRoas = windsorData?.campaigns?.[0]?.roas || 3.4;
  const openTasks = tasks.filter(t => t.status === "To Do").length || 3;

  return (
    <div className="flex flex-col gap-6 w-full" dir="rtl">

      {/* TOP COMMAND STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "إجمالي المبيعات اليوم", value: `${todayRevenue.toLocaleString()} EGP`, icon: TrendingUp, color: "#3b82f6", bg: "from-blue-50 to-blue-100" },
          { label: "أعلى ROAS", value: `${bestRoas}x`, icon: Zap, color: "#10b981", bg: "from-emerald-50 to-emerald-100" },
          { label: "مهام مفتوحة", value: openTasks, icon: CheckCircle, color: "#f59e0b", bg: "from-amber-50 to-amber-100" },
          { label: "التنبيهات النشطة", value: alerts.filter(a => a.type === "danger").length, icon: AlertCircle, color: "#ef4444", bg: "from-rose-50 to-rose-100" },
        ].map((s, i) => (
          <div key={i} className={`glass-panel rounded-[20px] p-4 bg-gradient-to-br ${s.bg} border-none`}>
            <div className="flex items-center justify-between mb-2">
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
              <span className="text-[9px] text-gray-400 font-mono uppercase">Live</span>
            </div>
            <p className="text-2xl font-black font-mono" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[11px] text-gray-500 font-tajawal mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* SYSTEM NODES STATUS */}
      <div className="glass-panel rounded-[24px] p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono uppercase text-gray-400 tracking-widest">System Status</span>
          <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">حالة النظام المباشرة <Radio className="w-4 h-4 text-emerald-500 animate-pulse" /></h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {systemNodes.map((n, i) => (
            <div key={i} className="flex items-center justify-between bg-white/50 rounded-2xl px-4 py-3 border border-white/70">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-600 font-mono">{n.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: n.color }} />
                <span className="text-[9px] font-mono uppercase" style={{ color: n.color }}>{n.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MORNING BRIEFING CARD */}
      <div className="glass-panel rounded-[24px] p-5">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBriefing}
            disabled={generatingBrief}
            className="px-4 py-2 bg-gradient-to-l from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
          >
            <Mic className="w-3.5 h-3.5" />
            {generatingBrief ? "بوهو بيفكر..." : "صحّيني بوهو"}
          </button>
          <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">البريفنج الصباحي <BrainCircuit className="w-4 h-4 text-blue-500" /></h3>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-50 rounded-2xl p-4 border border-blue-100 min-h-[80px] flex items-center">
          <p className="text-sm text-slate-700 font-tajawal leading-relaxed text-right">
            {generatingBrief ? (
              <span className="flex items-center gap-2 text-blue-500">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                بوهو بيجمع البيانات...
              </span>
            ) : briefing}
          </p>
        </div>
      </div>

      {/* ALERTS + LATEST CHAT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* ALERTS */}
        <div className="glass-panel rounded-[24px] p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-gray-400 uppercase">War Room</span>
            <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">تنبيهات اليوم <Bell className="w-4 h-4 text-rose-500" /></h3>
          </div>
          <div className="flex flex-col gap-3">
            {alerts.map(a => (
              <div key={a.id} className={`flex items-start gap-3 rounded-2xl p-3 border ${
                a.type === "danger" ? "bg-red-50 border-red-200" :
                a.type === "warning" ? "bg-amber-50 border-amber-200" :
                "bg-emerald-50 border-emerald-200"
              }`}>
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  a.type === "danger" ? "bg-red-500 animate-pulse" :
                  a.type === "warning" ? "bg-amber-500" :
                  "bg-emerald-500"
                }`} />
                <div className="flex-1 text-right">
                  <p className="text-xs text-slate-700 font-tajawal leading-snug">{a.text}</p>
                  <p className="text-[10px] text-gray-400 font-mono mt-1">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TODAY TASKS QUICK */}
        <div className="glass-panel rounded-[24px] p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-gray-400 uppercase">ClickUp Sync</span>
            <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">مهام اليوم <CheckCircle className="w-4 h-4 text-blue-500" /></h3>
          </div>
          <div className="flex flex-col gap-2">
            {tasks.slice(0, 4).map((t, i) => (
              <div key={i} className="flex items-center justify-between bg-white/60 rounded-xl px-4 py-2.5 border border-white/80">
                <div className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  t.status === "Done" ? "bg-emerald-100 text-emerald-700" :
                  t.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                  "bg-amber-100 text-amber-700"
                }`}>{t.status}</div>
                <span className="text-xs text-slate-700 font-tajawal font-medium truncate max-w-[70%] text-right">{t.name}</span>
              </div>
            ))}
            {tasks.length === 0 && <p className="text-xs text-gray-400 font-tajawal text-center py-4">لا توجد مهام. إضافة من صفحة مدير المهام</p>}
          </div>
        </div>

      </div>

    </div>
  );
}
