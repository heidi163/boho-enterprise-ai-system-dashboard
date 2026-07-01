import { useState, useEffect } from "react";
import { api } from "./lib/api";
import { AlertCircle, Activity, Clock, Wifi, Lock } from "lucide-react";
import Sidebar from "./components/Sidebar";
import VoiceOrbCard from "./components/VoiceOrbCard";

// 8 Pages
import MissionControlPage from "./pages/MissionControlPage";
import DeepBrainPage from "./pages/DeepBrainPage";
import SalesIntelligencePage from "./pages/SalesIntelligencePage";
import AdsCommandCenterPage from "./pages/AdsCommandCenterPage";
import VoicePersonalityLabPage from "./pages/VoicePersonalityLabPage";
import TaskManagerPage from "./pages/TaskManagerPage";
import ProactiveCenterPage from "./pages/ProactiveCenterPage";
import SystemHealthPage from "./pages/SystemHealthPage";
import KnowledgeBasePage from "./pages/KnowledgeBasePage";
import CalendarPage from "./pages/CalendarPage";
import SettingsPage from "./pages/SettingsPage";

import { Message } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("mission");
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [aiLogs, setAiLogs] = useState<Message[]>([
    { role: "model", content: "يا غالي، بوهو هنا! جاهز للتحليلات اليومية وإدارة مشاريع BGK." }
  ]);

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("boho_token"));
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);


  const handleRefreshAll = () => setRefreshTrigger(prev => prev + 1);
  const handleAILog = (msg: Message) => setAiLogs(prev => [...prev, msg]);

  const PAGE_MAP: Record<string, React.ReactNode> = {
    mission: <MissionControlPage />,
    deepbrain: <DeepBrainPage />,
    sales: <SalesIntelligencePage />,
    ads: <AdsCommandCenterPage />,
    voice: <VoicePersonalityLabPage />,
    tasks: <TaskManagerPage />,
    proactive: <ProactiveCenterPage />,
    health: <SystemHealthPage />,
    knowledge: <KnowledgeBasePage />,
    calendar: <CalendarPage />,
    settings: <SettingsPage />,
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    
    // Temporary bypass for Vercel deployment
    if (password === "boho2026") {
      localStorage.setItem("boho_token", "temp-boho-token");
      setIsAuthenticated(true);
      setIsLoggingIn(false);
      return;
    }
    
    try {
      const data = await api.post("/api/login", { password }, false);
      if (data.token) {
        localStorage.setItem("boho_token", data.token);
        setIsAuthenticated(true);
      } else {
        setLoginError(data.error || "كلمة المرور غير صحيحة");
      }
    } catch (err: any) {
      setLoginError(err.message || "تعذر الاتصال بالسيرفر. تأكد من تشغيل الباك إند.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F0F2F8] flex items-center justify-center p-4 selection:bg-blue-100" dir="rtl" style={{
        backgroundImage: `radial-gradient(ellipse at 20% 10%, rgba(59,130,246,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(14,165,233,0.05) 0%, transparent 60%)`
      }}>
        <div className="glass-panel w-full max-w-md rounded-[32px] p-8 md:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex flex-col items-center animate-fade-in border border-white/60">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-sky-600 shadow-[0_0_30px_rgba(59,130,246,0.5)] border-4 border-white/60 flex items-center justify-center">
              <span className="text-white text-3xl font-black font-mono">B</span>
            </div>
          </div>
          
          <h1 className="text-2xl font-black text-slate-800 tracking-tight font-sans mb-1 text-center">Boho Enterprise OS</h1>
          <p className="text-sm text-gray-500 font-tajawal mb-8 text-center">النظام مشفر. يرجى إدخال مفتاح الوصول الخاص بالباشا.</p>
          
          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="كلمة المرور..."
                className="w-full bg-white/60 border border-gray-200 rounded-2xl pr-12 pl-4 py-4 text-sm font-mono text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm"
              />
            </div>
            
            {loginError && <p className="text-rose-500 text-xs font-tajawal font-bold text-center mt-1 bg-rose-50 p-2 rounded-lg">{loginError}</p>}
            
            <button 
              type="submit" 
              disabled={isLoggingIn || !password}
              className="w-full mt-2 bg-gradient-to-l from-blue-500 to-blue-600 text-white font-bold font-tajawal text-sm py-4 rounded-2xl shadow-[0_8px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_8px_25px_rgba(59,130,246,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isLoggingIn ? "جارٍ التحقق..." : "تسجيل الدخول"}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-200/50 w-full text-center">
            <p className="text-[10px] text-gray-400 font-mono">v2.0 • Hybrid Architecture</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="p-app-wrapper"
      className="min-h-screen bg-[#F0F2F8] p-4 md:p-6 flex flex-col selection:bg-blue-100"
      dir="rtl"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 20% 10%, rgba(59,130,246,0.06) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 90%, rgba(14,165,233,0.05) 0%, transparent 60%)
        `
      }}
    >
      {/* HEADER */}
      <header
        id="spatial-header"
        className="max-w-[1400px] w-full mx-auto mb-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        {/* Title */}
        <div className="text-start order-2 md:order-1">
          <div className="flex items-center gap-2 justify-start">
            <span className="text-[9px] uppercase font-mono tracking-wider font-bold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200">
              معمارية هجينة C
            </span>
            <span className="text-[10px] text-gray-400 font-mono">Ahmed Salah • BGK / O2Nation</span>
          </div>
          <h1 className="text-2xl font-black text-slate-800 mt-1.5 tracking-tight font-sans">
            Boho Enterprise OS
          </h1>
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-3 justify-end order-1 md:order-2">


          {/* ROAS Alert Siren */}
          <div className="px-4 py-2 bg-red-500/10 border border-red-500/25 rounded-full flex items-center gap-2.5 shadow-sm">
            <div>
              <span className="text-[8px] text-red-400 uppercase font-mono tracking-widest block font-bold">تنبيه Windsor</span>
              <span className="text-[11px] font-bold text-red-600 font-tajawal">Sealy Snap ROAS تحت 2.0!</span>
            </div>
            <div className="relative flex h-5 w-5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 items-center justify-center">
                <AlertCircle className="w-3 h-3 text-white" />
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="max-w-[1400px] w-full mx-auto flex flex-col lg:flex-row gap-5 items-start flex-1 mb-6">

        {/* SIDEBAR */}
        <section className="w-full lg:w-[270px] shrink-0 self-stretch flex justify-center lg:justify-start">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </section>

        {/* CONTENT AREA */}
        <section className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* VOICE ORB */}
          <div className="lg:col-span-4 xl:col-span-3 sticky top-4 self-start" style={{ height: "calc(100vh - 2rem)" }}>
            <VoiceOrbCard
              onAILog={handleAILog}
              onRefreshData={handleRefreshAll}
              onAddTaskLocal={handleRefreshAll}
            />
          </div>

          {/* PAGE CONTENT */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-5">
            {PAGE_MAP[activeTab] ?? (
              <div className="glass-panel rounded-[24px] p-8 flex items-center justify-center min-h-[300px]">
                <p className="text-slate-400 font-tajawal text-sm">اختر صفحة من القائمة الجانبية</p>
              </div>
            )}
          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer
        id="spatial-footer"
        className="max-w-[1400px] w-full mx-auto flex flex-col md:flex-row items-center justify-between py-4 border-t border-slate-200/50 text-xs text-gray-400 font-sans gap-2"
      >
        <div className="flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-blue-400" />
          <span>مساحة عمل BGK + O2Nation: <span className="font-semibold text-emerald-500">متصل الآن</span></span>
        </div>
        <div>
          <span>صُمم بالكامل للباشا أحمد صلاح • Boho Enterprise OS v2 • 11 Pages</span>
        </div>
      </footer>
    </div>
  );
}
