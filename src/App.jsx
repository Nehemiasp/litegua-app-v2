import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BottomNav from './components/BottomNav'
import HomeScreen from './views/HomeScreen'
import SearchResults from './views/SearchResults'
import SeatSelector from './views/SeatSelector'
import Checkout from './views/Checkout'
import Payment from './views/Payment'
import Confirmation from './views/Confirmation'
import MyTrips from './views/MyTrips'
import Explore from './views/Explore'
import Lex from './views/Lex'
import Profile from './views/Profile'
import TourDetail from './views/TourDetail'
import TourBooking from './views/TourBooking'
import Auth from './views/Auth'
import AgencyDetail from './views/AgencyDetail'
import AgencyMap from './views/AgencyMap'
import LocationPicker from './components/LocationPicker'
import Promotions from './views/Promotions'
import PromoDetail from './views/PromoDetail'

const pageVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.2, ease: 'easeIn' } },
}

// Main bottom-nav views that show the bottom bar
const MAIN_VIEWS = ['home', 'explore', 'trips', 'profile']

const SEAT_PRICE = 150.00
const SERVICE_FEE_RATE = 0.2544

export default function App() {
  const [currentView, setCurrentView] = useState('auth')
  const [activeTab, setActiveTab] = useState('bus')
  const [selectedSeats, setSelectedSeats] = useState([])
  const [passengerData, setPassengerData] = useState({})
  const [selectedTour, setSelectedTour] = useState(null)
  const [selectedAgency, setSelectedAgency] = useState(null)
  const [selectedPromo, setSelectedPromo] = useState(null)
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    date: '2026-10-27',
    time: '04:00',
  })
  const [locationPicker, setLocationPicker] = useState(null)
  const [paymentProcessing, setPaymentProcessing] = useState(false)

  const totalBoletos = selectedSeats.length * SEAT_PRICE
  const serviceFee = totalBoletos * SERVICE_FEE_RATE
  const totalAmount = totalBoletos + serviceFee

  const navigate = (view) => {
    setCurrentView(view)
  }

  const goBack = () => {
    const backMap = {
      results: 'home',
      seats: 'results',
      checkout: 'seats',
      payment: 'checkout',
      confirmation: 'home',
      tourDetail: 'explore',
      tourBooking: 'tourDetail',
      agencyDetail: 'home',
      agencyMap: 'home',
      promotions: 'home',
      promoDetail: 'promotions',
    }
    setCurrentView(backMap[currentView] || 'home')
  }

  const handleSearch = () => {
    if (searchParams.origin && searchParams.destination) {
      navigate('results')
    }
  }

  const toggleSeat = (seatNum) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNum)
        ? prev.filter((s) => s !== seatNum)
        : [...prev, seatNum]
    )
  }

  const handlePayment = () => {
    setPaymentProcessing(true)
    setTimeout(() => {
      setPaymentProcessing(false)
      navigate('confirmation')
    }, 2500)
  }

  const resetFlow = () => {
    setSelectedSeats([])
    setPassengerData({})
    setPaymentProcessing(false)
    navigate('home')
  }

  const renderView = () => {
    const props = {
      searchParams, setSearchParams,
      selectedSeats, toggleSeat,
      passengerData, setPassengerData,
      navigate, goBack, handleSearch,
      activeTab, setActiveTab,
      totalBoletos, serviceFee, totalAmount,
      handlePayment, paymentProcessing,
      resetFlow, setLocationPicker,
      SEAT_PRICE,
      onSelectAgency: setSelectedAgency,
      onSelectTour: setSelectedTour,
      onSelectPromo: setSelectedPromo,
    }

    switch (currentView) {
      case 'auth':         return <Auth onAuthenticated={() => navigate('home')} />
      case 'home':         return <HomeScreen {...props} />
      case 'results':      return <SearchResults {...props} />
      case 'seats':        return <SeatSelector {...props} />
      case 'checkout':     return <Checkout {...props} />
      case 'payment':      return <Payment {...props} />
      case 'confirmation': return <Confirmation {...props} />
      case 'trips':        return <MyTrips navigate={navigate} goBack={goBack} />
      case 'explore':      return <Explore navigate={navigate} goBack={goBack} onSelectTour={setSelectedTour} />
      case 'lex':          return <Lex navigate={navigate} goBack={goBack} />
      case 'profile':      return <Profile navigate={navigate} goBack={goBack} />
      case 'tourDetail':   return <TourDetail tour={selectedTour} goBack={goBack} navigate={navigate} />
      case 'tourBooking':  return <TourBooking tour={selectedTour} goBack={goBack} navigate={navigate} />
      case 'agencyDetail': return <AgencyDetail agency={selectedAgency} goBack={goBack} />
      case 'agencyMap':    return <AgencyMap goBack={goBack} navigate={navigate} onSelectAgency={setSelectedAgency} />
      case 'promotions':   return <Promotions goBack={goBack} navigate={navigate} onSelectPromo={setSelectedPromo} />
      case 'promoDetail':  return <PromoDetail promo={selectedPromo} goBack={goBack} navigate={navigate} />
      default:             return <HomeScreen {...props} />
    }
  }

  const showBottomNav = MAIN_VIEWS.includes(currentView) && currentView !== 'auth'

  return (
    <div className="min-h-screen bg-slate-200 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen relative flex flex-col shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-1 flex flex-col"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>

        {showBottomNav && (
          <BottomNav currentView={currentView} navigate={navigate} />
        )}

        <AnimatePresence>
          {locationPicker && (
            <LocationPicker
              type={locationPicker}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              onClose={() => setLocationPicker(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
