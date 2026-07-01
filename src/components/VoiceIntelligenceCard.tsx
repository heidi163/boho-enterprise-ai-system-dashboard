import { Mic, Volume2, Speech, Fingerprint, Settings2, Sparkles, MessageSquare, Radio } from "lucide-react";

export default function VoiceIntelligenceCard() {
  return (
    <div className="flex flex-col gap-6 w-full h-[550px] overflow-y-auto pr-1">
      {/* Top Header Section */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-right dir-rtl shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] bg-sky-100 text-sky-800 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-sky-200">Voice Synthesis & Intelligence</span>
          <h3 className="font-bold text-slate-800 text-lg font-tajawal flex items-center gap-2">
            تمكين الذكاء الصوتي (Voice Intelligence)
            <Volume2 className="w-5 h-5 text-sky-500" />
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-tajawal max-w-2xl">
          يمتاز بوهو بشخصية صوتية تفاعلية بأسلوب وحديث مصري بطلاقة. قدرته على تحليل وفهم المقاطعات الصوتية ومحاكاة الحوارات الإنسانية تتيح له التحدث بطريقة حيوية غير آلية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        
        {/* Core Voice Capabilities */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Speech className="w-4 h-4 text-emerald-500"/> المحادثات والنطق (Speech Dynamics)
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">تحسين الردود المقروءة والمنطوقة</p>
               </div>
               <div className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-mono border border-emerald-200 flex flex-col items-center justify-center">
                  <span className="flex items-center gap-1"><Sparkles className="w-3 h-3"/> Active HQ</span>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-emerald-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-tajawal font-bold">الحوار كالبشر (Human-Like Dialogue)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">التحدث بطبقة صوتية ونبرة تفاعلية (Conversational Tone) ومناقشة الموضوعات بحيوية تامة.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-emerald-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Radio className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-tajawal font-bold">تحسين وتوليد المنطوق</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">معالجة وتكوين الردود لتلائم الاستماع (Spoken Response Optimization) من خلال توليد (Natural Read-Aloud Responses).</p>
              </div>
            </div>
        </div>

        {/* Personality & Cultural adaptation */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Fingerprint className="w-4 h-4 text-orange-500"/> هوية الصوت والشخصية (Personality)
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">الاندماج الثقافي للهجة بوهو</p>
               </div>
               <div className="text-[9px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 font-mono border border-orange-200 flex flex-col items-center justify-center">
                  <span className="flex items-center gap-1"><Mic className="w-3 h-3"/> Active</span>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-orange-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Settings2 className="w-4 h-4 text-orange-400" />
                    <span className="text-xs font-tajawal font-bold">اللهجة المصرية (Egyptian Arabic Speech)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">التكيف الصوتي للتعبيرات العامية المصرية (يا غالي، التمام، عينيا) لخلق تواصل مباشر سريع.</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-orange-100/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Fingerprint className="w-4 h-4 text-rose-400" />
                    <span className="text-xs font-tajawal font-bold">شخصية بوهو (Voice Personality)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">مزاح خفيف، ثقة بالرأي، ورفض الأفكار التسويقية الخاطئة، مما يجعله شريكاً استراتيجياً وليس مجرد مساعد.</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
