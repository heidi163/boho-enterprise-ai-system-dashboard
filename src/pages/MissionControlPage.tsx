import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { 
  AlertCircle, CheckCircle, BrainCircuit, Mic, Zap, TrendingUp, 
  Bell, RefreshCw, ArrowUpRight, ArrowDownRight, Check,
  Activity, Calendar, BarChart3, Users, DollarSign, Clock
} from "lucide-react";

export default function MissionControlPage({ activeCompany }: { activeCompany: string }) {
  const [briefing, setBriefing] = useState("جاهز للعمل. اضغط على الزر لبدء البريفنج...");
  const [generatingBrief, setGeneratingBrief] = useState(false);
  const [metorikData, setMetorikData] = useState<any>(null);
  const [windsorData, setWindsorData] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [weeklySales, setWeeklySales] = useState<number[]>([]);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [alerts, setAlerts] = useState([
    { id: 1, type: "danger", text: activeCompany === "bgk" ? "حملة Sealy سناب العائد تحت 2.0" : "تأخير في تسليم مشروع الذكاء الاصطناعي", time: "منذ 12 دقيقة" },
    { id: 2, type: "warning", text: activeCompany === "bgk" ? "تراجع بسيط في نقرات إعلانات iFilter" : "مطلوب مراجعة كود السيرفر", time: "منذ 45 دقيقة" }
  ]);

  // Mock data separated by company
  const companyData = {
    bgk: {
      sales: [32000, 35000, 28000, 42000, 45000, 39000, 48320],
      totalSpend: 8700,
      bestRoas: 3.4,
      campaigns: [
        { name: "iFilter - بحث (كلمات مفتاحية)", platform: "جوجل", spend: "3,200", roas: 4.2, status: "excellent" },
        { name: "Sealy - إعادة استهداف", platform: "ميتا", spend: "1,500", roas: 3.1, status: "good" },
        { name: "أثاث منزلي - وعي بالعلامة", platform: "سناب شات", spend: "4,000", roas: 1.8, status: "danger" },
      ],
      insights: [
        { icon: TrendingUp, title: "فرصة نمو في iFilter", desc: "المبيعات زادت 18% الأسبوع ده. أنصح بزيادة ميزانية جوجل بـ 20%.", color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100" },
        { icon: Zap, title: "تحذير: تكلفة Sealy", desc: "تكلفة النقرة رفعت شوية. بص على الكريتيفز الجديدة عشان تقلل التكلفة.", color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
        { icon: BrainCircuit, title: "توقع بوهو للشهر", desc: "بناءً على الأرقام دي، هنضرب تارجت الشهر قبل ما يخلص بـ 4 أيام.", color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" },
      ]
    },
    o2nation: {
      sales: [12000, 15000, 18000, 14000, 25000, 21000, 32000],
      totalSpend: 4200,
      bestRoas: 5.1,
      campaigns: [
        { name: "O2Nation - خدمات برمجية", platform: "لينكد إن", spend: "2,200", roas: 5.1, status: "excellent" },
        { name: "تطوير تطبيقات - B2B", platform: "جوجل", spend: "1,500", roas: 2.8, status: "good" },
        { name: "استشارات ذكاء اصطناعي", platform: "ميتا", spend: "500", roas: 1.2, status: "danger" },
      ],
      insights: [
        { icon: TrendingUp, title: "عقود جديدة محتملة", desc: "حملة لينكد إن شغالة كويس جداً وجابت 5 ليدز النهاردة.", color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100" },
        { icon: BrainCircuit, title: "تحديث السيرفرات", desc: "استهلاك السيرفرات زاد 30%، يفضل نرفع الباقة قبل زحمة الويك إند.", color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
      ]
    }
  };

  const currentData = activeCompany === "o2nation" ? companyData.o2nation : companyData.bgk;
  
  useEffect(() => {
    setWeeklySales(currentData.sales);
  }, [activeCompany]);

  const maxSale = Math.max(...(weeklySales.length ? weeklySales : [1]), 1);

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      // Mocking API fetch but using local active company data
      setTimeout(() => {
        setWeeklySales(currentData.sales);
        setLastRefresh(new Date());
        setIsRefreshing(false);
      }, 600);
    } catch {
      setIsRefreshing(false);
    }
  };

  const handleBriefing = async () => {
    setGeneratingBrief(true);
    setBriefing("");
    try {
      // API call could pass activeCompany to get specific briefing
      const text = activeCompany === "bgk" 
        ? "المبيعات النهاردة قوية جداً بزيادة 12% عن امبارح. حملة iFilter على جوجل محققة عائد ممتاز. عندك اجتماعين النهاردة، ومحتاج تخلص مراجعة التصميمات."
        : "أداء O2Nation مستقر النهاردة. حملة لينكد إن جابت ليدز ممتازة. راجع استهلاك السيرفرات عشان زاد شوية.";
      setBriefing(text);
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const ar = voices.find(v => v.lang.startsWith("ar"));
        if (ar) u.voice = ar;
        u.rate = 0.92;
        window.speechSynthesis.speak(u);
      }
    } catch {
      setBriefing("حدث خطأ أثناء سحب البريفنج.");
    } finally {
      setGeneratingBrief(false);
    }
  };

  const todayRevenue = weeklySales[weeklySales.length - 1] || 0;
  const bestRoas = currentData.bestRoas;
  const totalAdSpend = currentData.totalSpend;
  const openTasksCount = 3; 

  return (
    <div className="flex flex-col gap-5 w-full pb-8" dir="rtl">
      
      {/* HEADER CONTROLS */}
      <div className="flex items-center justify-between mb-[-5px]">
        <h2 className="text-xl font-black text-slate-800 font-tajawal flex items-center gap-2">
          مركز القيادة التنفيذي <Activity className="w-5 h-5 text-blue-500" />
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-gray-400 font-mono">
            آخر تحديث: {lastRefresh.toLocaleTimeString("ar-EG", { hour: '2-digit', minute: '2-digit', hour12: true })}
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
          { label: "إجمالي المبيعات اليوم", value: `${todayRevenue.toLocaleString()} ج.م`, icon: DollarSign, color: "#3b82f6", bg: "from-blue-50 to-white", trend: "+12.5%", trendUp: true, desc: "مقارنة بامبارح" },
          { label: "أعلى عائد إعلانات", value: `${bestRoas}x`, icon: Zap, color: "#10b981", bg: "from-emerald-50 to-white", trend: "+0.4", trendUp: true, desc: "أفضل حملة شغالة" },
          { label: "إجمالي المصروفات", value: `${totalAdSpend.toLocaleString()} ج.م`, icon: TrendingUp, color: "#f59e0b", bg: "from-amber-50 to-white", trend: "-5.2%", trendUp: true, desc: "وفرنا في الحملات" },
          { label: "مهام وأولويات مفتوحة", value: openTasksCount, icon: CheckCircle, color: "#ef4444", bg: "from-rose-50 to-white", trend: "-2", trendUp: true, desc: "تم إنجاز مهام الصبح" },
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
        <div className="shrink-0 flex flex-col justify-center text-right">
          <h3 className="text-sm font-bold text-slate-800 font-tajawal mb-1">أداء الأسبوع ده</h3>
          <p className="text-[10px] text-gray-400 font-tajawal">إجمالي المبيعات آخر {weeklySales.length} أيام</p>
          <p className="text-2xl font-black font-mono text-blue-600 mt-2">
            {weeklySales.reduce((a, b) => a + b, 0).toLocaleString()}
            <span className="text-sm text-blue-400 mr-1">ج.م</span>
          </p>
          <div className="flex items-center gap-1 mt-1 justify-start">
            <ArrowUpRight className="w-3 h-3 text-emerald-500" />
            <span className="text-[11px] font-bold text-emerald-600 font-mono">+18.4%</span>
            <span className="text-[9px] text-gray-400 font-tajawal ms-1">عن الأسبوع اللي فات</span>
          </div>
        </div>
        
        {/* Simple CSS Bar Chart */}
        <div className="flex-1 w-full h-[60px] flex items-end justify-between gap-2 px-4 border-r-0 md:border-r md:border-gray-200">
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
            <span className="text-[9px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-bold">أعلى ٣</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-2 text-[10px] font-bold text-gray-400 font-tajawal">الحملة</th>
                  <th className="pb-2 text-[10px] font-bold text-gray-400 font-tajawal">الصرف</th>
                  <th className="pb-2 text-[10px] font-bold text-gray-400 font-tajawal">العائد</th>
                </tr>
              </thead>
              <tbody>
                {currentData.campaigns.map((c, i) => (
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
            <span className="text-[9px] px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full font-bold uppercase tracking-wider">الذكاء الاصطناعي</span>
          </div>
          <div className="flex flex-col gap-3">
            {currentData.insights.map((insight, i) => (
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
