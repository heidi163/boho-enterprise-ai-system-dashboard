import { useState } from "react";
import { TrendingUp, TrendingDown, PieChart, BarChart3, Activity, Target, Zap, DollarSign, BrainCircuit } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

const data = [
  { name: 'جوجل', spend: 4000, revenue: 16800, roas: 4.2 },
  { name: 'ميتا', spend: 3000, revenue: 9300, roas: 3.1 },
  { name: 'سناب', spend: 2000, revenue: 3600, roas: 1.8 },
  { name: 'تيك توك', spend: 1500, revenue: 4200, roas: 2.8 },
];

export default function BusinessIntelligencePage() {
  const [timeframe, setTimeframe] = useState("week");

  return (
    <div className="flex flex-col gap-6 w-full" dir="rtl">
      {/* HEADER */}
      <div className="glass-panel rounded-[24px] p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/20 p-2.5 rounded-2xl">
            <PieChart className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 font-sans tracking-tight">ذكاء الأعمال (BI)</h2>
            <p className="text-xs text-gray-500 font-tajawal mt-0.5">تحليلات العائد المالي (ROI) وأداء المنصات</p>
          </div>
        </div>
        
        <div className="flex bg-white/50 border border-slate-200 rounded-xl p-1">
          {["اليوم", "الأسبوع", "الشهر"].map((t, i) => {
            const val = ["day", "week", "month"][i];
            return (
              <button
                key={val}
                onClick={() => setTimeframe(val)}
                className={`px-4 py-1.5 text-xs font-tajawal font-bold rounded-lg transition-all ${
                  timeframe === val ? "bg-emerald-500 text-white shadow-sm" : "text-slate-500 hover:bg-white"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* KPI STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {[
          { label: "إجمالي الإيرادات", val: "33,900 EGP", change: "+14%", up: true, icon: DollarSign, color: "emerald" },
          { label: "إجمالي الإنفاق", val: "10,500 EGP", change: "-2%", up: true, icon: TrendingDown, color: "blue" },
          { label: "متوسط الـ ROAS", val: "3.2x", change: "+0.4", up: true, icon: Zap, color: "amber" },
          { label: "معدل التحويل (CR)", val: "4.8%", change: "-0.2%", up: false, icon: Target, color: "rose" },
        ].map((k, i) => (
          <div key={i} className="glass-panel rounded-[24px] p-5 relative overflow-hidden group">
            <div className={`absolute -right-4 -top-4 w-16 h-16 bg-${k.color}-500/5 rounded-full transition-transform group-hover:scale-150`} />
            <div className="flex items-center justify-between mb-3 relative">
              <div className={`p-2 rounded-xl bg-white shadow-sm border border-slate-100`}>
                <k.icon className={`w-4 h-4 text-${k.color}-500`} />
              </div>
              <span className={`text-[11px] font-mono font-bold flex items-center gap-0.5 px-2 py-0.5 rounded-full ${k.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {k.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} {k.change}
              </span>
            </div>
            <p className="text-2xl font-black font-mono text-slate-800 relative">{k.val}</p>
            <p className="text-xs text-slate-500 font-tajawal font-bold mt-1 relative">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* CHART SECTION */}
        <div className="lg:col-span-2 glass-panel rounded-[24px] p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">أداء المنصات الإعلانية <BarChart3 className="w-4 h-4 text-emerald-500" /></h3>
          </div>
          <div className="flex-1 min-h-[250px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b", fontFamily: "Tajawal" }} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b", fontFamily: "JetBrains Mono" }} tickFormatter={v => (v/1000) + 'k'} dx={-10} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#10b981", fontFamily: "JetBrains Mono" }} tickFormatter={v => v + 'x'} dx={10} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontFamily: 'Tajawal', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontFamily: 'Tajawal', paddingTop: '20px' }} />
                <Bar yAxisId="left" dataKey="revenue" name="الإيرادات" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar yAxisId="left" dataKey="spend" name="الإنفاق" fill="#94a3b8" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar yAxisId="right" dataKey="roas" name="ROAS" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI INSIGHTS */}
        <div className="glass-panel rounded-[24px] p-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">رؤى بوهو <BrainCircuit className="w-4 h-4 text-emerald-500" /></h3>
            <span className="text-[9px] font-mono bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">AI</span>
          </div>
          
          <div className="flex flex-col gap-4 flex-1">
            <div className="bg-white/50 border border-emerald-100 rounded-2xl p-4 hover:shadow-sm transition-shadow">
              <span className="flex items-center gap-2 text-[11px] text-emerald-600 font-bold font-tajawal mb-2">
                <TrendingUp className="w-3 h-3" /> فرصة لزيادة الميزانية
              </span>
              <p className="text-xs text-slate-700 font-tajawal leading-relaxed">
                حملات <span className="font-bold">جوجل</span> تحقق أفضل ROAS (4.2x). يُنصح بنقل 20% من ميزانية سناب شات إلى جوجل لتعظيم الأرباح.
              </p>
            </div>

            <div className="bg-white/50 border border-rose-100 rounded-2xl p-4 hover:shadow-sm transition-shadow">
              <span className="flex items-center gap-2 text-[11px] text-rose-600 font-bold font-tajawal mb-2">
                <TrendingDown className="w-3 h-3" /> نزيف ميزانية
              </span>
              <p className="text-xs text-slate-700 font-tajawal leading-relaxed">
                حملات <span className="font-bold">سناب شات</span> تحقق ROAS ضعيف (1.8x). الكريتيفز الحالية استُهلكت. أوقف الحملة مؤقتاً لحين تجديد الفيديوهات.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
