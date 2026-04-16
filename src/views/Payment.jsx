import { useState } from 'react'
import { ArrowLeft, Clock, MapPin, Armchair, ShieldCheck, Info, CreditCard } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Payment({
  selectedSeats, goBack, navigate, searchParams,
  totalBoletos, serviceFee, totalAmount, handlePayment, paymentProcessing,
  SEAT_PRICE,
}) {
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cvv, setCvv] = useState('')
  const [expiry, setExpiry] = useState('')

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16)
    return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ')
  }

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4)
    if (cleaned.length > 2) return cleaned.slice(0, 2) + ' / ' + cleaned.slice(2)
    return cleaned
  }

  if (paymentProcessing) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-slate-200 border-t-green-600 rounded-full mb-6"
        />
        <h2 className="text-lg font-bold text-slate-900 mb-1">Procesando tu pago...</h2>
        <p className="text-sm text-slate-500 text-center">
          No cierres esta ventana. Estamos verificando tu transacción.
        </p>
      </div>
    )
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
          <h1 className="text-base font-bold text-slate-900">Pago Seguro</h1>
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
        <div className="flex justify-end -mt-6">
          <div className="text-right">
            <div className="text-[8px] text-slate-400 font-medium">Servicio</div>
            <div className="text-[11px] text-green-700 font-extrabold leading-tight">PRIMERA</div>
            <div className="text-[10px] text-green-600 font-bold">PLUS</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-24">
        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-5"
        >
          <h2 className="text-base font-bold text-slate-900 mb-4">Resumen de compra</h2>

          <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
            <span className="text-sm text-slate-600">Boletos (x{selectedSeats.length}) - Primera Plus</span>
            <span className="text-sm font-medium text-slate-700">Q {totalBoletos.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-2.5 border-b border-dashed border-slate-200">
            <span className="text-sm text-slate-600">Cargos por servicio</span>
            <span className="text-sm font-medium text-slate-700">Q {serviceFee.toFixed(2)}</span>
          </div>

          <div className="text-center mt-4">
            <span className="text-xs text-slate-500">Total a pagar</span>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">Q {totalAmount.toFixed(2)}</p>
          </div>
        </motion.div>

        {/* Secure Payment */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <ShieldCheck size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Pago seguro</h3>
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-5">
            Ingresa los datos de tu tarjeta para finalizar la compra de tus boletos.
          </p>

          {/* Card Name */}
          <div className="mb-4">
            <label className="text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1">
              Nombre en la tarjeta <Info size={12} className="text-slate-400" />
            </label>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
            />
          </div>

          {/* Card Number */}
          <div className="mb-4">
            <label className="text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1">
              Número de tarjeta <Info size={12} className="text-orange-400" />
            </label>
            <div className="relative">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="- - - -   - - - -   - - - -   - - - -"
                className="w-full px-4 py-3.5 bg-white border border-orange-300 rounded-xl text-sm text-red-500 font-medium placeholder:text-red-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all tracking-widest"
              />
            </div>
          </div>

          {/* CVV + Expiry */}
          <div className="flex gap-3 mb-4">
            <div className="w-24">
              <label className="text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1">
                CVV <Info size={12} className="text-slate-400" />
              </label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                placeholder="- - -"
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all text-center tracking-widest"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs font-medium text-slate-600 mb-1.5 flex items-center gap-1">
                Fecha de expiración <Info size={12} className="text-slate-400" />
              </label>
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                placeholder="M M  /  A A"
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all text-center tracking-widest"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="sticky bottom-0 bg-white border-t border-slate-100 p-4 pb-7">
        <button
          onClick={handlePayment}
          className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full text-sm shadow-md shadow-green-600/25 transition-all duration-200 active:scale-[0.98]"
        >
          Finalizar pago
        </button>
      </div>
    </div>
  )
}
