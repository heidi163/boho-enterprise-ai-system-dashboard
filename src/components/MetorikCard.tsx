import { useState, useEffect } from "react";
import { RefreshCw, ShoppingBag, CreditCard, ChevronRight, TrendingUp } from "lucide-react";
import { MetorikData } from "../types";

interface MetorikCardProps {
  refreshTrigger: number;
}

export default function MetorikCard({ refreshTrigger }: MetorikCardProps) {
  const [storeId, setStoreId] = useState<string>("149659"); // 149659 (iFilter, EGP) default
  const [data, setData] = useState<MetorikData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMetorik = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/mock/metorik?store_id=${id}`);
      const json = await response.json();
      setData(json);
    } catch (e) {
      console.error("Metorik fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetorik(storeId);
  }, [storeId, refreshTrigger]);

  const stats = data ? [
    {
      label: "مبيعات اليوم",
      value: `${data.todaySales.toLocaleString()} ${data.currency}`,
      yesterday: `${data.yesterdaySales.toLocaleString()} ${data.currency}`,
      orders: `${data.todayOrders} طلبات`,
      growth: data.todaySales > data.yesterdaySales ? "إيجابي" : "مستقر"
    },
    {
      label: "معدل السلة (AOV)",
      value: `${data.averageOrderValue.toLocaleString()} ${data.currency}`,
      orders: "متوسط الطلبات",
      growth: "مستقر"
    },
    {
      label: "نسبة التحويل",
      value: data.conversionRate,
      orders: "معدل الزيارات",
      growth: "نشط"
    }
  ] : [];

  return (
    <div 
      id="metorik-card" 
      className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[360px]"
    >
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => fetchMetorik(storeId)} 
          className="p-1.5 rounded-lg border border-slate-200/50 hover:bg-white/40 active:rotate-45 transition-all text-slate-500 cursor-pointer"
          title="مزامنة مع Metorik"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
        </button>

        <div className="flex items-center gap-1">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium font-mono animate-pulse">Metorik Live</span>
          <h3 className="font-bold text-slate-800 text-sm font-tajawal text-right">مبيعات متاجر التجزئة</h3>
        </div>
      </div>

      {/* Store Tab selector */}
      <div className="grid grid-cols-2 gap-2 bg-slate-200/40 p-1 rounded-xl mb-4 text-xs font-tajawal">
        <button
          onClick={() => setStoreId("143214")}
          className={`py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
            storeId === "143214" 
              ? "bg-white text-blue-600 shadow-sm" 
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Sealy السعودية (SAR)
        </button>

        <button
          onClick={() => setStoreId("149659")}
          className={`py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
            storeId === "149659" 
              ? "bg-white text-blue-600 shadow-sm" 
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          iFilter مصر (EGP)
        </button>
      </div>

      {loading && !data ? (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-2">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
          <span className="text-xs font-tajawal">جاري الاتصال بـ Metorik API...</span>
        </div>
      ) : (
        <div className="flex-grow flex flex-col justify-between">
          
          {/* Main Visual Sales Figures */}
          <div className="bg-white/40 rounded-2xl p-4 border border-white/60 flex items-center justify-between text-right dir-rtl mb-3">
            <div>
              <p className="text-[11px] text-gray-500 font-tajawal font-medium">مبيعات متجر {data?.storeName}</p>
              <h2 className="text-xl md:text-2xl font-bold font-mono text-blue-600 mt-1">
                {data?.todaySales.toLocaleString()} <span className="text-xs font-normal text-slate-500">{data?.currency}</span>
              </h2>
              <div className="flex gap-2 items-center mt-1">
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5" /> +12.4%
                </span>
                <span className="text-[11px] text-gray-400 font-tajawal">عن مبيعات الأمس</span>
              </div>
            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          {/* Quick Metrics grid */}
          <div className="grid grid-cols-2 gap-3 text-right">
            
            {/* Orders Metric */}
            <div className="bg-white/30 rounded-xl p-2 px-3 border border-white/40 flex flex-col justify-center">
              <span className="text-[10px] text-slate-500 font-sans font-medium">عدد الطلبات اليوم</span>
              <p className="text-base font-bold font-mono text-slate-800 mt-0.5">
                {data?.todayOrders} <span className="text-xs font-medium text-slate-400 font-tajawal">أوردر</span>
              </p>
              <span className="text-[9px] text-gray-400 font-sans mt-0.5">أمس: {data?.yesterdayOrders}</span>
            </div>

            {/* Average Ticket */}
            <div className="bg-white/30 rounded-xl p-2 px-3 border border-white/40 flex flex-col justify-center">
              <span className="text-[10px] text-slate-500 font-sans font-medium">معدل التحويل المتوقع</span>
              <p className="text-base font-bold font-mono text-emerald-600 mt-0.5">
                {data?.conversionRate}
              </p>
              <span className="text-[9px] text-gray-400 font-sans mt-0.5">هدف الوكالة الرسمي: 3.0%</span>
            </div>

          </div>

          {/* Active Orders Ticker Footer */}
          <div className="mt-3 flex items-center justify-between text-[11px] font-tajawal text-slate-500">
            <span className="font-medium text-blue-600 hover:underline cursor-pointer flex items-center">
              كل الأوردرات <ChevronRight className="w-3 h-3" />
            </span>
            <span className="text-gray-400">آخر عملية شراء: {data?.recentOrders?.[0]?.customer || "أحمد حامد"}</span>
          </div>

        </div>
      )}
    </div>
  );
}
