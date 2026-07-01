import { useState } from "react";
import { Bell, Send, MessageSquare, Clock, Calendar, Zap, CheckCircle, Settings, Activity, Radio, Sparkles } from "lucide-react";

const BRIEFING_HISTORY = [
  { date: "اليوم 09:15", text: "يا أحمد باشا، مبيعات iFilter امبارح وصلت 48 ألف جنيه، متجاوزة الهدف بـ 18%. Sealy في السعودية حققت 31 ألف ريال. ROAS الميتا تمام عند 3.4. في تنبيه واحد: Sealy سناب تحت 2.0 محتاج تشوفه. عندك اجتماع الساعة 3 النهارده.", status: "sent", isSmart: true },
  { date: "أمس 09:00", text: "صباح الخير يا هندسة! مبيعات iFilter أمس 41 ألف، Sealy 28 ألف ريال. ROAS ممتاز فوق 3.0 في كل الحملات. خلصت كل مهام الأمس ما عدا تقرير العميل. النهارده يوم شغل.", status: "sent", isSmart: false },
];

const ALERT_RULES = [
  { id: 1, label: "ROAS تحت العتبة", threshold: "< 2.0", platform: "Windsor - كل الحسابات", active: true },
  { id: 2, label: "مبيعات يومية منخفضة", threshold: "< 30,000 EGP", platform: "Metorik - iFilter", active: true },
  { id: 3, label: "Spend تجاوز الميزانية", threshold: "> 110%", platform: "Windsor - Meta", active: false },
];

export default function ProactiveCenterPage() {
  const [briefingTime, setBriefingTime] = useState("09:00");
  const [roasCheckInterval, setRoasCheckInterval] = useState("3h");
  const [telegramConnected, setTelegramConnected] = useState(true);
  const [alertRules, setAlertRules] = useState(ALERT_RULES);
  const [briefingHistory, setBriefingHistory] = useState(BRIEFING_HISTORY);
  
  const [manualBriefLoading, setManualBriefLoading] = useState(false);
  const [manualRoasLoading, setManualRoasLoading] = useState(false);
  const [n8nStatus] = useState({ briefingCron: "active", roasAlert: "active", lastRun: "09:15" });

  // Smart Timing State
  const [isSmartTiming, setIsSmartTiming] = useState(true);

  const triggerBriefing = async () => {
    setManualBriefLoading(true);
    try {
      const res = await fetch("/api/briefing", { method: "POST" });
      const d = await res.json();
      setBriefingHistory(prev => [{ 
        date: "الآن " + new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }), 
        text: d.briefing || "تم توليد البريفنج.", 
        status: "sent",
        isSmart: false
      }, ...prev]);
      if ("speechSynthesis" in window && d.briefing) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(d.briefing);
        const ar = window.speechSynthesis.getVoices().find(v => v.lang.startsWith("ar"));
        if (ar) u.voice = ar;
        u.rate = 0.92;
        window.speechSynthesis.speak(u);
      }
    } catch {}
    setManualBriefLoading(false);
  };

  const triggerRoasCheck = async () => {
    setManualRoasLoading(true);
    try {
      await fetch("/api/alert/roas", { method: "POST" });
    } catch {}
    setManualRoasLoading(false);
  };

  const toggleRule = (id: number) => {
    setAlertRules(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  return (
    <div className="flex flex-col gap-6 w-full" dir="rtl">

      {/* HEADER */}
      <div className="glass-panel rounded-[24px] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={triggerRoasCheck} disabled={manualRoasLoading} className="flex items-center gap-1.5 text-xs text-white bg-gradient-to-l from-rose-500 to-red-600 rounded-full px-4 py-1.5 font-bold hover:opacity-90 disabled:opacity-50 transition-opacity shadow-sm">
            <Zap className="w-3.5 h-3.5" /> {manualRoasLoading ? "جارٍ الفحص..." : "فحص ROAS الآن"}
          </button>
          <button onClick={triggerBriefing} disabled={manualBriefLoading} className="flex items-center gap-1.5 text-xs text-white bg-gradient-to-l from-blue-500 to-blue-600 rounded-full px-4 py-1.5 font-bold hover:opacity-90 disabled:opacity-50 transition-opacity shadow-sm">
            <MessageSquare className="w-3.5 h-3.5" /> {manualBriefLoading ? "بوهو بيجهز..." : "بريفنج الآن"}
          </button>
        </div>
        <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">مركز المبادرة <Radio className="w-4 h-4 text-blue-500 animate-pulse" /></h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* CONTROLS (Right Side) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          
          {/* SMART TIMING PANEL */}
          <div className={`glass-panel rounded-[24px] p-5 transition-all duration-500 ${isSmartTiming ? "bg-gradient-to-br from-sky-50/80 to-sky-50/30 border-sky-200" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Boho AI Engine</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">توقيت البريفنج الذكي <Sparkles className={`w-4 h-4 ${isSmartTiming ? "text-sky-500" : "text-gray-400"}`} /></h3>
            </div>

            <div className="flex items-center justify-between bg-white/60 rounded-xl p-3 border border-white/80 mb-4 shadow-sm">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-700 font-tajawal">توقيت ذكي (AI)</p>
                <p className="text-[9px] text-gray-500 font-tajawal">بوهو بيحلل الكالندر ونشاطك عشان يبعت البريفنج في الوقت الصح</p>
              </div>
              <button onClick={() => setIsSmartTiming(!isSmartTiming)} className={`w-10 h-5 rounded-full transition-colors relative shrink-0 ${isSmartTiming ? "bg-sky-500" : "bg-slate-200"}`}>
                <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${isSmartTiming ? "right-0.5" : "left-0.5"}`} />
              </button>
            </div>

            {isSmartTiming ? (
              <div className="bg-white/40 border border-sky-100 rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black font-mono text-sky-700">09:15 AM</span>
                  <span className="text-[10px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-bold">موعد اليوم المقترح</span>
                </div>
                <div className="text-[10px] text-slate-600 font-tajawal leading-relaxed bg-white/50 p-2 rounded-lg border border-white/60">
                  <span className="font-bold text-sky-600">تحليل بوهو:</span> لاحظت إنك عندك اجتماع الساعة 9:30، ودايماً بتفتح الداشبورد 9:10. البريفنج هيوصلك 9:15 عشان يكون معاك وقت تقرأ براحتك قبل الاجتماع وتلحق تشرب القهوة.
                </div>
              </div>
            ) : (
              <div className="bg-white/40 border border-slate-100 rounded-xl p-4 flex items-center justify-between">
                <input type="time" value={briefingTime} onChange={e => setBriefingTime(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-mono text-slate-700 outline-none focus:border-blue-300" />
                <span className="text-xs text-slate-600 font-tajawal font-bold">وقت ثابت يومياً</span>
              </div>
            )}
          </div>

          {/* TELEGRAM & N8N STATUS */}
          <div className="glass-panel rounded-[24px] p-5">
            <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-4">حالة الاتصال والجدولة <Settings className="w-4 h-4 text-slate-500" /></h3>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between bg-white/50 rounded-xl px-4 py-3 border border-white/80">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${telegramConnected ? "bg-blue-500 animate-pulse" : "bg-slate-300"}`} />
                  <span className="text-[10px] font-mono text-slate-600 font-bold">معرف تليجرام: @ahmed_bgk_bot</span>
                </div>
                <Send className="w-4 h-4 text-blue-500" />
              </div>

              <div className="flex items-center justify-between bg-white/50 rounded-xl px-4 py-3 border border-white/80">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">Cron يعمل</span>
                  <span className="text-[8px] font-mono text-gray-400 mt-0.5">آخر تشغيل: {n8nStatus.lastRun}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-600 font-bold">محرك n8n</span>
                  <Activity className="w-4 h-4 text-emerald-500" />
                </div>
              </div>

              <div className="flex items-center justify-between bg-white/50 rounded-xl px-4 py-3 border border-white/80">
                <select value={roasCheckInterval} onChange={e => setRoasCheckInterval(e.target.value)} className="bg-transparent text-[10px] font-mono font-bold text-slate-600 outline-none cursor-pointer">
                  <option value="1h">كل ساعة</option>
                  <option value="3h">كل 3 ساعات</option>
                  <option value="6h">كل 6 ساعات</option>
                </select>
                <span className="text-[10px] font-tajawal font-bold text-slate-700">دورية فحص الحملات (ROAS)</span>
              </div>
            </div>
          </div>
        </div>

        {/* LOGS AND RULES (Left Side) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          
          {/* ALERT RULES */}
          <div className="glass-panel rounded-[24px] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">proactive_server.py</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">قواعد التنبيه <Bell className="w-4 h-4 text-rose-500" /></h3>
            </div>
            <div className="flex flex-col gap-2">
              {alertRules.map(r => (
                <div key={r.id} className={`rounded-xl px-4 py-3 border flex items-center justify-between transition-all ${r.active ? "bg-white/60 border-white/80" : "bg-slate-50 border-slate-200 opacity-60"}`}>
                  <div className="flex items-center gap-3">
                    <button onClick={() => toggleRule(r.id)} className={`w-9 h-5 rounded-full transition-colors relative ${r.active ? "bg-emerald-500" : "bg-slate-300"}`}>
                      <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${r.active ? "right-0.5" : "left-0.5"}`} />
                    </button>
                    <span className="text-[9px] font-mono text-gray-400 bg-white/50 px-1.5 py-0.5 rounded">{r.platform}</span>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <span className="text-[10px] font-mono text-rose-500 font-bold bg-rose-50 px-1.5 py-0.5 rounded">{r.threshold}</span>
                    <p className="text-xs font-bold text-slate-700 font-tajawal">{r.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BRIEFING HISTORY */}
          <div className="glass-panel rounded-[24px] p-5 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">سجل تليجرام</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">سجل الرسائل المرسلة <Clock className="w-4 h-4 text-blue-500" /></h3>
            </div>
            <div className="flex-1 overflow-y-auto sidebar-scroll pr-1 flex flex-col gap-3">
              {briefingHistory.map((b, i) => (
                <div key={i} className="border border-white/80 rounded-2xl p-4 bg-white/50 shadow-sm relative overflow-hidden">
                  {b.isSmart && <div className="absolute top-0 right-0 w-8 h-8 bg-sky-500/10 rounded-bl-full flex items-start justify-end p-1.5"><Sparkles className="w-3 h-3 text-sky-500" /></div>}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[9px] font-mono text-emerald-600 font-bold">مُرسل</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {b.isSmart && <span className="text-[8px] bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded font-mono font-bold">توقيت ذكي</span>}
                      <span className="text-[10px] font-mono text-gray-400">{b.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 font-tajawal leading-relaxed text-right mt-1">{b.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
