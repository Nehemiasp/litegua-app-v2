import { motion } from 'framer-motion'
import {
  ArrowLeft, Phone, Mail, MapPin, Clock,
  Map, MessageCircle, ChevronRight,
  Bus, Wifi, Coffee, ShoppingBag, Car, Accessibility
} from 'lucide-react'

// ─── Rich agency data ────────────────────────────────────────
export const AGENCIES = [
  {
    id: 1,
    name: 'Terminal Litegua — Centra Norte',
    shortName: 'Centra Norte',
    phone: '2326-9500',
    whatsapp: '50223269500',
    email: 'centranorte@litegua.com',
    address: 'km 9.5 Ruta al Atlántico, Zona 17, Ciudad de Guatemala',
    mapUrl: 'https://maps.google.com/?q=Centra+Norte+Litegua+Guatemala+City',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=500&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    ],
    schedule: [
      { day: 'Lunes – Viernes', hours: '3:00 AM – 10:00 PM' },
      { day: 'Sábados',        hours: '3:00 AM – 8:00 PM'  },
      { day: 'Domingos',       hours: '4:00 AM – 7:00 PM'  },
    ],
    services: ['Bus Primera Plus', 'Bus Económico', 'Servicio LEX', 'Encomiendas', 'Boletos en línea', 'Parqueo'],
    serviceIcons: [Bus, Bus, Car, ShoppingBag, Wifi, Car],
    description: 'La terminal principal de Litegua en la capital. Ubicada estratégicamente en Centra Norte, con acceso directo desde el Periférico y fácil conexión al sistema Transmetro.',
    badge: 'Terminal principal',
  },
  {
    id: 2,
    name: 'Agencia Litegua — Puerto Barrios',
    shortName: 'Puerto Barrios',
    phone: '7948-2200',
    whatsapp: '50279482200',
    email: 'puertobarrios@litegua.com',
    address: '6a Calle y 6a Avenida, Puerto Barrios, Izabal',
    mapUrl: 'https://maps.google.com/?q=Litegua+Puerto+Barrios+Izabal',
    image: 'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=800&h=500&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=300&fit=crop',
    ],
    schedule: [
      { day: 'Lunes – Viernes', hours: '4:00 AM – 8:00 PM' },
      { day: 'Sábados',        hours: '4:00 AM – 6:00 PM' },
      { day: 'Domingos',       hours: '5:00 AM – 5:00 PM' },
    ],
    services: ['Bus Primera Plus', 'Bus Económico', 'Encomiendas', 'Servicio al Caribe', 'Sala de espera A/C'],
    serviceIcons: [Bus, Bus, ShoppingBag, Car, Coffee],
    description: 'Terminal en el corazón del Caribe guatemalteco. Conecta Puerto Barrios con la capital y municipios de Izabal, con salidas frecuentes durante el día.',
    badge: 'Caribe',
  },
  {
    id: 3,
    name: 'Agencia Litegua — Cobán',
    shortName: 'Cobán',
    phone: '7952-1300',
    whatsapp: '50279521300',
    email: 'coban@litegua.com',
    address: '1a Calle, Zona 1, Cobán, Alta Verapaz',
    mapUrl: 'https://maps.google.com/?q=Litegua+Coban+Alta+Verapaz',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=500&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400&h=300&fit=crop',
    ],
    schedule: [
      { day: 'Lunes – Viernes', hours: '4:30 AM – 7:00 PM' },
      { day: 'Sábados',        hours: '4:30 AM – 5:00 PM' },
      { day: 'Domingos',       hours: '5:00 AM – 4:00 PM' },
    ],
    services: ['Bus Primera Plus', 'Bus Económico', 'Encomiendas', 'Tours Alta Verapaz', 'Cafetería'],
    serviceIcons: [Bus, Bus, ShoppingBag, Map, Coffee],
    description: 'Terminal en la ciudad de la eterna primavera. Punto de partida ideal para explorar las maravillas de Alta Verapaz: Semuc Champey, Laguna Lachuá y las grutas de Lanquín.',
    badge: 'Alta Verapaz',
  },
]

// ─── Service chip ────────────────────────────────────────────
function ServiceChip({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-2xl px-3 py-2.5">
      <div className="w-7 h-7 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
        <Icon size={13} className="text-green-600" />
      </div>
      <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">{label}</span>
    </div>
  )
}

// ─── Contact button ──────────────────────────────────────────
function ContactBtn({ icon: Icon, label, sub, color = 'slate', href }) {
  const colorMap = {
    green:  { bg: 'bg-green-50',  border: 'border-green-100',  icon: 'text-green-600',  text: 'text-green-700'  },
    blue:   { bg: 'bg-blue-50',   border: 'border-blue-100',   icon: 'text-blue-600',   text: 'text-blue-700'   },
    slate:  { bg: 'bg-slate-50',  border: 'border-slate-100',  icon: 'text-slate-500',  text: 'text-slate-700'  },
  }
  const c = colorMap[color]
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`flex flex-col items-center gap-1.5 flex-1 pt-3 pb-3 rounded-2xl border ${c.bg} ${c.border} transition-all active:scale-95`}
    >
      <div className={`w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center border ${c.border}`}>
        <Icon size={17} className={c.icon} />
      </div>
      <span className={`text-[11px] font-bold ${c.text}`}>{label}</span>
      {sub && <span className="text-[9px] text-slate-400 font-medium">{sub}</span>}
    </a>
  )
}

// ─── Main Component ──────────────────────────────────────────
export default function AgencyDetail({ agency, goBack }) {
  if (!agency) return null

  return (
    <div className="flex-1 flex flex-col bg-white">

      {/* ── Hero Image ─────────────────────────────── */}
      <div className="relative" style={{ height: 260 }}>
        <img
          src={agency.image}
          alt={agency.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/40" />

        {/* Back button */}
        <div className="absolute top-0 left-0 right-0 flex items-center px-4 pt-12">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={goBack}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30"
          >
            <ArrowLeft size={20} className="text-white" />
          </motion.button>
        </div>

        {/* Name overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
          {agency.badge && (
            <span className="inline-block bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full mb-2 uppercase tracking-wider">
              {agency.badge}
            </span>
          )}
          <h1 className="text-white text-lg font-extrabold leading-snug drop-shadow-sm">
            {agency.name}
          </h1>
          <div className="flex items-center gap-1.5 mt-1.5">
            <MapPin size={12} className="text-white/70 flex-shrink-0" />
            <span className="text-white/80 text-xs">{agency.address}</span>
          </div>
        </div>
      </div>

      {/* ── Content ────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto bg-white"
        style={{ borderRadius: '24px 24px 0 0', marginTop: -20, paddingBottom: 120 }}
      >
        {/* Contact actions */}
        <div style={{ padding: '24px 20px 0' }}>
          <div className="flex gap-2.5">
            <ContactBtn
              icon={Phone}
              label="Llamar"
              sub={agency.phone}
              color="green"
              href={`tel:${agency.phone}`}
            />
            <ContactBtn
              icon={MessageCircle}
              label="WhatsApp"
              sub="Chat"
              color="green"
              href={`https://wa.me/${agency.whatsapp}`}
            />
            <ContactBtn
              icon={Mail}
              label="Correo"
              sub="Email"
              color="blue"
              href={`mailto:${agency.email}`}
            />
          </div>
        </div>

        {/* Description */}
        <div style={{ padding: '20px 20px 0' }}>
          <h2 className="text-sm font-bold text-slate-900 mb-2">Sobre esta agencia</h2>
          <p className="text-sm text-slate-600 leading-relaxed">{agency.description}</p>
        </div>

        {/* Schedule */}
        <div style={{ padding: '20px 20px 0' }}>
          <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
            <Clock size={14} className="text-green-600" />
            Horario de atención
          </h2>
          <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
            {agency.schedule.map((s, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-4 py-3 ${
                  i < agency.schedule.length - 1 ? 'border-b border-slate-100' : ''
                }`}
              >
                <span className="text-xs font-semibold text-slate-700">{s.day}</span>
                <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                  {s.hours}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div style={{ padding: '20px 20px 0' }}>
          <h2 className="text-sm font-bold text-slate-900 mb-3">Servicios disponibles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {agency.services.map((svc, i) => {
              const Icon = agency.serviceIcons[i] || Bus
              return <ServiceChip key={svc} icon={Icon} label={svc} />
            })}
          </div>
        </div>

        {/* Photo gallery */}
        <div style={{ padding: '20px 0 0' }}>
          <h2 className="text-sm font-bold text-slate-900 mb-3 px-5">Galería</h2>
          <div className="flex gap-3 overflow-x-auto px-5 pb-1" style={{ WebkitOverflowScrolling: 'touch' }}>
            {agency.gallery.map((src, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="flex-shrink-0 rounded-2xl overflow-hidden shadow-sm"
                style={{ width: 160, height: 110 }}
              >
                <img src={src} alt={`${agency.name} foto ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </motion.div>
            ))}
            <div className="flex-shrink-0 w-1" />
          </div>
        </div>

        {/* Address detail */}
        <div style={{ padding: '20px 20px 0' }}>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin size={16} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 mb-0.5">Dirección exacta</p>
              <p className="text-xs text-slate-600 leading-relaxed">{agency.address}</p>
              <a
                href={agency.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold text-green-600 flex items-center gap-1 mt-1.5 hover:underline"
              >
                Ver en Google Maps <ChevronRight size={11} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky CTA ─────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100"
        style={{ padding: '16px 20px 32px' }}
      >
        <a
          href={agency.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="block w-full"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-2xl bg-green-600 text-white font-bold text-sm shadow-lg shadow-green-600/30 hover:bg-green-700 transition-colors flex items-center justify-center gap-2.5"
          >
            <Map size={16} />
            Ver en el mapa
          </motion.div>
        </a>
      </div>
    </div>
  )
}
