import { useRef } from 'react'
import { CheckCircle, Download, Ticket, CalendarDays, Clock, Armchair } from 'lucide-react'
import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

// ─── Utility ─────────────────────────────────────────────────
const formatDate = (dateStr) => {
  if (!dateStr) return '27 Oct 2026'
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('es-GT', { day: '2-digit', month: 'short', year: 'numeric' })
}

function makeRef(seats) {
  const base = seats.join('') + Date.now().toString(36).slice(-4)
  return 'LTG-' + base.toUpperCase().slice(0, 8)
}

// ─── Hidden PDF template ──────────────────────────────────────
// Rendered off-screen, captured by html2canvas, then saved as PDF
function PdfTemplate({ searchParams, selectedSeats, totalAmount, bookingCode }) {
  const sortedSeats = [...selectedSeats].sort((a, b) => a - b)
  const seatLabel = sortedSeats.map(s => `#${s}`).join(', ') || '#–'
  const qrData = JSON.stringify({
    code: bookingCode,
    route: `${searchParams.origin || 'Guatemala'} → ${searchParams.destination || 'Puerto Barrios'}`,
    date: formatDate(searchParams.date),
    seats: seatLabel,
    total: `Q ${totalAmount.toFixed(2)}`,
  })

  return (
    <div style={{
      width: 794,           // A4 width at 96dpi
      background: '#ffffff',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      padding: '40px 48px',
    }}>

      {/* == HEADER ============================================ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '3px solid #16a34a', paddingBottom: 20, marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#16a34a', letterSpacing: -1 }}>Litegua</div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>Líneas Terrestres Guatemaltecas S.A.</div>
          <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 1 }}>NIT: 599635-K · litegua.com · Tel: 2326-9595</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 0.5 }}>Comprobante de Viaje</div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 3 }}>Boleto Electrónico Confirmado</div>
          <div style={{ marginTop: 8, display: 'inline-block', background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 6, padding: '3px 12px' }}>
            <span style={{ fontSize: 13, fontWeight: 900, color: '#15803d', letterSpacing: 2 }}>{bookingCode}</span>
          </div>
        </div>
      </div>

      {/* == ROUTE BANNER ====================================== */}
      <div style={{
        background: 'linear-gradient(135deg, #15803d 0%, #16a34a 60%, #22c55e 100%)',
        borderRadius: 14,
        padding: '20px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 28,
      }}>
        <div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600 }}>Origen</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#ffffff', marginTop: 4, letterSpacing: -0.5 }}>
            {searchParams.origin || 'Ciudad de Guatemala'}
          </div>
        </div>
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)' }}>
          <div style={{ fontSize: 24 }}>→</div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 }}>Primera Plus</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600 }}>Destino</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#ffffff', marginTop: 4, letterSpacing: -0.5 }}>
            {searchParams.destination || 'Puerto Barrios'}
          </div>
        </div>
      </div>

      {/* == DETAILS + QR ====================================== */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 28 }}>

        {/* Details table */}
        <div style={{ flex: 1, background: '#f8fafc', borderRadius: 12, padding: '20px 24px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16 }}>Detalle del Viaje</div>
          {[
            ['Fecha de viaje', formatDate(searchParams.date)],
            ['Hora de salida',  searchParams.time || '4:00 a.m.'],
            ['Asiento(s)',      seatLabel],
            ['Pasajero',       'Nehemías Pérez'],
            ['Clase de servicio', 'Primera Plus'],
            ['Punto de salida', 'Terminal Litegua — Centra Norte, Zona 17'],
          ].map(([label, value], i, arr) => (
            <div key={label} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: i < arr.length - 1 ? '1px solid #e2e8f0' : 'none',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>{label}</span>
              <span style={{ fontSize: 12, color: '#0f172a', fontWeight: 700, maxWidth: '55%', textAlign: 'right' }}>{value}</span>
            </div>
          ))}
        </div>

        {/* QR block */}
        <div style={{ width: 200, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            background: '#f8fafc',
            borderRadius: 12,
            border: '1px solid #e2e8f0',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1.5 }}>Código QR</div>
            <QRCodeSVG
              value={qrData}
              size={148}
              level="H"
              includeMargin={true}
              fgColor="#0f172a"
              bgColor="#ffffff"
            />
            <div style={{ fontSize: 9, color: '#94a3b8', textAlign: 'center', lineHeight: 1.4 }}>
              Escanea para verificar<br />tu boleto
            </div>
          </div>

          <div style={{
            background: '#f0fdf4',
            borderRadius: 12,
            border: '1.5px solid #bbf7d0',
            padding: '14px 16px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 10, color: '#15803d', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Total pagado</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#15803d', marginTop: 4, letterSpacing: -1 }}>
              Q {totalAmount.toFixed(2)}
            </div>
            <div style={{ fontSize: 9, color: '#16a34a', marginTop: 2 }}>Todo incluido</div>
          </div>
        </div>
      </div>

      {/* == TERMS ============================================= */}
      <div style={{
        background: '#fafafa',
        borderRadius: 10,
        border: '1px solid #f1f5f9',
        padding: '14px 20px',
        marginBottom: 28,
      }}>
        <div style={{ fontSize: 10, color: '#94a3b8', lineHeight: 1.7 }}>
          <strong style={{ color: '#64748b' }}>Condiciones: </strong>
          Este boleto es personal e intransferible. Preséntese en la terminal 20 minutos antes de la hora de salida.
          Litegua no se hace responsable por retrasos causados por condiciones fuera de su control.
          Conserve este comprobante durante todo el viaje.
        </div>
      </div>

      {/* == FOOTER ============================================ */}
      <div style={{
        background: '#0f172a',
        borderRadius: 12,
        padding: '14px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10 }}>© {new Date().getFullYear()} Litegua · ¡Seguro llegas bien!</div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10 }}>Call Center: (502) 2326-9595 · WhatsApp: 5200-1838</div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10 }}>Lunes–Viernes 7:00–18:00 · Sáb–Dom 7:00–17:00</div>
      </div>

    </div>
  )
}

// ─── Main Confirmation screen ─────────────────────────────────
export default function Confirmation({ selectedSeats, searchParams, totalAmount, resetFlow }) {
  const sortedSeats = [...selectedSeats].sort((a, b) => a - b)
  const pdfRef = useRef(null)

  // stable booking code per render
  const bookingCode = makeRef(sortedSeats.length ? sortedSeats : [0])

  const handleDownloadPdf = async () => {
    if (!pdfRef.current) return
    try {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width / 2, canvas.height / 2] })
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2)
      pdf.save('comprobante-litegua.pdf')
    } catch (e) {
      console.error('PDF error', e)
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 p-6">

      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
        className="mb-5"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle size={44} className="text-green-600" strokeWidth={2} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-6"
      >
        <h1 className="text-xl font-bold text-slate-900 mb-1">¡Pago exitoso!</h1>
        <p className="text-sm text-slate-500">Tu reservación ha sido confirmada</p>
      </motion.div>

      {/* Ticket Card — original style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
      >
        <div className="bg-green-600 px-5 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-green-200 font-medium uppercase tracking-wider">Litegua</div>
              <div className="text-white font-bold text-sm mt-0.5">Primera Plus</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-green-200 font-medium">Total pagado</div>
              <div className="text-white font-bold text-lg">Q {totalAmount.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="p-5">
          {/* Route */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1">
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Origen</div>
              <div className="text-sm font-semibold text-slate-900 mt-0.5">{searchParams.origin || 'Ciudad de Guatemala'}</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-600" />
              <div className="w-8 h-px bg-green-300" />
              <div className="w-2 h-2 rounded-full bg-green-600" />
            </div>
            <div className="flex-1 text-right">
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Destino</div>
              <div className="text-sm font-semibold text-slate-900 mt-0.5">{searchParams.destination || 'Puerto Barrios'}</div>
            </div>
          </div>

          <div className="border-t border-dashed border-slate-200 my-3" />

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <CalendarDays size={14} className="text-slate-400 mt-0.5" />
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Fecha</div>
                <div className="text-xs font-semibold text-slate-800">{formatDate(searchParams.date)}</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock size={14} className="text-slate-400 mt-0.5" />
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Hora</div>
                <div className="text-xs font-semibold text-slate-800">{searchParams.time || '4:00 a.m.'}</div>
              </div>
            </div>
            <div className="flex items-start gap-2 col-span-2">
              <Armchair size={14} className="text-slate-400 mt-0.5" />
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Asientos</div>
                <div className="flex gap-1.5 mt-0.5">
                  {sortedSeats.map((s) => (
                    <span key={s} className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">#{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full mt-5 space-y-3"
      >
        <button
          onClick={handleDownloadPdf}
          className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full text-sm shadow-md shadow-green-600/25 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Download size={16} />
          Descargar comprobante PDF
        </button>
        <button
          onClick={resetFlow}
          className="w-full py-3 text-slate-500 text-sm font-medium hover:text-slate-700 transition-colors"
        >
          Volver al inicio
        </button>
      </motion.div>

      {/* ── Hidden PDF template (off-screen) ── */}
      <div style={{ position: 'fixed', top: -9999, left: -9999, zIndex: -1 }}>
        <div ref={pdfRef}>
          <PdfTemplate
            searchParams={searchParams}
            selectedSeats={selectedSeats}
            totalAmount={totalAmount}
            bookingCode={bookingCode}
          />
        </div>
      </div>
    </div>
  )
}
