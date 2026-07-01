import { PenTool, Megaphone, AtSign, Package, FileText, Presentation, FileBarChart, Sparkles } from "lucide-react";

export default function ContentEngineCard() {
  return (
    <div className="flex flex-col gap-6 w-full h-[550px] overflow-y-auto pr-1">
      {/* Top Header Section */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-right dir-rtl shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] bg-amber-100 text-amber-800 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-amber-200">Creative Hub</span>
          <h3 className="font-bold text-slate-800 text-lg font-tajawal flex items-center gap-2">
            محرك إنتاج المحتوى (Content Engine)
            <PenTool className="w-5 h-5 text-amber-600" />
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-tajawal max-w-2xl">
          أتمتة صناعة وتوليد الأصول التسويقية عبر الذكاء الاصطناعي بدءاً من إعلانات السوشيال ميديا حتى المقترحات الاستراتيجية للعملاء، بلهجة الماركة الخاصة بهم.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
        {/* Tactical Marketing Content */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <Megaphone className="w-4 h-4 text-emerald-500"/> المحتوى التسويقي التكتيكي
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">توليد نصوص الإعلانات والاتصالات اليومية</p>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-tajawal font-bold">منشورات السوشيال (Social Media Posts)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">صياغة تغريدات، بوستات إنستجرام، ولينكدإن تلائم طبيعة كل منصة.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <Megaphone className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-tajawal font-bold">نصوص الإعلانات (Ad Copy Generation)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">كتابة إعلانات مُخصصة لـ Meta Ads، Google Ads و Snapchat لزيادة التحويل.</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <AtSign className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-tajawal font-bold">حملات البريد (Email Campaigns)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">صياغة إيميلات تسويقية للنشرات البريدية (Newsletters) وحملات الاستهداف.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50 flex flex-col">
                 <div className="flex items-center gap-2 mb-1 text-slate-700">
                    <Package className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-tajawal font-bold">وصف المنتجات (Product Descriptions)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">تحسين وصياغة وصف المنتجات لمتاجر Shopify لرفع محركات البحث (SEO).</p>
              </div>
            </div>
        </div>

        {/* Strategic Business Documents */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full text-right dir-rtl shrink-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="font-bold text-slate-800 font-tajawal flex items-center gap-2 mb-1">
                     <FileText className="w-4 h-4 text-blue-500"/> وثائق الأعمال والاستراتيجية
                  </h4>
                  <p className="text-[11px] text-slate-500 font-tajawal">تجهيز هيكلة العروض والمقترحات الكبيرة</p>
               </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-tajawal font-bold">عروض الأسعار والمقترحات (Proposals)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">صياغة عقود ومقترحات تسويقية (Proposals) احترافية مخصصة للعملاء الجدد.</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <Presentation className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-tajawal font-bold">تجهيز العروض المرئية (Presentations)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">توليد المحتوى النصي التفصيلي والهيكل العام لعروض تقارير الأداء أو البيع (Pitch Decks).</p>
              </div>

               <div className="p-3 rounded-2xl bg-white/50 border border-slate-200/50">
                 <div className="flex items-center gap-2 mb-1.5 text-slate-700">
                    <FileBarChart className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-tajawal font-bold">استراتيجيات التسويق (Marketing Strategy)</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-tajawal">إعداد مستندات الاستراتيجية الكاملة (Marketing Strategy Documents) بأسلوب مبني على تحلیل بيانات الأداء.</p>
              </div>
            </div>
        </div>

      </div>
    </div>
  );
}
