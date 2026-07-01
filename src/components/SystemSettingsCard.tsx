import { Server, Cpu, Key, Shield, Radio, Layers, Database, Zap } from "lucide-react";

export default function SystemSettingsCard() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top Config Chips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[24px] p-5 shadow-[0_10px_25px_rgba(0,0,0,0.02)] flex items-center justify-between dir-rtl text-right">
            <div>
              <p className="text-[10px] text-gray-400 font-mono mb-1 uppercase tracking-wider">Main AI Engine</p>
              <p className="font-bold text-slate-800 text-sm font-sans tracking-tight">Claude 3.5 Sonnet / Opus</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shadow-inner">
              <Cpu className="w-5 h-5"/>
            </div>
        </div>
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[24px] p-5 shadow-[0_10px_25px_rgba(0,0,0,0.02)] flex items-center justify-between dir-rtl text-right">
            <div>
              <p className="text-[10px] text-gray-400 font-mono mb-1 uppercase tracking-wider">Voice & Audio Stream</p>
              <p className="font-bold text-slate-800 text-sm font-sans tracking-tight">ElevenLabs + Faster Whisper</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
              <Radio className="w-5 h-5"/>
            </div>
        </div>
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[24px] p-5 shadow-[0_10px_25px_rgba(0,0,0,0.02)] flex items-center justify-between dir-rtl text-right">
            <div>
              <p className="text-[10px] text-gray-400 font-mono mb-1 uppercase tracking-wider">Local Fallback Node</p>
              <p className="font-bold text-slate-800 text-sm font-sans tracking-tight">Linux Server / Raspberry Pi</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
              <Server className="w-5 h-5"/>
            </div>
        </div>
      </div>

      {/* Deep Architecture Configs */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] text-right dir-rtl flex-1">
        <div className="flex items-center justify-between mb-6 border-b border-white/40 pb-3">
            <span className="text-[10px] bg-slate-200 text-slate-700 font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider">System Architecture Core</span>
            <h3 className="font-bold text-slate-800 text-base font-tajawal flex items-center gap-2">
              البنية التحتية والمحركات (Deep Agency)
              <Key className="w-4 h-4 text-slate-500" />
            </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* MCP Integrations */}
            <div className="p-4 rounded-2xl border border-white/80 bg-white/40 hover:bg-white/60 transition-colors flex flex-col gap-2">
              <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2 font-tajawal">
                  <Layers className="w-4 h-4 text-blue-500"/> تكاملات MCP & APIs
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-tajawal">
                  مفاتيح الوصول لـ <span className="font-mono text-zinc-700">Metorik</span>، و <span className="font-mono text-zinc-700">Windsor</span>، وروبط <span className="font-mono text-zinc-700">MCP</span> الخاصة بـ WordPress و Shopify. جميع الاتصالات مؤمنة عبر بروتوكولات HTTPS.
              </p>
            </div>

            {/* Automation n8n */}
            <div className="p-4 rounded-2xl border border-white/80 bg-white/40 hover:bg-white/60 transition-colors flex flex-col gap-2">
              <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2 font-tajawal">
                  <Zap className="w-4 h-4 text-amber-500"/> المحركات الآلية (n8n & Telegram)
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-tajawal">
                  نظام المبادرة والاستباقية يعمل عبر <span className="font-mono text-zinc-700">n8n</span> المتصل بخوادم الشركة. يراقب انخفاض ROAS تلقائياً ويرسل تنبيهات فورية عبر Telegram.
              </p>
            </div>

            {/* Memory Matrix SQLite */}
            <div className="p-4 rounded-2xl border border-white/80 bg-white/40 hover:bg-white/60 transition-colors flex flex-col gap-2">
              <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2 font-tajawal">
                  <Database className="w-4 h-4 text-purple-500"/> الذاكرة الطويلة والقصيرة
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-tajawal">
                  تخزين مستمر للحقائق والملخصات عن العملاء والمشاريع في قاعدة <span className="font-mono text-zinc-700">SQLite</span> للوصول الاستراتيجي، مع الاحتفاظ بسياق المحادثة قصيرة المدى لدعم خاصية الـ Barge-in بـ Low Latency (~300ms).
              </p>
            </div>

            {/* Local Sandbox Security */}
            <div className="p-4 rounded-2xl border border-white/80 bg-white/40 hover:bg-white/60 transition-colors flex flex-col gap-2">
              <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2 font-tajawal">
                  <Shield className="w-4 h-4 text-emerald-500"/> حماية الشبكات وصلاحيات الوصول
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-tajawal">
                  يؤمّن الـ Deep Brain بـ <span className="font-mono text-zinc-700 text-[10px]">X-Boho-Secret</span>. تستضاف جميع مفاتيح Anthropic، TTS و APIs بشكل مشفر محلياً ولا تُرفع إطلاقاً لـ GitHub لحماية بيانات BGK.
              </p>
            </div>

        </div>
      </div>
    </div>
  );
}
