import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight, User, Receipt, CreditCard,
  Settings, HelpCircle, LogOut, Star, Bell, Shield,
  ArrowLeft, Camera, Phone, Mail, MapPin, Save,
  Building2, FileText, Plus, Trash2, Lock, Eye, EyeOff,
  Smartphone, Globe, ChevronDown, CheckCircle,
  AlertCircle, Info, MessageCircle, ExternalLink, Sliders
} from 'lucide-react'

// ── Helpers ──────────────────────────────────────────────────
function SubHeader({ title, onBack }) {
  return (
    <div className="bg-white border-b border-slate-100 px-5 pt-12 pb-4 flex items-center gap-3 sticky top-0 z-10">
      <button onClick={onBack}
        className="w-9 h-9 rounded-full border-2 border-slate-200 flex items-center justify-center hover:bg-slate-50 flex-shrink-0 transition-colors">
        <ArrowLeft size={16} className="text-slate-500" />
      </button>
      <h1 className="text-base font-extrabold text-slate-900">{title}</h1>
    </div>
  )
}

function FieldRow({ label, value, placeholder = '', type = 'text', readOnly }) {
  return (
    <div>
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">{label}</label>
      <div className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 border-2 ${readOnly ? 'border-slate-100 bg-slate-50' : 'border-slate-100 bg-white focus-within:border-green-300'} transition-all`}>
        <input
          type={type}
          defaultValue={value}
          readOnly={readOnly}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none"
        />
      </div>
    </div>
  )
}

function SaveBtn({ label = 'Guardar cambios' }) {
  return (
    <button className="w-full py-4 rounded-2xl bg-green-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 hover:bg-green-700 transition-colors active:scale-[0.98]">
      <Save size={15} />
      {label}
    </button>
  )
}

// ── Sub-screens ───────────────────────────────────────────────

function DatosPersonales({ onBack }) {
  return (
    <div className="flex-1 min-h-0 flex flex-col bg-slate-50">
      <SubHeader title="Datos Personales" onBack={onBack} />
      <div className="flex-1 min-h-0 overflow-y-auto px-5 py-5 flex flex-col gap-4 pb-24">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3 bg-white rounded-3xl p-6 border border-slate-100">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center">
              <span className="text-white font-black text-3xl">N</span>
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-md border-2 border-white">
              <Camera size={13} className="text-white" />
            </button>
          </div>
          <p className="text-xs text-slate-400">Toca para cambiar tu foto</p>
        </div>
        {/* Fields */}
        <div className="bg-white rounded-3xl border border-slate-100 p-4 flex flex-col gap-3">
          <FieldRow label="Nombre completo" value="Nehemías Pérez" />
          <FieldRow label="Correo electrónico" value="nehemias@email.com" type="email" />
          <FieldRow label="Teléfono / WhatsApp" value="+502 5555-0000" type="tel" />
          <FieldRow label="Fecha de nacimiento" value="15 de Marzo, 1998" />
          <FieldRow label="País" value="Guatemala" />
        </div>
        <SaveBtn />
      </div>
    </div>
  )
}

function DatosFacturacion({ onBack }) {
  return (
    <div className="flex-1 min-h-0 flex flex-col bg-slate-50">
      <SubHeader title="Datos de Facturación" onBack={onBack} />
      <div className="flex-1 min-h-0 overflow-y-auto px-5 py-5 flex flex-col gap-4 pb-24">
        <div className="bg-orange-50 border border-orange-100 rounded-2xl px-4 py-3 flex items-center gap-2.5">
          <AlertCircle size={14} className="text-orange-500 flex-shrink-0" />
          <p className="text-[11px] text-orange-700 font-medium">Estos datos aparecerán en tus facturas fiscales de Guatemala.</p>
        </div>
        <div className="bg-white rounded-3xl border border-slate-100 p-4 flex flex-col gap-3">
          <FieldRow label="Nombre / Razón social" value="Nehemías Pérez López" />
          <FieldRow label="NIT" value="1234567-8" />
          <FieldRow label="Dirección fiscal" value="Zona 10, Ciudad de Guatemala" />
          <FieldRow label="Correo para facturas" value="nehemias@email.com" type="email" />
        </div>
        <div className="bg-white rounded-3xl border border-slate-100 p-4">
          <p className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-1.5">
            <Building2 size={12} className="text-slate-400" /> Tipo de persona
          </p>
          {['Persona Individual', 'Persona Jurídica (empresa)'].map((opt, i) => (
            <button key={i} className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 text-left mb-2 last:mb-0 transition-all ${i === 0 ? 'border-green-500 bg-green-50' : 'border-slate-100 bg-white'}`}>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${i === 0 ? 'border-green-500 bg-green-500' : 'border-slate-300'}`}>
                {i === 0 && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <span className={`text-sm font-semibold ${i === 0 ? 'text-green-800' : 'text-slate-600'}`}>{opt}</span>
            </button>
          ))}
        </div>
        <SaveBtn label="Guardar datos fiscales" />
      </div>
    </div>
  )
}

function MetodosPago({ onBack }) {
  const cards = [
    { type: 'Visa', last4: '4242', exp: '12/27', brand: '💳' },
    { type: 'Mastercard', last4: '8888', exp: '08/26', brand: '💳' },
  ]
  return (
    <div className="flex-1 min-h-0 flex flex-col bg-slate-50">
      <SubHeader title="Métodos de Pago" onBack={onBack} />
      <div className="flex-1 min-h-0 overflow-y-auto px-5 py-5 flex flex-col gap-4 pb-24">
        {/* Cards */}
        {cards.map((c, i) => (
          <div key={i} className="bg-white rounded-3xl border border-slate-100 px-4 py-3.5 flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
              {c.brand}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">{c.type} ···· {c.last4}</p>
              <p className="text-xs text-slate-400 mt-0.5">Vence {c.exp}</p>
            </div>
            {i === 0 && (
              <span className="text-[9px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Principal</span>
            )}
            <button className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center ml-1">
              <Trash2 size={13} className="text-red-400" />
            </button>
          </div>
        ))}
        {/* Wallet balance */}
        <div className="bg-green-600 rounded-3xl p-4 text-white">
          <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mb-1">Litegua Wallet</p>
          <p className="text-3xl font-extrabold">Q 1,200.00</p>
          <p className="text-xs opacity-70 mt-1">Saldo disponible</p>
        </div>
        {/* Add card */}
        <button className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 flex items-center justify-center gap-2 text-sm font-semibold hover:border-green-300 hover:text-green-600 transition-all">
          <Plus size={15} />
          Agregar tarjeta
        </button>
      </div>
    </div>
  )
}

function PreferenciasViaje({ onBack }) {
  return (
    <div className="flex-1 min-h-0 flex flex-col bg-slate-50">
      <SubHeader title="Preferencias de Viaje" onBack={onBack} />
      <div className="flex-1 min-h-0 overflow-y-auto px-5 py-5 flex flex-col gap-4 pb-24">
        {/* Seat preference */}
        <div className="bg-white rounded-3xl border border-slate-100 p-4">
          <p className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-1.5">
            <Sliders size={12} /> Asiento preferido
          </p>
          {['Ventana', 'Pasillo', 'Sin preferencia'].map((opt, i) => (
            <button key={i} className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 text-left mb-2 last:mb-0 transition-all ${i === 0 ? 'border-green-500 bg-green-50' : 'border-slate-100 bg-white'}`}>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${i === 0 ? 'border-green-500 bg-green-500' : 'border-slate-300'}`}>
                {i === 0 && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <span className={`text-sm font-semibold ${i === 0 ? 'text-green-800' : 'text-slate-600'}`}>{opt}</span>
            </button>
          ))}
        </div>
        {/* Toggle prefs */}
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
          {[
            { label: 'Recordatorios de viaje', sub: 'Avisos 24h y 1h antes', on: true },
            { label: 'Factura automática', sub: 'Al confirmar cada reserva', on: true },
            { label: 'Modo sin conexión', sub: 'Descarga boletos automáticamente', on: false },
          ].map((item, i, arr) => (
            <div key={i} className={`flex items-center justify-between px-4 py-3.5 ${i < arr.length-1 ? 'border-b border-slate-50' : ''}`}>
              <div>
                <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.sub}</p>
              </div>
              <div className={`w-11 h-6 rounded-full transition-colors flex-shrink-0 ${item.on ? 'bg-green-500' : 'bg-slate-200'} relative`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${item.on ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
            </div>
          ))}
        </div>
        <SaveBtn label="Guardar preferencias" />
      </div>
    </div>
  )
}

function Notificaciones({ onBack }) {
  const groups = [
    {
      title: 'Viajes y reservas',
      items: [
        { label: 'Confirmación de reserva', sub: 'Al completar una reservación', on: true },
        { label: 'Recordatorio de salida', sub: '24 horas antes', on: true },
        { label: 'Cambios de itinerario', sub: 'Modificaciones en tu viaje', on: true },
      ]
    },
    {
      title: 'Promociones',
      items: [
        { label: 'Ofertas y descuentos', sub: 'Promociones personalizadas', on: false },
        { label: 'Novedades de Litegua', sub: 'Nuevos tours y destinos', on: false },
      ]
    }
  ]
  return (
    <div className="flex-1 min-h-0 flex flex-col bg-slate-50">
      <SubHeader title="Notificaciones" onBack={onBack} />
      <div className="flex-1 min-h-0 overflow-y-auto px-5 py-5 flex flex-col gap-4 pb-24">
        {groups.map((group, gi) => (
          <div key={gi}>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">{group.title}</p>
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
              {group.items.map((item, i, arr) => (
                <div key={i} className={`flex items-center justify-between px-4 py-3.5 ${i < arr.length-1 ? 'border-b border-slate-50' : ''}`}>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.sub}</p>
                  </div>
                  <div className={`w-11 h-6 rounded-full transition-colors flex-shrink-0 ml-3 ${item.on ? 'bg-green-500' : 'bg-slate-200'} relative`}>
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${item.on ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SeguridadPrivacidad({ onBack }) {
  const [showPass, setShowPass] = useState(false)
  return (
    <div className="flex-1 min-h-0 flex flex-col bg-slate-50">
      <SubHeader title="Seguridad y Privacidad" onBack={onBack} />
      <div className="flex-1 min-h-0 overflow-y-auto px-5 py-5 flex flex-col gap-4 pb-24">
        {/* Change password */}
        <div className="bg-white rounded-3xl border border-slate-100 p-4 flex flex-col gap-3">
          <p className="text-sm font-bold text-slate-600 flex items-center gap-1.5 mb-1">
            <Lock size={13} /> Cambiar contraseña
          </p>
          {['Contraseña actual', 'Nueva contraseña', 'Confirmar contraseña'].map((l, i) => (
            <div key={i}>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">{l}</label>
              <div className="flex items-center gap-3 rounded-2xl px-4 py-3.5 border-2 border-slate-100 bg-slate-50 focus-within:border-green-300 focus-within:bg-white transition-all">
                <input type={showPass ? 'text' : 'password'} placeholder="••••••••"
                  className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none" />
                {i === 0 && (
                  <button onClick={() => setShowPass(s => !s)}>
                    {showPass ? <EyeOff size={14} className="text-slate-300" /> : <Eye size={14} className="text-slate-300" />}
                  </button>
                )}
              </div>
            </div>
          ))}
          <SaveBtn label="Actualizar contraseña" />
        </div>
        {/* Privacy toggles */}
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
          {[
            { label: 'Autenticación de 2 pasos', sub: 'SMS o correo electrónico', on: true },
            { label: 'Sesiones activas', sub: '1 dispositivo conectado', on: null },
          ].map((item, i, arr) => (
            <div key={i} className={`flex items-center justify-between px-4 py-3.5 ${i < arr.length-1 ? 'border-b border-slate-50' : ''}`}>
              <div>
                <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.sub}</p>
              </div>
              {item.on !== null ? (
                <div className={`w-11 h-6 rounded-full transition-colors flex-shrink-0 ${item.on ? 'bg-green-500' : 'bg-slate-200'} relative`}>
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${item.on ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              ) : (
                <ChevronRight size={15} className="text-slate-300" />
              )}
            </div>
          ))}
        </div>
        {/* Delete account */}
        <button className="w-full py-3.5 rounded-2xl border-2 border-red-100 text-red-400 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
          <Trash2 size={14} />
          Eliminar cuenta
        </button>
      </div>
    </div>
  )
}

function CentroAyuda({ onBack }) {
  const faqs = [
    { q: '¿Cómo cancelo una reserva?', a: 'Puedes cancelar hasta 24 horas antes desde "Mis Viajes". El reembolso se acredita en 3-5 días hábiles.' },
    { q: '¿Puedo cambiar la fecha de mi tour?', a: 'Sí, con al menos 48 horas de anticipación desde la sección de Mis Viajes.' },
    { q: '¿Cómo descargo mi boleto?', a: 'En la confirmación de reserva encontrarás el botón "Descargar PDF". También recibirás el voucher por correo.' },
    { q: '¿Se incluye el seguro de viaje?', a: 'Todos nuestros tours incluyen seguro de accidentes. Revisa los detalles en la descripción de cada tour.' },
  ]
  const [open, setOpen] = useState(null)
  return (
    <div className="flex-1 min-h-0 flex flex-col bg-slate-50">
      <SubHeader title="Centro de Ayuda" onBack={onBack} />
      <div className="flex-1 min-h-0 overflow-y-auto px-5 py-5 flex flex-col gap-4 pb-24">
        {/* Contact buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { icon: MessageCircle, label: 'WhatsApp', sub: 'Respuesta inmediata', color: 'text-green-600', bg: 'bg-green-50 border-green-100' },
            { icon: Mail, label: 'Correo', sub: '24h de respuesta', color: 'text-blue-500', bg: 'bg-blue-50 border-blue-100' },
          ].map(({ icon: Icon, label, sub, color, bg }, i) => (
            <button key={i} className={`${bg} border-2 rounded-2xl p-3.5 flex flex-col items-center gap-1.5 text-center hover:opacity-80 transition-opacity`}>
              <Icon size={20} className={color} />
              <span className="text-sm font-bold text-slate-800">{label}</span>
              <span className="text-[10px] text-slate-400">{sub}</span>
            </button>
          ))}
        </div>
        {/* FAQs */}
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Preguntas frecuentes</p>
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
          {faqs.map((faq, i) => (
            <div key={i} className={`border-b border-slate-50 last:border-b-0`}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left">
                <span className="text-sm font-semibold text-slate-800 flex-1 pr-3">{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={15} className="text-slate-300 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-slate-500 leading-relaxed px-4 pb-4">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        {/* Version */}
        <div className="bg-white rounded-2xl border border-slate-100 px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-slate-400">Litegua App</span>
          <span className="text-xs font-bold text-slate-600">v2.0.0</span>
        </div>
      </div>
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────
const MENU_ITEMS = [
  { id: 'personal',    label: 'Datos Personales',       desc: 'Nombre, foto y contacto',    icon: User,        color: 'text-blue-500',   bg: 'bg-blue-50',   badge: null },
  { id: 'billing',     label: 'Datos de Facturación',   desc: 'NIT y razón social',         icon: Receipt,     color: 'text-orange-500', bg: 'bg-orange-50', badge: 'Importante' },
  { id: 'payment',     label: 'Métodos de Pago',        desc: 'Tarjetas guardadas',         icon: CreditCard,  color: 'text-green-600',  bg: 'bg-green-50',  badge: null },
  { id: 'preferences', label: 'Preferencias de Viaje',  desc: 'Asientos y notificaciones',  icon: Settings,    color: 'text-slate-500',  bg: 'bg-slate-100', badge: null },
  { id: 'notifs',      label: 'Notificaciones',         desc: 'Alertas y recordatorios',    icon: Bell,        color: 'text-purple-500', bg: 'bg-purple-50', badge: null },
  { id: 'security',    label: 'Seguridad y Privacidad', desc: 'Contraseña y permisos',      icon: Shield,      color: 'text-slate-500',  bg: 'bg-slate-100', badge: null },
  { id: 'help',        label: 'Centro de Ayuda',        desc: 'Preguntas frecuentes',       icon: HelpCircle,  color: 'text-teal-500',   bg: 'bg-teal-50',   badge: null },
]

const STATS = [
  { label: 'Viajes',  value: '24' },
  { label: 'km',      value: '3,840' },
  { label: 'Puntos',  value: '1,200' },
]

// ── Screen map ────────────────────────────────────────────────
function SubScreen({ id, onBack }) {
  const map = { personal: DatosPersonales, billing: DatosFacturacion, payment: MetodosPago,
    preferences: PreferenciasViaje, notifs: Notificaciones, security: SeguridadPrivacidad, help: CentroAyuda }
  const Component = map[id]
  return Component ? <Component onBack={onBack} /> : null
}

// ── Main Profile component ────────────────────────────────────
export default function Profile({ navigate }) {
  const [subScreen, setSubScreen] = useState(null)

  const pageVariants = {
    enter:  { x: 40, opacity: 0 },
    center: { x: 0,  opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
    exit:   { x: -20, opacity: 0, transition: { duration: 0.18, ease: 'easeIn' } },
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden relative">
      <AnimatePresence mode="wait">
        {subScreen ? (
          <motion.div key={subScreen} variants={pageVariants} initial="enter" animate="center" exit="exit"
            className="absolute inset-0 flex flex-col bg-slate-50 overflow-hidden">
            <SubScreen id={subScreen} onBack={() => setSubScreen(null)} />
          </motion.div>
        ) : (
          <motion.div key="main" variants={pageVariants} initial="enter" animate="center" exit="exit"
            className="absolute inset-0 flex flex-col bg-slate-50 overflow-hidden">

            {/* ── Avatar Header ─────────────────────── */}
            <div className="bg-white px-5 pt-8 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black text-2xl">N</span>
                </div>
                <div>
                  <h1 className="text-xl font-extrabold text-slate-900 leading-tight">Nehemías</h1>
                  <p className="text-xs text-slate-400 mt-0.5">nehemias@email.com</p>
                  <span className="inline-flex items-center gap-1 mt-2 bg-amber-50 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
                    <Star size={9} className="fill-amber-500 text-amber-500" />
                    Viajero Frecuente
                  </span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                {STATS.map((s) => (
                  <div key={s.label} className="bg-slate-50 rounded-2xl py-3 px-2 text-center border border-slate-100">
                    <p className="text-lg font-extrabold text-slate-900 leading-none">{s.value}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Menu list ─────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-5 py-4 pb-36 flex flex-col gap-2">
              <div className="bg-white rounded-3xl border border-slate-100">
                {MENU_ITEMS.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                      onClick={() => setSubScreen(item.id)}
                      className={`w-full flex items-center gap-3.5 px-4 py-3.5 text-left hover:bg-slate-50 active:bg-slate-100 transition-colors duration-150 ${
                        i < MENU_ITEMS.length - 1 ? 'border-b border-slate-50' : ''
                      } ${i === 0 ? 'rounded-t-3xl' : ''} ${i === MENU_ITEMS.length - 1 ? 'rounded-b-3xl' : ''}`}
                    >
                      <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={17} className={item.color} strokeWidth={1.8} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-800">{item.label}</span>
                          {item.badge && (
                            <span className="bg-orange-100 text-orange-600 text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                      <ChevronRight size={15} className="text-slate-300 flex-shrink-0" />
                    </motion.button>
                  )
                })}
              </div>

              <p className="text-center text-[10px] text-slate-300 font-medium mt-1">Litegua App v2.0.0</p>

              <button onClick={() => navigate('auth')} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl hover:bg-red-50 transition-colors duration-200 group">
                <LogOut size={15} className="text-red-400 group-hover:text-red-500 transition-colors" />
                <span className="text-sm font-semibold text-red-400 group-hover:text-red-500 transition-colors">
                  Cerrar sesión
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
