import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Star, MapPin, Clock, Users, Calendar,
  Heart, Share2, X,
  Utensils, Bus, Shield, Camera, ChevronLeft, ChevronRight
} from 'lucide-react'

// ─── Data ──────────────────────────────────────────────────
const ITINERARIES = {
  1: [
    { time: '5:00 AM', title: 'Salida desde Guatemala City', desc: 'Partimos desde Centra Norte en autobús de primera clase.' },
    { time: '10:00 AM', title: 'Llegada a Rio Dulce', desc: 'Desayuno incluido en restaurante local a orillas del río.' },
    { time: '11:00 AM', title: 'Recorrido en lancha por el río', desc: 'Navegamos 30 km a través de cañones, manglares y vida silvestre.' },
    { time: '1:00 PM', title: 'Castillo de San Felipe', desc: 'Visita guiada al castillo colonial del siglo XVII. Tiempo libre.' },
    { time: '3:00 PM', title: 'Regreso a Guatemala', desc: 'Viaje de retorno con parada opcional en el Rancho.' },
  ],
  2: [
    { time: '6:00 AM', title: 'Salida hacia Zacapa', desc: 'Autobús directo con A/C desde Centra Norte.' },
    { time: '9:00 AM', title: 'Llegada a Valle Dorado', desc: 'Check-in y acceso a todas las instalaciones.' },
    { time: '9:30 AM', title: 'Día libre en el parque', desc: 'Disfruta piscinas, toboganes, zona de olas y más.' },
    { time: '4:00 PM', title: 'Almuerzo incluido', desc: 'Buffet completo en el restaurante principal.' },
    { time: '5:00 PM', title: 'Regreso a Guatemala', desc: 'Bus de retorno con llegada a las 8:00 PM aprox.' },
  ],
  3: [
    { time: '4:00 AM', title: 'Salida nocturna', desc: 'Partimos temprano para aprovechar el día completo.' },
    { time: '9:00 AM', title: 'Grutas de Lanquín', desc: 'Exploración guiada de las cuevas con ríos subterráneos.' },
    { time: '11:00 AM', title: 'Semuc Champey', desc: 'Las famosas piscinas naturales de agua turquesa.' },
    { time: '2:00 PM', title: 'Almuerzo en Lanquín', desc: 'Comida típica incluida en restaurante local.' },
    { time: '3:00 PM', title: 'Regreso a Guatemala', desc: 'Viaje de retorno, llegada aproximada 9:00 PM.' },
  ],
  4: [
    { time: '5:30 AM', title: 'Salida hacia Izabal', desc: 'Viaje directo al lago más grande de Guatemala.' },
    { time: '9:00 AM', title: 'Tour en lancha por el lago', desc: 'Navegación por el Lago de Izabal con guía.' },
    { time: '11:00 AM', title: 'Cañón del Boquerón', desc: 'Recorrido por el impresionante cañón en lancha.' },
    { time: '1:00 PM', title: 'Almuerzo a orillas del lago', desc: 'Mariscos y platillos típicos de la región.' },
    { time: '3:00 PM', title: 'Regreso a Guatemala', desc: 'Retorno cómodo en autobús de primera.' },
  ],
  5: [
    { time: '7:00 AM', title: 'Salida hacia Antigua', desc: 'Autobús turístico con guía bilingüe desde la capital.' },
    { time: '8:30 AM', title: 'City Walk por Antigua', desc: 'Parque Central, Catedral y Arco de Santa Catalina.' },
    { time: '11:00 AM', title: 'Cerro de la Cruz', desc: 'Vista panorámica de Antigua y el Volcán de Agua.' },
    { time: '1:00 PM', title: 'Tiempo libre en el mercado', desc: 'Artesanías, café guatemalteco y gastronomía local.' },
    { time: '4:00 PM', title: 'Regreso a Guatemala', desc: 'Llegada aproximada a las 5:30 PM.' },
  ],
}

const REVIEWS = [
  { name: 'Carlos M.', avatar: 'CM', rating: 5, date: 'Mar 2026', comment: 'Una experiencia increíble, la organización fue perfecta y el guía muy profesional.' },
  { name: 'Ana García', avatar: 'AG', rating: 4, date: 'Feb 2026', comment: 'Muy recomendado. El bus cómodo, las instalaciones limpias. Volveré sin duda.' },
  { name: 'José R.', avatar: 'JR', rating: 5, date: 'Feb 2026', comment: '¡10/10! Todo incluido como prometieron, puntualidad impecable.' },
]

const INCLUDES = [
  { icon: Bus, label: 'Transporte A/C' },
  { icon: Utensils, label: 'Almuerzo incluido' },
  { icon: Shield, label: 'Seguro de viaje' },
  { icon: Camera, label: 'Guía turístico' },
]

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=500&fit=crop',
]

function getNextDays() {
  const days = []
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push({
      dayName: i === 0 ? 'Hoy' : dayNames[d.getDay()],
      day: d.getDate(),
      month: monthNames[d.getMonth()],
    })
  }
  return days
}

function StarRow({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={size}
          className={s <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}
        />
      ))}
    </div>
  )
}

// ── Photo Slider Lightbox ────────────────────────────────────
function PhotoSlider({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex)
  const total = images.length

  const goTo = (idx) => setCurrent((idx + total) % total)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <span className="text-white/50 text-sm font-medium">{current + 1} / {total}</span>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <X size={20} color="white" />
        </motion.button>
      </div>

      {/* Main image with drag */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) goTo(current + 1)
              else if (info.offset.x > 60) goTo(current - 1)
            }}
            className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            <img
              src={images[current]}
              alt={`foto ${current + 1}`}
              className="w-full h-full object-contain select-none"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Side arrows */}
        {total > 1 && (
          <>
            <button onClick={() => goTo(current - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button onClick={() => goTo(current + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <ChevronRight size={20} className="text-white" />
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 py-5">
        {images.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-200 ${i === current ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/30'}`}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="pb-8 px-4">
        <div className="flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200 ${i === current ? 'ring-2 ring-white' : 'opacity-50'}`}
              style={{ width: 52, height: 52 }}>
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}


// ─── Main component ──────────────────────────────────────────
export default function TourDetail({ tour, goBack, navigate }) {
  const [liked, setLiked] = useState(false)
  const [activeTab, setActiveTab] = useState('info')
  const [sliderIndex, setSliderIndex] = useState(null) // null = closed

  const allPhotos = [tour?.image, ...GALLERY_IMAGES].filter(Boolean)

  const itinerary = ITINERARIES[tour.id] || ITINERARIES[1]
  const tabs = [
    { id: 'info', label: 'Descripción' },
    { id: 'itinerary', label: 'Itinerario' },
    { id: 'reviews', label: 'Reseñas' },
  ]

  return (
    <div className="flex-1 flex flex-col bg-white">

      {/* ── Hero Image ──────────────────────────────── */}
      <div className="relative" style={{ height: 280 }}>
        <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-12">
          <motion.button whileTap={{ scale: 0.9 }} onClick={goBack}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <ArrowLeft size={20} className="text-white" />
          </motion.button>
          <div className="flex items-center gap-2">
            <motion.button whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <Share2 size={18} className="text-white" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setLiked(l => !l)}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <Heart size={18} className={liked ? 'fill-red-500 text-red-500' : 'text-white'} />
            </motion.button>
          </div>
        </div>


        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          {tour.badge && (
            <span className="inline-block bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full mb-2 uppercase tracking-wider">
              {tour.badge}
            </span>
          )}
          <h1 className="text-white text-xl font-extrabold leading-snug drop-shadow-sm">{tour.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <MapPin size={12} className="text-white/80" />
            <span className="text-white/80 text-xs font-medium">{tour.location}</span>
            <span className="text-white/40 mx-1">·</span>
            <StarRow rating={tour.rating} size={12} />
            <span className="text-white/80 text-xs font-semibold ml-1">{tour.rating}</span>
            <span className="text-white/60 text-xs">({tour.reviews})</span>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 120 }}>

        {/* ── Content Card ────────────────────────────── */}
        <div className="bg-white" style={{ borderRadius: '24px 24px 0 0', marginTop: -20 }}>

          {/* Quick stats */}
          <div className="flex border-b border-slate-100" style={{ padding: '28px 20px 0' }}>
            {[
              { icon: Clock, label: '1 día', sub: 'Duración' },
              { icon: Users, label: 'Grupo', sub: 'Máx. 20 pax' },
              { icon: Calendar, label: 'Todo el año', sub: 'Disponibilidad' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={sub} className="flex-1 flex flex-col items-center pb-4 border-r border-slate-100 last:border-r-0">
                <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center mb-1.5">
                  <Icon size={15} className="text-green-600" />
                </div>
                <p className="text-xs font-bold text-slate-800">{label}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-100 px-5">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 py-3 text-xs font-semibold transition-colors duration-200 ${
                  activeTab === tab.id ? 'text-green-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">

            {activeTab === 'info' && (
              <motion.div key="info" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }} className="p-5">
                <h2 className="text-sm font-bold text-slate-900 mb-2">Sobre este tour</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{tour.description}</p>
                <p className="text-sm text-slate-600 leading-relaxed mt-2">
                  Nuestros guías certificados te acompañarán en cada paso, asegurando una experiencia segura,
                  cómoda e inolvidable. El transporte en autobús de primera clase con A/C incluye Wi-Fi gratuito.
                </p>

                {/* Inline photo gallery — tappable, opens slider */}
                <h2 className="text-sm font-bold text-slate-900 mt-5 mb-3">Fotos del tour</h2>
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginInline: -20 }}>
                  <div style={{ display: 'inline-flex', gap: 8, paddingInline: 20, paddingBottom: 4 }}>
                    {allPhotos.map((src, i) => (
                      <motion.button
                        key={i}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSliderIndex(i)}
                        className="flex-shrink-0 rounded-2xl overflow-hidden focus:outline-none"
                        style={{ width: 160, height: 112 }}
                      >
                        <img src={src} alt={`foto ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                <h2 className="text-sm font-bold text-slate-900 mt-5 mb-3">¿Qué incluye?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {INCLUDES.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2.5 bg-slate-50 rounded-2xl p-3 border border-slate-100">
                      <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Icon size={14} className="text-green-600" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">{label}</span>
                    </div>
                  ))}
                </div>
                <h2 className="text-sm font-bold text-slate-900 mt-5 mb-3">No incluye</h2>
                {['Entradas a atractivos adicionales', 'Bebidas alcohólicas', 'Propinas opcionales'].map((item) => (
                  <div key={item} className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <X size={9} className="text-slate-400" />
                    </div>
                    <span className="text-xs text-slate-500">{item}</span>
                  </div>
                ))}
                <div className="mt-5 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <h3 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                    <MapPin size={12} className="text-green-600" /> Punto de encuentro
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Terminal Litegua — Centra Norte, Zona 17, Ciudad de Guatemala. Presentarse 20 min antes de la salida.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'itinerary' && (
              <motion.div key="itinerary" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }} className="p-5">
                <p className="text-xs text-slate-400 mb-5">Itinerario referencial — puede variar según condiciones del día.</p>
                <div className="relative">
                  <div className="absolute bg-slate-100" style={{ left: 15, top: 16, bottom: 16, width: 2 }} />
                  {itinerary.map((step, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }} className="flex gap-4"
                      style={{ paddingBottom: i < itinerary.length - 1 ? 24 : 0 }}>
                      <div className="flex-shrink-0" style={{ width: 32 }}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 relative ${
                          i === 0 ? 'bg-green-600' : i === itinerary.length - 1 ? 'bg-slate-700' : 'bg-white border-2 border-green-500'
                        }`}>
                          <div className="w-2.5 h-2.5 rounded-full bg-white" />
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 ${
                          i === 0 ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700'
                        }`}>{step.time}</span>
                        <p className="text-sm font-bold text-slate-900 leading-snug">{step.title}</p>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div key="reviews" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }} className="p-5">
                <div className="flex items-center gap-5 bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-5">
                  <div className="text-center">
                    <p className="text-4xl font-extrabold text-slate-900">{tour.rating}</p>
                    <StarRow rating={tour.rating} size={13} />
                    <p className="text-[10px] text-slate-400 mt-1">{tour.reviews} reseñas</p>
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    {[5, 4, 3, 2, 1].map((s) => {
                      const pct = s === 5 ? 72 : s === 4 ? 18 : s === 3 ? 6 : s === 2 ? 3 : 1
                      return (
                        <div key={s} className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 font-medium w-2">{s}</span>
                          <div className="flex-1 bg-slate-200 rounded-full" style={{ height: 4 }}>
                            <div className="bg-amber-400 rounded-full" style={{ height: 4, width: `${pct}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {REVIEWS.map((r, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">{r.avatar}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900">{r.name}</p>
                          <p className="text-[10px] text-slate-400">{r.date}</p>
                        </div>
                        <StarRow rating={r.rating} size={11} />
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{r.comment}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </div>

      {/* ── Sticky Booking Bar ─────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100"
        style={{ padding: '14px 20px 30px' }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-medium">Precio por persona</p>
            <p className="text-2xl font-extrabold text-slate-900 leading-tight">{tour.price}</p>
            <p className="text-[10px] text-green-600 font-semibold">Todo incluido</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('tourBooking')}
            className="bg-green-600 text-white font-extrabold text-sm px-7 py-4 rounded-2xl shadow-lg shadow-green-600/25 hover:bg-green-700 transition-colors"
          >
            Reservar ahora
          </motion.button>
        </div>
      </div>

      {/* ── Photo Slider Lightbox ────────────────────── */}
      <AnimatePresence>
        {sliderIndex !== null && (
          <PhotoSlider
            images={allPhotos}
            startIndex={sliderIndex}
            onClose={() => setSliderIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
