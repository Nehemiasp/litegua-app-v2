import { motion } from 'framer-motion'
import { X, MapPin, Navigation } from 'lucide-react'

const LOCATIONS = [
  'Ciudad de Guatemala',
  'Puerto Barrios',
  'Morales',
  'Zacapa',
  'Rio Dulce',
  'Esquipulas',
  'Cobán',
  'Flores',
]

export default function LocationPicker({ type, searchParams, setSearchParams, onClose }) {
  const fieldKey = type === 'origin' ? 'origin' : 'destination'
  const title = type === 'origin' ? 'Origen' : 'Destino'

  const selectLocation = (loc) => {
    setSearchParams((prev) => ({ ...prev, [fieldKey]: loc }))
    onClose()
  }

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      className="absolute inset-0 bg-white z-50 flex flex-col"
    >
      <div className="flex items-center gap-3 p-4 border-b border-slate-100">
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
        >
          <X size={20} className="text-slate-600" />
        </button>
        <div className="flex-1 bg-slate-50 rounded-xl px-4 py-2.5">
          <span className="text-slate-900 font-semibold text-sm">{title}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <button
          onClick={() => selectLocation('Mi ubicación')}
          className="flex items-center gap-3 px-5 py-3.5 w-full text-left hover:bg-slate-50 transition-colors"
        >
          <Navigation size={18} className="text-green-600" fill="currentColor" />
          <span className="text-slate-700 font-medium text-sm">Ubicación actual</span>
        </button>

        <div className="h-px bg-slate-100 mx-5" />

        {LOCATIONS.map((loc) => (
          <button
            key={loc}
            onClick={() => selectLocation(loc)}
            className="flex items-center gap-3 px-5 py-3.5 w-full text-left hover:bg-slate-50 transition-colors"
          >
            <MapPin size={18} className="text-slate-400" />
            <span className="text-slate-600 text-sm">{loc}</span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}
