import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Navigation, Search, Clock } from 'lucide-react'

// ── All major Guatemala locations with region context ────────
const ALL_LOCATIONS = [
  // Guatemala City & Metro
  { name: 'Ciudad de Guatemala', region: 'Guatemala', popular: true },
  { name: 'Mixco', region: 'Guatemala', popular: true },
  { name: 'Villa Nueva', region: 'Guatemala', popular: true },
  { name: 'San Miguel Petapa', region: 'Guatemala' },
  { name: 'Amatitlán', region: 'Guatemala' },
  { name: 'Santa Catarina Pinula', region: 'Guatemala' },
  { name: 'San Juan Sacatepéquez', region: 'Guatemala' },
  // Izabal
  { name: 'Puerto Barrios', region: 'Izabal', popular: true },
  { name: 'Morales', region: 'Izabal', popular: true },
  { name: 'Rio Dulce', region: 'Izabal', popular: true },
  { name: 'Livingston', region: 'Izabal' },
  { name: 'El Estor', region: 'Izabal' },
  // Zacapa
  { name: 'Zacapa', region: 'Zacapa', popular: true },
  { name: 'Chiquimula', region: 'Zacapa' },
  { name: 'Esquipulas', region: 'Chiquimula', popular: true },
  { name: 'Gualán', region: 'Zacapa' },
  // Alta Verapaz
  { name: 'Cobán', region: 'Alta Verapaz', popular: true },
  { name: 'San Pedro Carchá', region: 'Alta Verapaz' },
  { name: 'Senahu', region: 'Alta Verapaz' },
  { name: 'Lanquín', region: 'Alta Verapaz' },
  { name: 'Semuc Champey', region: 'Alta Verapaz' },
  // Petén
  { name: 'Flores', region: 'Petén', popular: true },
  { name: 'Santa Elena', region: 'Petén' },
  { name: 'Poptún', region: 'Petén' },
  { name: 'Sayaxché', region: 'Petén' },
  // Baja Verapaz
  { name: 'Salamá', region: 'Baja Verapaz' },
  { name: 'Rabinal', region: 'Baja Verapaz' },
  // El Progreso
  { name: 'Guastatoya', region: 'El Progreso' },
  { name: 'Sanarate', region: 'El Progreso' },
  // Jalapa & Jutiapa
  { name: 'Jalapa', region: 'Jalapa' },
  { name: 'Jutiapa', region: 'Jutiapa' },
  { name: 'Asunción Mita', region: 'Jutiapa' },
  // Sacatepéquez / Chimaltenango
  { name: 'Antigua Guatemala', region: 'Sacatepéquez', popular: true },
  { name: 'Chimaltenango', region: 'Chimaltenango' },
  { name: 'Patzicía', region: 'Chimaltenango' },
  // Escuintla & Costa Sur
  { name: 'Escuintla', region: 'Escuintla' },
  { name: 'Puerto San José', region: 'Escuintla' },
  { name: 'Palín', region: 'Escuintla' },
  // Quetzaltenango & occidente
  { name: 'Quetzaltenango', region: 'Quetzaltenango', popular: true },
  { name: 'San Marcos', region: 'San Marcos' },
  { name: 'Huehuetenango', region: 'Huehuetenango' },
  { name: 'Santa Cruz del Quiché', region: 'El Quiché' },
  // Sololá
  { name: 'Panajachel', region: 'Sololá', popular: true },
  { name: 'Santiago Atitlán', region: 'Sololá' },
  // Retalhuleu / Suchitepéquez
  { name: 'Retalhuleu', region: 'Retalhuleu' },
  { name: 'Mazatenango', region: 'Suchitepéquez' },
]

const POPULAR = ALL_LOCATIONS.filter(l => l.popular)

// Simple fuzzy match — score higher if word starts with query
function score(loc, q) {
  const name = loc.name.toLowerCase()
  const region = loc.region.toLowerCase()
  const query = q.toLowerCase()
  if (name.startsWith(query)) return 3
  if (name.includes(query)) return 2
  if (region.includes(query)) return 1
  return 0
}

const RECENT_KEY = 'ltg_recent_locations'
const getRecent = () => {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]') } catch { return [] }
}
const saveRecent = (loc) => {
  const prev = getRecent().filter(r => r !== loc)
  localStorage.setItem(RECENT_KEY, JSON.stringify([loc, ...prev].slice(0, 5)))
}

export default function LocationPicker({ type, searchParams, setSearchParams, onClose }) {
  const [query, setQuery] = useState('')
  const [recents, setRecents] = useState(getRecent)
  const inputRef = useRef(null)
  const fieldKey = type === 'origin' ? 'origin' : 'destination'
  const title = type === 'origin' ? 'Origen' : 'Destino'
  const placeholder = type === 'origin' ? 'Ciudad, municipio...' : 'Ciudad, destino...'

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 300) }, [])

  const selectLocation = (loc) => {
    setSearchParams((prev) => ({ ...prev, [fieldKey]: loc }))
    saveRecent(loc)
    onClose()
  }

  // Filter + sort by score
  const results = query.trim().length === 0 ? [] : ALL_LOCATIONS
    .map(loc => ({ ...loc, s: score(loc, query.trim()) }))
    .filter(loc => loc.s > 0)
    .sort((a, b) => b.s - a.s || a.name.localeCompare(b.name))
    .slice(0, 10)

  const showDefault = query.trim().length === 0

  // Highlight matching portion
  const highlight = (text) => {
    if (!query) return text
    const idx = text.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-green-100 text-green-800 rounded font-bold" style={{ padding: '0 1px' }}>
          {text.slice(idx, idx + query.length)}
        </mark>
        {text.slice(idx + query.length)}
      </>
    )
  }

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      className="absolute inset-0 bg-white z-50 flex flex-col"
    >
      {/* Search bar */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-slate-100">
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors flex-shrink-0"
        >
          <X size={20} className="text-slate-600" />
        </button>
        <div className="flex-1 flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100 transition-all">
          <Search size={15} className="text-slate-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none font-medium"
          />
          {query.length > 0 && (
            <button onClick={() => setQuery('')} className="flex-shrink-0">
              <X size={13} className="text-slate-400" />
            </button>
          )}
        </div>
      </div>

      {/* Label */}
      <div className="px-5 pt-3 pb-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {showDefault ? (recents.length > 0 ? 'Recientes' : 'Populares') : `${results.length} resultado${results.length !== 1 ? 's' : ''}`}
        </span>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">

          {/* Default view — recents or popular + current location */}
          {showDefault && (
            <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <button
                onClick={() => selectLocation('Mi ubicación actual')}
                className="flex items-center gap-3 px-5 py-3.5 w-full text-left hover:bg-slate-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Navigation size={15} className="text-green-600" fill="currentColor" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-700">Ubicación actual</p>
                  <p className="text-[11px] text-slate-400">Usar mi ubicación GPS</p>
                </div>
              </button>

              <div className="h-px bg-slate-100 mx-5 my-1" />

              {(recents.length > 0 ? recents.map(r => ({ name: r, region: '' })) : POPULAR).map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => selectLocation(loc.name)}
                  className="flex items-center gap-3 px-5 py-3.5 w-full text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                    {recents.length > 0
                      ? <Clock size={14} className="text-slate-400" />
                      : <MapPin size={14} className="text-slate-400" />
                    }
                  </div>
                  <div>
                    <p className="text-sm text-slate-800 font-medium">{loc.name}</p>
                    {loc.region && <p className="text-[11px] text-slate-400">{loc.region}</p>}
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {/* Search results */}
          {!showDefault && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {results.length === 0 ? (
                <div className="flex flex-col items-center py-16 text-center px-8">
                  <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                    <MapPin size={24} className="text-slate-300" />
                  </div>
                  <p className="text-sm font-semibold text-slate-500">Sin resultados</p>
                  <p className="text-xs text-slate-400 mt-1">Intenta con otro nombre o municipio</p>
                </div>
              ) : results.map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => selectLocation(loc.name)}
                  className="flex items-center gap-3 px-5 py-3.5 w-full text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} className="text-slate-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-slate-800 font-medium leading-snug">{highlight(loc.name)}</p>
                    <p className="text-[11px] text-slate-400">{loc.region}</p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  )
}
