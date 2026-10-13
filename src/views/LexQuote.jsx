import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ArrowUpDown, Package, Weight, MapPin, User, Phone,
  Store, Home, CheckCircle, Clock, Mail,
} from 'lucide-react'
import { LEX_PACKAGE_TYPES, LEX_WEIGHTS } from '../constants'

const DELIVERY = [
  { id: 'agency', label: 'Recoger en agencia', icon: Store },
  { id: 'home', label: 'Entrega a domicilio', icon: Home },
]

function Label({ children }) {
  return <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">{children}</label>
}

function Counter({ value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        className="w-8 h-8 rounded-full border-2 border-slate-300 text-slate-600 flex items-center justify-center disabled:opacity-30 transition-all active:scale-90"
      >
        <span className="text-base leading-none font-bold">−</span>
      </button>
      <span className="text-base font-extrabold text-slate-900 w-5 text-center">{value}</span>
      <button
        onClick={() => onChange(Math.min(10, value + 1))}
        disabled={value >= 10}
        className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center disabled:opacity-30 transition-all active:scale-90 hover:bg-green-700"
      >
        <span className="text-base leading-none font-bold">+</span>
      </button>
    </div>
  )
}

export default function LexQuote({ searchParams, setSearchParams, setLocationPicker, goBack, navigate }) {
  const [form, setForm] = useState({
    packageType: searchParams.packageType || '',
    weight: searchParams.weight || '',
    qty: 1,
    delivery: 'agency',
    name: '',
    phone: '',
  })
  const [sent, setSent] = useState(false)
  const [requestId] = useState(() => `LEX-COT-${Date.now().toString().slice(-6)}`)

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))
  const swap = () => setSearchParams((p) => ({ ...p, origin: p.destination, destination: p.origin }))

  const ready = searchParams.origin && searchParams.destination && form.packageType && form.weight
    && form.name.trim() && form.phone.trim()

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-slate-100 sticky top-0 z-10">
        <button onClick={goBack}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors flex-shrink-0">
          <ArrowLeft size={20} className="text-slate-700" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold text-green-600 uppercase tracking-widest">Litegua Express</p>
          <h1 className="text-base font-extrabold text-slate-900 leading-tight">Cotizar envío</h1>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div key="form" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex-1 overflow-y-auto p-5 pb-8 flex flex-col gap-5">

            {/* Route */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4">
              <p className="text-sm font-bold text-slate-900 mb-3">Ruta del envío</p>
              <div className="relative">
                <button onClick={() => setLocationPicker('origin')}
                  className="w-full text-left px-4 py-3 bg-slate-50 rounded-xl mb-2 text-sm flex items-center gap-2 hover:bg-slate-100 transition-colors">
                  <MapPin size={14} className="text-green-600 flex-shrink-0" />
                  <span className={searchParams.origin ? 'text-slate-900 font-medium' : 'text-slate-400'}>
                    {searchParams.origin || 'Ciudad de origen'}
                  </span>
                </button>
                <button onClick={swap}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white rounded-full border border-slate-200 flex items-center justify-center shadow-sm">
                  <ArrowUpDown size={16} className="text-slate-500" />
                </button>
                <button onClick={() => setLocationPicker('destination')}
                  className="w-full text-left px-4 py-3 bg-slate-50 rounded-xl text-sm flex items-center gap-2 hover:bg-slate-100 transition-colors">
                  <MapPin size={14} className="text-slate-400 flex-shrink-0" />
                  <span className={searchParams.destination ? 'text-slate-900 font-medium' : 'text-slate-400'}>
                    {searchParams.destination || 'Ciudad de destino'}
                  </span>
                </button>
              </div>
            </div>

            {/* Package */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex flex-col gap-4">
              <p className="text-sm font-bold text-slate-900">Tu paquete</p>
              <div>
                <Label>Tipo de paquete</Label>
                <div className="relative">
                  <Package size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <select value={form.packageType} onChange={(e) => set('packageType', e.target.value)}
                    className="w-full pl-8 pr-3 py-3 bg-slate-50 rounded-xl text-sm text-slate-700 border border-transparent focus:border-green-300 focus:ring-2 focus:ring-green-100 appearance-none transition-all">
                    <option value="">Selecciona</option>
                    {LEX_PACKAGE_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <Label>Peso aproximado</Label>
                <div className="relative">
                  <Weight size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <select value={form.weight} onChange={(e) => set('weight', e.target.value)}
                    className="w-full pl-8 pr-3 py-3 bg-slate-50 rounded-xl text-sm text-slate-700 border border-transparent focus:border-green-300 focus:ring-2 focus:ring-green-100 appearance-none transition-all">
                    <option value="">Selecciona</option>
                    {LEX_WEIGHTS.map((w) => <option key={w}>{w}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">Cantidad de paquetes</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Máximo 10 por solicitud</p>
                </div>
                <Counter value={form.qty} onChange={(v) => set('qty', v)} />
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4">
              <p className="text-sm font-bold text-slate-900 mb-3">Entrega</p>
              <div className="grid grid-cols-2 gap-2">
                {DELIVERY.map(({ id, label, icon: Icon }) => {
                  const active = form.delivery === id
                  return (
                    <button key={id} onClick={() => set('delivery', id)}
                      className={`flex flex-col items-center gap-1.5 py-3.5 rounded-2xl border-2 text-center transition-all ${
                        active ? 'border-green-500 bg-green-50' : 'border-slate-100 bg-white'
                      }`}>
                      <Icon size={18} className={active ? 'text-green-600' : 'text-slate-400'} />
                      <span className={`text-xs font-semibold ${active ? 'text-green-800' : 'text-slate-600'}`}>{label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex flex-col gap-4">
              <div>
                <p className="text-sm font-bold text-slate-900">Datos de contacto</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Te enviaremos la cotización a estos datos</p>
              </div>
              <div>
                <Label>Nombre completo</Label>
                <div className="flex items-center gap-3 rounded-2xl px-4 py-3.5 border-2 border-slate-100 bg-slate-50 focus-within:border-green-300 focus-within:bg-white transition-all">
                  <User size={14} className="text-slate-400 flex-shrink-0" />
                  <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)}
                    placeholder="Ej. Juan Carlos Pérez"
                    className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none" />
                </div>
              </div>
              <div>
                <Label>WhatsApp / Teléfono</Label>
                <div className="flex items-center gap-3 rounded-2xl px-4 py-3.5 border-2 border-slate-100 bg-slate-50 focus-within:border-green-300 focus-within:bg-white transition-all">
                  <Phone size={14} className="text-slate-400 flex-shrink-0" />
                  <input type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)}
                    placeholder="+502 0000-0000"
                    className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none" />
                </div>
              </div>
            </div>

            <button onClick={() => setSent(true)} disabled={!ready}
              className="w-full py-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-extrabold text-sm shadow-lg shadow-green-600/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]">
              Solicitar cotización
            </button>
          </motion.div>
        ) : (
          <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="flex-1 overflow-y-auto p-5 pb-8 flex flex-col gap-5">
            <div className="flex flex-col items-center gap-3 pt-4 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle size={44} className="text-green-600" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">¡Solicitud enviada!</h2>
                <p className="text-sm text-slate-400 mt-1">Un asesor LEX te enviará tu cotización</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-green-600 px-5 pt-5 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-green-200 text-[9px] font-bold uppercase tracking-widest">Cotización de envío</span>
                  <span className="text-green-200 text-[9px] font-mono">{requestId}</span>
                </div>
                <h3 className="text-white font-extrabold text-base leading-snug">
                  {searchParams.origin} a {searchParams.destination}
                </h3>
              </div>
              <div className="px-5 py-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  ['Paquete', form.packageType],
                  ['Peso', form.weight],
                  ['Cantidad', `${form.qty} paquete${form.qty > 1 ? 's' : ''}`],
                  ['Entrega', DELIVERY.find((d) => d.id === form.delivery).label],
                  ['Solicitante', form.name],
                  ['Estado', 'Pendiente de cotización'],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-xs font-bold text-slate-900 leading-snug">{value}</p>
                  </div>
                ))}
              </div>
              <div className="px-5 pb-5">
                <div className="bg-slate-50 rounded-2xl px-4 py-3 flex items-start gap-3">
                  <Mail size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-slate-800">Te contactaremos por WhatsApp o teléfono</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <Clock size={9} /> Lunes a Sábado de 6:00 AM a 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={() => navigate('lex')}
              className="w-full py-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-extrabold text-sm shadow-lg shadow-green-600/25 transition-colors">
              Volver a LEX
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
