import { motion } from 'framer-motion'
import { ArrowLeft, Tag, Copy, CheckCheck, Calendar, Info, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function PromoDetail({ promo, goBack, navigate }) {
  const [copied, setCopied] = useState(false)

  if (!promo) return null

  const [main, img2, img3] = promo.images

  const copyCode = () => {
    navigator.clipboard.writeText(promo.code).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">

      {/* ── Hero collage ──────────────────────────────── */}
      <div className="relative" style={{ height: 280 }}>
        {/* Collage grid */}
        <div className="absolute inset-0 flex gap-0.5">
          <div className="flex-1 overflow-hidden">
            <img src={main} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-0.5" style={{ width: 100, flexShrink: 0 }}>
            <div className="flex-1 overflow-hidden">
              <img src={img2} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 overflow-hidden">
              <img src={img3} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />

        {/* Back button */}
        <div className="absolute top-0 left-0 right-0 flex items-center px-4 pt-12">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={goBack}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30"
          >
            <ArrowLeft size={20} className="text-white" />
          </motion.button>
        </div>

        {/* Tag badge on hero */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30 mb-2">
            {promo.tag}
          </span>
          <h1 className="text-white text-xl font-extrabold leading-snug drop-shadow">
            {promo.title}
          </h1>
        </div>
      </div>

      {/* ── Content card ──────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto bg-white"
        style={{ borderRadius: '24px 24px 0 0', marginTop: -20, paddingBottom: 120 }}
      >
        {/* Subtitle */}
        <div className="px-5 pt-6 pb-1">
          <p className="text-sm text-slate-500 font-medium">{promo.subtitle}</p>
        </div>

        {/* Expiry */}
        <div className="px-5 pb-5 flex items-center gap-2 mt-1">
          <Calendar size={13} className="text-slate-400" />
          <span className="text-xs text-slate-400 font-medium">Válido hasta el <strong className="text-slate-600">{promo.expires}</strong></span>
        </div>

        {/* Code copy block */}
        <div className="px-5">
          <div
            className="rounded-2xl border-2 border-dashed border-green-200 bg-green-50 p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">
                <Tag size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium">Código de descuento</p>
                <p className="text-lg font-extrabold tracking-widest text-slate-900">{promo.code}</p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={copyCode}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                copied
                  ? 'bg-green-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 shadow-sm'
              }`}
            >
              {copied ? <CheckCheck size={13} /> : <Copy size={13} />}
              {copied ? '¡Copiado!' : 'Copiar'}
            </motion.button>
          </div>
        </div>

        {/* How to use */}
        <div className="px-5 mt-6">
          <h2 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-1.5">
            <Info size={14} className="text-green-600" />
            ¿Cómo usar esta promoción?
          </h2>
          <div className="space-y-3">
            {[
              'Selecciona tu ruta o tour en la app.',
              'Continúa hasta el paso de pago.',
              `Ingresa el código "${promo.code}" en el campo de descuento.`,
              '¡Listo! Tu descuento se aplicará automáticamente.',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-600 text-white text-xs font-extrabold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-slate-600 leading-snug">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Terms */}
        <div className="px-5 mt-6">
          <h2 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-1.5">
            <Sparkles size={14} className="text-green-600" />
            Términos y condiciones
          </h2>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2">
            {[
              'Válido para compras realizadas en la app Litegua.',
              'No acumulable con otras promociones o descuentos.',
              `Expira el ${promo.expires}.`,
              'Promoción sujeta a disponibilidad de boletos.',
              'Solo un uso por usuario registrado.',
            ].map((term, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-green-500 font-bold text-xs mt-0.5">•</span>
                <p className="text-xs text-slate-500 leading-snug">{term}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky CTA ────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100"
        style={{ padding: '16px 20px 36px' }}
      >
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('home')}
          className="w-full py-4 rounded-2xl bg-green-600 text-white font-bold text-sm shadow-lg shadow-green-600/30 hover:bg-green-700 transition-colors flex items-center justify-center gap-2.5"
        >
          <Sparkles size={16} />
          Usar promoción ahora
        </motion.button>
      </div>
    </div>
  )
}
