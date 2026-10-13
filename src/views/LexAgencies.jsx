import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, MapPin, Phone, Clock, Navigation, ChevronRight, Package } from 'lucide-react'
import { AGENCIES } from './AgencyDetail'

// Agencias que reciben encomiendas LEX
const LEX_AGENCIES = AGENCIES.filter((a) => a.services.includes('Encomiendas'))

export default function LexAgencies({ goBack, navigate, onSelectAgency }) {
  const [query, setQuery] = useState('')

  const filtered = LEX_AGENCIES.filter((a) => {
    const q = query.trim().toLowerCase()
    return !q || a.name.toLowerCase().includes(q) || a.address.toLowerCase().includes(q)
  })

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white px-4 pt-3 pb-4 border-b border-slate-100 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={goBack}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors flex-shrink-0">
            <ArrowLeft size={20} className="text-slate-700" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-green-600 uppercase tracking-widest">Litegua Express</p>
            <h1 className="text-base font-extrabold text-slate-900 leading-tight">Agencias LEX</h1>
          </div>
          <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">{LEX_AGENCIES.length}</span>
        </div>

        <div className="flex items-center gap-2 mt-3 bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100 focus-within:border-green-300 focus-within:ring-2 focus-within:ring-green-100 transition-all">
          <Search size={16} className="text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre o ciudad..."
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 pb-8 flex flex-col gap-4">
        {filtered.map((agency, i) => (
          <motion.div
            key={agency.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Package size={20} className="text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  {agency.services.includes('Servicio LEX') && (
                    <span className="inline-block bg-green-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full mb-1 uppercase tracking-wider">
                      Centro LEX
                    </span>
                  )}
                  <h2 className="text-sm font-extrabold text-slate-900 leading-snug">{agency.name}</h2>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-3.5">
                <div className="flex items-start gap-2">
                  <MapPin size={13} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-slate-500 leading-snug">{agency.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-green-600 flex-shrink-0" />
                  <span className="text-xs text-slate-500">{agency.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-green-600 flex-shrink-0" />
                  <span className="text-xs text-slate-500">
                    <span className="font-semibold">{agency.schedule[0].day}:</span> {agency.schedule[0].hours}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 px-4 pb-4">
              <a href={agency.mapUrl} target="_blank" rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-green-600 text-green-600 text-xs font-bold hover:bg-green-50 transition-colors active:scale-[0.98]">
                <Navigation size={13} /> Cómo llegar
              </a>
              <button
                onClick={() => { onSelectAgency(agency); navigate('agencyDetail') }}
                className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl bg-green-600 text-white text-xs font-bold hover:bg-green-700 transition-colors active:scale-[0.98]">
                Ver detalles <ChevronRight size={13} />
              </button>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Search size={24} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium text-sm">Sin resultados para "{query}"</p>
            <p className="text-slate-400 text-xs mt-1">Intenta con otro nombre o ciudad</p>
          </div>
        )}
      </div>
    </div>
  )
}
