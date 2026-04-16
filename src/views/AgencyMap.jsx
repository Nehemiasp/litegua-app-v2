import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, MapPin, Phone, Clock, ChevronRight, X } from 'lucide-react'
import { AGENCIES } from './AgencyDetail'
import 'leaflet/dist/leaflet.css'

// ── Fix Leaflet's default marker icons broken by bundlers ──
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// ── Rich coordinates for each agency ──────────────────────
const AGENCY_COORDS = {
  1: [14.6501, -90.4895], // Centra Norte, Guatemala City
  2: [15.7173, -88.5975], // Puerto Barrios, Izabal
  3: [15.4694, -90.3772], // Cobán, Alta Verapaz
}

// ── Custom green pin icon ─────────────────────────────────
function createGreenIcon(isActive = false) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: ${isActive ? 44 : 36}px;
        height: ${isActive ? 44 : 36}px;
        background: ${isActive ? '#15803d' : '#16a34a'};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(22,163,74,${isActive ? '0.6' : '0.35'});
        transition: all 0.2s ease;
      "></div>`,
    iconSize: [isActive ? 44 : 36, isActive ? 44 : 36],
    iconAnchor: [isActive ? 22 : 18, isActive ? 44 : 36],
    popupAnchor: [0, -36],
  })
}

// ── Fly to selected agency ────────────────────────────────
function FlyToAgency({ coords }) {
  const map = useMap()
  useEffect(() => {
    if (coords) map.flyTo(coords, 13, { duration: 1.2 })
  }, [coords, map])
  return null
}

// ── Agency bottom sheet card ──────────────────────────────
function AgencySheet({ agency, onClose, onViewDetail }) {
  if (!agency) return null
  const schedule = agency.schedule[0]
  return (
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 28, stiffness: 260 }}
      className="absolute bottom-0 left-0 right-0 bg-white z-[9999]"
      style={{ borderRadius: '24px 24px 0 0', boxShadow: '0 -4px 32px rgba(0,0,0,0.12)' }}
    >
      {/* Drag handle */}
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-10 h-1 rounded-full bg-slate-200" />
      </div>

      <div style={{ padding: '12px 20px 32px' }}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 pr-3">
            {agency.badge && (
              <span className="inline-block bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 uppercase tracking-wider">
                {agency.badge}
              </span>
            )}
            <h2 className="text-base font-extrabold text-slate-900 leading-snug">{agency.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0"
          >
            <X size={14} className="text-slate-500" />
          </button>
        </div>

        {/* Info row */}
        <div className="flex flex-col gap-2 mb-4">
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
              <span className="font-semibold">{schedule?.day}:</span> {schedule?.hours}
            </span>
          </div>
        </div>

        {/* Thumbnail + CTA */}
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100">
            <img src={agency.image} alt={agency.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-slate-400 mb-2">
              {agency.services.slice(0, 3).join(' · ')}
            </p>
            <button
              onClick={() => onViewDetail(agency)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-green-600 text-white text-xs font-bold shadow-sm hover:bg-green-700 transition-colors active:scale-[0.98]"
            >
              Ver detalles <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Main Component ────────────────────────────────────────
export default function AgencyMap({ goBack, navigate, onSelectAgency }) {
  const [activeAgency, setActiveAgency] = useState(null)

  const center = [15.1, -89.9] // Center of Guatemala
  const zoom = 7

  const handleMarkerClick = (agency) => {
    setActiveAgency(agency)
  }

  const handleViewDetail = (agency) => {
    onSelectAgency(agency)
    navigate('agencyDetail')
  }

  return (
    <div className="flex-1 flex flex-col relative">

      {/* ── Header overlay ─────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 z-[9998] flex items-center gap-3"
        style={{ padding: '44px 16px 12px', pointerEvents: 'none' }}
      >
        <button
          onClick={goBack}
          style={{ pointerEvents: 'auto' }}
          className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border border-slate-100 transition-all active:scale-90"
        >
          <ArrowLeft size={18} className="text-slate-700" />
        </button>

        <div
          className="flex-1 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center px-4 gap-2"
          style={{ pointerEvents: 'none', height: 44 }}
        >
          <MapPin size={14} className="text-green-600 flex-shrink-0" />
          <span className="text-sm font-semibold text-slate-700">Agencias Litegua</span>
          <span className="ml-auto text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
            {AGENCIES.length}
          </span>
        </div>
      </div>

      {/* ── Leaflet Map ─────────────────────────────── */}
      <div className="flex-1" style={{ position: 'relative' }}>
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />

          {activeAgency && (
            <FlyToAgency coords={AGENCY_COORDS[activeAgency.id]} />
          )}

          {AGENCIES.map((agency) => {
            const coords = AGENCY_COORDS[agency.id]
            if (!coords) return null
            const isActive = activeAgency?.id === agency.id
            return (
              <Marker
                key={agency.id}
                position={coords}
                icon={createGreenIcon(isActive)}
                eventHandlers={{ click: () => handleMarkerClick(agency) }}
              />
            )
          })}
        </MapContainer>
      </div>

      {/* ── Agency list chips (always visible) ──────── */}
      <AnimatePresence>
        {!activeAgency && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute z-[9998]"
            style={{ bottom: 24, left: 0, right: 0, padding: '0 16px' }}
          >
            <div
              className="bg-white rounded-3xl border border-slate-100 shadow-xl"
              style={{ padding: '16px' }}
            >
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                Selecciona una agencia
              </p>
              <div className="flex flex-col gap-2">
                {AGENCIES.map((agency, i) => (
                  <motion.button
                    key={agency.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleMarkerClick(agency)}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-green-50 transition-colors text-left group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                      <MapPin size={15} className="text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{agency.shortName}</p>
                      <p className="text-xs text-slate-400 truncate">{agency.address}</p>
                    </div>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-green-500 transition-colors flex-shrink-0" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom sheet when agency selected ───────── */}
      <AnimatePresence>
        {activeAgency && (
          <AgencySheet
            agency={activeAgency}
            onClose={() => setActiveAgency(null)}
            onViewDetail={handleViewDetail}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
