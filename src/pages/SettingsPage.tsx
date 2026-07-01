import { useState } from "react";
import { api } from "../lib/api";
import { Settings, User, Shield, Key, Bell, CreditCard, Save, Globe, Lock } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [elevenLabsKey, setElevenLabsKey] = useState("");
  const [savingKey, setSavingKey] = useState(false);

  const handleSaveElevenLabs = async () => {
    if (!elevenLabsKey) return;
    setSavingKey(true);
    try {
      await api.post("/api/settings/keys", {
        service_name: "elevenlabs",
        api_key: elevenLabsKey
      });
      alert("تم حفظ المفتاح بنجاح");
    } catch (e) {
      console.error(e);
      alert("تعذر حفظ المفتاح");
    }
    setSavingKey(false);
  };

  const tabs = [
    { id: "profile", label: "الملف الشخصي", icon: User },
    { id: "team", label: "الفريق والصلاحيات", icon: Shield },
    { id: "api", label: "مفاتيح API", icon: Key },
    { id: "oauth", label: "الربط الخارجي", icon: Globe },
    { id: "notifications", label: "التنبيهات", icon: Bell },
    { id: "billing", label: "الفواتير", icon: CreditCard },
  ];

  return (
    <div className="flex flex-col gap-6 w-full h-full" dir="rtl">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel rounded-[24px] p-6">
        <div className="flex items-center gap-3">
          <div className="bg-slate-200 text-slate-700 p-3 rounded-2xl">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 font-tajawal tracking-tight">إعدادات النظام</h2>
            <p className="text-xs text-gray-500 font-tajawal mt-1">إدارة الحساب، فريق العمل، الصلاحيات، والربط البرمجي (API)</p>
          </div>
        </div>
        
        <button className="bg-gradient-to-l from-slate-700 to-slate-900 text-white px-6 py-2.5 rounded-xl font-bold font-tajawal text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md">
          <Save className="w-4 h-4" />
          حفظ التعديلات
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1">
        
        {/* SETTINGS SIDEBAR */}
        <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-tajawal font-bold text-sm text-right ${
                activeTab === tab.id 
                  ? "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-indigo-600 border border-white" 
                  : "text-slate-600 hover:bg-white/50 border border-transparent"
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-indigo-500" : "text-slate-400"}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* SETTINGS CONTENT AREA */}
        <div className="md:col-span-8 lg:col-span-9 glass-panel rounded-[24px] p-6 md:p-8">
          
          {activeTab === "profile" && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div className="border-b border-gray-100 pb-4 mb-2">
                <h3 className="font-bold text-lg text-slate-800 font-tajawal">الملف الشخصي</h3>
                <p className="text-xs text-gray-500 font-tajawal mt-1">المعلومات الأساسية لحسابك الإداري</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-blue-200 border-4 border-white shadow-sm flex items-center justify-center text-indigo-500 font-black text-2xl font-mono">
                  A
                </div>
                <div>
                  <button className="bg-white border border-gray-200 text-slate-700 px-4 py-2 rounded-xl font-bold font-tajawal text-xs hover:bg-gray-50 transition-all shadow-sm">
                    تغيير الصورة
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 font-tajawal mb-1.5">الاسم الكامل</label>
                  <input type="text" defaultValue="أحمد صلاح" className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-tajawal text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 font-tajawal mb-1.5">البريد الإلكتروني</label>
                  <input type="email" defaultValue="ahmed@bohemiangeeks.com" className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-tajawal text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 font-tajawal mb-1.5">الشركة / الوكالة</label>
                  <input type="text" defaultValue="BGK / O2Nation" className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-tajawal text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div className="border-b border-gray-100 pb-4 mb-2">
                <h3 className="font-bold text-lg text-slate-800 font-tajawal">مفاتيح الربط (API Keys)</h3>
                <p className="text-xs text-gray-500 font-tajawal mt-1">إدارة مفاتيح الـ API الخاصة بخدمات الذكاء الاصطناعي</p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-bold text-slate-800 font-tajawal">Anthropic API Key (Claude)</label>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-mono font-bold">Active</span>
                  </div>
                  <div className="flex gap-2">
                    <input type="password" defaultValue="sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxx" readOnly className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-mono text-slate-600 focus:outline-none" />
                    <button className="bg-white border border-gray-200 text-slate-700 px-4 py-2 rounded-xl font-bold font-tajawal text-xs hover:bg-gray-50 transition-all">تعديل</button>
                  </div>
                  <p className="text-[10px] text-gray-400 font-tajawal mt-2">يستخدم لتشغيل محرك بوهو الأساسي (Deep Brain).</p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-bold text-slate-800 font-tajawal">ElevenLabs API Key</label>
                    <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-mono font-bold">Missing</span>
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={elevenLabsKey} onChange={e => setElevenLabsKey(e.target.value)} placeholder="أدخل مفتاح ElevenLabs لتفعيل الصوت الاحترافي" className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-mono text-slate-800 focus:outline-none focus:border-indigo-400" />
                    <button onClick={handleSaveElevenLabs} disabled={savingKey} className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-2 rounded-xl font-bold font-tajawal text-xs hover:bg-indigo-100 transition-all">{savingKey ? "جاري الحفظ..." : "حفظ"}</button>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">X-Boho-Secret <Lock className="w-3.5 h-3.5 text-rose-500" /></label>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-mono font-bold">Secure</span>
                  </div>
                  <div className="flex gap-2">
                    <input type="password" defaultValue="task-server-secret-key-1234" readOnly className="flex-1 bg-rose-50 border border-rose-100 rounded-xl px-4 py-2 text-sm font-mono text-rose-600 focus:outline-none" />
                    <button className="bg-white border border-gray-200 text-slate-700 px-4 py-2 rounded-xl font-bold font-tajawal text-xs hover:bg-gray-50 transition-all">تغيير</button>
                  </div>
                  <p className="text-[10px] text-gray-400 font-tajawal mt-2">يستخدم لحماية السيرفر الداخلي (Task Server) الخاص بقرارات بوهو.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "oauth" && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div className="border-b border-gray-100 pb-4 mb-2">
                <h3 className="font-bold text-lg text-slate-800 font-tajawal">الربط مع الخدمات الخارجية</h3>
                <p className="text-xs text-gray-500 font-tajawal mt-1">إدارة صلاحيات وصول بوهو إلى منصاتك المختلفة</p>
              </div>

              {/* Google Workspace */}
              <div className="bg-white/60 border border-indigo-100 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center p-2">
                      <svg viewBox="0 0 24 24" className="w-8 h-8"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 font-tajawal text-sm">Google Workspace</h4>
                      <p className="text-[11px] font-mono text-gray-500 mt-0.5">ahmed@bohemiangeeks.com</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-tajawal font-bold border border-emerald-200">متصل (Connected)</span>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-700 font-tajawal">Gmail Access (Read/Send)</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-700 font-tajawal">Google Calendar (Manage)</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                  <button className="text-xs font-bold text-rose-500 hover:text-rose-600 font-tajawal px-4 py-2 transition-colors">إلغاء الربط (Revoke)</button>
                  <button className="bg-indigo-50 text-indigo-600 text-xs font-bold font-tajawal px-4 py-2 rounded-xl hover:bg-indigo-100 border border-indigo-200 transition-all">تجديد الـ Token</button>
                </div>
              </div>

              {/* CRM Integration */}
              <div className="bg-white/60 border border-slate-200 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center p-2">
                      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 font-tajawal text-sm">CRM (HubSpot / Salesforce)</h4>
                      <p className="text-[11px] font-tajawal text-gray-500 mt-0.5">إدارة بيانات العملاء والمبيعات</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-tajawal font-bold border border-slate-200">غير متصل</span>
                </div>
                <div className="flex items-center justify-end">
                  <button className="bg-white border border-gray-200 text-slate-700 text-xs font-bold font-tajawal px-6 py-2.5 rounded-xl hover:bg-gray-50 transition-all shadow-sm">توصيل الـ CRM</button>
                </div>
              </div>

              {/* WhatsApp Integration */}
              <div className="bg-white/60 border border-slate-200 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#25D366] bg-opacity-10 shadow-sm border border-[#25D366]/20 rounded-xl flex items-center justify-center p-2">
                      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.25 4.87L2 22l5.34-1.18C8.75 21.56 10.33 22 12 22c5.52 22 10-4.48 10-10S17.52 2 12 2zm5.45 14.15c-.25.7-1.39 1.34-1.92 1.4-.55.06-1.28.16-3.66-.82-2.86-1.18-4.71-4.14-4.85-4.32-.14-.19-1.16-1.55-1.16-2.95 0-1.4.73-2.09 1-2.38.25-.27.56-.34.74-.34.19 0 .37 0 .54.02.18.02.43-.07.66.49.24.58.74 1.83.81 1.96.07.14.12.3.02.49-.09.19-.14.3-.28.47-.14.16-.29.35-.42.49-.14.15-.29.31-.12.6.17.29.74 1.24 1.6 2.01 1.11.99 2.04 1.3 2.33 1.44.29.14.46.12.63-.07.17-.19.74-.87.94-1.16.19-.29.38-.24.65-.14.27.1 1.71.81 2 1.22.29.41.29.41.29.41z" fill="#25D366"/></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 font-tajawal text-sm">WhatsApp Business API</h4>
                      <p className="text-[11px] font-tajawal text-gray-500 mt-0.5">إرسال التقارير والرد التلقائي للعملاء</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-tajawal font-bold border border-slate-200">غير متصل</span>
                </div>
                <div className="flex items-center justify-end">
                  <button className="bg-white border border-gray-200 text-slate-700 text-xs font-bold font-tajawal px-6 py-2.5 rounded-xl hover:bg-gray-50 transition-all shadow-sm">توصيل واتساب</button>
                </div>
              </div>
            </div>
          )}

          {activeTab !== "profile" && activeTab !== "api" && activeTab !== "oauth" && (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400">
              <Settings className="w-8 h-8 mb-3 opacity-20" />
              <p className="font-tajawal text-sm">هذا القسم قيد التطوير في الـ MVP</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
