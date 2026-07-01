import { useState } from "react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart } from "recharts";
import { TrendingUp, Activity, BarChart2 } from "lucide-react";

const chartData = [
  { name: "يناير", Visitors: 2400, ROAS: 3.1, conversions: 110 },
  { name: "فبراير", Visitors: 3100, ROAS: 3.4, conversions: 140 },
  { name: "مارس", Visitors: 4200, ROAS: 3.9, conversions: 190 },
  { name: "أبريل", Visitors: 3800, ROAS: 3.2, conversions: 160 },
  { name: "مايو", Visitors: 4500, ROAS: 4.1, conversions: 220 },
  { name: "يونيو", Visitors: 5800, ROAS: 4.3, conversions: 280 }
];

export default function AnalyticsChart() {
  const [metric, setMetric] = useState<"ROAS" | "Visitors">("ROAS");

  return (
    <div 
      id="analytics-chart-panel" 
      className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[360px]"
    >
      {/* Header and Selectors */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex bg-slate-200/50 p-0.5 rounded-xl text-[11px] font-tajawal">
          <button 
            onClick={() => setMetric("Visitors")}
            className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${metric === "Visitors" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}
          >
            المشاهدات والزيارات
          </button>
          <button 
            onClick={() => setMetric("ROAS")}
            className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${metric === "ROAS" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}
          >
            العائد على الإعلانات (ROAS)
          </button>
        </div>

        <div className="flex items-center gap-1.5 self-end">
          <BarChart2 className="w-4 h-4 text-blue-500" />
          <h3 className="font-bold text-slate-800 text-sm font-tajawal text-right">تحليل النمو الإقليمي</h3>
        </div>
      </div>

      {/* Description */}
      <div className="flex justify-between items-center text-[11px] font-tajawal text-gray-500 mb-2 text-right dir-rtl">
        <p>التدفق الحالي للوكالة لمشروعي <span className="font-semibold text-blue-600">iFilter</span> و <span className="font-semibold text-purple-600">Sealy</span> (الربع الأول والثاني)</p>
        <span className="text-emerald-600 font-bold font-mono">● LIVE SYNCED</span>
      </div>

      {/* THE MASTERPIECE CHART CONTAINER */}
      <div className="flex-1 w-full min-h-[220px] max-h-[240px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
          >
            {/* SVG Defs block for Glowing Neon Shaders */}
            <defs>
              <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.03)" vertical={false} />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#64748b", fontSize: 10, fontFamily: "Tajawal" }} 
            />

            <YAxis 
              yAxisId="left"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#64748b", fontSize: 10 }}
              orientation="right"
            />
            
            <YAxis 
              yAxisId="right"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#3b82f6", fontSize: 10 }}
              orientation="left"
            />

            <Tooltip 
              contentStyle={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.8)",
                borderRadius: "16px",
                fontSize: "11px",
                fontFamily: "Tajawal",
                boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
              }}
              labelStyle={{ fontWeight: "bold", color: "#1e293b", textAlign: "right" }}
              itemStyle={{ textAlign: "right" }}
            />

            {/* FROSTED GLASS BAR CHART LAYOUT (Visitors count) */}
            <Bar 
              yAxisId="left"
              dataKey="Visitors" 
              name="الزيارات الشهرية"
              fill="rgba(59, 130, 246, 0.15)" 
              stroke="rgba(59, 130, 246, 0.35)"
              strokeWidth={1}
              radius={[6, 6, 0, 0]} 
              barSize={32}
            />

            {/* MONOTONE SPLINE NEON GLOWING LINE (ROAS trajectory) */}
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="ROAS" 
              name="مؤشر العائد الحالي"
              stroke="#2563eb" 
              strokeWidth={3} 
              dot={{ stroke: "#3b82f6", strokeWidth: 2, r: 4, fill: "#fff" }}
              activeDot={{ r: 6, stroke: "#1d4ed8", strokeWidth: 2 }}
              filter="url(#neon-glow)" // GLOW ATTACHMENT
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Trajectory statistics footer */}
      <div className="mt-2 flex items-center justify-between text-[11px] font-tajawal text-slate-500 border-t border-slate-100 pt-2 text-right dir-rtl">
        <div className="flex items-center gap-1.5 text-blue-600 font-bold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>ارتفاع ربع سنوي: +18.7%</span>
        </div>
        <span className="text-gray-400">آخر تحديث من Windsor: منذ دقيقتين</span>
      </div>
    </div>
  );
}
