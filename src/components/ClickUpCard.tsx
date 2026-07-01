import React, { useState, useEffect, FormEvent } from "react";
import { Plus, ListTodo, Calendar, Trash2, CheckCircle2 } from "lucide-react";
import { ClickUpTask } from "../types";

interface ClickUpCardProps {
  refreshTrigger: number;
  onRefreshTrigger: () => void;
}

export default function ClickUpCard({ refreshTrigger, onRefreshTrigger }: ClickUpCardProps) {
  const [tasks, setTasks] = useState<ClickUpTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/mock/tasks");
      const json = await response.json();
      setTasks(json.tasks);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]);

  const handleCreateTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;

    try {
      const response = await fetch("/api/mock/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newTaskName,
          description: "تمت إضافته من كارت المهام السريعة بمركز التحكم",
          dueDate: "اليوم"
        })
      });

      if (response.ok) {
        setNewTaskName("");
        onRefreshTrigger(); // Sync state across and reload
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div 
      id="clickup-card-panel" 
      className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[360px]"
    >
      {/* Title Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-medium font-mono">ClickUp V2</span>

        <div className="flex items-center gap-1.5 self-end">
          <ListTodo className="w-4 h-4 text-purple-600" />
          <h3 className="font-bold text-slate-800 text-sm font-tajawal text-right">مستودع مهام الوكالة</h3>
        </div>
      </div>

      {/* Task input field */}
      <form onSubmit={handleCreateTask} className="flex gap-2 mb-3">
        <input 
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="أضف مهمة جديدة في ClickUp يا غالي..."
          className="flex-1 px-3 py-1.5 rounded-xl border border-white bg-white/60 text-right text-xs dir-rtl focus:outline-none focus:ring-1 focus:ring-purple-300 font-tajawal text-slate-800 font-medium"
        />
        <button 
          type="submit"
          className="p-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white hover:scale-105 active:scale-95 transition-all text-xs cursor-pointer shadow-md flex items-center justify-center"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>

      {/* Tasks listing area */}
      <div className="flex-grow overflow-y-auto pr-1 flex flex-col gap-2 max-h-[190px] mb-2 text-right dir-rtl">
        {loading && tasks.length === 0 ? (
          <div className="text-center text-xs text-slate-400 font-tajawal my-auto">جاري تحميل لوحة المهام...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center text-xs text-slate-400 font-tajawal my-auto">لا يوجد مهام مفتوحة حالياً، كله تمام!</div>
        ) : (
          tasks.map((t) => (
            <div 
              key={t.id} 
              className="p-2.5 rounded-xl border border-white bg-white/20 hover:bg-white/40 transition-all flex items-center justify-between gap-2"
            >
              {/* Task info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-xs text-slate-800 leading-snug truncate font-tajawal">{t.name}</h4>
                <p className="text-[10px] text-gray-400 leading-tight truncate mt-0.5 font-sans">{t.description}</p>
                
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] text-gray-400 font-mono flex items-center gap-1">
                    <Calendar className="w-2.5 h-2.5" /> {t.dueDate}
                  </span>
                  <span className={`text-[8px] px-1.5 py-0.2 rounded font-bold uppercase ${
                    t.status === "Done" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                    t.status === "In Progress" ? "bg-blue-50 text-blue-700 border border-blue-100" :
                    "bg-amber-50 text-amber-700 border border-amber-100"
                  }`}>
                    {t.status === "Done" ? "مكتمل" : t.status === "In Progress" ? "قيد العمل" : "مفتوح"}
                  </span>
                </div>
              </div>

              {/* Status action */}
              <div className="text-purple-600">
                <CheckCircle2 className={`w-4 h-4 ${t.status === "Done" ? "text-emerald-500 fill-emerald-100" : "text-slate-300 hover:text-emerald-400 cursor-pointer"}`} />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats counter footer */}
      <div className="text-[10px] font-tajawal text-slate-400 flex items-center justify-between border-t border-slate-100 pt-2">
        <span>مربوط مع ClickUp الرسمي لـ BGK</span>
        <span className="font-bold text-slate-600">إجمالي مهام الوكالة: {tasks.length}</span>
      </div>
    </div>
  );
}
