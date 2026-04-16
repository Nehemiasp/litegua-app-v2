import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, Search, Calculator, MapPin, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react'

// ─── Mock tracking result ────────────────────────────────────
const MOCK_STATUS = {
  'LX-12345': {
    id: 'LX-12345',
    status: 'En camino',
    statusIcon: Truck,
    statusColor: 'text-blue-600',
    statusBg: 'bg-blue-50',
    from: 'Guatemala City',
    to: 'Puerto Barrios',
    estimatedDate: '3 Abr 2026',
    weight: '2.5 kg',
    steps: [
      { label: 'Paquete recibido', time: '01 Abr — 8:00 AM', done: true },
      { label: 'En tránsito', time: '02 Abr — 10:30 AM', done: true },
      { label: 'En camino al destino', time: '03 Abr — 4:00 AM', done: true },
      { label: 'Entregado', time: 'Pendiente', done: false },
    ],
  },
}

export default function Lex() {
  const [guide, setGuide] = useState('')
  const [result, setResult] = useState(null)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = () => {
    const found = MOCK_STATUS[guide.trim().toUpperCase()]
    if (found) {
      setResult(found)
      setNotFound(false)
    } else {
      setResult(null)
      setNotFound(true)
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white px-5 pt-5 pb-5 border-b border-slate-100">
        <p className="text-xs font-semibold text-green-600 uppercase tracking-widest">Litegua Express</p>
        <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5">LEX</h1>
        <p className="text-xs text-slate-400 mt-0.5">Encomiendas y paquetería a nivel nacional</p>
      </div>

      <div className="flex-1 overflow-y-auto p-5 pb-24 flex flex-col gap-5">

        {/* Tracking Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5"
        >
          <h2 className="text-base font-bold text-slate-900 mb-3">Rastrea tu paquete</h2>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2.5 bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100 focus-within:border-green-300 focus-within:ring-2 focus-within:ring-green-100 transition-all">
              <Package size={16} className="text-slate-400 flex-shrink-0" />
              <input
                type="text"
                value={guide}
                onChange={(e) => setGuide(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Ej. LX-12345"
                className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-semibold text-sm shadow-md shadow-green-600/25 transition-all active:scale-95 flex-shrink-0"
            >
              <Search size={16} />
            </button>
          </div>
        </motion.div>

        {/* Result / Empty State */}
        <AnimatePresence mode="wait">
          {!result && !notFound && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Package size={32} className="text-slate-300" />
              </div>
              <p className="text-sm font-semibold text-slate-500">Ingresa tu número de guía</p>
              <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
                Ve el estado de tu envío en tiempo real
              </p>
            </motion.div>
          )}

          {notFound && (
            <motion.div
              key="notfound"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-3">
                <AlertCircle size={28} className="text-red-400" />
              </div>
              <p className="text-sm font-semibold text-slate-700">Guía no encontrada</p>
              <p className="text-xs text-slate-400 mt-1">Verifica el número e intenta de nuevo</p>
              <p className="text-[10px] text-green-600 font-medium mt-2">Prueba con: LX-12345</p>
            </motion.div>
          )}

          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
            >
              {/* Status Header */}
              <div className={`px-5 py-4 flex items-center gap-3 ${result.statusBg} border-b border-slate-100`}>
                <result.statusIcon size={20} className={result.statusColor} />
                <div className="flex-1">
                  <p className={`text-sm font-bold ${result.statusColor}`}>{result.status}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Guía: {result.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-medium">Estimado</p>
                  <p className="text-xs font-bold text-slate-700">{result.estimatedDate}</p>
                </div>
              </div>

              {/* Route */}
              <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Origen</p>
                  <p className="text-sm font-bold text-slate-900 truncate">{result.from}</p>
                </div>
                <Truck size={16} className="text-slate-300 flex-shrink-0" />
                <div className="flex-1 min-w-0 text-right">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Destino</p>
                  <p className="text-sm font-bold text-slate-900 truncate">{result.to}</p>
                </div>
              </div>

              {/* Steps */}
              <div className="px-5 py-4">
                <p className="text-xs font-bold text-slate-700 mb-3">Seguimiento</p>
                <div className="flex flex-col gap-3">
                  {result.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        step.done ? 'bg-green-600' : 'bg-slate-200'
                      }`}>
                        {step.done
                          ? <CheckCircle size={12} className="text-white" />
                          : <div className="w-2 h-2 rounded-full bg-slate-400" />}
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions */}
        <div>
          <p className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">Acciones rápidas</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: 'Cotizar envío',
                desc: 'Calcula el costo de tu paquete',
                icon: Calculator,
                color: 'text-purple-500',
                bg: 'bg-purple-50',
              },
              {
                label: 'Agencias LEX',
                desc: 'Encuentra tu punto más cercano',
                icon: MapPin,
                color: 'text-blue-500',
                bg: 'bg-blue-50',
              },
            ].map((action) => (
              <motion.button
                key={action.label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col items-start gap-2 text-left hover:shadow-md transition-all duration-200"
              >
                <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center`}>
                  <action.icon size={18} className={action.color} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{action.label}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{action.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-green-50 rounded-2xl p-4 flex items-start gap-3">
          <Clock size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-green-800">Horario de recepción</p>
            <p className="text-[11px] text-green-700 mt-0.5">Lunes a Sábado: 6:00 AM – 6:00 PM</p>
            <p className="text-[11px] text-green-700">Domingos y festivos: 7:00 AM – 2:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  )
}
