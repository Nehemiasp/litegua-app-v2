import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Eye, EyeOff, Check, ChevronRight, Mail, Lock, User, Phone } from 'lucide-react'

// ─── Animation presets ────────────────────────────────────────
const slideUp = {
  initial:  { y: 32, opacity: 0 },
  animate:  { y: 0,  opacity: 1, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  exit:     { y: -16, opacity: 0, transition: { duration: 0.2 } },
}
const stagger = (i) => ({ initial: { y: 16, opacity: 0 }, animate: { y: 0, opacity: 1, transition: { delay: 0.12 + i * 0.06, duration: 0.28, ease: 'easeOut' } } })

// ─── Google SVG ───────────────────────────────────────────────
function GoogleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

// ─── Shared field ─────────────────────────────────────────────
function Field({ icon: Icon, label, type = 'text', placeholder, value, onChange, trailing }) {
  return (
    <motion.div {...stagger(0)}>
      <label className="text-[10px] font-bold tracking-widest uppercase text-slate-400 block mb-2">{label}</label>
      <div className="flex items-center gap-3 bg-slate-50 border-2 border-transparent rounded-2xl px-4 py-3.5 focus-within:border-green-400 focus-within:bg-white transition-all duration-200 shadow-sm shadow-slate-100">
        {Icon && <Icon size={15} className="text-slate-300 flex-shrink-0" />}
        <input type={type} placeholder={placeholder} value={value} onChange={onChange}
          className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none font-medium" />
        {trailing}
      </div>
    </motion.div>
  )
}

// ─── Divider ──────────────────────────────────────────────────
function Divider({ label = 'O continúa con' }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-slate-100" />
      <span className="text-[10px] font-bold text-slate-300 tracking-widest">{label.toUpperCase()}</span>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// WELCOME SCREEN
// ═══════════════════════════════════════════════════════════════
function WelcomeScreen({ onEmail, onGuest }) {
  return (
    <motion.div key="welcome" {...slideUp} className="flex-1 flex flex-col overflow-hidden">

      {/* ── Hero ── */}
      <div className="relative flex-shrink-0" style={{ height: '55%' }}>
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=700&fit=crop&q=90"
          alt="Guatemala"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent" style={{ top: '60%' }} />

        {/* Logo chip */}
        <div className="absolute top-14 left-6 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center">
            <span className="text-white font-black text-base">L</span>
          </div>
          <span className="text-white font-extrabold text-base tracking-tight drop-shadow">Litegua</span>
        </div>

        {/* Hero text — bottom of image */}
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-3xl font-black text-white leading-tight tracking-tight drop-shadow-lg">
            Guatemala<br />te espera
          </h1>
          <p className="text-white/80 text-sm mt-1.5 font-medium drop-shadow">Transporte y turismo premium</p>
        </div>
      </div>

      {/* ── Action panel ── */}
      <div className="flex-1 bg-white px-6 pt-7 pb-8 flex flex-col gap-4">

        {/* Heading */}
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 leading-snug">Bienvenido de vuelta</h2>
          <p className="text-xs text-slate-400 mt-1">Elige cómo quieres continuar</p>
        </div>

        {/* Google */}
        <motion.button {...stagger(0)}
          onClick={() => onEmail('email')}
          className="w-full flex items-center gap-4 bg-white border-2 border-slate-150 rounded-2xl px-5 py-3.5 hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-[.98] shadow-sm shadow-slate-100">
          <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
            <GoogleIcon size={17} />
          </div>
          <span className="flex-1 text-sm font-semibold text-slate-700 text-left">Continuar con Google</span>
          <ChevronRight size={14} className="text-slate-300" />
        </motion.button>

        {/* Email */}
        <motion.button {...stagger(1)}
          onClick={() => onEmail('email')}
          className="w-full flex items-center gap-4 bg-green-600 rounded-2xl px-5 py-3.5 shadow-lg shadow-green-600/25 hover:bg-green-700 transition-all active:scale-[.98]">
          <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
            <Mail size={15} className="text-white" />
          </div>
          <span className="flex-1 text-sm font-extrabold text-white text-left">Correo electrónico</span>
          <ChevronRight size={14} className="text-white/60" />
        </motion.button>

        <Divider label="o sin cuenta" />

        {/* Guest */}
        <motion.button {...stagger(2)}
          onClick={onGuest}
          className="w-full py-3.5 rounded-2xl border-2 border-slate-100 text-slate-400 text-sm font-semibold hover:bg-slate-50 hover:text-slate-600 transition-all active:scale-[.98]">
          Continuar como invitado
        </motion.button>

        <p className="text-center text-[10px] text-slate-300 mt-auto">
          Al continuar aceptas nuestros{' '}
          <span className="text-green-600 font-semibold">Términos de uso</span>
        </p>
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════
// LOGIN SCREEN
// ═══════════════════════════════════════════════════════════════
function LoginScreen({ onBack, onRegister, onLogin }) {
  const [email,    setEmail]    = useState('')
  const [pass,     setPass]     = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)

  const canSubmit = email.includes('@') && pass.length >= 6

  const handleLogin = () => {
    if (!canSubmit) return
    setLoading(true)
    setTimeout(() => { setLoading(false); onLogin() }, 1500)
  }

  return (
    <motion.div key="login" {...slideUp} className="flex-1 flex flex-col bg-white overflow-hidden">

      {/* ── Decorative header ── */}
      <div className="relative bg-slate-900 flex flex-col justify-end px-6 pb-8 flex-shrink-0" style={{ height: 200 }}>
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-green-600/20" style={{ transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full bg-green-500/10" style={{ transform: 'translate(-40%, 40%)' }} />

        {/* Back */}
        <button onClick={onBack}
          className="absolute top-12 left-5 w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
          <ArrowLeft size={16} className="text-white" />
        </button>

        {/* Title */}
        <div className="relative z-10">
          <p className="text-green-400 text-[10px] font-bold tracking-widest uppercase mb-2">Bienvenido de vuelta</p>
          <h1 className="text-white text-2xl font-black tracking-tight leading-tight">Iniciar sesión</h1>
        </div>
      </div>

      {/* ── Form ── */}
      <div className="flex-1 overflow-y-auto px-6 pt-7 pb-10 flex flex-col gap-5">

        <Field icon={Mail} label="Correo electrónico" type="email" placeholder="tu@correo.com"
          value={email} onChange={e => setEmail(e.target.value)} />

        <Field icon={Lock} label="Contraseña" type={showPass ? 'text' : 'password'} placeholder="Mínimo 6 caracteres"
          value={pass} onChange={e => setPass(e.target.value)}
          trailing={
            <button onClick={() => setShowPass(s => !s)} tabIndex={-1}>
              {showPass ? <EyeOff size={14} className="text-slate-300" /> : <Eye size={14} className="text-slate-300" />}
            </button>
          }
        />

        <button className="text-xs font-bold text-green-600 text-right -mt-2 hover:text-green-700">
          ¿Olvidaste tu contraseña?
        </button>

        {/* Login CTA */}
        <button
          onClick={handleLogin}
          disabled={!canSubmit || loading}
          className="w-full py-4 rounded-2xl bg-green-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-600/25 hover:bg-green-700 transition-all active:scale-[.98] disabled:opacity-40 disabled:cursor-not-allowed mt-1"
        >
          {loading ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
              Iniciando sesión...
            </>
          ) : (
            <>Iniciar sesión <ChevronRight size={16} /></>
          )}
        </button>

        <Divider />

        {/* Google alt */}
        <button className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 rounded-2xl py-3.5 hover:bg-slate-50 transition-all active:scale-[.98] shadow-sm">
          <GoogleIcon size={17} />
          <span className="text-sm font-semibold text-slate-700">Google</span>
        </button>

        {/* Register link */}
        <p className="text-center text-xs text-slate-400 mt-2">
          ¿No tienes cuenta?{' '}
          <button onClick={onRegister} className="text-green-600 font-extrabold hover:text-green-700">
            Regístrate gratis
          </button>
        </p>
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════
// REGISTER SCREEN
// ═══════════════════════════════════════════════════════════════
function RegisterScreen({ onBack, onLogin, onRegister }) {
  const [showPass, setShowPass] = useState(false)
  const [agreed,   setAgreed]   = useState(false)
  const [loading,  setLoading]  = useState(false)

  const handleRegister = () => {
    if (!agreed) return
    setLoading(true)
    setTimeout(() => { setLoading(false); onRegister() }, 1600)
  }

  // Password strength
  const [pass, setPass] = useState('')
  const strength = pass.length === 0 ? 0 : pass.length < 6 ? 1 : pass.length < 10 ? 2 : pass.match(/[A-Z]/) && pass.match(/[0-9]/) ? 4 : 3
  const strengthLabel = ['', 'Débil', 'Regular', 'Buena', 'Fuerte']
  const strengthColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-blue-400', 'bg-green-500']

  return (
    <motion.div key="register" {...slideUp} className="flex-1 flex flex-col bg-white overflow-hidden">

      {/* ── Decorative header ── */}
      <div className="relative bg-slate-900 flex flex-col justify-end px-6 pb-8 flex-shrink-0" style={{ height: 200 }}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-green-600/20" style={{ transform: 'translate(25%, -25%)' }} />
        <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-green-500/10" />

        <button onClick={onBack}
          className="absolute top-12 left-5 w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
          <ArrowLeft size={16} className="text-white" />
        </button>

        <div className="relative z-10">
          <p className="text-green-400 text-[10px] font-bold tracking-widest uppercase mb-2">Únete a Litegua</p>
          <h1 className="text-white text-2xl font-black tracking-tight leading-tight">Crear cuenta</h1>
        </div>
      </div>

      {/* ── Form ── */}
      <div className="flex-1 overflow-y-auto px-6 pt-7 pb-10 flex flex-col gap-4">

        <Field icon={User}  label="Nombre completo"     placeholder="Juan Carlos Pérez" />
        <Field icon={Mail}  label="Correo electrónico"  type="email" placeholder="tu@correo.com" />
        <Field icon={Phone} label="WhatsApp / Teléfono" type="tel"   placeholder="+502 0000-0000" />

        <Field icon={Lock} label="Contraseña" type={showPass ? 'text' : 'password'} placeholder="Mínimo 8 caracteres"
          value={pass} onChange={e => setPass(e.target.value)}
          trailing={
            <button onClick={() => setShowPass(s => !s)} tabIndex={-1}>
              {showPass ? <EyeOff size={14} className="text-slate-300" /> : <Eye size={14} className="text-slate-300" />}
            </button>
          }
        />

        {/* Strength bar */}
        {pass.length > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex items-center gap-2 -mt-1">
            <div className="flex-1 flex gap-1">
              {[1,2,3,4].map(i => (
                <div key={i} className={`flex-1 h-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor[strength] : 'bg-slate-100'}`} />
              ))}
            </div>
            <span className={`text-[10px] font-bold ${strength >= 4 ? 'text-green-600' : strength >= 3 ? 'text-blue-500' : strength >= 2 ? 'text-amber-500' : 'text-red-400'}`}>
              {strengthLabel[strength]}
            </span>
          </motion.div>
        )}

        {/* Terms checkbox */}
        <button onClick={() => setAgreed(a => !a)} className="flex items-start gap-3 text-left mt-1">
          <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${agreed ? 'bg-green-600 border-green-600 shadow-md shadow-green-600/20' : 'border-slate-300'}`}>
            {agreed && <Check size={11} className="text-white" strokeWidth={3} />}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Acepto los{' '}
            <span className="text-green-600 font-semibold">Términos de Servicio</span>
            {' '}y la{' '}
            <span className="text-green-600 font-semibold">Política de Privacidad</span>
          </p>
        </button>

        {/* Register CTA */}
        <button
          onClick={handleRegister}
          disabled={!agreed || loading}
          className="w-full py-4 rounded-2xl bg-green-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-600/25 hover:bg-green-700 transition-all active:scale-[.98] disabled:opacity-40 disabled:cursor-not-allowed mt-1"
        >
          {loading ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
              Creando cuenta...
            </>
          ) : (
            <>Crear mi cuenta <ChevronRight size={16} /></>
          )}
        </button>

        <p className="text-center text-xs text-slate-400 mt-1">
          ¿Ya tienes cuenta?{' '}
          <button onClick={onLogin} className="text-green-600 font-extrabold hover:text-green-700">
            Inicia sesión
          </button>
        </p>
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════
// ROOT COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function Auth({ onAuthenticated }) {
  const [screen, setScreen] = useState('welcome')

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative bg-white">
      <AnimatePresence mode="wait">
        {screen === 'welcome' && (
          <WelcomeScreen key="welcome" onEmail={() => setScreen('login')} onGuest={onAuthenticated} />
        )}
        {screen === 'login' && (
          <LoginScreen key="login" onBack={() => setScreen('welcome')} onRegister={() => setScreen('register')} onLogin={onAuthenticated} />
        )}
        {screen === 'register' && (
          <RegisterScreen key="register" onBack={() => setScreen('login')} onLogin={() => setScreen('login')} onRegister={onAuthenticated} />
        )}
      </AnimatePresence>
    </div>
  )
}
