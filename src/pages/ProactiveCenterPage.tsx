import { useState, useEffect, useRef } from "react";
import { Bell, Send, MessageSquare, Clock, Calendar, Zap, CheckCircle, Settings, Activity, Radio, Sparkles, Terminal, ShieldAlert, Check } from "lucide-react";

const BRIEFING_HISTORY = [
  { 
    id: 1,
    date: "اليوم 09:15", 
    text: "مرحباً أحمد، مبيعات iFilter بالأمس وصلت 48 ألف جنيه، متجاوزة الهدف بـ 18%. Sealy في السعودية حققت 31 ألف ريال. ROAS ميتا مستقر عند 3.4. يوجد تنبيه: Sealy سناب شات تحت 2.0. هل ترغب في إيقاف الحملة مؤقتاً؟", 
    status: "sent", 
    isSmart: true,
    actionable: true,
    actionTaken: false
  },
  { 
    id: 2,
    date: "أمس 09:00", 
    text: "صباح الخير أحمد. تقرير الأمس: مبيعات iFilter 41 ألف، Sealy 28 ألف ريال. ROAS ممتاز فوق 3.0 في كافة الحملات. تم إنجاز معظم المهام المجدولة لليوم السابق.", 
    status: "sent", 
    isSmart: false,
    actionable: false,
    actionTaken: false
  },
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

  const [isSmartTiming, setIsSmartTiming] = useState(true);

  // Terminal Logs State
  const [logs, setLogs] = useState<string[]>([
    "> [16:00:12] Initializing Boho AI Proactive Engine...",
    "> [16:01:05] Scanning Meta Ads (Windsor.ai) for account: iFilter...",
    "> [16:01:08] ROAS threshold check passed (3.4 > 2.0)."
  ]);

  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const possibleLogs = [
        "> [SYSTEM] Fetching Metorik orders data...",
        "> [SYSTEM] Syncing ClickUp tasks for tomorrow...",
        "> [ALERT_CHECK] ROAS check initiated...",
        "> [ALERT_CHECK] All campaigns operating within parameters.",
        "> [AI_ENGINE] Analyzing calendar for optimal briefing time..."
      ];
      const randomLog = possibleLogs[Math.floor(Math.random() * possibleLogs.length)];
      const time = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second:"2-digit" });
      setLogs(prev => [...prev.slice(-4), `> [${time}] ${randomLog.replace('> [SYSTEM]', '').replace('> [ALERT_CHECK]', '').replace('> [AI_ENGINE]', '')}`]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const triggerBriefing = async () => {
    setManualBriefLoading(true);
    try {
      const res = await fetch("/api/briefing", { method: "POST" });
      const d = await res.json();
      setBriefingHistory(prev => [{ 
        id: Date.now(),
        date: "الآن " + new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }), 
        text: d.briefing || "تم إرسال ملخص الأداء.", 
        status: "sent",
        isSmart: false,
        actionable: false,
        actionTaken: false
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
      setLogs(prev => [...prev.slice(-4), `> [${new Date().toLocaleTimeString("en-GB")}] MANUAL ROAS SCAN INITIATED...`]);
    } catch {}
    setManualRoasLoading(false);
  };

  const toggleRule = (id: number) => {
    setAlertRules(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const handleAction = (id: number) => {
    setBriefingHistory(prev => prev.map(b => b.id === id ? { ...b, actionTaken: true } : b));
  };

  return (
    <div className="flex flex-col gap-5 w-full" dir="rtl">

      {/* HEADER & TOP STATUS BAR */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="glass-panel rounded-full px-5 py-2.5 flex items-center gap-6 w-full md:w-auto shadow-sm">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${telegramConnected ? "bg-blue-500 animate-pulse" : "bg-slate-300"}`} />
            <span className="text-[10px] font-mono text-slate-600 font-bold flex items-center gap-1.5"><Send className="w-3 h-3 text-blue-500" /> @ahmed_bgk_bot</span>
          </div>
          <div className="w-px h-4 bg-slate-200" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-slate-600 font-bold flex items-center gap-1.5"><Activity className="w-3 h-3 text-emerald-500" /> n8n Engine</span>
          </div>
          <div className="w-px h-4 bg-slate-200 hidden md:block" />
          <div className="hidden md:flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-500 font-bold flex items-center gap-1.5"><Clock className="w-3 h-3 text-slate-400" /> Cron: {n8nStatus.lastRun}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button onClick={triggerRoasCheck} disabled={manualRoasLoading} className="flex items-center gap-1.5 text-xs text-white bg-gradient-to-l from-rose-500 to-red-600 rounded-full px-4 py-2 font-bold hover:opacity-90 disabled:opacity-50 transition-opacity shadow-sm">
            <Zap className="w-3.5 h-3.5" /> {manualRoasLoading ? "جارٍ الفحص..." : "فحص ROAS الآن"}
          </button>
          <button onClick={triggerBriefing} disabled={manualBriefLoading} className="flex items-center gap-1.5 text-xs text-white bg-gradient-to-l from-blue-500 to-blue-600 rounded-full px-4 py-2 font-bold hover:opacity-90 disabled:opacity-50 transition-opacity shadow-sm">
            <MessageSquare className="w-3.5 h-3.5" /> {manualBriefLoading ? "بوهو بيجهز..." : "بريفنج الآن"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* RIGHT COLUMN: TRIGGERS & RULES (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          
          {/* SMART TIMING PANEL */}
          <div className={`glass-panel rounded-[24px] p-5 transition-all duration-500 border-t-4 ${isSmartTiming ? "border-t-sky-400" : "border-t-slate-300"}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Boho AI Engine</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">توقيت البريفنج الذكي <Sparkles className={`w-4 h-4 ${isSmartTiming ? "text-sky-500" : "text-gray-400"}`} /></h3>
            </div>

            <div className="flex items-center justify-between bg-white/60 rounded-xl p-3 border border-white/80 mb-4 shadow-sm">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-700 font-tajawal">توقيت ذكي (AI)</p>
                <p className="text-[9px] text-gray-500 font-tajawal">تحليل الجدول الزمني لاختيار أفضل وقت</p>
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
                <div className="text-[11px] text-slate-700 font-tajawal leading-relaxed bg-white/50 p-2 rounded-lg border border-white/60">
                  <span className="font-bold text-sky-600">تحليل بوهو:</span> لديك اجتماع الساعة 9:30، ونشاطك على النظام يبدأ عادة 9:10. إرسال البريفنج 9:15 سيمنحك وقتاً كافياً للقراءة قبل الاجتماع.
                </div>
              </div>
            ) : (
              <div className="bg-white/40 border border-slate-100 rounded-xl p-4 flex items-center justify-between">
                <input type="time" value={briefingTime} onChange={e => setBriefingTime(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-mono text-slate-700 outline-none focus:border-blue-300" />
                <span className="text-xs text-slate-600 font-tajawal font-bold">وقت ثابت يومياً</span>
              </div>
            )}
          </div>

          {/* ALERT RULES */}
          <div className="glass-panel rounded-[24px] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">proactive_server.py</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">قواعد التنبيه <Bell className="w-4 h-4 text-rose-500" /></h3>
            </div>
            
            <div className="flex items-center justify-between bg-white/50 rounded-xl px-4 py-3 border border-white/80 mb-3">
              <select value={roasCheckInterval} onChange={e => setRoasCheckInterval(e.target.value)} className="bg-transparent text-[10px] font-mono font-bold text-blue-600 outline-none cursor-pointer text-left">
                <option value="1h">كل ساعة</option>
                <option value="3h">كل 3 ساعات</option>
                <option value="6h">كل 6 ساعات</option>
              </select>
              <span className="text-[10px] font-tajawal font-bold text-slate-700">دورية الفحص (Cron)</span>
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
              <button className="mt-2 w-full flex items-center justify-center text-[11px] font-bold text-slate-500 border border-dashed border-slate-300 rounded-xl py-2 hover:bg-slate-50 transition-colors">
                + إضافة قاعدة جديدة
              </button>
            </div>
          </div>
        </div>

        {/* LEFT COLUMN: ACTIONS & LOGS (col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          
          {/* LIVE AI TERMINAL */}
          <div className="glass-panel rounded-[24px] p-5 bg-slate-900 border-none relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
            <div className="flex items-center justify-between mb-3 relative z-10 border-b border-slate-700 pb-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <h3 className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> BOHO_ENGINE_LIVE</h3>
            </div>
            
            <div className="h-[100px] w-full overflow-hidden flex flex-col justify-end font-mono text-[10px] leading-relaxed relative z-10">
               {logs.map((log, i) => (
                 <div key={i} className={`${i === logs.length - 1 ? 'text-emerald-400 font-bold' : 'text-slate-500'} animate-fade-in`}>
                   {log}
                 </div>
               ))}
               <div className="flex items-center mt-1">
                 <span className="text-blue-400 animate-pulse">_</span>
               </div>
            </div>
          </div>

          {/* BRIEFING HISTORY */}
          <div className="glass-panel rounded-[24px] p-5 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Telegram Logs</span>
              <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">سجل الأوامر والتنبيهات <Clock className="w-4 h-4 text-blue-500" /></h3>
            </div>
            <div className="flex-1 overflow-y-auto sidebar-scroll pr-1 flex flex-col gap-4">
              {briefingHistory.map((b) => (
                <div key={b.id} className="border border-white/80 rounded-2xl p-4 bg-white/50 shadow-sm relative overflow-hidden transition-all hover:shadow-md">
                  {b.isSmart && <div className="absolute top-0 right-0 w-8 h-8 bg-sky-500/10 rounded-bl-full flex items-start justify-end p-1.5"><Sparkles className="w-3 h-3 text-sky-500" /></div>}
                  <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[9px] font-mono text-emerald-600 font-bold">مُرسل لـ Telegram</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {b.isSmart && <span className="text-[8px] bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded font-mono font-bold">توقيت ذكي</span>}
                      <span className="text-[10px] font-mono text-gray-400">{b.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 font-tajawal leading-relaxed text-right mt-1">{b.text}</p>
                  
                  {b.actionable && !b.actionTaken && (
                    <div className="mt-4 flex items-center justify-end gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <button className="px-3 py-1.5 rounded-lg text-xs font-tajawal font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition-colors">
                        تجاهل
                      </button>
                      <button onClick={() => handleAction(b.id)} className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-tajawal font-bold text-white bg-rose-500 hover:bg-rose-600 transition-colors shadow-sm">
                        <ShieldAlert className="w-3.5 h-3.5" /> الموافقة على الإيقاف
                      </button>
                    </div>
                  )}
                  {b.actionTaken && (
                    <div className="mt-4 flex items-center justify-end gap-1.5 text-xs font-tajawal font-bold text-emerald-600 bg-emerald-50 p-2 rounded-xl border border-emerald-100">
                      <Check className="w-3.5 h-3.5" /> تم اتخاذ الإجراء بنجاح
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
