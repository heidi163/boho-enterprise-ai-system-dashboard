import { useState } from "react";
import { TrendingUp, ShoppingBag, Zap, PieChart } from "lucide-react";

export default function BusinessIntelligencePage() {
  return (
    <div className="flex flex-col gap-6 w-full" dir="rtl">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-emerald-500/20 p-2 rounded-xl">
          <PieChart className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-800 font-sans">ذكاء الأعمال (BI)</h2>
          <p className="text-xs text-gray-500 font-tajawal">مبيعات iFilter, إعلانات Sealy، والتنبؤ (Forecasting)</p>
        </div>
      </div>
      
      <div className="glass-panel rounded-[24px] p-8 flex items-center justify-center min-h-[400px]">
        <p className="text-slate-400 font-tajawal text-sm animate-pulse">جاري دمج بيانات المبيعات والإعلانات هنا...</p>
      </div>
    </div>
  );
}
