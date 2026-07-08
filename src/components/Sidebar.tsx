import { useState } from "react";
import { 
  LayoutDashboard, BrainCircuit, ShoppingBag, Megaphone, 
  FlaskConical, CheckSquare, Radio, Server,
  BookOpen, Calendar, Settings, ChevronDown, Building2
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeCompany: string;
  setActiveCompany: (company: string) => void;
}

const COMPANIES = [
  { id: "bgk", name: "Bohemian Geeks" },
  { id: "o2nation", name: "O2Nation" },
];

const PAGES = [
  {
    id: "mission",
    icon: LayoutDashboard,
    label: "مركز القيادة",
    sublabel: "مركز القيادة",
    badge: null,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    id: "deepbrain",
    icon: BrainCircuit,
    label: "العقل العميق",
    sublabel: "العقل العميق + الذاكرة",
    badge: "AI",
    gradient: "from-sky-500 to-sky-600",
  },
  {
    id: "sales",
    icon: ShoppingBag,
    label: "ذكاء المبيعات",
    sublabel: "iFilter • Sealy - Metorik",
    badge: "Live",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "ads",
    icon: Megaphone,
    label: "مركز الإعلانات",
    sublabel: "Windsor • Meta • Google • Snap",
    badge: "ROAS",
    gradient: "from-rose-500 to-red-600",
  },
  {
    id: "voice",
    icon: FlaskConical,
    label: "معمل الصوت والشخصية",
    sublabel: "TTS • Barge-in • Architecture",
    badge: null,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: "tasks",
    icon: CheckSquare,
    label: "مدير المهام",
    sublabel: "ClickUp • أولويات بوهو",
    badge: "3",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    id: "proactive",
    icon: Radio,
    label: "مركز المبادرة",
    sublabel: "n8n • Telegram • بريفنجات",
    badge: "New",
    gradient: "from-blue-500 to-pink-600",
  },
  {
    id: "health",
    icon: Server,
    label: "صحة النظام",
    badge: null,
    gradient: "from-slate-500 to-slate-700",
  },
  {
    id: "knowledge",
    icon: BookOpen,
    label: "قاعدة المعرفة",
    sublabel: "SOPs • عقود • Search",
    badge: null,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    id: "calendar",
    icon: Calendar,
    label: "التقويم والاجتماعات",
    sublabel: "Google Sync • Notes",
    badge: null,
    gradient: "from-rose-500 to-red-600",
  },
  {
    id: "settings",
    icon: Settings,
    label: "الإعدادات",
    sublabel: "API • Profile • Team",
    badge: null,
    gradient: "from-gray-600 to-gray-800",
  },
];

export default function Sidebar({ activeTab, setActiveTab, activeCompany, setActiveCompany }: SidebarProps) {
  const [showCompanies, setShowCompanies] = useState(false);
  const activeCompanyObj = COMPANIES.find(c => c.id === activeCompany) || COMPANIES[0];

  return (
    <div
      id="sidebar-container"
      className="hidden md:flex flex-col w-[270px] py-6 px-4 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.04)] sticky top-4 self-start dir-rtl"
      style={{ height: "calc(100vh - 2rem)" }}
    >
      {/* Branding */}
      <div className="flex items-center gap-3 shrink-0 mb-8 mt-2 px-2">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-400 rounded-full blur-md opacity-70 animate-pulse" />
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-sky-600 shadow-[0_0_20px_rgba(59,130,246,0.6)] border-2 border-white/60 flex items-center justify-center">
            <span className="text-white text-[10px] font-black font-mono">B</span>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-[15px] text-slate-800 font-black tracking-widest font-sans leading-none">BOHO</span>
          <span className="text-[9px] text-blue-500 font-mono tracking-wider font-bold mt-0.5">ENTERPRISE OS v2</span>
        </div>
      </div>

      {/* Company Switcher */}
      <div className="px-2 mb-4 shrink-0 relative">
        <button 
          onClick={() => setShowCompanies(!showCompanies)}
          className="w-full flex items-center justify-between bg-white/50 hover:bg-white/80 border border-slate-200 rounded-xl p-2 transition-all"
        >
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-[11px] font-bold text-slate-700 font-tajawal">{activeCompanyObj.name}</span>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showCompanies ? "rotate-180" : ""}`} />
        </button>

        {showCompanies && (
          <div className="absolute top-full left-2 right-2 mt-1 bg-white border border-slate-100 rounded-xl shadow-lg z-50 overflow-hidden animate-fade-in">
            {COMPANIES.map(c => (
              <button 
                key={c.id}
                onClick={() => {
                  setActiveCompany(c.id);
                  setShowCompanies(false);
                }}
                className={`w-full text-right px-3 py-2 text-[11px] font-bold font-tajawal transition-colors ${
                  activeCompany === c.id ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="w-full flex-1 sidebar-scroll flex flex-col gap-1.5 overflow-y-auto pr-1 pl-1 pb-6">
        {PAGES.map((page) => {
          const Icon = page.icon;
          const isActive = activeTab === page.id;

          return (
            <button
              key={page.id}
              onClick={() => setActiveTab(page.id)}
              className="relative flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl group transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer text-right"
            >
              {/* Active Background */}
              {isActive && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                    backgroundImage: `linear-gradient(135deg, #3b82f6, #2563eb)`,
                    boxShadow: "0 8px 24px rgba(59,130,246,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
                  }}
                />
              )}

              {/* Hover Background */}
              {!isActive && (
                <div className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/50 transition-colors duration-200 pointer-events-none" />
              )}

              {/* Icon */}
              <div
                className={`relative z-10 w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                  isActive
                    ? "bg-white/20 shadow-sm"
                    : "bg-white/60 border border-white/80 group-hover:bg-blue-50 group-hover:border-blue-200"
                }`}
              >
                <Icon
                  strokeWidth={1.8}
                  className={`w-4 h-4 transition-colors ${
                    isActive ? "text-white" : "text-slate-500 group-hover:text-blue-500"
                  }`}
                />
              </div>

              {/* Text */}
              <div className="flex-1 text-right relative z-10 min-w-0">
                <p className={`text-sm font-bold font-sans leading-tight truncate ${isActive ? "text-white" : "text-slate-700 group-hover:text-slate-900"}`}>
                  {page.label}
                </p>
                <p className={`text-[10px] font-tajawal leading-tight truncate mt-0.5 ${isActive ? "text-white/70" : "text-gray-400 group-hover:text-slate-500"}`}>
                  {page.sublabel}
                </p>
              </div>

              {/* Badge */}
              {page.badge && (
                <span
                  className={`relative z-10 text-[8px] px-2 py-0.5 rounded-full font-mono font-black shrink-0 ${
                    isActive
                      ? "bg-white/25 text-white"
                      : "bg-blue-100 text-blue-700 border border-blue-200"
                  }`}
                >
                  {page.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="shrink-0 pt-3 border-t border-white/40 mt-2">
        <p className="text-[9px] text-gray-400 font-mono text-center">Boho Enterprise OS • v2.0</p>
        <p className="text-[9px] text-gray-300 font-tajawal text-center mt-0.5">صُمم لأحمد صلاح</p>
      </div>
    </div>
  );
}
