import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { 
  AlertCircle, CheckCircle, BrainCircuit, Mic, Zap, TrendingUp, 
  Bell, RefreshCw, ArrowUpRight, ArrowDownRight, Check,
  Activity, Calendar, BarChart3, Users, DollarSign, Clock
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
    { id: 1, type: "danger", text: "حملة Sealy سناب ROAS تحت 2.0", time: "منذ 12 دقيقة" },
    { id: 2, type: "warning", text: "تراجع بسيط في CTR إعلانات iFilter", time: "منذ 45 دقيقة" }
  ]);

  // Mock data for new UI sections
  const weeklySales = [32000, 35000, 28000, 42000, 45000, 39000, 48320];
  const maxSale = Math.max(...weeklySales);
  
  const campaigns = [
    { name: "iFilter - Search (KW)", platform: "Google", spend: "3,200", roas: 4.2, status: "excellent" },
    { name: "Sealy - ReTargeting", platform: "Meta", spend: "1,500", roas: 3.1, status: "good" },
    { name: "O2Nation - Awareness", platform: "Snapchat", spend: "4,000", roas: 1.8, status: "danger" },
  ];

  const clients = [
    { name: "iFilter Water", mrr: "120K", health: "98%", status: "success", nextMeeting: "Today 2:00 PM" },
    { name: "Sealy E-commerce", mrr: "85K", health: "82%", status: "warning", nextMeeting: "Tomorrow" },
    { name: "O2Nation App", mrr: "45K", health: "95%", status: "success", nextMeeting: "Thu 10:00 AM" },
  ];

  const todayMeetings = [
    { title: "Weekly Sync - iFilter", time: "2:00 PM - 3:00 PM", type: "zoom" },
    { title: "Review Ad Creatives", time: "4:30 PM - 5:00 PM", type: "internal" }
  ];

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
      if (tasksRes.status === "fulfilled") setTasks(tasksRes.value.tasks || [
        { id: "1", name: "مراجعة تصميمات الأسبوع القادم", status: "To Do" },
        { id: "2", name: "اعتماد ميزانية الإعلانات الجديدة", status: "In Progress" },
        { id: "3", name: "اجتماع فريق المبيعات", status: "To Do" }
      ]);
      
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
      setBriefing(d.briefing || "المبيعات اليوم قوية جداً بزيادة 12% عن الأمس. حملة iFilter على جوجل محققة ROAS 4.2. عندك اجتماعين اليوم، أولهم الساعة 2:00. مهامك 3 ومحتاج تخلص مراجعة التصميمات قبل الاجتماع.");
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(briefing);
        const voices = window.speechSynthesis.getVoices();
        const ar = voices.find(v => v.lang.startsWith("ar"));
        if (ar) u.voice = ar;
        u.rate = 0.92;
        window.speechSynthesis.speak(u);
      }
    } catch {
      setBriefing("المبيعات اليوم قوية جداً بزيادة 12% عن الأمس. حملة iFilter محققة ROAS ممتاز. عندك اجتماعين اليوم.");
    } finally {
      setGeneratingBrief(false);
    }
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: "Done" } : t));
  };

  const dismissAlert = (id: number) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const todayRevenue = metorikData?.totalRevenue || 48320;
  const bestRoas = windsorData?.campaigns?.[0]?.roas || 3.4;
  const openTasksCount = tasks.filter(t => t.status !== "Done").length || 3;
  const totalAdSpend = 8700; // Mock total ad spend

  return (
    <div className="flex flex-col gap-5 w-full pb-8" dir="rtl">
      
      {/* HEADER CONTROLS */}
      <div className="flex items-center justify-between mb-[-5px]">
        <h2 className="text-xl font-black text-slate-800 font-tajawal flex items-center gap-2">
          مركز القيادة التنفيذي <Activity className="w-5 h-5 text-blue-500" />
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-gray-400 font-mono">
            آخر تحديث: {lastRefresh.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true })}
          </span>
          <button 
            onClick={fetchData}
            disabled={isRefreshing}
            className="p-2 bg-white/60 border border-gray-200 rounded-xl hover:bg-white transition-all shadow-sm group"
          >
            <RefreshCw className={`w-4 h-4 text-blue-500 ${isRefreshing ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
          </button>
        </div>
      </div>

      {/* ROW 1: PRIMARY KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "إجمالي المبيعات اليوم", value: `${todayRevenue.toLocaleString()} EGP`, icon: DollarSign, color: "#3b82f6", bg: "from-blue-50 to-white", trend: "+12.5%", trendUp: true, desc: "مقارنة بالأمس" },
          { label: "أعلى ROAS للحملات", value: `${bestRoas}x`, icon: Zap, color: "#10b981", bg: "from-emerald-50 to-white", trend: "+0.4", trendUp: true, desc: "حملة iFilter Search" },
          { label: "إجمالي الإنفاق الإعلاني", value: `${totalAdSpend.toLocaleString()} EGP`, icon: TrendingUp, color: "#f59e0b", bg: "from-amber-50 to-white", trend: "-5.2%", trendUp: true, desc: "وفرنا في حملات سناب" },
          { label: "مهام وأولويات مفتوحة", value: openTasksCount, icon: CheckCircle, color: "#ef4444", bg: "from-rose-50 to-white", trend: "-2", trendUp: true, desc: "تم إنجاز مهام الصباح" },
        ].map((s, i) => (
          <div key={i} className={`glass-panel rounded-[20px] p-4 bg-gradient-to-b ${s.bg} border-gray-200/60 relative overflow-hidden group hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-white shadow-sm border border-gray-100">
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
              <div className={`flex items-center gap-0.5 text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-full ${s.trendUp ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                {s.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {s.trend}
              </div>
            </div>
            <p className="text-2xl font-black font-mono mt-1 text-slate-800">{s.value}</p>
            <p className="text-[11px] text-slate-500 font-bold font-tajawal mt-1">{s.label}</p>
            <p className="text-[9px] text-gray-400 font-tajawal mt-0.5">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* ROW 2: WEEKLY PERFORMANCE TREND */}
      <div className="glass-panel rounded-[24px] p-5 w-full flex flex-col md:flex-row items-center gap-6">
        <div className="shrink-0 flex flex-col justify-center">
          <h3 className="text-sm font-bold text-slate-800 font-tajawal mb-1">أداء الأسبوع الحالي</h3>
          <p className="text-[10px] text-gray-400 font-tajawal">إجمالي المبيعات آخر 7 أيام</p>
          <p className="text-2xl font-black font-mono text-blue-600 mt-2">268,320<span className="text-sm text-blue-400 ml-1">EGP</span></p>
          <div className="flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3 text-emerald-500" />
            <span className="text-[11px] font-bold text-emerald-600 font-mono">+18.4%</span>
            <span className="text-[9px] text-gray-400 font-tajawal mr-1">عن الأسبوع الماضي</span>
          </div>
        </div>
        
        {/* Simple CSS Bar Chart */}
        <div className="flex-1 w-full h-[60px] flex items-end justify-between gap-2 px-4 border-r border-gray-200">
          {weeklySales.map((val, i) => {
            const height = (val / maxSale) * 100;
            const isToday = i === weeklySales.length - 1;
            return (
              <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                <div className="w-full relative flex justify-center h-full items-end">
                  {/* Tooltip */}
                  <div className="absolute -top-8 bg-slate-800 text-white text-[9px] font-mono px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                    {val.toLocaleString()}
                  </div>
                  {/* Bar */}
                  <div 
                    className={`w-full max-w-[24px] rounded-t-md transition-all duration-500 ${isToday ? "bg-blue-500" : "bg-blue-100 hover:bg-blue-200"}`}
                    style={{ height: `${height}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ROW 3: CAMPAIGNS & CLIENT HEALTH */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Top Campaigns */}
        <div className="glass-panel rounded-[24px] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">أداء الحملات المباشرة <BarChart3 className="w-4 h-4 text-blue-500" /></h3>
            <span className="text-[9px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-bold">Top 3</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-2 text-[10px] font-bold text-gray-400 font-tajawal">الحملة</th>
                  <th className="pb-2 text-[10px] font-bold text-gray-400 font-tajawal">الإنفاق</th>
                  <th className="pb-2 text-[10px] font-bold text-gray-400 font-tajawal">ROAS</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c, i) => (
                  <tr key={i} className="border-b border-gray-50/50 hover:bg-white/40 transition-colors">
                    <td className="py-3">
                      <p className="text-xs font-bold text-slate-800">{c.name}</p>
                      <p className="text-[9px] text-gray-400 font-mono mt-0.5">{c.platform}</p>
                    </td>
                    <td className="py-3 text-xs font-mono font-medium text-slate-600">{c.spend}</td>
                    <td className="py-3">
                      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                        c.status === "excellent" ? "bg-emerald-50 text-emerald-600" :
                        c.status === "good" ? "bg-blue-50 text-blue-600" :
                        "bg-rose-50 text-rose-600"
                      }`}>
                        {c.roas}x
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          c.status === "excellent" ? "bg-emerald-500" :
                          c.status === "good" ? "bg-blue-500" :
                          "bg-rose-500 animate-pulse"
                        }`} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Client Health */}
        <div className="glass-panel rounded-[24px] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">صحة العملاء <Users className="w-4 h-4 text-blue-500" /></h3>
            <span className="text-[9px] text-gray-400 font-mono uppercase">Client Health</span>
          </div>
          <div className="flex flex-col gap-3">
            {clients.map((client, i) => (
              <div key={i} className="flex items-center justify-between bg-white/50 p-3 rounded-xl border border-gray-100 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs ${
                    client.status === "success" ? "bg-emerald-400" : "bg-amber-400"
                  }`}>
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{client.name}</p>
                    <p className="text-[9px] text-gray-400 font-mono mt-0.5">{client.nextMeeting}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-xs font-mono font-black text-slate-700">{client.mrr}</p>
                  <p className={`text-[9px] font-bold ${client.status === "success" ? "text-emerald-500" : "text-amber-500"}`}>
                    Health: {client.health}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ROW 4: ALERTS, TASKS, CALENDAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* WAR ROOM ALERTS */}
        <div className="glass-panel rounded-[24px] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">تنبيهات طارئة <Bell className={`w-4 h-4 ${alerts.length > 0 ? "text-rose-500 animate-pulse" : "text-gray-400"}`} /></h3>
          </div>
          <div className="flex flex-col gap-2.5">
            {alerts.length > 0 ? alerts.map(a => (
              <div key={a.id} className={`group flex items-start gap-2.5 rounded-xl p-3 border relative overflow-hidden transition-all ${
                a.type === "danger" ? "bg-red-50 border-red-100" : "bg-amber-50 border-amber-100"
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${a.type === "danger" ? "bg-red-500 animate-pulse" : "bg-amber-500"}`} />
                <div className="flex-1 text-right pr-1">
                  <p className="text-[11px] text-slate-800 font-bold font-tajawal leading-snug">{a.text}</p>
                  <p className="text-[9px] text-gray-400 font-mono mt-1">{a.time}</p>
                </div>
                <button onClick={() => dismissAlert(a.id)} className="opacity-0 group-hover:opacity-100 absolute left-2 top-2 text-[9px] font-bold text-gray-500 hover:text-slate-800">تجاهل</button>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center py-6 text-emerald-500 opacity-60">
                <CheckCircle className="w-8 h-8 mb-2" />
                <p className="text-xs font-bold font-tajawal">لا توجد تنبيهات عاجلة.</p>
              </div>
            )}
          </div>
        </div>

        {/* QUICK TASKS */}
        <div className="glass-panel rounded-[24px] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">أولويات اليوم <CheckCircle className="w-4 h-4 text-blue-500" /></h3>
          </div>
          <div className="flex flex-col gap-2">
            {tasks.filter(t => t.status !== "Done").slice(0, 4).map((t, i) => (
              <div key={t.id || i} className="group flex items-center justify-between bg-white/60 hover:bg-white rounded-xl px-3 py-2.5 border border-white/80 transition-all shadow-sm">
                <button 
                  onClick={() => handleCompleteTask(t.id)}
                  className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 transition-colors"
                >
                  <Check className="w-3 h-3 text-white opacity-0 hover:opacity-100" />
                </button>
                <div className="flex-1 text-right px-2 overflow-hidden">
                  <span className="text-[11px] text-slate-800 font-tajawal font-bold truncate block">{t.name}</span>
                </div>
              </div>
            ))}
            {tasks.filter(t => t.status !== "Done").length === 0 && (
              <div className="text-center py-6 text-gray-400">
                <p className="text-xs font-bold font-tajawal">مفيش مهام مفتوحة!</p>
              </div>
            )}
          </div>
        </div>

        {/* TODAY'S SCHEDULE */}
        <div className="glass-panel rounded-[24px] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">جدول اليوم <Calendar className="w-4 h-4 text-blue-500" /></h3>
          </div>
          <div className="flex flex-col gap-2.5">
            {todayMeetings.length > 0 ? todayMeetings.map((m, i) => (
              <div key={i} className="bg-white/50 rounded-xl p-3 border border-gray-100 flex items-start gap-3">
                <div className="mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-800 font-tajawal">{m.title}</p>
                  <p className="text-[9px] text-slate-500 font-mono mt-0.5">{m.time}</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-6 text-gray-400">
                <p className="text-xs font-bold font-tajawal">يومك خالي من الاجتماعات!</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ROW 5: SMART BRIEFING */}
      <div className="glass-panel rounded-[24px] p-5 relative overflow-hidden group">
        <div className="absolute -left-20 -top-20 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="flex items-center justify-between mb-4 relative z-10">
          <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">
            البريفنج الصباحي الذكي <BrainCircuit className="w-4 h-4 text-blue-500" />
          </h3>
          <button
            onClick={handleBriefing}
            disabled={generatingBrief}
            className="px-5 py-2 bg-gradient-to-l from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full hover:shadow-[0_8px_20px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Mic className="w-4 h-4" />
            {generatingBrief ? "جاري التوليد..." : "استمع للبريفنج"}
          </button>
        </div>
        <div className="bg-white/40 rounded-xl p-4 border border-white/60 min-h-[70px] flex items-center relative z-10">
          <p className="text-sm text-slate-700 font-tajawal leading-relaxed text-right">
            {generatingBrief ? (
              <span className="flex items-center gap-2 text-blue-500 font-bold">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                بوهو يحلل البيانات...
              </span>
            ) : briefing}
          </p>
        </div>
      </div>

    </div>
  );
}
