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
  const [weeklySales, setWeeklySales] = useState<number[]>([32000, 35000, 28000, 42000, 45000, 39000, 48320]);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [alerts, setAlerts] = useState([
    { id: 1, type: "danger", text: "حملة Sealy سناب ROAS تحت 2.0", time: "منذ 12 دقيقة" },
    { id: 2, type: "warning", text: "تراجع بسيط في CTR إعلانات iFilter", time: "منذ 45 دقيقة" }
  ]);

  // Mock data for new UI sections
  const maxSale = Math.max(...weeklySales, 1);
  
  const campaigns = [
    { name: "iFilter - Search (KW)", platform: "Google", spend: "3,200", roas: 4.2, status: "excellent" },
    { name: "Sealy - ReTargeting", platform: "Meta", spend: "1,500", roas: 3.1, status: "good" },
    { name: "O2Nation - Awareness", platform: "Snapchat", spend: "4,000", roas: 1.8, status: "danger" },
  ];

  const aiInsights = [
    { icon: TrendingUp, title: "فرصة نمو في iFilter", desc: "المبيعات زادت 18% هذا الأسبوع. أنصح بزيادة ميزانية إعلانات جوجل بـ 20%.", color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100" },
    { icon: Zap, title: "تحذير: تكلفة Sealy", desc: "تكلفة النقرة (CPC) ارتفعت. راجع الكريتيفز الجديدة لتقليل التكلفة.", color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
    { icon: BrainCircuit, title: "توقع بوهو للشهر", desc: "بناءً على الأرقام الحالية، متوقع نضرب تارجت الشهر قبل نهايته بـ 4 أيام.", color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" },
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
      
      if (salesRes.status === "fulfilled") {
        const salesData = salesRes.value.sales || [];
        setMetorikData({ totalRevenue: salesData[0]?.value || 48320 });
        if (salesData.length > 0) {
          const values = salesData.map((s: any) => s.value).reverse();
          setWeeklySales(values);
        }
      }
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
          <p className="text-[10px] text-gray-400 font-tajawal">إجمالي المبيعات آخر {weeklySales.length} أيام</p>
          <p className="text-2xl font-black font-mono text-blue-600 mt-2">
            {weeklySales.reduce((a, b) => a + b, 0).toLocaleString()}
            <span className="text-sm text-blue-400 ml-1">EGP</span>
          </p>
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

        {/* AI Insights */}
        <div className="glass-panel rounded-[24px] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">رؤى بوهو التحليلية <BrainCircuit className="w-4 h-4 text-blue-500" /></h3>
            <span className="text-[9px] px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full font-bold uppercase tracking-wider">AI Insights</span>
          </div>
          <div className="flex flex-col gap-3">
            {aiInsights.map((insight, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${insight.bg} ${insight.border} hover:shadow-sm transition-all`}>
                <div className={`p-2 rounded-lg bg-white shadow-sm shrink-0`}>
                  <insight.icon className={`w-4 h-4 ${insight.color}`} />
                </div>
                <div className="flex-1 text-right mt-0.5">
                  <p className="text-xs font-bold text-slate-800 font-tajawal">{insight.title}</p>
                  <p className="text-[10px] text-slate-600 font-tajawal mt-1 leading-relaxed">{insight.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
