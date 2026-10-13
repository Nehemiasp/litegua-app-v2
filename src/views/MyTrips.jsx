import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, ArrowRight, Clock, Armchair, Building2 } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

// ─── Mock Data ──────────────────────────────────────────────
const UPCOMING = [
  {
    id: 'LX-20260415-38',
    service: 'Primera Plus',
    date: '15 Abril 2026',
    from: 'Ciudad Capital',
    to: 'Puerto Barrios',
    time: '4:00 AM',
    seat: 'Butaca 38',
    agency: 'Centra Norte',
    price: 'Q 250.88',
  },
  {
    id: 'LX-20260512-52',
    service: 'Primera Plus',
    date: '12 Mayo 2026',
    from: 'Ciudad Capital',
    to: 'Chiquimula',
    time: '6:00 AM',
    seat: 'Butaca 52',
    agency: 'Centra Norte',
    price: 'Q 181.89',
  },
]

const PAST = [
  { id: 'LX-20261201-07', date: '01 Dic 2025', from: 'Ciudad Capital', to: 'Puerto Barrios', service: 'Primera Plus', price: 'Q 250.88' },
  { id: 'LX-20261115-22', date: '15 Nov 2025', from: 'Ciudad Capital', to: 'Rio Hondo',      service: 'Primera Plus', price: 'Q 181.89' },
  { id: 'LX-20261003-33', date: '03 Oct 2025', from: 'Ciudad Capital', to: 'Morales',        service: 'Primera Plus', price: 'Q 181.89' },
  { id: 'LX-20260820-05', date: '20 Ago 2025', from: 'Puerto Barrios', to: 'Ciudad Capital', service: 'Primera Plus', price: 'Q 250.88' },
]

// ─── QR ────────────────────────────────────────────────────
// Real, scannable QR. The payload is plain JSON (no URL), so scanning it
// just shows the ticket data until a validation endpoint exists.
function TicketQR({ ticket }) {
  const payload = JSON.stringify({
    code: ticket.id,
    service: ticket.service,
    route: `${ticket.from} a ${ticket.to}`,
    date: ticket.date,
    time: ticket.time,
    seat: ticket.seat,
    agency: ticket.agency,
  })
  return (
    <QRCodeSVG
      value={payload}
      size={140}
      level="M"
      marginSize={2}
      fgColor="#15803d"
      bgColor="#f8fafc"
    />
  )
}

// ─── Boarding Pass Card ────────────────────────────────────
function BoardingPass({ ticket }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/60 overflow-hidden">

      {/* ─ Top section ─ */}
      <div className="px-5 pt-5 pb-5">

        {/* Badge + Date */}
        <div className="flex items-center justify-between mb-5">
          <span className="flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Litegua {ticket.service}
          </span>
          <span className="text-xs text-slate-400 font-medium">{ticket.date}</span>
        </div>

        {/* Route */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Origen</p>
            <p className="text-xl font-extrabold text-slate-900">{ticket.from}</p>
          </div>
          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center flex-shrink-0 bg-white shadow-sm">
            <ArrowRight size={14} className="text-green-600" strokeWidth={2.5} />
          </div>
          <div className="text-right">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Destino</p>
            <p className="text-xl font-extrabold text-slate-900">{ticket.to}</p>
          </div>
        </div>

        {/* Details: 3 columns side by side */}
        <div className="flex items-start justify-between">
          {/* Salida */}
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 mb-1">
              <Clock size={9} /> Salida
            </p>
            <p className="text-sm font-bold text-slate-800">{ticket.time}</p>
          </div>
          {/* Asiento */}
          <div className="text-center">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1 mb-1">
              <Armchair size={9} /> Asiento
            </p>
            <p className="text-sm font-bold text-slate-800">{ticket.seat}</p>
          </div>
          {/* Andén */}
          <div className="text-right">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-end gap-1 mb-1">
              <Building2 size={9} /> Andén
            </p>
            <p className="text-sm font-bold text-slate-800">{ticket.agency}</p>
          </div>
        </div>
      </div>

      {/* ─ Perforation Divider ─ */}
      <div className="relative mx-0 flex items-center" style={{ height: 24 }}>
        {/* Left notch */}
        <div
          className="absolute rounded-full"
          style={{ width: 24, height: 24, left: -12, top: 0, background: '#f8fafc' }}
        />
        {/* Right notch */}
        <div
          className="absolute rounded-full"
          style={{ width: 24, height: 24, right: -12, top: 0, background: '#f8fafc' }}
        />
        {/* Dashed line */}
        <div className="w-full border-t-2 border-dashed border-slate-200 mx-5" />
      </div>

      {/* ─ QR Section ─ */}
      <div className="px-5 pb-6 pt-2 flex flex-col items-center gap-3">
        <div className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center gap-2 w-full">
          <TicketQR ticket={ticket} />
          <p className="text-[10px] font-mono text-slate-400 tracking-widest">{ticket.id}</p>
        </div>
        <p className="text-[11px] text-slate-400 text-center">
          Presenta este código al momento de abordar
        </p>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors duration-200 active:scale-95">
          <Download size={13} />
          Descargar PDF
        </button>
      </div>
    </div>
  )
}

// ─── Main View ──────────────────────────────────────────────
export default function MyTrips() {
  const [activeTab, setActiveTab] = useState('upcoming')

  return (
    <div className="flex-1 flex flex-col bg-slate-50">

      {/* Header */}
      <div className="bg-white px-5 pt-6 pb-4 border-b border-slate-100">
        <h1 className="text-xl font-bold text-slate-900">Mis Viajes</h1>
        <p className="text-xs text-slate-400 mt-0.5">Tu billetera digital de boletos</p>

        {/* Tabs */}
        <div className="flex gap-1 mt-4 bg-slate-100 p-1 rounded-full w-fit">
          {['upcoming', 'past'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-250 ${
                activeTab === tab
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'upcoming' ? 'Próximos' : 'Pasados'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-28">
        <AnimatePresence mode="wait">

          {activeTab === 'upcoming' ? (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="flex flex-col gap-6"
            >
              {UPCOMING.map((ticket) => (
                <BoardingPass key={ticket.id} ticket={ticket} />
              ))}
            </motion.div>

          ) : (
            <motion.div
              key="past"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="flex flex-col gap-3"
            >
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">
                Historial
              </p>
              {PAST.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Armchair size={16} className="text-slate-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-500 truncate">{t.from} a {t.to}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{t.date} · {t.service}</p>
                  </div>
                  <span className="text-sm font-bold text-slate-300 flex-shrink-0">{t.price}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
