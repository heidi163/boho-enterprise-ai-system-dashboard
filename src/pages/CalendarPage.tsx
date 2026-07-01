import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Video, FileText, ChevronLeft, ChevronRight, Plus, MapPin, UploadCloud, BrainCircuit } from "lucide-react";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transcriptName, setTranscriptName] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);

  const meetings = [
    { id: 1, title: "اجتماع فريق O2Nation", time: "10:00 ص - 11:00 ص", type: "Google Meet", attendees: 4, hasNotes: true, color: "bg-blue-500", status: "past" },
    { id: 2, title: "مراجعة حملات Sealy ربع السنوية", time: "02:30 م - 03:30 م", type: "Zoom", attendees: 3, hasNotes: false, color: "bg-indigo-500", status: "upcoming" },
    { id: 3, title: "مكالمة مع عميل محتمل (Real Estate)", time: "05:00 م - 06:00 م", type: "Phone", attendees: 2, hasNotes: false, color: "bg-emerald-500", status: "upcoming" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full" dir="rtl">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel rounded-[24px] p-6">
        <div className="flex items-center gap-3">
          <div className="bg-rose-100 text-rose-600 p-3 rounded-2xl">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 font-tajawal tracking-tight">التقويم والاجتماعات</h2>
            <p className="text-xs text-gray-500 font-tajawal mt-1">إدارة المواعيد المزامنة مع جوجل، وملاحظات الاجتماعات عبر بوهو</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-white/60 border border-gray-200 text-slate-700 px-4 py-2 rounded-xl font-bold font-tajawal text-sm hover:bg-white transition-all">
            مزامنة التقويم
          </button>
          <button className="bg-gradient-to-l from-rose-500 to-red-600 text-white px-5 py-2 rounded-xl font-bold font-tajawal text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md">
            <Plus className="w-4 h-4" />
            اجتماع جديد
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* MINI CALENDAR & AI SCHEDULING */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="glass-panel rounded-[24px] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 font-tajawal">أبريل 2026</h3>
              <div className="flex items-center gap-1">
                <button className="p-1 hover:bg-gray-100 rounded-lg"><ChevronRight className="w-4 h-4 text-gray-500" /></button>
                <button className="p-1 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-4 h-4 text-gray-500" /></button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['ح','ن','ث','ر','خ','ج','س'].map(d => (
                <div key={d} className="text-[10px] font-tajawal font-bold text-gray-400">{d}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center">
              {/* Dummy Calendar Days */}
              {Array.from({length: 30}).map((_, i) => (
                <button key={i} className={`p-2 rounded-xl text-xs font-mono font-medium transition-all ${
                  i + 1 === 24 
                    ? "bg-rose-500 text-white shadow-md" 
                    : i === 15 || i === 10
                    ? "bg-rose-50 text-rose-600 font-bold"
                    : "text-slate-600 hover:bg-gray-100"
                }`}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[24px] p-6 border border-indigo-100 shadow-sm mt-6">
            <h3 className="font-bold text-indigo-900 font-tajawal mb-2 flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-indigo-500" />
              مساعد الاجتماعات (AI Assistant)
            </h3>
            <p className="text-[11px] text-indigo-700/80 font-tajawal mb-4 leading-relaxed">
              ارفع تفريغ اجتماع (Zoom / Teams) وبوهو هيستخرج الـ Action Items ويضيفها في الـ Tasks تلقائياً.
            </p>
            
            <div className="flex flex-col gap-3">
              <input 
                type="text" 
                value={transcriptName}
                onChange={e => setTranscriptName(e.target.value)}
                placeholder="اسم الاجتماع..." 
                className="w-full bg-white/80 border border-indigo-100 rounded-xl px-3 py-2 text-xs font-tajawal text-slate-700 focus:outline-none focus:border-indigo-400" 
              />
              <button 
                onClick={() => {
                  setIsExtracting(true);
                  setTimeout(() => {
                    setIsExtracting(false);
                    setTranscriptName("");
                  }, 2000);
                }}
                disabled={!transcriptName.trim() || isExtracting}
                className="w-full bg-white/80 border border-dashed border-indigo-300 text-indigo-600 px-4 py-2.5 rounded-xl font-bold font-tajawal text-xs hover:bg-white transition-all shadow-sm flex justify-center items-center gap-2 disabled:opacity-50"
              >
                <UploadCloud className="w-4 h-4" />
                {isExtracting ? "جارٍ التحليل واستخراج المهام..." : "ارفع تفريغ الاجتماع (TXT/VTT)"}
              </button>
            </div>
          </div>
        </div>

        {/* DAY TIMELINE */}
        <div className="lg:col-span-2 glass-panel rounded-[24px] p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
            <div>
              <h3 className="font-black text-xl text-slate-800 font-tajawal">الأربعاء، 24 أبريل</h3>
              <p className="text-xs text-gray-500 font-tajawal mt-1">لديك 3 اجتماعات مجدولة اليوم</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4 relative">
            {/* Vertical timeline line */}
            <div className="absolute top-2 bottom-2 right-4 w-px bg-gray-200" />

            {meetings.map((meeting) => (
              <div key={meeting.id} className="relative flex items-start gap-6">
                
                {/* Timeline Dot */}
                <div className={`absolute right-[11px] top-4 w-2.5 h-2.5 rounded-full ring-4 ring-[#F0F2F8] z-10 ${meeting.color}`} />

                {/* Content Card */}
                <div className={`flex-1 rounded-2xl p-4 ml-2 border transition-all ${
                  meeting.status === "past" 
                    ? "bg-gray-50/50 border-transparent opacity-60" 
                    : "bg-white border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className={`font-bold text-sm font-tajawal ${meeting.status === "past" ? "text-slate-500" : "text-slate-800"}`}>
                        {meeting.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1 text-[11px] text-gray-500 font-mono">
                          <Clock className="w-3 h-3" />
                          {meeting.time}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-gray-500 font-tajawal">
                          {meeting.type === "Google Meet" ? <Video className="w-3 h-3 text-blue-500" /> : 
                           meeting.type === "Zoom" ? <Video className="w-3 h-3 text-indigo-500" /> : 
                           <MapPin className="w-3 h-3 text-emerald-500" />}
                          {meeting.type}
                        </span>
                      </div>
                    </div>
                    
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-lg font-mono font-medium">
                      {meeting.attendees} Attendees
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                    {meeting.hasNotes ? (
                      <button className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                        <FileText className="w-3 h-3" />
                        عرض ملخص بوهو
                      </button>
                    ) : (
                      <button className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                        <FileText className="w-3 h-3" />
                        إضافة ملاحظات
                      </button>
                    )}
                    {meeting.status === "upcoming" && (
                      <button className="flex items-center gap-1.5 text-[11px] font-bold text-white bg-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors mr-auto">
                        الانضمام للمكالمة
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}
