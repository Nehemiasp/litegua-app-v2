import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Star, Filter } from 'lucide-react'

// duration: trip length in nights (1 = day trip, 2 = 2-day/1-night, etc.)
// availableDays: weekdays this tour departs (0=Sun, 1=Mon … 6=Sat)
export const TOURS = [
  {
    id: 1,
    name: 'Tour Castillo de San Felipe & Río Dulce',
    description: 'Navega el majestuoso Río Dulce y visita el histórico Castillo de San Felipe de Lara.',
    price: 'Q 350.00',
    priceNum: 350,
    rating: 4.8,
    reviews: '1.2k',
    location: 'Río Dulce, Izabal',
    badge: 'Más vendido',
    duration: 1,
    availableDays: [4, 5, 6, 0], // Jue, Vie, Sáb, Dom
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Resort Valle Dorado — Día de Piscinas',
    description: 'Disfruta del mejor parque acuático de Guatemala con múltiples piscinas y toboganes.',
    price: 'Q 280.00',
    priceNum: 280,
    rating: 4.6,
    reviews: '3.7k',
    location: 'Zacapa',
    badge: null,
    duration: 1,
    availableDays: [5, 6, 0], // Vie, Sáb, Dom
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Semuc Champey & Grutas de Lanquín',
    description: 'Las piscinas naturales de color esmeralda más hermosas de Centroamérica te esperan.',
    price: 'Q 520.00',
    priceNum: 520,
    rating: 4.9,
    reviews: '892',
    location: 'Alta Verapaz',
    badge: '⭐ Top rated',
    duration: 2,
    availableDays: [4, 5], // Jue, Vie (2 días / 1 noche)
    image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Lago de Izabal & Boquerón',
    description: 'Explora el lago más grande de Guatemala y el impresionante Cañón del Boquerón.',
    price: 'Q 420.00',
    priceNum: 420,
    rating: 4.5,
    reviews: '415',
    location: 'Izabal',
    badge: null,
    duration: 3,
    availableDays: [5], // Solo Viernes (3 días / 2 noches)
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    name: 'Antigua Guatemala & Volcán de Agua',
    description: 'Patrimonio UNESCO a tus pies: calles empedradas, iglesias barrocas y volcanes nevados.',
    price: 'Q 310.00',
    priceNum: 310,
    rating: 4.7,
    reviews: '5.1k',
    location: 'Sacatepéquez',
    badge: 'Más vendido',
    duration: 1,
    availableDays: [1, 2, 3, 4, 5, 6, 0], // Todos los días
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&h=400&fit=crop',
  },
]

const CATEGORIES = ['Todos', 'Naturaleza', 'Historia', 'Aventura', 'Playa']

export default function Explore({ navigate, onSelectTour }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')

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
          <button className="w-11 h-11 bg-green-600 rounded-2xl flex items-center justify-center shadow-md shadow-green-600/25 flex-shrink-0 hover:bg-green-700 transition-all active:scale-95">
            <Filter size={16} className="text-white" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-green-600 text-white border-green-600 shadow-sm'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

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

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium">Desde</span>
                    <p className="text-base font-extrabold text-slate-900 leading-tight">{tour.price}</p>
                  </div>
                  <button
                    onClick={() => { onSelectTour(tour); navigate('tourDetail') }}
                    className="px-5 py-2.5 rounded-full border-2 border-green-600 text-green-600 text-xs font-bold hover:bg-green-600 hover:text-white transition-all duration-200 active:scale-95"
                  >
                    Ver detalles
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
            <p className="text-slate-400 text-xs mt-1">Intenta con otro destino o categoría</p>
          </div>
        )}
      </div>
    </div>
  )
}
