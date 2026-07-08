import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { TrendingUp, TrendingDown, ShoppingBag, Package, Search, Send, DollarSign, Activity, Percent, BarChart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type Currency = "EGP" | "SAR" | "USD";
const RATES = { EGP: 1, SAR: 0.083, USD: 0.021 };

export default function SalesIntelligencePage({ activeCompany }: { activeCompany: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [currency, setCurrency] = useState<Currency>("EGP");

  const [storeData, setStoreData] = useState({ revenue: 0, orders: 0, aov: 0, abandonRate: 12 });

  useEffect(() => {
    const fetchSales = async () => {
      setLoading(true);
      try {
        const d = await api.get(`/api/sales?company_id=${activeCompany}`);
        const sales = d.sales || [];
        
        let rev = 0;
        let ord = 0;
        sales.forEach((s: any) => {
          if (s.name === "Revenue") rev += s.value;
          if (s.name === "Orders") ord += s.value;
        });
        
        const defaultRev = activeCompany === "bgk" ? 48320 : 25000;
        const defaultOrd = activeCompany === "bgk" ? 284 : 45;
        const defaultAov = activeCompany === "bgk" ? 170 : 555;

        setStoreData({
          revenue: rev || defaultRev, 
          orders: ord || defaultOrd, 
          aov: ord > 0 ? Math.round(rev/ord) : defaultAov, 
          abandonRate: activeCompany === "bgk" ? 12 : 5
        });
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    
    fetchSales();
  }, [activeCompany]);

  const convert = (val: number) => (val * RATES[currency]).toLocaleString(undefined, { maximumFractionDigits: 0 });

  const rawChartData = activeCompany === "bgk" ? [
    { name: "السبت", p1: 34000, p2: 21000 },
    { name: "الأحد", p1: 38000, p2: 23000 },
    { name: "الإثنين", p1: 36000, p2: 22000 },
    { name: "الثلاثاء", p1: 42000, p2: 26000 },
    { name: "الأربعاء", p1: 41000, p2: 25000 },
    { name: "الخميس", p1: 45000, p2: 29000 },
    { name: "الجمعة", p1: 48320, p2: 31000 },
  ] : [
    { name: "السبت", p1: 12000, p2: 8000 },
    { name: "الأحد", p1: 15000, p2: 9000 },
    { name: "الإثنين", p1: 18000, p2: 12000 },
    { name: "الثلاثاء", p1: 14000, p2: 11000 },
    { name: "الأربعاء", p1: 25000, p2: 15000 },
    { name: "الخميس", p1: 21000, p2: 13000 },
    { name: "الجمعة", p1: 32000, p2: 18000 },
  ];

  const chartData = rawChartData.map(d => ({
    name: d.name,
    p1: Math.round(d.p1 * RATES[currency]),
    p2: Math.round(d.p2 * RATES[currency]),
  }));

  const productLabel1 = activeCompany === "bgk" ? "iFilter" : "خدمات برمجية";
  const productLabel2 = activeCompany === "bgk" ? "Sealy" : "استشارات ذكاء اصطناعي";

  const topProducts = activeCompany === "bgk" ? [
    { name: "iFilter Pro Max", sales: 18200, orders: 94 },
    { name: "iFilter Classic", sales: 12800, orders: 71 },
    { name: "iFilter Mini", sales: 8900, orders: 52 },
    { name: "iFilter Bundle", sales: 6100, orders: 38 },
  ] : [
    { name: "نظام إدارة الشركات ERP", sales: 45000, orders: 5 },
    { name: "تطوير تطبيق موبايل", sales: 30000, orders: 8 },
    { name: "استضافة سيرفرات", sales: 8000, orders: 12 },
    { name: "باقة تصميم متكاملة", sales: 5000, orders: 4 },
  ];

  // Store Health Score calculation (Mock logic)
  const calculateHealth = (revenue: number, abandonRate: number) => {
    // Arbitrary formula for demo purposes
    const base = 50;
    const revScore = Math.min((revenue / 50000) * 40, 40); // Max 40 pts for rev
    const abandonScore = Math.max(10 - ((abandonRate - 10) * 1.5), 0); // Ideal abandon rate is <10%
    return Math.min(Math.round(base + revScore + abandonScore), 100);
  };
  const healthScore = calculateHealth(storeData.revenue, storeData.abandonRate);

  const getHealthColor = (score: number) => {
    if (score >= 85) return "text-emerald-500";
    if (score >= 70) return "text-amber-500";
    return "text-rose-500";
  };

  return (
    <div className="flex flex-col gap-6 w-full" dir="rtl">

      {/* HEADER WITH CURRENCY */}
      <div className="glass-panel rounded-[24px] p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white/50 border border-white/80 rounded-xl p-1">
          {["EGP", "SAR", "USD"].map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c as Currency)}
              className={`px-3 py-1.5 text-[10px] font-mono font-bold rounded-lg transition-all ${
                currency === c ? "bg-emerald-500 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">ذكاء المبيعات <ShoppingBag className="w-4 h-4 text-emerald-500" /></h3>
      </div>

      {/* STATS STRIP & HEALTH SCORE */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "إجمالي المبيعات", value: `${convert(storeData.revenue)}`, change: "+18%", icon: TrendingUp, color: "emerald", up: true },
          { label: "عدد الأوردورات", value: storeData.orders.toString(), change: "+12%", icon: Package, color: "emerald", up: true },
          { label: "متوسط قيمة الأوردر", value: `${convert(storeData.aov)}`, change: "+5%", icon: DollarSign, color: "emerald", up: true },
          { label: "عربات مهجورة", value: storeData.abandonRate.toString() + "%", change: "-3%", icon: TrendingDown, color: "rose", up: false },
        ].map((s, i) => (
          <div key={i} className="glass-panel rounded-[22px] p-4 relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-16 h-16 bg-${s.color}-500/5 rounded-br-[100%] transition-transform group-hover:scale-110`} />
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[11px] font-mono font-bold ${s.up ? 'text-emerald-500' : 'text-rose-500'} flex items-center gap-0.5`}>
                {s.change} {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              </span>
              <span className="text-[10px] text-gray-400 font-tajawal">الأسبوع</span>
            </div>
            <p className="text-xl font-black text-slate-800 font-mono mb-1">{s.value} <span className="text-xs">{currency}</span></p>
            <p className="text-[11px] text-slate-500 font-tajawal">{s.label}</p>
          </div>
        ))}
        
        {/* HEALTH SCORE DIAL */}
        <div className="glass-panel rounded-[22px] p-4 flex flex-col items-center justify-center relative overflow-hidden border-2 border-emerald-100 bg-gradient-to-tr from-emerald-50/50 to-transparent">
          <Activity className={`w-6 h-6 absolute top-3 left-3 opacity-20 ${getHealthColor(healthScore)}`} />
          <p className={`text-4xl font-black font-mono tracking-tighter ${getHealthColor(healthScore)}`}>{healthScore}</p>
          <p className="text-[10px] text-emerald-700 font-tajawal font-bold mt-1">صحة {activeCompany === "bgk" ? "المتجر (iFilter)" : "الأعمال (O2Nation)"}</p>
          <div className="w-full h-1.5 bg-slate-200 rounded-full mt-3 overflow-hidden flex justify-end">
            <div className={`h-full ${scoreToColorBg(healthScore)}`} style={{ width: `${healthScore}%` }} />
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="glass-panel rounded-[24px] p-5">
        <div className="flex items-center justify-between mb-6 text-right">
          <span className="text-[10px] font-mono text-gray-400 uppercase">بيانات حية</span>
          <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">مبيعات الأسبوع <Activity className="w-4 h-4 text-emerald-500" /></h3>
        </div>
        <div className="h-[200px] w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#9ca3af", fontFamily: "Tajawal" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#9ca3af", fontFamily: "JetBrains Mono" }} tickFormatter={v => (v/1000) + 'k'} dx={-10} orientation="right" />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontFamily: 'Tajawal', fontSize: '12px' }}
                formatter={(value: number) => [`${value.toLocaleString()} ${currency}`, '']}
              />
              <Line type="monotone" dataKey="p1" name={productLabel1} stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: "#10b981", stroke: "#fff", strokeWidth: 2 }} />
              <Line type="monotone" dataKey="p2" name={productLabel2} stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2"><div className="w-3 h-1 rounded-full bg-[#10b981]" /><span className="text-[11px] font-mono text-slate-600">{productLabel1}</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-1 rounded-full bg-[#3b82f6]" /><span className="text-[11px] font-mono text-slate-600">{productLabel2}</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* TOP PRODUCTS */}
        <div className="glass-panel rounded-[24px] p-5">
          <div className="flex items-center justify-between mb-4 text-right">
            <span className="text-[10px] font-mono text-gray-400 uppercase">أفضل 4</span>
            <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">أكثر المنتجات مبيعاً <Package className="w-4 h-4 text-emerald-500" /></h3>
          </div>
          <div className="flex flex-col gap-3 text-right">
            {topProducts.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/50 border border-white/80 hover:bg-white/80 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-black font-mono shrink-0">{i + 1}</div>
                  <span className="text-xs font-bold text-slate-800 font-tajawal">{p.name}</span>
                </div>
                <div className="text-left font-mono text-[11px] shrink-0 whitespace-nowrap">
                  <span className="font-bold text-slate-700">{convert(p.sales)}</span>
                  <span className="text-gray-400 ml-1">{currency}</span>
                  <span className="text-emerald-600 font-bold mr-3">{p.orders} طلب</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI QUERY */}
        <div className="glass-panel rounded-[24px] p-5 bg-gradient-to-bl from-white/60 to-emerald-50/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-gray-400 uppercase">استعلام ذكي</span>
            <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">اسأل بوهو عن المبيعات <Search className="w-4 h-4 text-blue-500" /></h3>
          </div>
          
          <div className="flex flex-col gap-3 h-full justify-center pb-4">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={activeCompany === "bgk" ? "إيه أكتر منتج اتباع من iFilter؟" : "كم عقد قفلناه الشهر ده؟"}
                className="w-full bg-white border border-emerald-100 rounded-2xl px-5 py-4 pr-24 text-sm font-tajawal text-slate-800 outline-none shadow-sm focus:border-emerald-300 transition-colors"
              />
              <button className="absolute right-2 top-2 bottom-2 px-4 bg-blue-500 text-white rounded-xl text-xs font-bold font-tajawal hover:bg-blue-600 transition-colors">
                اسأل
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-start mt-2">
              <button onClick={() => setQuery("مبيعات امبارح؟")} className="text-[10px] px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 font-tajawal hover:bg-blue-100 border border-blue-100">مبيعات امبارح؟</button>
              <button onClick={() => setQuery("أعلى يوم الأسبوع؟")} className="text-[10px] px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 font-tajawal hover:bg-blue-100 border border-blue-100">أعلى يوم الأسبوع؟</button>
              <button onClick={() => setQuery("تقرير الشهر؟")} className="text-[10px] px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 font-tajawal hover:bg-blue-100 border border-blue-100">تقرير الشهر؟</button>
            </div>
          </div>
        </div>

        {/* FORECASTING */}
        <div className="glass-panel rounded-[24px] p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-gray-400 uppercase">توقعات الذكاء الاصطناعي</span>
            <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">التنبؤ المالي للربع القادم <BarChart className="w-4 h-4 text-emerald-500" /></h3>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4">
              <span className="text-[10px] text-emerald-600 font-bold font-tajawal mb-1 block text-right">توقعات إيرادات ({productLabel1})</span>
              <div className="flex items-end justify-between">
                <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +24%</span>
                <span className="text-xl font-black font-mono text-slate-800">1.2M <span className="text-sm">{currency}</span></span>
              </div>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4">
              <span className="text-[10px] text-blue-600 font-bold font-tajawal mb-1 block text-right">توقعات النمو ({productLabel2})</span>
              <div className="flex items-end justify-between">
                <span className="text-[11px] font-bold text-blue-500 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +15%</span>
                <span className="text-xl font-black font-mono text-slate-800">850K <span className="text-sm">{currency}</span></span>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 font-tajawal leading-relaxed text-right mt-1">
              بوهو يتوقع هذا النمو بناءً على زيادة العائد على الإعلانات (ROAS) بنسبة 12% الأسبوع الماضي واستقرار معدل التحويل.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

function scoreToColorBg(score: number) {
  if (score >= 85) return "bg-emerald-500";
  if (score >= 70) return "bg-amber-500";
  return "bg-rose-500";
}
