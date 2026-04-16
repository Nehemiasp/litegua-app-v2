import { useState } from 'react'
import { ArrowLeft, Clock, MapPin, Armchair, User, ChevronUp, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Seat data per deck ─────────────────────────────────────
const DECKS = {
  lower: { label: 'Planta Baja', rows: 10, offset: 0,  occupied: [3, 7, 12, 15, 18, 22, 25, 31] },
  upper: { label: 'Planta Alta', rows: 10, offset: 40, occupied: [43, 47, 52, 55, 58, 62, 71] },
}
const SEAT_PRICE = 85

// ── Seat button ────────────────────────────────────────────
function SeatBtn({ num, status, onToggle }) {
  const styles = {
    available: 'bg-green-50 border-green-500 text-green-700 hover:bg-green-100 cursor-pointer',
    selected:  'bg-green-600 border-green-600 text-white shadow-md shadow-green-600/30 cursor-pointer',
    occupied:  'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed',
  }
  return (
    <motion.button
      whileTap={status !== 'occupied' ? { scale: 0.88 } : {}}
      onClick={() => status !== 'occupied' && onToggle(num)}
      disabled={status === 'occupied'}
      className={`w-13 h-13 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-150 ${styles[status]}`}
      style={{ width: 50, height: 50, borderRadius: 14, flexShrink: 0 }}
    >
      <Armchair size={15} strokeWidth={status === 'occupied' ? 1.2 : 1.8} />
      <span style={{ fontSize: 9, fontWeight: 700, marginTop: 1 }}>{num}</span>
    </motion.button>
  )
}

// ── Deck toggle ────────────────────────────────────────────
function DeckToggle({ active, onChange }) {
  return (
    <div className="flex bg-slate-100 rounded-2xl p-1 gap-1">
      {[
        { key: 'upper', label: 'Planta Alta', icon: ChevronUp },
        { key: 'lower', label: 'Planta Baja', icon: ChevronDown },
      ].map(({ key, label, icon: Icon }) => (
        <motion.button
          key={key}
          layout
          onClick={() => onChange(key)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-none text-xs font-bold transition-all cursor-pointer ${
            active === key
              ? 'bg-green-600 text-white shadow-md shadow-green-600/30'
              : 'bg-transparent text-slate-400'
          }`}
        >
          <Icon size={12} />
          {label}
        </motion.button>
      ))}
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────
export default function SeatSelector({ selectedSeats, toggleSeat, navigate, goBack, searchParams }) {
  const [activeDeck, setActiveDeck] = useState('lower')
  const deck = DECKS[activeDeck]

  const getSeatStatus = (num) => {
    if (deck.occupied.includes(num)) return 'occupied'
    if (selectedSeats.includes(num)) return 'selected'
    return 'available'
  }

  const totalPrice = selectedSeats.length * SEAT_PRICE

  return (
    <div className="flex-1 flex flex-col bg-slate-50">

      {/* ── Header ───────────────────────────────── */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-10 px-4 pt-4 pb-3">
        {/* Title row */}
        <div className="flex items-center gap-3 mb-3">
          <button onClick={goBack} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
            <ArrowLeft size={20} className="text-slate-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-extrabold text-slate-900">Seleccionar Asiento</h1>
            <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-400">
              <Clock size={10} className="text-green-600" />
              <span>4:00 a.m.</span>
              <span>·</span>
              <MapPin size={10} />
              <span>{searchParams?.origin || 'Capital'} → {searchParams?.destination || 'Puerto Barrios'}</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">NP</span>
          </div>
        </div>

        {/* Deck toggle + legend */}
        <div className="flex items-center justify-between">
          <DeckToggle active={activeDeck} onChange={setActiveDeck} />
          <div className="flex items-center gap-3">
            {[
              { bg: 'bg-green-50 border border-green-500', label: 'Libre' },
              { bg: 'bg-green-600', label: 'Tuyo' },
              { bg: 'bg-slate-100 border border-slate-200', label: 'Ocup.' },
            ].map(({ bg, label }) => (
              <div key={label} className="flex items-center gap-1">
                <div className={`w-3 h-3 rounded-sm ${bg}`} />
                <span className="text-[10px] text-slate-400 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bus body ─────────────────────────────── */}
      <div className="flex-1 overflow-y-auto flex justify-center" style={{ padding: '16px 16px 0' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDeck}
            initial={{ opacity: 0, x: activeDeck === 'upper' ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeDeck === 'upper' ? 16 : -16 }}
            transition={{ duration: 0.2 }}
            className="w-full"
            style={{ maxWidth: 320 }}
          >
            {/* Bus card */}
            <div
              className="bg-white border border-slate-100 overflow-hidden"
              style={{
                borderRadius: '40px 40px 20px 20px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
              }}
            >
              {/* Green nose / header */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  padding: '14px 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 9, fontWeight: 700, margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {activeDeck === 'upper' ? '⬆ Planta Alta' : '⬇ Planta Baja'}
                  </p>
                  <p style={{ color: 'white', fontSize: 13, fontWeight: 800, margin: '2px 0 0' }}>Litegua Primera Plus</p>
                </div>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={17} color="white" />
                </div>
              </div>

              {/* Column labels */}
              <div style={{ display: 'flex', alignItems: 'center', padding: '10px 16px 4px' }}>
                {['A', 'B', null, 'C', 'D'].map((lbl, i) => (
                  <div key={i} style={{
                    width: lbl ? 50 : 28,
                    textAlign: 'center',
                    fontSize: 10, fontWeight: 800,
                    color: lbl ? '#16a34a' : 'transparent',
                    marginRight: i < 4 ? 6 : 0,
                  }}>
                    {lbl ?? '|'}
                  </div>
                ))}
              </div>

              {/* Seat rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, padding: '6px 16px 20px' }}>
                {Array.from({ length: deck.rows }, (_, row) => {
                  const o = deck.offset
                  const [n1, n2, n3, n4] = [row*4+1+o, row*4+2+o, row*4+3+o, row*4+4+o]
                  return (
                    <div key={row} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <SeatBtn num={n1} status={getSeatStatus(n1)} onToggle={toggleSeat} />
                      <SeatBtn num={n2} status={getSeatStatus(n2)} onToggle={toggleSeat} />

                      {/* Aisle with row number */}
                      <div style={{
                        width: 28, display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', gap: 2,
                      }}>
                        <span style={{ fontSize: 8, fontWeight: 700, color: '#cbd5e1' }}>{row + 1}</span>
                        <div style={{ width: '100%', height: 1, background: '#f1f5f9', borderTop: '1px dashed #e2e8f0' }} />
                      </div>

                      <SeatBtn num={n3} status={getSeatStatus(n3)} onToggle={toggleSeat} />
                      <SeatBtn num={n4} status={getSeatStatus(n4)} onToggle={toggleSeat} />
                    </div>
                  )
                })}
              </div>
            </div>
            <div style={{ height: 130 }} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom bar ───────────────────────────── */}
      <AnimatePresence>
        {selectedSeats.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100"
            style={{ padding: '14px 20px 32px', zIndex: 20 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-slate-400 font-medium">
                  {selectedSeats.length} asiento{selectedSeats.length > 1 ? 's' : ''}
                </p>
                <p className="text-xl font-extrabold text-slate-900 leading-none mt-0.5">
                  Q {totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 justify-end" style={{ maxWidth: '55%' }}>
                {selectedSeats.sort((a, b) => a - b).map((s) => (
                  <span key={s} className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    #{s}
                  </span>
                ))}
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('checkout')}
              className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl text-sm shadow-lg shadow-green-600/25 transition-colors"
            >
              Continuar → Registrar Viajeros
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
