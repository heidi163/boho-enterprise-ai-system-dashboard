import { Mic, Waves, Fingerprint, Smile, Users, Sliders } from "lucide-react";

export default function VoiceFeaturesCard() {
  return (
    <div className="flex flex-col gap-6 w-full h-[550px] overflow-y-auto pr-1">
      {/* Top Header Section */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-right dir-rtl shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] bg-purple-100 text-purple-800 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-purple-200">Advanced Audio AI</span>
          <h3 className="font-bold text-slate-800 text-lg font-tajawal flex items-center gap-2">
            ميزات الصوت المتقدمة (Advanced Voice)
            <Mic className="w-5 h-5 text-purple-600" />
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-tajawal max-w-2xl">
          قدرات استثنائية لمعالجة الصوت تسمح بالتعرف على المشاعر وتمييز المتحدثين في الاجتماعات، مع إمكانيات توليد وعمل استنساخ للهويات الصوتية المخصصة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        {/* Emotions & Recognition */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Smile className="w-4 h-4 text-emerald-500"/> الذكاء العاطفي وتمييز الأفراد
                  </h4>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-emerald-100/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <Smile className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-tajawal font-bold">اكتشاف المشاعر (Emotion Detection)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">تحليل نبرة صوت العميل (غضب، رضا، تردد) لمعرفة مدى استجابته للعرض.</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-blue-100/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <Waves className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-tajawal font-bold">الردود العاطفية (Emotion-Based Responses)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">تغيير نبرة بوهو للتعاطف أو للجدية التامة بناءً على مشاعر الطرف الآخر.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-amber-100/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <Users className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-tajawal font-bold">تمييز المتحدثين (Speaker Recognition)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">التفريق بين أصوات عدة أشخاص باجتماع واحد ومعرفة من قال ماذا بالضبط.</p>
              </div>
            </div>
        </div>

        {/* Synthesis & Cloning */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Fingerprint className="w-4 h-4 text-rose-500"/> التوليد واستنساخ الأصوات
                  </h4>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-white flex flex-col">
                 <div className="flex items-center gap-2 mb-1">
                    <Fingerprint className="w-4 h-4 text-rose-400" />
                    <span className="text-xs font-tajawal font-bold">استنساخ الأصوات (Voice Cloning)</span>
                 </div>
                 <p className="text-[10px] text-slate-300 font-tajawal">القدرة على إنشاء عينات صوتية مطابقة لأشخاص معينين واستخدامها في مقاطع توليدية.</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-indigo-100/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <Mic className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-tajawal font-bold">أصوات متعددة (Multiple Voices)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">استخدام معلقين صوتيين آليين للإعلانات والنصوص القصيرة باختلاف طبيعتهم.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <Sliders className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-tajawal font-bold">إعدادات ملف الصوت (Voice Profiles)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">حفظ خيارات النبرة المفضلة (صوت دافئ، سريع، حماسي) للعودة لها لاحقاً بعملية التوليد.</p>
              </div>
            </div>
        </div>

      </div>
    </div>
  );
}
