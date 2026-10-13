import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Star } from 'lucide-react'

// duration: trip length in days (1 = day trip)
// availableDays: weekdays this tour can be requested (0=Sun, 1=Mon ... 6=Sat)
// Los tours no tienen precio publicado: el cliente solicita una cotización.
export const TOURS = [
  {
    id: 1,
    name: 'Tikal',
    description: 'Descubre el corazón del mundo maya.',
    rating: 4.9,
    reviews: '1.2k',
    location: 'Petén',
    badge: 'Más vendido',
    duration: 2,
    availableDays: [0, 1, 2, 3, 4, 5, 6],
    image: '/tours/tikal.jpg',
  },
  {
    id: 2,
    name: 'Antigua',
    description: 'Descubre la ciudad colonial de encanto.',
    rating: 4.7,
    reviews: '5.1k',
    location: 'Sacatepéquez',
    badge: null,
    duration: 1,
    availableDays: [0, 1, 2, 3, 4, 5, 6],
    image: '/tours/antigua.jpg',
  },
  {
    id: 3,
    name: 'Atitlán',
    description: 'Descubre la magia que tiene para ti, el lago de Atitlán.',
    rating: 4.8,
    reviews: '2.3k',
    location: 'Sololá',
    badge: null,
    duration: 1,
    availableDays: [0, 1, 2, 3, 4, 5, 6],
    image: '/tours/atitlan.jpg',
  },
]

export default function Explore({ navigate, onSelectTour }) {
  const [search, setSearch] = useState('')

  const filtered = TOURS.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.location.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 bg-white sticky top-0 z-10 border-b border-slate-100">
        <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
          Descubre<br />
          <span className="text-green-600">Guatemala</span>
        </h1>

        {/* Search Bar */}
        <div className="flex items-center gap-2 mt-4">
          <div className="flex-1 flex items-center gap-2 bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100 focus-within:border-green-300 focus-within:ring-2 focus-within:ring-green-100 transition-all">
            <Search size={16} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar destinos, tours..."
              className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto pb-28 pt-4" style={{ padding: '16px 20px 96px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {filtered.map((tour, i) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
              style={{ borderRadius: 24, overflow: 'hidden' }}
            >
              {/* Image */}
              <div className="relative bg-slate-100" style={{ height: 192, overflow: 'hidden' }}>
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {tour.badge && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/95 backdrop-blur-sm text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {tour.badge}
                    </span>
                  </div>
                )}

                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
                  <Star size={11} className="text-amber-500 fill-amber-500" />
                  <span className="text-[11px] font-bold text-slate-800">{tour.rating}</span>
                  <span className="text-[10px] text-slate-400">({tour.reviews})</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{tour.name}</h3>
                <div className="flex items-center gap-1 mt-1.5">
                  <MapPin size={11} className="text-green-600 flex-shrink-0" />
                  <span className="text-[11px] text-slate-500">{tour.location}</span>
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">{tour.description}</p>

                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => { onSelectTour(tour); navigate('tourDetail') }}
                    className="flex-1 py-2.5 rounded-full border-2 border-green-600 text-green-600 text-xs font-bold hover:bg-green-50 transition-all duration-200 active:scale-95"
                  >
                    Más información
                  </button>
                  <button
                    onClick={() => { onSelectTour(tour); navigate('tourBooking') }}
                    className="flex-1 py-2.5 rounded-full border-2 border-green-600 bg-green-600 text-white text-xs font-bold hover:bg-green-700 hover:border-green-700 transition-all duration-200 active:scale-95"
                  >
                    Cotizar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Search size={24} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium text-sm">Sin resultados para "{search}"</p>
            <p className="text-slate-400 text-xs mt-1">Intenta con otro destino</p>
          </div>
        )}
      </div>
    </div>
  )
}
