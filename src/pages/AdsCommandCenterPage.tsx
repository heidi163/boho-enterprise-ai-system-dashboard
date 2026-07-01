import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { Megaphone, TrendingUp, AlertCircle, CheckCircle, RefreshCw, Zap, Target, DollarSign, Clock, Flame } from "lucide-react";
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

  const spendRevenueData = rankedCampaigns.map(c => ({
    name: c.name.split(" - ")[0] + "\n" + c.platform,
    spend: c.spend,
    revenue: c.revenue,
  }));

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
          <button onClick={() => setManualCheckLoading(true)} disabled={manualCheckLoading} className="flex items-center gap-1.5 text-xs text-white bg-gradient-to-l from-rose-500 to-red-600 rounded-full px-4 py-1.5 hover:opacity-90 disabled:opacity-50 font-bold">
            <Zap className="w-3.5 h-3.5" /> {manualCheckLoading ? "جارٍ الفحص..." : "افحص ROAS الآن"}
          </button>
          <button onClick={fetchData} className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-full px-3 py-1.5 hover:text-indigo-500 font-mono">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> تحديث
          </button>
        </div>
        <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">مركز الإعلانات <Megaphone className="w-4 h-4 text-rose-500" /></h3>
      </div>

      {/* SUMMARY STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "إجمالي الإنفاق", value: `${totalSpend.toLocaleString()}`, icon: DollarSign, color: "#6366f1" },
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
                        {c.name}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500 mt-0.5">
                        الإنفاق: {c.spend} | العائد: {c.revenue}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: PLATFORM_COLORS[c.platform] + "22", border: `1.5px solid ${PLATFORM_COLORS[c.platform]}` }}>
                      <span className="text-[8px] font-bold" style={{ color: PLATFORM_COLORS[c.platform] }}>{c.platform[0]}</span>
                    </div>
                    {c.roas >= ROAS_THRESHOLD ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-rose-500 animate-pulse" />}
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

          {/* SPEND VS REVENUE CHART */}
          <div className="glass-panel rounded-[24px] p-5 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Windsor</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal">إنفاق vs عائد</h3>
            </div>
            <div className="flex-1 min-h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spendRevenueData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fill: "#9ca3af", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} width={80} />
                  <Tooltip contentStyle={{ background: "rgba(255,255,255,0.95)", border: "none", borderRadius: 12, fontSize: 11 }} />
                  <Bar dataKey="spend" fill="#6366f1" radius={[0, 4, 4, 0]} name="الإنفاق" />
                  <Bar dataKey="revenue" fill="#10b981" radius={[0, 4, 4, 0]} name="العائد" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
