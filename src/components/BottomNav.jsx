import { Home, Compass, Briefcase, User } from 'lucide-react'

const tabs = [
  { id: 'home', label: 'Inicio', icon: Home },
  { id: 'explore', label: 'Explorar', icon: Compass },
  { id: 'trips', label: 'Mis viajes', icon: Briefcase },
  { id: 'profile', label: 'Perfil', icon: User },
]

export default function BottomNav({ currentView, navigate }) {
  return (
    <div className="sticky bottom-0 bg-white border-t border-slate-100 px-2 pb-5 pt-2 z-30">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = tab.id === currentView
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-green-600'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className={`text-[10px] ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
