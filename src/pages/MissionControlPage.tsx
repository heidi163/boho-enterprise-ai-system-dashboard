import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { 
  AlertCircle, CheckCircle, BrainCircuit, Mic, Zap, TrendingUp, 
  Bell, RefreshCw, ArrowUpRight, ArrowDownRight, Check
} from "lucide-react";

export default function MissionControlPage() {
  const [briefing, setBriefing] = useState("جاهز للعمل. اضغط على الزر لبدء البريفنج...");
  const [generatingBrief, setGeneratingBrief] = useState(false);
  const [metorikData, setMetorikData] = useState<any>(null);
  const [windsorData, setWindsorData] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [alerts, setAlerts] = useState([
    { id: 1, type: "danger", text: "حملة Sealy سناب ROAS تحت 2.0 - تدخل فوري مطلوب", time: "منذ 12 دقيقة" },
    { id: 2, type: "warning", text: "تراجع بسيط في CTR إعلانات iFilter Google", time: "منذ 45 دقيقة" }
  ]);

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const [salesRes, adsRes, tasksRes] = await Promise.allSettled([
        api.get("/api/sales"),
        api.get("/api/ads"),
        api.get("/api/tasks")
      ]);
      
      if (salesRes.status === "fulfilled") setMetorikData({ totalRevenue: salesRes.value.sales?.[0]?.value || 48320 });
      if (adsRes.status === "fulfilled") setWindsorData({ campaigns: [{ roas: adsRes.value.ads?.[0]?.roas || 3.4 }] });
      if (tasksRes.status === "fulfilled") setTasks(tasksRes.value.tasks || []);
      
      setLastRefresh(new Date());
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
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
      setBriefing("تعذر الاتصال بـ Boho Deep Brain. تحقق من اتصال الخادم.");
    } finally {
      setGeneratingBrief(false);
    }
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: "Done" } : t));
    // In a real scenario, we'd also call api.put to update the task on the server.
  };

  const dismissAlert = (id: number) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const todayRevenue = metorikData?.totalRevenue || 48320;
  const bestRoas = windsorData?.campaigns?.[0]?.roas || 3.4;
  const openTasksCount = tasks.filter(t => t.status !== "Done").length || 3;
  const activeAlertsCount = alerts.filter(a => a.type === "danger").length;

  return (
    <div className="flex flex-col gap-6 w-full" dir="rtl">
      
      {/* HEADER CONTROLS */}
      <div className="flex items-center justify-between mb-[-10px]">
        <h2 className="text-xl font-black text-slate-800 font-tajawal">مركز القيادة</h2>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-gray-400 font-mono">
            آخر تحديث: {lastRefresh.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true })}
          </span>
          <button 
            onClick={fetchData}
            disabled={isRefreshing}
            className="p-2 bg-white/60 border border-gray-200 rounded-xl hover:bg-white transition-all shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 text-blue-500 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* TOP COMMAND STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "إجمالي المبيعات اليوم", value: `${todayRevenue.toLocaleString()} EGP`, icon: TrendingUp, color: "#3b82f6", bg: "from-blue-50 to-blue-100", trend: "+12%", trendUp: true },
          { label: "أعلى ROAS", value: `${bestRoas}x`, icon: Zap, color: "#10b981", bg: "from-emerald-50 to-emerald-100", trend: "+0.4", trendUp: true },
          { label: "مهام مفتوحة", value: openTasksCount, icon: CheckCircle, color: "#f59e0b", bg: "from-amber-50 to-amber-100", trend: "-2", trendUp: true },
          { label: "التنبيهات النشطة", value: activeAlertsCount, icon: AlertCircle, color: "#ef4444", bg: "from-rose-50 to-rose-100", trend: "+1", trendUp: false },
        ].map((s, i) => (
          <div key={i} className={`glass-panel rounded-[20px] p-4 bg-gradient-to-br ${s.bg} border-none relative overflow-hidden group`}>
            <div className="flex items-center justify-between mb-2 relative z-10">
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
              <div className={`flex items-center gap-0.5 text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-full ${s.trendUp ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                {s.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {s.trend}
              </div>
            </div>
            <p className="text-2xl font-black font-mono relative z-10" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[11px] text-gray-500 font-tajawal mt-1 relative z-10">{s.label}</p>
          </div>
        ))}
      </div>

      {/* MORNING BRIEFING CARD */}
      <div className="glass-panel rounded-[24px] p-5">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBriefing}
            disabled={generatingBrief}
            className="px-5 py-2.5 bg-gradient-to-l from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full hover:shadow-[0_8px_20px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Mic className="w-4 h-4" />
            {generatingBrief ? "بوهو بيفكر..." : "صحّيني بوهو"}
          </button>
          <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">البريفنج الصباحي <BrainCircuit className="w-4 h-4 text-blue-500" /></h3>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-50/30 rounded-2xl p-5 border border-blue-100 min-h-[90px] flex items-center shadow-inner">
          <p className="text-sm text-slate-700 font-tajawal leading-relaxed text-right">
            {generatingBrief ? (
              <span className="flex items-center gap-2 text-blue-500 font-bold">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                جاري تجميع البيانات وتوليد البريفنج...
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
            <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">تنبيهات اليوم <Bell className={`w-4 h-4 ${alerts.length > 0 ? "text-rose-500 animate-pulse" : "text-gray-400"}`} /></h3>
          </div>
          
          <div className="flex flex-col gap-3">
            {alerts.length > 0 ? alerts.map(a => (
              <div key={a.id} className={`group flex items-start gap-3 rounded-2xl p-3 border relative overflow-hidden transition-all hover:shadow-md ${
                a.type === "danger" ? "bg-red-50 border-red-200" :
                a.type === "warning" ? "bg-amber-50 border-amber-200" :
                "bg-emerald-50 border-emerald-200"
              }`}>
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  a.type === "danger" ? "bg-red-500 animate-pulse" :
                  a.type === "warning" ? "bg-amber-500" :
                  "bg-emerald-500"
                }`} />
                <div className="flex-1 text-right pr-1">
                  <p className="text-xs text-slate-800 font-bold font-tajawal leading-snug">{a.text}</p>
                  <p className="text-[10px] text-gray-400 font-mono mt-1">{a.time}</p>
                </div>
                {/* Dismiss Button */}
                <button 
                  onClick={() => dismissAlert(a.id)}
                  className="opacity-0 group-hover:opacity-100 absolute left-2 top-2 p-1.5 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-all text-[9px] font-bold text-gray-500"
                >
                  تجاهل
                </button>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center py-6 text-emerald-500 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                <CheckCircle className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-xs font-bold font-tajawal">الأمور مستقرة، لا توجد تنبيهات عاجلة.</p>
              </div>
            )}
          </div>
        </div>

        {/* TODAY TASKS QUICK */}
        <div className="glass-panel rounded-[24px] p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-gray-400 uppercase">ClickUp Sync</span>
            <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">مهام اليوم <CheckCircle className="w-4 h-4 text-blue-500" /></h3>
          </div>
          <div className="flex flex-col gap-2">
            {tasks.filter(t => t.status !== "Done").slice(0, 4).map((t, i) => (
              <div key={t.id || i} className="group flex items-center justify-between bg-white/60 hover:bg-white rounded-xl px-4 py-3 border border-white/80 transition-all shadow-sm hover:shadow">
                
                {/* Quick Complete Button */}
                <button 
                  onClick={() => handleCompleteTask(t.id)}
                  className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 transition-colors group-hover:shadow-inner"
                  title="تحديد كمكتمل"
                >
                  <Check className="w-3 h-3 text-white opacity-0 hover:opacity-100 transition-opacity" />
                </button>

                <div className="flex-1 text-right px-3">
                  <span className="text-xs text-slate-800 font-tajawal font-bold truncate block">{t.name}</span>
                </div>
                
                <div className={`text-[9px] px-2 py-1 rounded-full font-mono font-bold shrink-0 ${
                  t.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                  "bg-amber-100 text-amber-700"
                }`}>
                  {t.status === "To Do" ? "جديد" : "جاري"}
                </div>
              </div>
            ))}
            
            {tasks.filter(t => t.status !== "Done").length === 0 && (
              <div className="flex flex-col items-center justify-center py-6 text-gray-400">
                <CheckCircle className="w-8 h-8 mb-2 opacity-30" />
                <p className="text-xs font-bold font-tajawal">مفيش مهام مفتوحة ليك النهارده. عاش! 🎉</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
