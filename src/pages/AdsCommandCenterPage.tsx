import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { Megaphone, TrendingUp, AlertCircle, CheckCircle, RefreshCw, Zap, Target, DollarSign, Clock, Flame, Calendar, PauseCircle, PlayCircle, Lightbulb } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const PLATFORM_COLORS: Record<string, string> = {
  Meta: "#1877f2",
  Google: "#ea4335",
  Snapchat: "#fffc00",
};

const ROAS_THRESHOLD = 2.0;

export default function AdsCommandCenterPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [manualCheckLoading, setManualCheckLoading] = useState(false);
  const [dateRange, setDateRange] = useState("اليوم");
  const [pausedCampaigns, setPausedCampaigns] = useState<Record<string, boolean>>({});

  const toggleCampaign = (name: string) => {
    setPausedCampaigns(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await api.get("/api/ads");
      setData(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const campaigns = data?.campaigns || [
    { name: "iFilter - Meta Awareness", platform: "Meta", spend: 2400, revenue: 8160, roas: 3.4, status: "active" },
    { name: "Sealy - Snapchat Retarget", platform: "Snapchat", spend: 1800, revenue: 2520, roas: 1.4, status: "warning" },
    { name: "iFilter - Google Search", platform: "Google", spend: 3200, revenue: 10560, roas: 3.3, status: "active" },
    { name: "Sealy - Meta Leads", platform: "Meta", spend: 900, revenue: 1890, roas: 2.1, status: "active" },
    { name: "iFilter - Google PMax", platform: "Google", spend: 1500, revenue: 4200, roas: 2.8, status: "active" },
  ];

  // Rank campaigns by ROAS
  const rankedCampaigns = [...campaigns].sort((a, b) => b.roas - a.roas);

  // Aggregate by Platform for the chart to avoid overlapping text
  const platformDataMap: Record<string, { platform: string; spend: number; revenue: number }> = {};
  campaigns.forEach(c => {
    if (!platformDataMap[c.platform]) {
      platformDataMap[c.platform] = { platform: c.platform, spend: 0, revenue: 0 };
    }
    platformDataMap[c.platform].spend += c.spend;
    platformDataMap[c.platform].revenue += c.revenue;
  });
  const platformData = Object.values(platformDataMap);

  const getRoasColor = (roas: number) => {
    if (roas >= 3) return { text: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" };
    if (roas >= ROAS_THRESHOLD) return { text: "text-amber-600", bg: "bg-amber-50 border-amber-200" };
    return { text: "text-rose-600", bg: "bg-rose-50 border-rose-200" };
  };

  const totalSpend = campaigns.reduce((a, c) => a + c.spend, 0);
  const totalRevenue = campaigns.reduce((a, c) => a + c.revenue, 0);
  const avgRoas = (totalRevenue / totalSpend).toFixed(2);
  const criticalCount = campaigns.filter(c => c.roas < ROAS_THRESHOLD).length;

  // Mock Budget Burn Logic
  const dailyBudget = 12000;
  const burnRate = (totalSpend / dailyBudget) * 100;
  const currentHour = new Date().getHours();
  const timeElapsedPercent = (currentHour / 24) * 100;
  // If we spent 80% of budget but only 50% of the day passed, pacing is too fast
  const isPacingFast = burnRate > timeElapsedPercent + 10; 

  return (
    <div className="flex flex-col gap-6 w-full" dir="rtl">

      {/* HEADER */}
      <div className="glass-panel rounded-[24px] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="hidden md:flex bg-white/50 border border-gray-200 rounded-full p-1 ml-2">
            {["اليوم", "الأمس", "آخر 7 أيام"].map(d => (
              <button key={d} onClick={() => setDateRange(d)} className={`px-3 py-1 text-[10px] font-bold font-tajawal rounded-full transition-colors ${dateRange === d ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-slate-700"}`}>
                {d}
              </button>
            ))}
          </div>
          <button onClick={() => setManualCheckLoading(true)} disabled={manualCheckLoading} className="flex items-center gap-1.5 text-xs text-white bg-gradient-to-l from-rose-500 to-red-600 rounded-full px-4 py-1.5 hover:opacity-90 disabled:opacity-50 font-bold">
            <Zap className="w-3.5 h-3.5" /> {manualCheckLoading ? "جارٍ الفحص..." : "افحص ROAS الآن"}
          </button>
          <button onClick={fetchData} className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-full px-3 py-1.5 hover:text-blue-500 font-mono">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> تحديث
          </button>
        </div>
        <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">مركز الإعلانات <Megaphone className="w-4 h-4 text-rose-500" /></h3>
      </div>

      {/* SUMMARY STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "إجمالي الإنفاق", value: `${totalSpend.toLocaleString()}`, icon: DollarSign, color: "#3b82f6" },
          { label: "إجمالي العائد", value: `${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "#10b981" },
          { label: "متوسط ROAS", value: `${avgRoas}x`, icon: Target, color: "#f59e0b" },
          { label: "تحت العتبة", value: criticalCount, icon: AlertCircle, color: "#ef4444" },
        ].map((s, i) => (
          <div key={i} className="glass-panel rounded-[22px] p-4 flex flex-col gap-1">
            <s.icon className="w-5 h-5 mb-1" style={{ color: s.color }} />
            <p className="text-xl font-black font-mono" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[11px] text-gray-500 font-tajawal">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ROI RANKING TABLE & BURN RATE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* RANKING TABLE */}
        <div className="lg:col-span-8 glass-panel rounded-[24px] p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-mono font-bold">الأفضل</span>
              <span className="text-[10px] font-mono text-gray-400">→</span>
              <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-mono font-bold">الأسوأ</span>
            </div>
            <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">ترتيب الحملات (ROI) <Target className="w-4 h-4 text-emerald-500" /></h3>
          </div>
          
          <div className="flex flex-col gap-3">
            {rankedCampaigns.map((c, i) => {
              const colors = getRoasColor(c.roas);
              const isTop = i === 0;
              const isWorst = i === rankedCampaigns.length - 1;
              return (
                <div key={i} className={`rounded-2xl px-5 py-3 border flex items-center justify-between transition-transform hover:scale-[1.01] ${
                  isTop ? "bg-gradient-to-l from-emerald-50 to-teal-50 border-emerald-200 shadow-sm" :
                  isWorst ? "bg-gradient-to-l from-rose-50 to-red-50 border-rose-200 shadow-sm" :
                  "bg-white/60 border-slate-200"
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`text-lg font-black font-mono w-12 text-center ${colors.text}`}>{c.roas}x</div>
                    <div className="flex flex-col text-right">
                      <span className="text-xs font-bold text-slate-800 font-sans flex items-center gap-2">
                        {isTop && <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded">المركز 1</span>}
                        {isWorst && <span className="text-[10px] bg-rose-500 text-white px-1.5 py-0.5 rounded">خطر</span>}
                        {pausedCampaigns[c.name] && <span className="text-[10px] bg-slate-500 text-white px-1.5 py-0.5 rounded">متوقفة</span>}
                        <span className={pausedCampaigns[c.name] ? "opacity-50 line-through" : ""}>{c.name}</span>
                      </span>
                      <span className={`text-[10px] font-mono mt-0.5 ${pausedCampaigns[c.name] ? "text-slate-300" : "text-gray-500"}`}>
                        الإنفاق: {c.spend} | العائد: {c.revenue}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${pausedCampaigns[c.name] ? 'opacity-50' : ''}`} style={{ backgroundColor: PLATFORM_COLORS[c.platform] + "22", border: `1.5px solid ${PLATFORM_COLORS[c.platform]}` }}>
                      <span className="text-[8px] font-bold" style={{ color: PLATFORM_COLORS[c.platform] }}>{c.platform[0]}</span>
                    </div>
                    {c.roas >= ROAS_THRESHOLD ? <CheckCircle className={`w-4 h-4 text-emerald-500 ${pausedCampaigns[c.name] ? 'opacity-50' : ''}`} /> : <AlertCircle className={`w-4 h-4 text-rose-500 ${pausedCampaigns[c.name] ? 'opacity-50' : 'animate-pulse'}`} />}
                    <div className="w-px h-6 bg-gray-200 mx-1"></div>
                    <button onClick={() => toggleCampaign(c.name)} className="text-gray-400 hover:text-slate-700 transition-colors" title={pausedCampaigns[c.name] ? "إعادة تشغيل الحملة" : "إيقاف الحملة مؤقتاً"}>
                      {pausedCampaigns[c.name] ? <PlayCircle className="w-5 h-5 text-emerald-500" /> : <PauseCircle className="w-5 h-5 text-gray-400 hover:text-rose-500" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BURN RATE & CHART */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          
          {/* BUDGET BURN RATE */}
          <div className="glass-panel rounded-[24px] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">منطق الصرف</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">معدل حرق الميزانية <Flame className={`w-4 h-4 ${isPacingFast ? "text-rose-500 animate-pulse" : "text-amber-500"}`} /></h3>
            </div>
            
            <div className="flex flex-col gap-2 relative">
              <div className="flex justify-between items-end mb-1">
                <span className="text-lg font-black font-mono text-slate-800">{Math.round(burnRate)}%</span>
                <span className="text-[10px] text-gray-500 font-tajawal">ميزانية اليوم: {dailyBudget.toLocaleString()}</span>
              </div>
              
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden relative">
                {/* Time Elapsed Marker */}
                <div className="absolute top-0 bottom-0 border-l-2 border-slate-800 z-10" style={{ left: `${100 - timeElapsedPercent}%` }} />
                
                {/* Burn Rate Bar */}
                <div className={`h-full transition-all duration-500 ${isPacingFast ? "bg-rose-500" : "bg-emerald-500"}`} style={{ width: `${burnRate}%` }} />
              </div>
              
              <div className="flex justify-between items-center mt-1">
                <span className="text-[9px] font-mono text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> الوقت المنقضي: {Math.round(timeElapsedPercent)}%</span>
                {isPacingFast ? (
                  <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">الصرف سريع جداً!</span>
                ) : (
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">الصرف مثالي</span>
                )}
              </div>
            </div>
          </div>

          {/* SPEND VS REVENUE CHART (By Platform) */}
          <div className="glass-panel rounded-[24px] p-5 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Windsor</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal">أداء المنصات (إنفاق vs عائد)</h3>
            </div>
            <div className="flex-1 min-h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={platformData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
                  <XAxis dataKey="platform" type="category" tick={{ fontSize: 10, fill: "#9ca3af", fontFamily: "JetBrains Mono", fontWeight: "bold" }} axisLine={false} tickLine={false} />
                  <YAxis type="number" tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                  <Tooltip contentStyle={{ background: "rgba(255,255,255,0.95)", border: "none", borderRadius: 12, fontSize: 11 }} />
                  <Bar dataKey="spend" fill="#3b82f6" radius={[4, 4, 0, 0]} name="الإنفاق" barSize={12} />
                  <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} name="العائد" barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>

      {/* AI RECOMMENDATIONS */}
      <div className="glass-panel rounded-[24px] p-5 border-l-4 border-l-blue-500 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 font-tajawal">اقتراحات بوهو الذكية</h3>
        </div>
        <div className="flex flex-col md:flex-row gap-4 relative z-10">
          <div className="flex-1 bg-white/60 rounded-xl p-4 border border-blue-100 hover:border-blue-200 transition-colors">
            <p className="text-xs font-bold text-slate-700 font-tajawal leading-relaxed">
              💡 <span className="text-blue-600">نقل الميزانية:</span> أنصح بسحب 20% من ميزانية حملة <span className="font-mono text-[10px] bg-slate-100 px-1 rounded">Sealy - Snapchat Retarget</span> وتوجيهها إلى حملة <span className="font-mono text-[10px] bg-slate-100 px-1 rounded">iFilter - Meta Awareness</span> لأن الـ ROAS هناك أعلى بـ 3 أضعاف.
            </p>
          </div>
          <div className="flex-1 bg-white/60 rounded-xl p-4 border border-amber-100 hover:border-amber-200 transition-colors">
            <p className="text-xs font-bold text-slate-700 font-tajawal leading-relaxed">
              ⚠️ <span className="text-amber-600">تحذير حرق الميزانية:</span> معدل صرف الميزانية اليومية وصل 82% بينما لم يمر سوى نصف اليوم. راجع حملات جوجل PMax فوراً لأنها تستهلك بضعف المعدل الطبيعي.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
