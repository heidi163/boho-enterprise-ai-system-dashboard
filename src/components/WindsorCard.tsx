import { useState, useEffect } from "react";
import { Sliders, RefreshCw, AlertCircle, TrendingUp, DollarSign, Sparkles } from "lucide-react";
import { WindsorData, AdCampaign } from "../types";

interface WindsorCardProps {
  refreshTrigger: number;
}

export default function WindsorCard({ refreshTrigger }: WindsorCardProps) {
  const [data, setData] = useState<WindsorData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Interactive marketing model simulator values
  const [extraMetaBudget, setExtraMetaBudget] = useState<number>(50); // EGP thousands
  
  const fetchWindsor = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/mock/windsor");
      const json = await response.json();
      setData(json);
    } catch (e) {
      console.error("Windsor ad data fetch failure:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWindsor();
  }, [refreshTrigger]);

  // Perform a simulated mathematical calculation to display to the user if they interact
  const getSimulatedROAS = (originalRoas: number, ratio: number) => {
    // Diminishing returns calculation
    const budgetFactor = Math.max(0.7, 1.2 - (ratio / 300));
    return parseFloat((originalRoas * budgetFactor).toFixed(2));
  };

  return (
    <div 
      id="windsor-card" 
      className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[360px]"
    >
      {/* Header and Sync */}
      <div className="flex items-center justify-between mb-3">
        <button 
          onClick={fetchWindsor} 
          className="p-1.5 rounded-lg border border-slate-200/50 hover:bg-white/40 active:rotate-45 transition-all text-slate-500 cursor-pointer"
          title="تحديث بيانات الإعلانات"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
        </button>

        <div className="flex items-center gap-1">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-100 text-violet-800 font-medium font-mono">Windsor.ai</span>
          <h3 className="font-bold text-slate-800 text-sm font-tajawal text-right">أداء الحملات الإعلانية</h3>
        </div>
      </div>

      {loading && !data ? (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-2">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
          <span className="text-xs font-tajawal">سحب تحليلات الإعلانات...</span>
        </div>
      ) : (
        <div className="flex-grow flex flex-col justify-between gap-2.5">
          
          {/* Ad Accounts List */}
          <div className="flex flex-col gap-2 relative">
            {data?.accounts.map((acc: AdCampaign, idx) => {
              const isBelowThreshold = acc.roas < 2.2;
              
              return (
                <div 
                  key={idx} 
                  className={`p-2.5 px-3 rounded-xl border flex items-center justify-between text-right dir-rtl transition-colors ${
                    isBelowThreshold 
                      ? "bg-rose-50/75 border-rose-200/75 hover:bg-rose-50" 
                      : "bg-white/30 border-white/55 hover:bg-white/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {/* Blink red warning indicator if ROAS is low */}
                    {isBelowThreshold ? (
                      <div className="relative flex h-3.5 w-3.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 flex items-center justify-center text-[10px] text-white">!</span>
                      </div>
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    )}

                    <div>
                      <h4 className="font-semibold text-xs font-tajawal text-slate-800 leading-tight">{acc.name}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">الصرف اليومي: {acc.spend}</p>
                    </div>
                  </div>

                  {/* ROAS Badge display */}
                  <div className="text-left font-mono">
                    <p className={`text-sm font-bold ${isBelowThreshold ? "text-rose-600" : "text-emerald-600"}`}>
                      {getSimulatedROAS(acc.roas, acc.name.includes("Meta") ? extraMetaBudget : 0)}x
                    </p>
                    <span className="text-[9px] text-gray-400 font-sans block">ROAS</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Real-time slider simulator */}
          <div className="bg-blue-50/50 rounded-xl p-2.5 border border-blue-100 flex flex-col justify-center text-right dir-rtl">
            <div className="flex justify-between items-center text-[10px] font-tajawal text-slate-600 mb-1">
              <span className="font-bold text-blue-600">+{extraMetaBudget} ألف EGP</span>
              <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-amber-500" /> محاكاة رصد ميزانية إضافية لـ Meta</span>
            </div>
            
            <input 
              type="range" 
              min="0" 
              max="200" 
              value={extraMetaBudget}
              onChange={(e) => setExtraMetaBudget(Number(e.target.value))}
              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-300 accent-blue-600"
            />
            
            <div className="flex justify-between text-[9px] font-mono text-slate-400 mt-1">
              <span>تراجع ROAS التدريجي: -{((extraMetaBudget/200)*35).toFixed(0)}%</span>
              <span>المبيعات المتوقعة: +{(extraMetaBudget * 4 * (1 - (extraMetaBudget / 600))).toFixed(0)} ألف EGP</span>
            </div>
          </div>

          {/* Campaign Overview Summary Ticker */}
          <p className="flex items-center justify-center gap-1.5 text-[11px] font-tajawal text-slate-500 text-center bg-slate-100/40 py-1 rounded">
            <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
            <span className="font-medium text-slate-700">معدل ROAS مجمع الوكالة:</span> {data?.overallSummary || "3.4"}
          </p>

        </div>
      )}
    </div>
  );
}
