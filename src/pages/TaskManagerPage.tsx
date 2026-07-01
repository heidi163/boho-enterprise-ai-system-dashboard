import { useState, useEffect } from "react";
import { CheckSquare, Plus, Trash2, Clock, CheckCircle2, Circle, RefreshCw, BrainCircuit, Zap, BarChart2, AlertTriangle, Check, X } from "lucide-react";

type TaskStatus = "To Do" | "In Progress" | "Done";

interface Task {
  id: string;
  name: string;
  description?: string;
  status: TaskStatus;
  status: TaskStatus | "pending";
  dueDate?: string;
  priority?: "high" | "medium" | "low";
  bohoReason?: string; // New field for Auto-Priority
}

const STATUS_CONFIG: Record<TaskStatus, { color: string; bg: string; icon: React.ElementType }> = {
  "To Do": { color: "text-amber-700", bg: "bg-amber-50 border-amber-200", icon: Circle },
  "In Progress": { color: "text-blue-700", bg: "bg-blue-50 border-blue-200", icon: Clock },
  "Done": { color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", icon: CheckCircle2 },
};

const PRIORITY_COLORS = {
  high: "bg-rose-100 text-rose-700 border-rose-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  low: "bg-slate-100 text-slate-600 border-slate-200",
};

const STATUS_AR: Record<TaskStatus, string> = {
  "To Do": "مهام جديدة",
  "In Progress": "قيد التنفيذ",
  "Done": "مكتملة"
};

export default function TaskManagerPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDue, setNewDue] = useState("Today");
  const [newPriority, setNewPriority] = useState<"high" | "medium" | "low">("medium");
  const [showForm, setShowForm] = useState(false);
  
  // Auto-Priority States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  // Pending Approvals (Destructive Actions Queue)
  const [pendingActions, setPendingActions] = useState([
    { id: "a1", text: "بوهو يطلب الموافقة: إرسال تقرير المبيعات الأسبوعي لعميل iFilter؟", time: "منذ 5 دقائق" },
    { id: "a2", text: "بوهو يطلب الموافقة: مسح المهمة 'تصميم لوجو' لأنها اتأجلت 3 مرات؟", time: "منذ 10 دقائق" }
  ]);

  const handleAction = (id: string, approve: boolean) => {
    setPendingActions(prev => prev.filter(a => a.id !== id));
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("boho_token");
      const res = await fetch("http://localhost:8090/api/tasks", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const d = await res.json();
        // Convert DB status to UI status
        const mappedTasks = (d.tasks || []).map((t: any) => ({
          ...t,
          name: t.title,
          status: t.status === "pending" ? "To Do" : t.status === "completed" ? "Done" : "In Progress",
          priority: t.priority || "medium"
        }));
        setTasks(mappedTasks);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async () => {
    if (!newName.trim()) return;
    try {
      const token = localStorage.getItem("boho_token");
      await fetch("http://localhost:8090/api/tasks", {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          title: newName,
          priority: newPriority
        })
      });
      setNewName(""); setNewDesc(""); setShowForm(false);
      fetchTasks();
    } catch (e) {
      console.error(e);
    }
  };

  const updateStatus = (id: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Advanced Auto-Priority Logic (Mocked Senior Feature)
  const runAutoPriority = () => {
    setIsAnalyzing(true);
    setAnalysisStep(1);
    
    // Simulate fetching Ads Data
    setTimeout(() => setAnalysisStep(2), 1500);
    // Simulate fetching Sales Data
    setTimeout(() => setAnalysisStep(3), 3000);
    // Apply logic
    setTimeout(() => {
      const reordered = [...tasks].map(t => {
        let newPrio = t.priority;
        let reason = "";

        const name = t.name.toLowerCase();
        if (name.includes("roas") || name.includes("ads") || name.includes("snapchat") || name.includes("sealy")) {
          newPrio = "high";
          reason = "Windsor Alert: ROAS وقع تحت 2.0، الخسارة بتزيد.";
        } else if (name.includes("report") || name.includes("client") || name.includes("ifilter")) {
          newPrio = "high";
          reason = "Metorik Data: المبيعات عالية جداً، العميل محتاج الأرقام.";
        } else if (name.includes("design") || name.includes("copy")) {
          newPrio = "medium";
          reason = "Creative tasks: ممكن تستنى لآخر اليوم.";
        } else {
          newPrio = "low";
          reason = "Task عادية، مش مأثرة على المبيعات حالياً.";
        }

        return { ...t, priority: newPrio, bohoReason: reason };
      }).sort((a, b) => {
        const val = { high: 3, medium: 2, low: 1 };
        return val[b.priority!] - val[a.priority!];
      });

      setTasks(reordered);
      setIsAnalyzing(false);
      setAnalysisStep(0);
    }, 4500);
  };

  const grouped = (["To Do", "In Progress", "Done"] as TaskStatus[]).map(status => ({
    status,
    tasks: tasks.filter(t => t.status === status),
  }));

  return (
    <div className="flex flex-col gap-6 w-full" dir="rtl">

      {/* HEADER */}
      <div className="glass-panel rounded-[24px] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={fetchTasks} className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-full px-3 py-1.5 hover:text-indigo-500 font-mono">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> تحديث
          </button>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 text-xs text-white bg-gradient-to-l from-indigo-500 to-blue-600 rounded-full px-4 py-1.5 font-bold hover:opacity-90">
            <Plus className="w-3.5 h-3.5" /> مهمة جديدة
          </button>
        </div>
        <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">مدير المهام <CheckSquare className="w-4 h-4 text-indigo-500" /></h3>
      </div>

      {/* ADD FORM */}
      {showForm && (
        <div className="glass-panel rounded-[24px] p-5 animate-in slide-in-from-top-4">
          <h4 className="text-sm font-bold text-slate-800 font-tajawal mb-4 text-right flex items-center justify-end gap-2"><Plus className="w-4 h-4 text-indigo-500" /> إضافة مهمة جديدة</h4>
          <div className="flex flex-col gap-3">
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="اسم المهمة..." className="bg-white/70 border border-white/80 rounded-xl px-4 py-3 text-sm font-tajawal text-slate-800 outline-none text-right placeholder-gray-400 focus:border-indigo-300" />
            <input value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="تفاصيل (اختياري)..." className="bg-white/70 border border-white/80 rounded-xl px-4 py-3 text-sm font-tajawal text-slate-800 outline-none text-right placeholder-gray-400 focus:border-indigo-300" />
            <div className="flex items-center gap-3">
              <select value={newPriority} onChange={e => setNewPriority(e.target.value as any)} className="flex-1 bg-white/70 border border-white/80 rounded-xl px-4 py-3 text-sm font-tajawal text-slate-800 outline-none">
                <option value="high">🔴 أولوية عالية</option>
                <option value="medium">🟡 أولوية متوسطة</option>
                <option value="low">⚪ أولوية منخفضة</option>
              </select>
              <input value={newDue} onChange={e => setNewDue(e.target.value)} placeholder="الموعد النهائي..." className="flex-1 bg-white/70 border border-white/80 rounded-xl px-4 py-3 text-sm font-tajawal text-slate-800 outline-none text-right placeholder-gray-400 focus:border-indigo-300" />
              <button onClick={addTask} disabled={!newName.trim()} className="px-6 py-3 bg-gradient-to-l from-indigo-500 to-blue-600 text-white text-sm font-bold rounded-xl hover:opacity-90 disabled:opacity-40 transition-opacity">
                إضافة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PENDING APPROVALS QUEUE */}
      {pendingActions.length > 0 && (
        <div className="glass-panel rounded-[24px] p-5 border border-rose-100 bg-rose-50/20">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-rose-500 font-bold bg-rose-100 px-2 py-0.5 rounded-full">{pendingActions.length} أوامر معلقة</span>
            <h4 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">طلبات التأكيد (Approval Queue) <AlertTriangle className="w-4 h-4 text-rose-500" /></h4>
          </div>
          <div className="flex flex-col gap-3">
            {pendingActions.map(action => (
              <div key={action.id} className="bg-white/80 border border-rose-100 rounded-xl p-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <button onClick={() => handleAction(action.id, false)} className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-rose-100 hover:text-rose-600 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleAction(action.id, true)} className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-emerald-100 hover:text-emerald-600 transition-colors">
                    <Check className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-right flex-1 pr-3">
                  <p className="text-sm font-bold text-slate-800 font-tajawal">{action.text}</p>
                  <p className="text-[10px] text-gray-500 font-tajawal mt-0.5">{action.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOHO AUTO-PRIORITY BANNER */}
      <div className={`glass-panel rounded-[24px] p-5 flex flex-col md:flex-row items-center gap-5 transition-all duration-500 ${isAnalyzing ? "bg-indigo-50/50 border-indigo-200 ring-2 ring-indigo-500/20" : ""}`}>
        
        <div className="flex-1 text-right flex flex-col items-end">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-bold text-slate-800 font-tajawal">ترتيب بوهو التلقائي</h4>
            <BrainCircuit className={`w-5 h-5 ${isAnalyzing ? "text-indigo-500 animate-pulse" : "text-violet-400"}`} />
          </div>
          <p className="text-xs text-gray-500 font-tajawal max-w-md">
            بوهو بيسحب داتا المبيعات من Metorik وتكلفة الإعلانات من Windsor عشان يعيد ترتيب مهامك بناءً على اللي بيأثر على الفلوس بجد.
          </p>
        </div>

        <div className="shrink-0 w-full md:w-auto flex flex-col items-center gap-2">
          <button 
            onClick={runAutoPriority} 
            disabled={isAnalyzing || tasks.length === 0} 
            className="w-full md:w-auto flex items-center justify-center gap-2 text-sm text-white bg-gradient-to-l from-violet-500 to-purple-600 rounded-xl px-6 py-3 font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-md hover:shadow-lg"
          >
            {isAnalyzing ? (
              <><RefreshCw className="w-4 h-4 animate-spin" /> جاري التحليل...</>
            ) : (
              <><Zap className="w-4 h-4" /> رتب الأولويات بالذكاء الاصطناعي</>
            )}
          </button>
          
          {/* Analysis Steps Indicator */}
          {isAnalyzing && (
            <div className="flex items-center gap-2 text-[10px] font-mono text-indigo-600 font-bold mt-1">
              <span className={analysisStep >= 1 ? "opacity-100" : "opacity-30"}><CheckSquare className="w-3 h-3 inline mr-1" />مهام</span>
              <span>→</span>
              <span className={analysisStep >= 2 ? "opacity-100" : "opacity-30"}><BarChart2 className="w-3 h-3 inline mr-1" />إعلانات</span>
              <span>→</span>
              <span className={analysisStep >= 3 ? "opacity-100" : "opacity-30"}><Zap className="w-3 h-3 inline mr-1" />مبيعات</span>
            </div>
          )}
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {grouped.map(g => {
          const Cfg = STATUS_CONFIG[g.status];
          return (
            <div key={g.status} className="glass-panel rounded-[24px] p-4 flex flex-col h-[500px]">
              
              <div className={`flex items-center justify-between mb-4 pb-3 border-b border-white/50 shrink-0`}>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${Cfg.bg} ${Cfg.color}`}>{g.tasks.length} مهام</span>
                <div className="flex items-center gap-2">
                  <h4 className={`text-sm font-bold font-tajawal ${Cfg.color}`}>{STATUS_AR[g.status]}</h4>
                  <Cfg.icon className={`w-4 h-4 ${Cfg.color}`} />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto sidebar-scroll pr-1 flex flex-col gap-3">
                {g.tasks.map(t => (
                  <div key={t.id} className="bg-white/70 rounded-2xl p-4 border border-white/80 shadow-sm transition-all hover:shadow-md relative overflow-hidden group">
                    
                    {/* Priority Strip */}
                    <div className={`absolute top-0 right-0 bottom-0 w-1 ${PRIORITY_COLORS[t.priority!].split(' ')[0]}`} />
                    
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <button onClick={() => deleteTask(t.id)} className="p-1 hover:text-rose-500 text-gray-300 transition-colors shrink-0 opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="text-right flex-1 pr-2">
                        <p className="text-sm font-bold text-slate-800 font-tajawal leading-snug">{t.name}</p>
                        {t.description && <p className="text-[10px] text-gray-500 font-tajawal mt-1 leading-snug">{t.description}</p>}
                      </div>
                    </div>
                    
                    {/* Boho Reason Banner */}
                    {t.bohoReason && (
                      <div className="mt-2 mb-3 bg-violet-50 border border-violet-100 rounded-lg p-2 text-right">
                        <p className="text-[9px] font-bold text-violet-700 font-mono mb-0.5 flex items-center justify-end gap-1"><BrainCircuit className="w-3 h-3" /> تحليلات بوهو</p>
                        <p className="text-[10px] text-violet-600 font-tajawal leading-tight">{t.bohoReason}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
                      <select
                        value={t.status}
                        onChange={e => updateStatus(t.id, e.target.value as TaskStatus)}
                        className="text-[9px] font-mono bg-transparent text-slate-500 hover:text-slate-800 outline-none cursor-pointer"
                      >
                        <option value="To Do">مهام جديدة</option>
                        <option value="In Progress">قيد التنفيذ</option>
                        <option value="Done">مكتملة</option>
                      </select>
                      <div className="flex items-center gap-2">
                        {t.priority && <span className={`text-[8px] px-2 py-0.5 rounded-full font-mono font-bold border ${PRIORITY_COLORS[t.priority]}`}>{t.priority.toUpperCase()}</span>}
                        {t.dueDate && <span className="text-[9px] text-gray-400 font-mono flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{t.dueDate}</span>}
                      </div>
                    </div>
                  </div>
                ))}
                
                {g.tasks.length === 0 && (
                  <div className="text-center py-10 opacity-50 flex flex-col items-center gap-2">
                    <Cfg.icon className="w-8 h-8 text-slate-300" />
                    <p className="text-xs text-slate-400 font-tajawal">فاضي</p>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
