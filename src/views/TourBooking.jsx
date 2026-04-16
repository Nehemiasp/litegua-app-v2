import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ChevronRight, ChevronLeft,
  Calendar, Users, User, Mail, Phone,
  CreditCard, CheckCircle, MapPin,
  Wallet, Smartphone, Lock, Download, Home, Check
} from 'lucide-react'

const MONTH_NAMES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
const MONTH_FULL  = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

function getDaysInMonth(year, month) { return new Date(year, month + 1, 0).getDate() }
function getFirstWeekday(year, month) { return new Date(year, month, 1).getDay() }

// ─── Mini Calendar ────────────────────────────────────────────
// availableDays: array of weekday numbers (0=Sun…6=Sat) when the tour departs
// duration: number of days the trip lasts (1 = day trip)
function MiniCalendar({ selected, onSelect, availableDays = [0,1,2,3,4,5,6], duration = 1 }) {
  const today = new Date(); today.setHours(0,0,0,0)
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const days = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstWeekday(viewYear, viewMonth)
  const cells = Array(firstDay).fill(null).concat(Array.from({ length: days }, (_, i) => i + 1))

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  // helpers
  const toDate = (d) => new Date(viewYear, viewMonth, d)
  const isPast   = (d) => !d || toDate(d) < today
  const isAvail  = (d) => !isPast(d) && availableDays.includes(toDate(d).getDay())
  const isToday  = (d) => d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear()

  // range helpers
  const selStart = selected ? new Date(selected) : null
  const selEnd   = selStart && duration > 1
    ? new Date(selStart.getFullYear(), selStart.getMonth(), selStart.getDate() + duration - 1)
    : selStart

  const isRangeStart = (d) => {
    if (!d || !selStart) return false
    const date = toDate(d)
    return date.toDateString() === selStart.toDateString()
  }
  const isRangeEnd = (d) => {
    if (!d || !selEnd || duration <= 1) return false
    const date = toDate(d)
    return date.toDateString() === selEnd.toDateString()
  }
  const isInRange = (d) => {
    if (!d || !selStart || !selEnd || duration <= 1) return false
    const date = toDate(d)
    return date > selStart && date < selEnd
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
        <button onClick={prevMonth}
          className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:border-slate-300 transition-colors">
          <ChevronLeft size={14} className="text-slate-500" />
        </button>
        <span className="text-sm font-bold text-slate-900">{MONTH_NAMES[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth}
          className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:border-slate-300 transition-colors">
          <ChevronRight size={14} className="text-slate-500" />
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-4 pt-3 pb-1">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-[10px] text-slate-400 font-medium">Disponible</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-slate-200" />
          <span className="text-[10px] text-slate-400 font-medium">No disponible</span>
        </div>
        {duration > 1 && (
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-2 rounded-sm bg-green-100" />
            <span className="text-[10px] text-slate-400 font-medium">{duration} días</span>
          </div>
        )}
      </div>

      <div className="px-3 pb-4 pt-2">
        {/* Weekday labels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 6 }}>
          {['D','L','M','M','J','V','S'].map((d, i) => (
            <div key={i} className="text-center text-[10px] font-bold text-slate-400">{d}</div>
          ))}
        </div>

        {/* Days grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px 0' }}>
          {cells.map((d, i) => {
            const avail    = d && isAvail(d)
            const past     = isPast(d)
            const start    = isRangeStart(d)
            const end      = isRangeEnd(d)
            const inRange  = isInRange(d)
            const selected_single = start && duration === 1

            // column position (0-6) for rounded corners on range
            const col = i % 7

            return (
              <div
                key={i}
                className="relative flex items-center justify-center"
                style={{ aspectRatio: '1', pointerEvents: (end || inRange) ? 'none' : undefined }}
              >
                {/* Range background strip */}
                {(inRange || (start && duration > 1) || end) && (
                  <div
                    className="absolute inset-y-1 bg-green-50"
                    style={{
                      left: start ? '50%' : 0,
                      right: end ? '50%' : 0,
                      borderRadius: start ? '12px 0 0 12px' : end ? '0 12px 12px 0' : 0,
                    }}
                  />
                )}

                <button
                  disabled={!d || past || !avail || end || inRange}
                  onClick={() => d && avail && !end && !inRange && onSelect(toDate(d))}
                  style={{ pointerEvents: (end || inRange) ? 'none' : undefined }}
                  className={`relative z-10 w-8 h-8 flex flex-col items-center justify-center rounded-full text-xs font-semibold transition-all duration-150 ${
                    !d ? '' :
                    start
                      ? 'bg-green-600 text-white shadow-md shadow-green-600/30'
                    : end
                      ? 'bg-green-600 text-white shadow-md shadow-green-600/30 cursor-not-allowed'
                    : inRange
                      ? 'text-green-700 cursor-not-allowed'
                    : past || !avail
                      ? 'text-slate-300 cursor-not-allowed'
                    : isToday(d)
                      ? 'bg-green-50 text-green-700 ring-2 ring-green-300'
                    : 'text-slate-800 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  <span className="leading-none">{d || ''}</span>
                  {/* Availability dot — only on free, future, non-range days */}
                  {d && !past && !start && !end && !inRange && (
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: avail ? '#22c55e' : '#e2e8f0' }}
                    />
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Duration info bar */}
      {duration > 1 && (
        <div className="mx-4 mb-4 bg-green-50 border border-green-100 rounded-2xl px-3 py-2 flex items-center gap-2">
          <Calendar size={12} className="text-green-600 flex-shrink-0" />
          <p className="text-[11px] text-green-700 font-semibold">
            Este tour dura <span className="font-extrabold">{duration} días / {duration - 1} noche{duration > 2 ? 's' : ''}</span>.
            El regreso se completa automáticamente.
          </p>
        </div>
      )}
    </div>
  )
}


// ─── Passenger Counter ────────────────────────────────────────
function Counter({ value, min, max, onChange, label, sub, price }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <div>
        <p className="text-sm font-bold text-slate-900">{label}</p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          {sub} · <span className="text-green-600 font-semibold">Q {price}</span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all active:scale-90 ${
            value > min ? 'border-slate-300 text-slate-600 hover:border-green-500 hover:text-green-600' : 'border-slate-150 text-slate-200 cursor-not-allowed'
          }`}
        >
          <span className="text-base leading-none font-bold">−</span>
        </button>
        <span className="text-base font-extrabold text-slate-900 w-5 text-center">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white shadow-sm shadow-green-600/25 disabled:opacity-30 transition-all active:scale-90 hover:bg-green-700"
        >
          <span className="text-base leading-none font-bold">+</span>
        </button>
      </div>
    </div>
  )
}

// ─── Primary Button ──────────────────────────────────────────
function PrimaryBtn({ onClick, disabled, loading, children, icon }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full py-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-600/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
    >
      {loading ? (
        <>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
          Procesando...
        </>
      ) : children}
    </button>
  )
}

// ─── Back button ─────────────────────────────────────────────
function BackBtn({ onClick }) {
  return (
    <button onClick={onClick}
      className="w-12 h-12 rounded-2xl border-2 border-slate-200 flex items-center justify-center flex-shrink-0 hover:bg-slate-50 transition-colors">
      <ChevronLeft size={18} className="text-slate-500" />
    </button>
  )
}

// ─── Step 1: Fecha y Pasajeros ────────────────────────────────
function StepDate({ tour, data, setData, onNext }) {
  const priceChild = Math.round(tour.priceNum * 0.6)
  const total = data.pax * tour.priceNum + data.kids * priceChild
  const duration = tour.duration || 1
  const availableDays = tour.availableDays || [0,1,2,3,4,5,6]

  const DAY_NAMES = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado']
  const availableLabel = availableDays.length === 7
    ? 'todos los días'
    : availableDays.map(d => DAY_NAMES[d]).join(', ')

  const formatDate = (d) => {
    if (!d) return null
    return `${d.getDate()} de ${MONTH_FULL[d.getMonth()]} ${d.getFullYear()}`
  }

  // For multi-day tours, compute the return date
  const returnDate = data.date && duration > 1
    ? new Date(data.date.getFullYear(), data.date.getMonth(), data.date.getDate() + duration - 1)
    : null

  return (
    <div className="flex flex-col gap-5 px-5 pb-6">
      <div>
        <h2 className="text-base font-extrabold text-slate-900 mb-1">Elige la fecha</h2>
        <p className="text-xs text-slate-400">
          Salidas disponibles: <span className="font-semibold text-slate-600">{availableLabel}</span>
          {duration > 1 && <span className="text-green-600 font-semibold"> · {duration} días</span>}
        </p>
      </div>

      <MiniCalendar
        selected={data.date}
        onSelect={(d) => setData(p => ({ ...p, date: d }))}
        availableDays={availableDays}
        duration={duration}
      />

      <AnimatePresence>
        {data.date && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
            {duration === 1 ? (
              <div className="flex items-center gap-2">
                <Check size={13} className="text-green-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-green-700">{formatDate(data.date)}</span>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Check size={13} className="text-green-600 flex-shrink-0" />
                  <span className="text-[11px] font-bold text-green-800">Fecha seleccionada</span>
                </div>
                <div className="flex items-center gap-2 ml-5">
                  <span className="text-[10px] text-green-600 font-semibold">Salida:</span>
                  <span className="text-xs text-green-700 font-semibold">{formatDate(data.date)}</span>
                </div>
                <div className="flex items-center gap-2 ml-5">
                  <span className="text-[10px] text-green-600 font-semibold">Regreso:</span>
                  <span className="text-xs text-green-700 font-semibold">{formatDate(returnDate)}</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <h2 className="text-base font-extrabold text-slate-900 mb-3">¿Cuántos viajan?</h2>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="border-b border-slate-100">
            <Counter label="Adultos" sub="12+ años" price={tour.priceNum}
              value={data.pax} min={1} max={10} onChange={(v) => setData(p => ({ ...p, pax: v }))} />
          </div>
          <Counter label="Niños" sub="3-11 años" price={priceChild}
            value={data.kids} min={0} max={6} onChange={(v) => setData(p => ({ ...p, kids: v }))} />
        </div>
      </div>

      {/* Summary */}
      <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4">
        <div className="flex justify-between text-xs text-slate-500 mb-1.5">
          <span>{data.pax} adulto{data.pax > 1 ? 's' : ''} × Q {tour.priceNum}</span>
          <span className="font-semibold text-slate-700">Q {(data.pax * tour.priceNum).toFixed(0)}</span>
        </div>
        {data.kids > 0 && (
          <div className="flex justify-between text-xs text-slate-500 mb-1.5">
            <span>{data.kids} niño{data.kids > 1 ? 's' : ''} × Q {priceChild}</span>
            <span className="font-semibold text-slate-700">Q {(data.kids * priceChild).toFixed(0)}</span>
          </div>
        )}
        <div className="border-t border-slate-200 mt-2 pt-2.5 flex justify-between items-center">
          <span className="text-sm font-bold text-slate-900">Total</span>
          <span className="text-base font-extrabold text-green-700">Q {total.toFixed(0)}</span>
        </div>
      </div>

      <PrimaryBtn onClick={onNext} disabled={!data.date}>
        Continuar
        <ChevronRight size={16} />
      </PrimaryBtn>
    </div>
  )
}

// ─── Step 2: Datos Pasajero ───────────────────────────────────
function StepPassengers({ data, setData, onNext, onBack }) {
  const fields = [
    { key: 'name',  label: 'Nombre completo',    icon: User,       type: 'text',  placeholder: 'Ej. Juan Carlos Pérez' },
    { key: 'email', label: 'Correo electrónico',  icon: Mail,       type: 'email', placeholder: 'correo@ejemplo.com' },
    { key: 'phone', label: 'WhatsApp / Teléfono', icon: Phone,      type: 'tel',   placeholder: '+502 0000-0000' },
    { key: 'dpi',   label: 'DPI / Pasaporte',     icon: CreditCard, type: 'text',  placeholder: 'Número de identificación' },
  ]
  const allFilled = fields.every(f => data.passenger[f.key]?.trim())

  return (
    <div className="flex flex-col gap-4 px-5 pb-6">
      <div>
        <h2 className="text-base font-extrabold text-slate-900 mb-1">Datos del pasajero</h2>
        <p className="text-xs text-slate-400">Usaremos esta información para tu voucher de confirmación</p>
      </div>

      <div className="flex flex-col gap-3">
        {fields.map(({ key, label, icon: Icon, type, placeholder }) => {
          const filled = !!data.passenger[key]?.trim()
          return (
            <div key={key}>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">{label}</label>
              <div className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 border-2 transition-all ${
                filled ? 'border-green-200 bg-green-50' : 'border-slate-100 bg-slate-50 focus-within:border-green-300 focus-within:bg-white'
              }`}>
                <Icon size={14} className={filled ? 'text-green-500 flex-shrink-0' : 'text-slate-400 flex-shrink-0'} />
                <input
                  type={type}
                  placeholder={placeholder}
                  value={data.passenger[key] || ''}
                  onChange={(e) => setData(p => ({ ...p, passenger: { ...p.passenger, [key]: e.target.value } }))}
                  className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none"
                />
                {filled && <Check size={13} className="text-green-500 flex-shrink-0" />}
              </div>
            </div>
          )
        })}
      </div>

      <div>
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Solicitudes especiales (opcional)</label>
        <textarea
          rows={3}
          placeholder="Alergias, necesidades especiales, asientos preferidos..."
          value={data.passenger.notes || ''}
          onChange={(e) => setData(p => ({ ...p, passenger: { ...p.passenger, notes: e.target.value } }))}
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-green-300 transition-all resize-none"
        />
      </div>

      <div className="flex gap-3">
        <BackBtn onClick={onBack} />
        <div className="flex-1">
          <PrimaryBtn onClick={onNext} disabled={!allFilled}>
            Continuar al pago
            <ChevronRight size={16} />
          </PrimaryBtn>
        </div>
      </div>
    </div>
  )
}

// ─── Step 3: Pago ────────────────────────────────────────────
function StepPayment({ tour, data, setData, onNext, onBack }) {
  const [processing, setProcessing] = useState(false)

  const PAYMENT_METHODS = [
    { id: 'card',     label: 'Tarjeta de crédito/débito', icon: CreditCard,  sub: 'Visa, Mastercard, AmEx' },
    { id: 'wallet',   label: 'Litegua Wallet',            icon: Wallet,      sub: 'Saldo disponible: Q 1,200.00' },
    { id: 'transfer', label: 'Transferencia bancaria',    icon: Smartphone,  sub: 'Bancolombia, BAC, G&T' },
  ]

  const priceChild = Math.round(tour.priceNum * 0.6)
  const total = (data.pax * tour.priceNum + data.kids * priceChild).toFixed(0)
  const formatDate = (d) => d ? `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}` : ''

  const handlePay = async () => {
    setProcessing(true)
    await new Promise(r => setTimeout(r, 2200))
    setProcessing(false)
    onNext()
  }

  return (
    <div className="flex flex-col gap-4 px-5 pb-6">

      {/* Order summary */}
      <div className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden">
        <div className="px-4 py-3 flex gap-3 items-center bg-white border-b border-slate-100">
          <img src={tour.image} alt={tour.name} className="w-14 h-14 rounded-2xl object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">{tour.name}</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={10} className="text-green-600" />
              <span className="text-[10px] text-slate-400">{tour.location}</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Calendar size={10} className="text-slate-400" />
              <span className="text-[10px] text-slate-400">{formatDate(data.date)}</span>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 flex flex-col gap-1.5">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Resumen</p>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">{data.pax} adulto{data.pax>1?'s':''}</span>
            <span className="text-slate-700 font-semibold">Q {(data.pax * tour.priceNum).toFixed(0)}</span>
          </div>
          {data.kids > 0 && (
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">{data.kids} niño{data.kids>1?'s':''}</span>
              <span className="text-slate-700 font-semibold">Q {(data.kids * priceChild).toFixed(0)}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 mt-1 border-t border-slate-200">
            <span className="text-sm font-bold text-slate-900">Total</span>
            <span className="text-sm font-extrabold text-green-700">Q {total}</span>
          </div>
        </div>
      </div>

      {/* Payment method */}
      <div>
        <p className="text-sm font-bold text-slate-900 mb-3">Método de pago</p>
        <div className="flex flex-col gap-2">
          {PAYMENT_METHODS.map(({ id, label, icon: Icon, sub }) => {
            const active = data.paymentMethod === id
            return (
              <button key={id} onClick={() => setData(p => ({ ...p, paymentMethod: id }))}
                className={`flex items-center gap-3.5 p-3.5 rounded-2xl border-2 text-left transition-all duration-200 ${
                  active ? 'border-green-500 bg-green-50' : 'border-slate-100 bg-white hover:border-slate-200'
                }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  active ? 'bg-green-100' : 'bg-slate-100'
                }`}>
                  <Icon size={17} className={active ? 'text-green-600' : 'text-slate-400'} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${active ? 'text-green-800' : 'text-slate-700'}`}>{label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  active ? 'border-green-500 bg-green-500' : 'border-slate-300'
                }`}>
                  {active && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Card fields */}
      <AnimatePresence>
        {data.paymentMethod === 'card' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col gap-2.5">
              <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-2">
                <CreditCard size={13} className="text-slate-400" />
                <input placeholder="0000 0000 0000 0000" maxLength={19}
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none tracking-wider" />
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3">
                  <input placeholder="MM/AA" maxLength={5}
                    className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none" />
                </div>
                <div className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-2">
                  <input placeholder="CVV" maxLength={3} type="password"
                    className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none" />
                  <Lock size={12} className="text-slate-300" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-1.5">
        <Lock size={11} className="text-slate-300 flex-shrink-0" />
        <span className="text-[10px] text-slate-400">Pago seguro con encriptación SSL 256 bits</span>
      </div>

      <div className="flex gap-3">
        <BackBtn onClick={onBack} />
        <div className="flex-1">
          <PrimaryBtn onClick={handlePay} disabled={!data.paymentMethod} loading={processing}>
            <Lock size={14} />
            Pagar Q {total}
          </PrimaryBtn>
        </div>
      </div>
    </div>
  )
}

// ─── Step 4: Confirmación ────────────────────────────────────
function StepConfirmation({ tour, data, onHome }) {
  const bookingId = `TUR-${Date.now().toString().slice(-6)}`
  const priceChild = Math.round(tour.priceNum * 0.6)
  const total = (data.pax * tour.priceNum + data.kids * priceChild).toFixed(0)
  const formatDate = (d) => {
    if (!d) return ''
    return `${d.getDate()} de ${MONTH_FULL[d.getMonth()]} ${d.getFullYear()}`
  }

  return (
    <div className="flex flex-col gap-5 px-5 pb-8">

      {/* Success */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="flex flex-col items-center gap-3 pt-4 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center relative">
          <motion.div
            className="absolute inset-0 rounded-full bg-green-200"
            animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <CheckCircle size={44} className="text-green-600" strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">¡Reserva confirmada!</h2>
          <p className="text-sm text-slate-400 mt-1">Tu voucher fue enviado a tu correo</p>
        </div>
      </motion.div>

      {/* Voucher */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl shadow-lg shadow-slate-200 overflow-hidden border border-slate-100"
      >
        {/* Green header */}
        <div className="bg-green-600 px-5 pt-5 pb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-green-200 text-[9px] font-bold uppercase tracking-widest">Voucher de Tour</span>
            <span className="text-green-200 text-[9px] font-mono">{bookingId}</span>
          </div>
          <h3 className="text-white font-extrabold text-base leading-snug">{tour.name}</h3>
          <div className="flex items-center gap-1 mt-1.5">
            <MapPin size={10} className="text-green-300" />
            <span className="text-green-200 text-xs">{tour.location}</span>
          </div>
        </div>

        {/* Details grid */}
        <div className="px-5 py-4">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Fecha', value: formatDate(data.date), icon: Calendar },
              { label: 'Pasajeros', value: `${data.pax} adulto${data.pax>1?'s':''}${data.kids>0?` + ${data.kids} niño${data.kids>1?'s':''}` :''}`, icon: Users },
              { label: 'Titular', value: data.passenger.name || 'Pasajero', icon: User },
              { label: 'Total pagado', value: `Q ${total}`, icon: CreditCard },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label}>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Icon size={8} /> {label}
                </p>
                <p className="text-xs font-bold text-slate-900 leading-snug">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Perforation divider */}
        <div className="relative bg-white" style={{ height: 24 }}>
          <div className="absolute rounded-full" style={{ width: 22, height: 22, left: -11, top: '50%', transform: 'translateY(-50%)', background: '#f1f5f9' }} />
          <div className="absolute border-t-2 border-dashed border-slate-200" style={{ left: 18, right: 18, top: '50%', transform: 'translateY(-50%)' }} />
          <div className="absolute rounded-full" style={{ width: 22, height: 22, right: -11, top: '50%', transform: 'translateY(-50%)', background: '#f1f5f9' }} />
        </div>

        {/* Meeting point */}
        <div className="px-5 pb-5 pt-2">
          <div className="bg-slate-50 rounded-2xl px-4 py-3">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <MapPin size={8} /> Punto de encuentro
            </p>
            <p className="text-xs font-semibold text-slate-800">Terminal Litegua — Centra Norte</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Zona 17, Ciudad de Guatemala</p>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-3">Presentarse 20 minutos antes de la salida</p>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="flex flex-col gap-3"
      >
        <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors">
          <Download size={15} />
          Descargar voucher PDF
        </button>
        <button
          onClick={onHome}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-green-600 text-white font-extrabold text-sm shadow-lg shadow-green-600/25 hover:bg-green-700 transition-colors"
        >
          <Home size={15} />
          Ir al inicio
        </button>
      </motion.div>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────
export default function TourBooking({ tour, goBack, navigate }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState({ date: null, pax: 1, kids: 0, passenger: {}, paymentMethod: '' })

  const STEP_LABELS = ['Fecha', 'Pasajeros', 'Pago', '¡Listo!']
  const [direction, setDirection] = useState(1)

  const nextStep = () => { setDirection(1); setStep(s => s + 1) }
  const prevStep = () => { setDirection(-1); setStep(s => s - 1) }

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50">

      {/* ── Header ─────────────────────────────────── */}
      <div className="bg-white border-b border-slate-100 px-5 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-5">
          {step < 3 ? (
            <button
              onClick={step === 0 ? goBack : prevStep}
              className="w-9 h-9 rounded-full border-2 border-slate-200 flex items-center justify-center hover:bg-slate-50 flex-shrink-0 transition-colors"
            >
              <ArrowLeft size={16} className="text-slate-500" />
            </button>
          ) : <div className="w-9" />}
          <div className="flex-1">
            <h1 className="text-base font-extrabold text-slate-900">Reservar tour</h1>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">{tour.name}</p>
          </div>
          {step < 3 && (
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              {step + 1} / 3
            </span>
          )}
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-1">
          {STEP_LABELS.slice(0, 3).map((_, i) => (
            <div key={i} className="flex-1 rounded-full transition-all duration-500"
              style={{ height: 4, background: i < step ? '#16a34a' : i === step ? '#16a34a' : '#e2e8f0' }} />
          ))}
        </div>
        <div className="flex justify-between">
          {STEP_LABELS.slice(0, 3).map((label, i) => (
            <span key={i} className={`text-[9px] font-bold transition-colors ${
              i === step ? 'text-green-600' : i < step ? 'text-green-400' : 'text-slate-300'
            }`} style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Scrollable step content ────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="pt-5"
          >
            {step === 0 && <StepDate tour={tour} data={data} setData={setData} onNext={nextStep} />}
            {step === 1 && <StepPassengers data={data} setData={setData} onNext={nextStep} onBack={prevStep} />}
            {step === 2 && <StepPayment tour={tour} data={data} setData={setData} onNext={nextStep} onBack={prevStep} />}
            {step === 3 && <StepConfirmation tour={tour} data={data} onHome={() => navigate('home')} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
