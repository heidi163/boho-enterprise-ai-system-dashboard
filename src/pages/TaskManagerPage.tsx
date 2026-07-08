import { useState } from "react";
import { api } from "../lib/api";
import { CheckSquare, Plus, Clock, CheckCircle2, Circle, BrainCircuit, Activity } from "lucide-react";

type TaskStatus = "To Do" | "In Progress" | "Done";

interface Task {
  id: string;
  name: string;
  status: TaskStatus;
}

const STATUS_CONFIG: Record<TaskStatus, { color: string; bg: string; icon: React.ElementType }> = {
  "To Do": { color: "text-amber-700", bg: "bg-amber-50 border-amber-200", icon: Circle },
  "In Progress": { color: "text-blue-700", bg: "bg-blue-50 border-blue-200", icon: Clock },
  "Done": { color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", icon: CheckCircle2 },
};

export default function TaskManagerPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", name: "مراجعة تصميمات الأسبوع القادم", status: "To Do" },
    { id: "2", name: "اعتماد ميزانية الإعلانات الجديدة", status: "In Progress" },
  ]);
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [bohoReply, setBohoReply] = useState("");

  const addTask = async () => {
    if (!newName.trim()) return;
    setLoading(true);
    setBohoReply("جاري إرسال الطلب لـ Boho (ClickUp MCP)...");
    try {
      const d = await api.post("/task", { request: `أنشئ مهمة جديدة في ClickUp: ${newName}` });
      setBohoReply(d.answer || "تم إرسال الطلب بنجاح.");
      setTasks(prev => [...prev, { id: Date.now().toString(), name: newName, status: "To Do" }]);
      setNewName("");
      setShowForm(false);
    } catch {
      setBohoReply("فشل الاتصال بالـ Deep Brain.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = (id: string, status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  const grouped = (["To Do", "In Progress", "Done"] as TaskStatus[]).map(status => ({
    status,
    tasks: tasks.filter(t => t.status === status),
  }));

  return (
    <div className="flex flex-col gap-6 w-full pb-8" dir="rtl">
      {/* HEADER */}
      <div className="glass-panel rounded-[24px] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 text-xs text-white bg-gradient-to-l from-blue-500 to-blue-600 rounded-full px-4 py-1.5 font-bold hover:opacity-90">
            <Plus className="w-3.5 h-3.5" /> مهمة جديدة
          </button>
        </div>
        <h3 className="text-sm font-bold text-slate-800 font-tajawal flex items-center gap-2">مدير المهام (ClickUp MCP) <CheckSquare className="w-4 h-4 text-blue-500" /></h3>
      </div>

      {bohoReply && (
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
          <BrainCircuit className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800 font-tajawal leading-relaxed text-right">{bohoReply}</p>
        </div>
      )}

      {/* ADD FORM */}
      {showForm && (
        <div className="glass-panel rounded-[24px] p-5">
          <div className="flex flex-col gap-3">
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="اكتب وصف المهمة ليقوم بوهو بإنشائها..." className="bg-white/70 border border-white/80 rounded-xl px-4 py-3 text-sm font-tajawal text-slate-800 outline-none text-right placeholder-gray-400 focus:border-blue-300" />
            <button onClick={addTask} disabled={!newName.trim() || loading} className="px-6 py-3 bg-gradient-to-l from-blue-500 to-blue-600 text-white text-sm font-bold rounded-xl hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center justify-center gap-2">
              {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} إضافة عبر بوهو
            </button>
          </div>
        </div>
      )}

      {/* KANBAN BOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {grouped.map(g => {
          const Cfg = STATUS_CONFIG[g.status];
          return (
            <div key={g.status} className="glass-panel rounded-[24px] p-4 flex flex-col h-[500px]">
              <div className={`flex items-center justify-between mb-4 pb-3 border-b border-white/50 shrink-0`}>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${Cfg.bg} ${Cfg.color}`}>{g.tasks.length} مهام</span>
                <div className="flex items-center gap-2">
                  <h4 className={`text-sm font-bold font-tajawal ${Cfg.color}`}>{g.status === "To Do" ? "مهام جديدة" : g.status === "In Progress" ? "قيد التنفيذ" : "مكتملة"}</h4>
                  <Cfg.icon className={`w-4 h-4 ${Cfg.color}`} />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto sidebar-scroll pr-1 flex flex-col gap-3">
                {g.tasks.map(t => (
                  <div key={t.id} className="bg-white/70 rounded-2xl p-4 border border-white/80 shadow-sm relative overflow-hidden">
                    <p className="text-sm font-bold text-slate-800 font-tajawal leading-snug text-right mb-4">{t.name}</p>
                    <select
                      value={t.status}
                      onChange={e => updateStatus(t.id, e.target.value as TaskStatus)}
                      className="text-[10px] font-mono bg-transparent text-slate-500 outline-none"
                    >
                      <option value="To Do">مهام جديدة</option>
                      <option value="In Progress">قيد التنفيذ</option>
                      <option value="Done">مكتملة</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
