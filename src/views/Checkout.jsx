import { useState } from 'react'
import { ArrowLeft, Clock, MapPin, Armchair, Check, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Checkout({
  selectedSeats, passengerData, setPassengerData,
  navigate, goBack, searchParams, totalAmount, SEAT_PRICE,
}) {
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [assignToAll, setAssignToAll] = useState(false)

  const sortedSeats = [...selectedSeats].sort((a, b) => a - b)

  const updatePassenger = (seatNum, field, value) => {
    setPassengerData((prev) => ({
      ...prev,
      [seatNum]: { ...(prev[seatNum] || {}), [field]: value },
    }))
  }

  const handleAssignToAll = (checked) => {
    setAssignToAll(checked)
    if (checked && sortedSeats.length > 0) {
      const firstData = passengerData[sortedSeats[0]] || {}
      const newData = {}
      sortedSeats.forEach((seat) => {
        newData[seat] = { ...firstData }
      })
      setPassengerData(newData)
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-slate-100 sticky top-0 z-10">
        <button onClick={goBack}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
          <ArrowLeft size={20} className="text-slate-700" />
        </button>
        <div className="flex-1">
          <h1 className="text-base font-bold text-slate-900">Datos</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
          <span className="text-white font-bold text-xs">NP</span>
        </div>
      </div>

      {/* Service Info */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Armchair size={12} className="text-green-600" />
          <span className="font-medium text-slate-700">Servicio Primera Plus</span>
          <span className="flex items-center gap-0.5">
            <Clock size={10} className="text-green-600" /> 4:00 a.m.
          </span>
        </div>
        <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
          <MapPin size={10} />
          <span>{searchParams.origin || 'Ciudad Capital'} - Morales - {searchParams.destination || 'Puerto Barrios'}</span>
        </div>

        {/* Primera Plus Logo */}
        <div className="flex justify-end -mt-6">
          <div className="text-right">
            <div className="text-[8px] text-slate-400 font-medium">Servicio</div>
            <div className="text-[11px] text-green-700 font-extrabold leading-tight">PRIMERA</div>
            <div className="text-[10px] text-green-600 font-bold">PLUS</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-40">
        {/* Selected Seats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4"
        >
          <h2 className="text-sm font-bold text-slate-900 mb-2">Butacas Elegidas:</h2>
          <div className="flex flex-wrap gap-2">
            {sortedSeats.map((seat) => (
              <span key={seat}
                className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
              >
                <Armchair size={12} /> Butaca #{seat}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Passenger Forms */}
        {sortedSeats.map((seat, idx) => (
          <div key={seat}>
            <AnimatePresence mode="wait">
              {/* When assignToAll is on and this is NOT the first passenger, show a pills summary */}
              {assignToAll && idx > 0 ? (
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3 flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-green-800">Pasajero No.{idx + 1} — Butaca #{seat}</p>
                      <p className="text-[11px] text-green-600 mt-0.5">Datos copiados del Pasajero No.1</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ overflow: 'hidden' }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-4"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-slate-900">Pasajero No.{idx + 1}</h3>
                      <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Armchair size={10} /> Butaca #{seat}
                      </span>
                    </div>

                    {idx === 0 && sortedSeats.length > 1 && (
                      <label className="flex items-center gap-2 mt-2 mb-3 cursor-pointer">
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                          assignToAll ? 'bg-green-600 border-green-600' : 'border-slate-300'
                        }`}>
                          {assignToAll && <Check size={12} className="text-white" />}
                        </div>
                        <input type="checkbox" className="hidden" checked={assignToAll}
                          onChange={(e) => handleAssignToAll(e.target.checked)} />
                        <span className="text-xs text-slate-500">Asignar mis datos a todas las butacas</span>
                      </label>
                    )}

                    <p className="text-sm font-medium text-slate-700 text-center mb-4 mt-2">
                      Rellena los siguientes datos
                    </p>

                    {/* Name */}
                    <div className="mb-3">
                      <label className="text-xs font-medium text-slate-600 mb-1 block">Nombre completo</label>
                      <input
                        type="text"
                        placeholder="Nombre completo..."
                        value={passengerData[seat]?.name || ''}
                        onChange={(e) => updatePassenger(seat, 'name', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
                      />
                    </div>

                    {/* DPI + Phone */}
                    <div className="flex gap-3 mb-3">
                      <div className="flex-1">
                        <label className="text-xs font-medium text-slate-600 mb-1 block">DPI / Pasaporte</label>
                        <input
                          type="text"
                          placeholder="DPI / Pasaporte..."
                          value={passengerData[seat]?.dpi || ''}
                          onChange={(e) => updatePassenger(seat, 'dpi', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-medium text-slate-600 mb-1 block">Numero de Telefono</label>
                        <input
                          type="tel"
                          placeholder="+502 0000-0000"
                          value={passengerData[seat]?.phone || ''}
                          onChange={(e) => updatePassenger(seat, 'phone', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                      <label className="text-xs font-medium text-slate-600 mb-1 block">Correo electronico</label>
                      <input
                        type="email"
                        placeholder="Correo electronico..."
                        value={passengerData[seat]?.email || ''}
                        onChange={(e) => updatePassenger(seat, 'email', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
                      />
                    </div>

                    {idx === 0 && (
                      <label className="flex items-center gap-2 cursor-pointer">
                        <div className="w-5 h-5 rounded-md border-2 border-slate-300 flex items-center justify-center" />
                        <span className="text-xs text-slate-500">Guardar mis datos</span>
                      </label>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="sticky bottom-0 bg-white border-t border-slate-100 p-4 pb-7">
        <label className="flex items-start gap-2.5 mb-3 cursor-pointer">
          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
            acceptTerms ? 'bg-green-600 border-green-600' : 'border-slate-300'
          }`}>
            {acceptTerms && <Check size={12} className="text-white" />}
          </div>
          <input type="checkbox" className="hidden" checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)} />
          <span className="text-xs text-slate-500 leading-snug">
            Al continuar, acepto los términos y condiciones y políticas de privacidad
          </span>
        </label>

        <button
          onClick={() => acceptTerms && navigate('payment')}
          disabled={!acceptTerms}
          className={`w-full py-3.5 font-semibold rounded-full text-sm shadow-md transition-all duration-200 active:scale-[0.98] ${
            acceptTerms
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-600/25'
              : 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed'
          }`}
        >
          Pagar Q {totalAmount.toFixed(2)}
        </button>
      </div>
    </div>
  )
}
