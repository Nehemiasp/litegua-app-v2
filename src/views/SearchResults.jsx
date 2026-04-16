import { ArrowLeft, Clock, MapPin, Bus } from 'lucide-react'
import { motion } from 'framer-motion'

const PRIMERA_PLUS_LOGO = () => (
  <div className="w-16 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center flex-shrink-0">
    <div className="text-center">
      <div className="text-[7px] text-slate-500 font-medium leading-none">Servicio</div>
      <div className="text-[9px] text-green-700 font-extrabold leading-tight tracking-tight">PRIMERA</div>
      <div className="text-[8px] text-green-600 font-bold leading-none">PLUS</div>
    </div>
  </div>
)

const SERVICES = {
  recommended: [
    { id: 1, name: 'Primera Plus', time: '4:00 a.m.', route: 'Ciudad Capital - Morales - Puerto Barrios' },
    { id: 2, name: 'Primera Plus', time: '4:00 a.m.', route: 'Ciudad Capital - Morales - Puerto Barrios' },
    { id: 3, name: 'Primera Plus', time: '4:00 a.m.', route: 'Ciudad Capital - Morales - Puerto Barrios' },
  ],
  others: [
    { id: 4, name: 'Primera Plus', time: '4:00 a.m.', route: 'Ciudad Capital - Morales - Puerto Barrios' },
    { id: 5, name: 'Primera Plus', time: '4:00 a.m.', route: 'Ciudad Capital - Morales - Puerto Barrios' },
    { id: 6, name: 'Primera Plus', time: '4:00 a.m.', route: 'Ciudad Capital - Morales - Puerto Barrios' },
    { id: 7, name: 'Primera Plus', time: '4:00 a.m.', route: 'Ciudad Capital - Morales - Puerto Barrios' },
    { id: 8, name: 'Primera Plus', time: '4:00 a.m.', route: 'Ciudad Capital - Morales - Puerto Barrios' },
  ],
}

export default function SearchResults({ searchParams, goBack, navigate }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr + 'T00:00:00')
    return d.toLocaleDateString('es-GT', { month: 'short', day: 'numeric' })
  }

  const formatTime = (t) => {
    if (!t) return ''
    const [h] = t.split(':')
    const hour = parseInt(h)
    return `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'P.M.' : 'A.M.'}`
  }

  const ServiceCard = ({ service, index }) => (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={() => navigate('seats')}
      className="w-full bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4 text-left hover:shadow-md hover:border-slate-200 transition-all duration-200 active:scale-[0.98]"
    >
      <PRIMERA_PLUS_LOGO />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-slate-900">{service.name}</h3>
        <div className="flex items-center gap-1.5 mt-1">
          <Clock size={12} className="text-green-600" />
          <span className="text-xs font-medium text-green-700">{service.time}</span>
        </div>
        <div className="flex items-start gap-1.5 mt-1">
          <MapPin size={12} className="text-slate-400 mt-0.5 flex-shrink-0" />
          <span className="text-[11px] text-slate-500 leading-tight">{service.route}</span>
        </div>
      </div>
    </motion.button>
  )

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-slate-100 sticky top-0 z-10">
        <button
          onClick={goBack}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors flex-shrink-0"
        >
          <ArrowLeft size={20} className="text-slate-700" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-green-600 flex items-center justify-center flex-shrink-0">
              <Bus size={15} className="text-white" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">
                {searchParams.origin || 'Ciudad de Guatemala'} &mdash; {searchParams.destination || 'Puerto Barrios'}
              </p>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                {formatDate(searchParams.date)}{searchParams.date && searchParams.time ? ' · ' : ''}{formatTime(searchParams.time)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-5">
        <h2 className="text-base font-bold text-slate-900 mb-3">Recomendaciones</h2>
        <div className="flex flex-col gap-3 mb-6">
          {SERVICES.recommended.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>

        <h2 className="text-base font-bold text-slate-900 mb-3">Otras fechas</h2>
        <div className="flex flex-col gap-3 pb-4">
          {SERVICES.others.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i + 3} />
          ))}
        </div>
      </div>
    </div>
  )
}
