import { useState } from "react";
import { BookOpen, UploadCloud, Search, FileText, FileBadge, Hash, Star } from "lucide-react";

export default function KnowledgeBasePage({ activeCompany }: { activeCompany: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const documents = activeCompany === "bgk" ? [
    { id: 1, title: "سياسة الإجازات لعام 2026", type: "PDF", category: "HR Policies", date: "اليوم", stars: true },
    { id: 2, title: "عقد وكالة Sealy السنوي", type: "Contract", category: "Legal", date: "منذ يومين", stars: true },
    { id: 3, title: "SOP - إطلاق حملات Meta", type: "Docs", category: "Marketing SOPs", date: "الأسبوع الماضي", stars: false },
    { id: 4, title: "تقرير مبيعات iFilter - الربع الأول", type: "Excel", category: "Finance", date: "الشهر الماضي", stars: false },
  ] : [
    { id: 1, title: "دليل صيانة سيرفرات AWS", type: "PDF", category: "Tech SOPs", date: "اليوم", stars: true },
    { id: 2, title: "نموذج عقد تطوير السوفتوير", type: "Contract", category: "Legal", date: "منذ يومين", stars: true },
    { id: 3, title: "SOP - متابعة عملاء الـ ERP", type: "Docs", category: "Sales SOPs", date: "الأسبوع الماضي", stars: false },
    { id: 4, title: "تقرير تكلفة الكلاود 2026", type: "Excel", category: "Finance", date: "الشهر الماضي", stars: false },
  ];

  return (
    <div className="flex flex-col gap-6 w-full pb-8" dir="rtl">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel rounded-[24px] p-6 text-right">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="text-right">
            <h2 className="text-xl font-black text-slate-800 font-tajawal tracking-tight">قاعدة المعرفة المركزية</h2>
            <p className="text-xs text-gray-500 font-tajawal mt-1" dir="ltr">Semantic Search & Company Memory ({activeCompany === "bgk" ? "BGK" : "O2Nation"})</p>
          </div>
        </div>
        
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2.5 rounded-xl font-bold font-tajawal text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md">
          رفع مستند جديد
          <UploadCloud className="w-4 h-4" />
        </button>
      </div>

      {/* SEMANTIC SEARCH BAR */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-blue-400" />
        </div>
        <input 
          type="text" 
          placeholder={activeCompany === "bgk" ? "اسأل بوهو: 'إيه شروط إلغاء عقد Sealy؟' أو ابحث باسم الملف..." : "اسأل بوهو: 'إزاي أعمل ريستارت لسيرفر العميل؟' أو ابحث باسم الملف..."} 
          className="w-full bg-white/60 backdrop-blur-md border-2 border-blue-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-tajawal text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm text-right"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 right-4 flex items-center">
          <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded font-mono font-bold uppercase border border-blue-200" dir="ltr">Semantic Search</span>
        </div>
      </div>

      {/* QUICK CATEGORIES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "SOPs", count: 12, icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Contracts", count: 8, icon: FileBadge, color: "text-emerald-500", bg: "bg-emerald-50" },
          { label: "Policies", count: 5, icon: BookOpen, color: "text-sky-500", bg: "bg-sky-50" },
          { label: "Tags", count: 24, icon: Hash, color: "text-rose-500", bg: "bg-rose-50" },
        ].map((cat, idx) => (
          <div key={idx} className="glass-panel rounded-[20px] p-4 flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-transform flex-row-reverse">
            <div className="flex items-center gap-3 flex-row-reverse">
              <div className={`${cat.bg} ${cat.color} p-2 rounded-xl`}>
                <cat.icon className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-700 text-sm font-tajawal" dir="ltr">{cat.label}</span>
            </div>
            <span className="text-xs font-mono font-bold text-gray-400 bg-gray-100/50 px-2 py-0.5 rounded-full">{cat.count}</span>
          </div>
        ))}
      </div>

      {/* RECENT DOCUMENTS LIST */}
      <div className="glass-panel rounded-[24px] p-6 flex-1 text-right">
        <h3 className="text-sm font-bold text-slate-800 font-tajawal mb-4 border-b border-gray-100 pb-3">المستندات الأخيرة لشركة {activeCompany === "bgk" ? "Bohemian Geeks" : "O2Nation"}</h3>
        
        <div className="flex flex-col gap-3">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 hover:bg-white/50 rounded-xl transition-colors border border-transparent hover:border-gray-200 cursor-pointer group flex-row-reverse">
              <div className="flex items-center gap-4 flex-row-reverse">
                <div className={`p-2.5 rounded-xl flex items-center justify-center ${
                  doc.type === "PDF" ? "bg-rose-100 text-rose-600" :
                  doc.type === "Contract" ? "bg-amber-100 text-amber-600" :
                  doc.type === "Excel" ? "bg-emerald-100 text-emerald-600" :
                  "bg-blue-100 text-blue-600"
                }`}>
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <h4 className="font-bold text-slate-800 text-sm font-tajawal group-hover:text-blue-600 transition-colors">{doc.title}</h4>
                  <div className="flex items-center justify-end gap-2 mt-1 flex-row-reverse">
                    <span className="text-[10px] font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded" dir="ltr">{doc.type}</span>
                    <span className="text-[11px] text-gray-400 font-tajawal" dir="ltr">{doc.category}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 flex-row-reverse">
                <span className="text-xs text-gray-400 font-tajawal">{doc.date}</span>
                <button className={`p-1.5 rounded-lg transition-colors ${doc.stars ? "text-amber-400 bg-amber-50" : "text-gray-300 hover:text-amber-400 hover:bg-amber-50"}`}>
                  <Star className="w-4 h-4" fill={doc.stars ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
