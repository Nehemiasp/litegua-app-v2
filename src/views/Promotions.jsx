import { ArrowLeft, Tag } from 'lucide-react'
import { motion } from 'framer-motion'

const PROMOS = [
  {
    id: 1,
    title: '5% de descuento en tu primera reservación',
    subtitle: 'Solo para nuevos usuarios',
    code: 'BIENVENIDO5',
    expires: '31 mayo 2026',
    images: ['/promo_family.png', '/promo_group.png', '/promo_couple.png'],
    accent: '#f0fdf4',
    tag: '🎉 Nuevo usuario',
  },
  {
    id: 2,
    title: 'Viaje en bus de noche con 20% off',
    subtitle: 'Rutas nocturnas seleccionadas',
    code: 'NOCHE20',
    expires: '15 junio 2026',
    images: ['/promo_bus_night.png', '/promo_family.png', '/promo_couple.png'],
    accent: '#f0f9ff',
    tag: '🌙 Viaje nocturno',
  },
  {
    id: 3,
    title: 'Paquete Tikal: 2 noches + traslado incluido',
    subtitle: 'Tour arqueológico premium',
    code: 'TIKAL2026',
    expires: '30 junio 2026',
    images: ['/promo_ruins.png', '/promo_beach.png', '/promo_group.png'],
    accent: '#fefce8',
    tag: '🏛️ Tour cultural',
  },
  {
    id: 4,
    title: '10% off en tours de playa todo incluido',
    subtitle: 'Destinos costeros seleccionados',
    code: 'PLAYA10',
    expires: '31 julio 2026',
    images: ['/promo_beach.png', '/promo_couple.png', '/promo_family.png'],
    accent: '#fff7ed',
    tag: '🏖️ Turismo',
  },
  {
    id: 5,
    title: 'Descubre los mercados culturales de Guatemala',
    subtitle: 'Experiencia local auténtica',
    code: 'CULTURA15',
    expires: '31 agosto 2026',
    images: ['/promo_market.png', '/promo_ruins.png', '/promo_family.png'],
    accent: '#fdf4ff',
    tag: '🎨 Cultura local',
  },
]

function PromoCard({ promo, index, navigate, onSelectPromo }) {
  const [main, img2, img3] = promo.images

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3, ease: 'easeOut' }}
    >
      {/* Main card */}
      <div
        className="rounded-3xl overflow-hidden flex mb-3"
        style={{ background: promo.accent, minHeight: 148 }}
      >
        {/* Left */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <span
              className="inline-block text-xs font-semibold text-slate-500 mb-2 px-2.5 py-0.5 rounded-full"
              style={{ background: 'rgba(0,0,0,0.06)' }}
            >
              {promo.tag}
            </span>
            <h3 className="text-base font-extrabold text-slate-900 leading-snug">
              {promo.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">{promo.subtitle}</p>
          </div>
          <button
            onClick={() => { onSelectPromo(promo); navigate('promoDetail') }}
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mt-4"
          >
            Ver promoción <span className="text-lg leading-none">→</span>
          </button>
        </div>

        {/* Right: collage */}
        <div className="flex gap-0.5" style={{ width: 140, flexShrink: 0 }}>
          <div className="flex-1 overflow-hidden">
            <img src={main} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-0.5" style={{ width: 60, flexShrink: 0 }}>
            <div className="flex-1 overflow-hidden">
              <img src={img2} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 overflow-hidden">
              <img src={img3} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Code pill */}
      <div className="flex items-center justify-between bg-slate-50 border border-dashed border-slate-300 rounded-2xl px-4 py-3 mb-6">
        <div className="flex items-center gap-2">
          <Tag size={14} className="text-green-600" />
          <span className="text-xs text-slate-500 font-medium">Código:</span>
          <span className="text-sm font-extrabold text-slate-800 tracking-widest">{promo.code}</span>
        </div>
        <span className="text-[11px] text-slate-400">Expira {promo.expires}</span>
      </div>
    </motion.div>
  )
}

export default function Promotions({ goBack, navigate, onSelectPromo }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-3">
        <button
          onClick={goBack}
          className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center"
        >
          <ArrowLeft size={18} className="text-slate-700" />
        </button>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Promociones</h1>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {PROMOS.map((promo, i) => (
          <PromoCard key={promo.id} promo={promo} index={i} navigate={navigate} onSelectPromo={onSelectPromo} />
        ))}
      </div>
    </div>
  )
}
