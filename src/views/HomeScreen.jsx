import { useState } from 'react'
import { Bus, Umbrella, ArrowUpDown, Search, Star, MapPin, Phone, Users, Package, Weight, Calendar, MapPinned } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AGENCIES } from './AgencyDetail'
import { TOURS } from './Explore'

const TABS = [
  { id: 'bus', label: 'Bus', icon: Bus },
  { id: 'turismo', label: 'Turismo', icon: Umbrella },
  { id: 'lex', label: 'LEX', icon: Bus },
]



export default function HomeScreen({
  searchParams, setSearchParams, activeTab, setActiveTab,
  handleSearch, navigate, setLocationPicker, onSelectAgency, onSelectTour,
}) {
  const swapLocations = () => {
    setSearchParams((prev) => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }))
  }

  return (
    <div className="flex-1 pb-0 overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-6 pb-3 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">¡Hola, Nehemías!</h1>
        <div className="w-11 h-11 rounded-full bg-green-600 flex items-center justify-center shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 pb-4">
        <div className="flex gap-3">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 px-6 py-3.5 rounded-2xl transition-all duration-200 border-2 ${
                  isActive
                    ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-600/30'
                    : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.2 : 1.5} />
                <span className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-slate-400'}`}>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Search Widget */}
      <div className="px-5 pb-5">
        <AnimatePresence mode="wait">

          {/* ── BUS ─────────────────────────────────────── */}
          {activeTab === 'bus' && (
            <motion.div key="bus"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4"
            >
              <div className="relative">
                <button onClick={() => setLocationPicker('origin')}
                  className="w-full text-left px-4 py-3 bg-slate-50 rounded-xl mb-2 text-sm hover:bg-slate-100 transition-colors">
                  <span className={searchParams.origin ? 'text-slate-900 font-medium' : 'text-slate-400'}>
                    {searchParams.origin || 'Seleccione origen'}
                  </span>
                </button>
                <button onClick={swapLocations}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white rounded-full border border-slate-200 flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:border-green-300">
                  <ArrowUpDown size={16} className="text-slate-500" />
                </button>
                <button onClick={() => setLocationPicker('destination')}
                  className="w-full text-left px-4 py-3 bg-slate-50 rounded-xl text-sm hover:bg-slate-100 transition-colors">
                  <span className={searchParams.destination ? 'text-slate-900 font-medium' : 'text-slate-400'}>
                    {searchParams.destination || 'Seleccione destino'}
                  </span>
                </button>
              </div>
              <div className="flex gap-2 mt-3">
                <div className="flex-1">
                  <input type="date" value={searchParams.date}
                    onChange={(e) => setSearchParams((p) => ({ ...p, date: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm text-slate-700 border border-transparent focus:border-green-300 focus:ring-2 focus:ring-green-100 transition-all" />
                </div>
                <div className="flex-1">
                  <select value={searchParams.time}
                    onChange={(e) => setSearchParams((p) => ({ ...p, time: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm text-slate-700 border border-transparent focus:border-green-300 focus:ring-2 focus:ring-green-100 appearance-none transition-all">
                    <option value="">Hora de salida</option>
                    <option value="04:00">4:00 a.m.</option>
                    <option value="06:00">6:00 a.m.</option>
                    <option value="08:00">8:00 a.m.</option>
                    <option value="10:00">10:00 a.m.</option>
                    <option value="12:00">12:00 p.m.</option>
                    <option value="14:00">2:00 p.m.</option>
                    <option value="16:00">4:00 p.m.</option>
                  </select>
                </div>
              </div>
              <button onClick={handleSearch}
                className="w-full mt-3 py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full text-sm shadow-md shadow-green-600/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                <Search size={16} /> Buscar
              </button>
            </motion.div>
          )}

          {/* ── TURISMO ─────────────────────────────────── */}
          {activeTab === 'turismo' && (
            <motion.div key="turismo"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4"
            >
              <p className="text-[11px] font-bold text-green-600 uppercase tracking-wider mb-3">¿A dónde quieres ir?</p>
              <button onClick={() => setLocationPicker('destination')}
                className="w-full text-left px-4 py-3 bg-slate-50 rounded-xl mb-3 text-sm hover:bg-slate-100 transition-colors flex items-center gap-2">
                <MapPinned size={14} className="text-green-500 flex-shrink-0" />
                <span className={searchParams.destination ? 'text-slate-900 font-medium' : 'text-slate-400'}>
                  {searchParams.destination || 'Destino del tour'}
                </span>
              </button>
              <div className="flex gap-2 mb-3">
                <div className="flex-1 relative">
                  <Calendar size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input type="date" value={searchParams.date}
                    onChange={(e) => setSearchParams((p) => ({ ...p, date: e.target.value }))}
                    className="w-full pl-8 pr-3 py-3 bg-slate-50 rounded-xl text-sm text-slate-700 border border-transparent focus:border-green-300 focus:ring-2 focus:ring-green-100 transition-all" />
                </div>
                <div className="flex-1 relative">
                  <Users size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <select className="w-full pl-8 pr-3 py-3 bg-slate-50 rounded-xl text-sm text-slate-700 border border-transparent focus:border-green-300 focus:ring-2 focus:ring-green-100 appearance-none transition-all">
                    <option>1 persona</option>
                    <option>2 personas</option>
                    <option>3 personas</option>
                    <option>4+ personas</option>
                  </select>
                </div>
              </div>
              <select className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm text-slate-700 border border-transparent focus:border-green-300 focus:ring-2 focus:ring-green-100 appearance-none transition-all mb-3">
                <option value="">Tipo de tour</option>
                <option>Cultural e histórico</option>
                <option>Aventura y naturaleza</option>
                <option>Playa y relax</option>
                <option>Gastronomía</option>
                <option>Familiar</option>
              </select>
              <button onClick={() => navigate('explore')}
                className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full text-sm shadow-md shadow-green-600/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                <Umbrella size={16} /> Buscar tours
              </button>
            </motion.div>
          )}

          {/* ── LEX ─────────────────────────────────────── */}
          {activeTab === 'lex' && (
            <motion.div key="lex"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4"
            >
              <p className="text-[11px] font-bold text-green-600 uppercase tracking-wider mb-3">Enviar encomienda</p>
              <div className="relative mb-3">
                <button onClick={() => setLocationPicker('origin')}
                  className="w-full text-left px-4 py-3 bg-slate-50 rounded-xl mb-2 text-sm hover:bg-slate-100 transition-colors">
                  <span className={searchParams.origin ? 'text-slate-900 font-medium' : 'text-slate-400'}>
                    {searchParams.origin || 'Ciudad de origen'}
                  </span>
                </button>
                <button onClick={swapLocations}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white rounded-full border border-slate-200 flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:border-green-300">
                  <ArrowUpDown size={16} className="text-slate-500" />
                </button>
                <button onClick={() => setLocationPicker('destination')}
                  className="w-full text-left px-4 py-3 bg-slate-50 rounded-xl text-sm hover:bg-slate-100 transition-colors">
                  <span className={searchParams.destination ? 'text-slate-900 font-medium' : 'text-slate-400'}>
                    {searchParams.destination || 'Ciudad de destino'}
                  </span>
                </button>
              </div>
              <div className="flex gap-2 mb-3">
                <div className="flex-1 relative">
                  <Package size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <select className="w-full pl-8 pr-3 py-3 bg-slate-50 rounded-xl text-sm text-slate-700 border border-transparent focus:border-green-300 focus:ring-2 focus:ring-green-100 appearance-none transition-all">
                    <option value="">Tipo de paquete</option>
                    <option>Documentos</option>
                    <option>Paquete pequeño</option>
                    <option>Caja mediana</option>
                    <option>Caja grande</option>
                    <option>Frágil</option>
                  </select>
                </div>
                <div className="flex-1 relative">
                  <Weight size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <select className="w-full pl-8 pr-3 py-3 bg-slate-50 rounded-xl text-sm text-slate-700 border border-transparent focus:border-green-300 focus:ring-2 focus:ring-green-100 appearance-none transition-all">
                    <option value="">Peso aprox.</option>
                    <option>Menos de 1 kg</option>
                    <option>1 – 5 kg</option>
                    <option>5 – 15 kg</option>
                    <option>Más de 15 kg</option>
                  </select>
                </div>
              </div>
              <button onClick={() => navigate('lex')}
                className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full text-sm shadow-md shadow-green-600/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                <Package size={16} /> Cotizar envío
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Recommendations — real tour data */}
      <div className="pb-6" style={{ paddingInline: 'calc(var(--spacing) * 5)' }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900">Recomendaciones para ti</h2>
          <button onClick={() => navigate('explore')} className="text-xs font-semibold text-green-600">
            Ver todas
          </button>
        </div>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginInline: 'calc(var(--spacing) * -5)' }}>
          <div style={{ display: 'inline-flex', gap: 12, paddingInline: 'calc(var(--spacing) * 5)', paddingBottom: 8 }}>
            {TOURS.map((tour) => (
              <motion.div
                key={tour.id}
                whileHover={{ y: -2 }}
                onClick={() => { onSelectTour(tour); navigate('tourDetail') }}
                className="bg-white border border-slate-100 overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
                style={{ width: 200, borderRadius: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', flexShrink: 0 }}
              >
                <div className="overflow-hidden" style={{ height: 130 }}>
                  <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div style={{ padding: '10px 12px 12px' }}>
                  {tour.badge && (
                    <span className="inline-block text-green-700 font-bold mb-1"
                      style={{ fontSize: 9, background: '#dcfce7', padding: '2px 8px', borderRadius: 99 }}>
                      {tour.badge}
                    </span>
                  )}
                  <h3 className="text-sm font-bold text-slate-900 leading-tight line-clamp-2">{tour.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 text-slate-400">
                      <MapPin size={10} />
                      <span className="text-xs">{tour.location}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Star size={10} className="text-amber-500 fill-amber-500" />
                      <span className="text-xs font-bold text-slate-700">{tour.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-green-700 mt-1.5">{tour.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Promotions */}
      <div className="px-5 pb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-extrabold text-slate-900">Promociones</h2>
          <button onClick={() => navigate('promotions')} className="text-xs font-semibold text-green-600">
            Ver todas
          </button>
        </div>
        <div className="bg-slate-100 rounded-3xl overflow-hidden flex" style={{ minHeight: 140 }}>
          {/* Left: text */}
          <div className="flex-1 p-5 flex flex-col justify-between">
            <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
              5% de descuento en tu<br />primera reservación
            </h3>
            <button onClick={() => navigate('promotions')} className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mt-4">
              Ver promoción <span className="text-lg leading-none">→</span>
            </button>
          </div>
          {/* Right: photo collage */}
          <div className="flex gap-0.5" style={{ width: 140, flexShrink: 0 }}>
            <div className="flex-1 overflow-hidden">
              <img src="/promo_family.png" alt="Promo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-0.5" style={{ width: 60, flexShrink: 0 }}>
              <div className="flex-1 overflow-hidden">
                <img src="/promo_group.png" alt="Promo" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 overflow-hidden">
                <img src="/promo_couple.png" alt="Promo" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agencies */}
      <div className="pb-10" style={{ paddingInline: 'calc(var(--spacing) * 5)' }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900">Nuestras Agencias</h2>
          <button onClick={() => navigate('agencyMap')} className="text-xs font-semibold text-green-600">
            Ver todas
          </button>
        </div>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginInline: 'calc(var(--spacing) * -5)' }}>
          <div style={{ display: 'inline-flex', gap: 12, paddingInline: 'calc(var(--spacing) * 5)', paddingBottom: 8 }}>
            {AGENCIES.map((agency, i) => (
              <div
                key={i}
                onClick={() => { onSelectAgency(agency); navigate('agencyDetail') }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
                style={{ width: 210, flexShrink: 0 }}
              >
                <div className="bg-slate-100 overflow-hidden" style={{ height: 120 }}>
                  <img src={agency.image} alt={agency.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold text-slate-900">{agency.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1.5 text-green-600">
                    <Phone size={11} />
                    <span className="text-xs font-medium">{agency.phone}</span>
                  </div>
                  <div className="flex items-start gap-1 mt-1">
                    <MapPin size={11} className="text-slate-400 mt-0.5 flex-shrink-0" />
                    <span className="text-[11px] text-slate-500 leading-tight line-clamp-2">{agency.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
